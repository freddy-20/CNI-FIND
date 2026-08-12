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
            "Aucun fichier",
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
      url:
        result.secure_url,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          "Erreur upload",
      },
      {
        status: 500,
      }
    );
  }
}
