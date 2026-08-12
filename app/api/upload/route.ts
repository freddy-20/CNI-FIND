import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

// Rate limiting simple en mémoire (par IP) — suffisant pour un petit trafic.
// Pour la production à plus grande échelle, remplacer par Redis (Upstash).
const uploadAttempts = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 5; // 5 uploads / minute / IP

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/heic"];
const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const attempts = (uploadAttempts.get(ip) || []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );

  if (attempts.length >= RATE_LIMIT_MAX) {
    uploadAttempts.set(ip, attempts);
    return true;
  }

  attempts.push(now);
  uploadAttempts.set(ip, attempts);
  return false;
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, error: "Trop de tentatives. Réessayez dans une minute." },
        { status: 429 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "Aucun fichier fourni" },
        { status: 400 }
      );
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: "Format non autorisé (JPG, PNG ou WEBP uniquement)" },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { success: false, error: "Image trop volumineuse (max 5 Mo)" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "cni-find/found-documents",
            resource_type: "image",
            unique_filename: true,
            overwrite: false,
            transformation: [
              { width: 1600, height: 1600, crop: "limit" },
              { quality: "auto:good" },
              { fetch_format: "auto" },
            ],
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        .end(buffer);
    });

    return NextResponse.json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error) {
    console.error("Erreur upload Cloudinary:", error);

    return NextResponse.json(
      { success: false, error: "Erreur lors de l'upload de l'image" },
      { status: 500 }
    );
  }
}
