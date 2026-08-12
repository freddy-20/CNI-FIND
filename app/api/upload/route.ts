import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(
  request: Request
) {
  try {
    const formData =
      await request.formData();

    const file =
      formData.get(
        "file"
      ) as File;

    if (!file) {
      return NextResponse.json(
        {
          error:
            "Aucun fichier fourni",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !file.type.startsWith(
        "image/"
      )
    ) {
      return NextResponse.json(
        {
          error:
            "Seules les images sont autorisées",
        },
        {
          status: 400,
        }
      );
    }

    if (
      file.size >
      5 * 1024 * 1024
    ) {
      return NextResponse.json(
        {
          error:
            "Image trop volumineuse (max 5MB)",
        },
        {
          status: 400,
        }
      );
    }

    const bytes =
      await file.arrayBuffer();

    const buffer =
      Buffer.from(bytes);

    const result =
      await new Promise<any>(
        (
          resolve,
          reject
        ) => {
          cloudinary.uploader
            .upload_stream(
              {
                folder:
                  "cni-find",
              },
              (
                error,
                result
              ) => {
                if (error)
                  reject(
                    error
                  );

                resolve(
                  result
                );
              }
            )
            .end(buffer);
        }
      );

    return NextResponse.json({
      success: true,
      url:
        result.secure_url,
    });
  } catch (
    error
  ) {
    console.error(
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Erreur lors de l'upload",
      },
      {
        status: 500,
      }
    );
  }
}
