import { NextResponse } from "next/server";

export async function POST(
  request: Request
) {
  const formData =
    await request.formData();

  const email = String(
    formData.get("email")
  );

  const password = String(
    formData.get("password")
  );

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const response =
      NextResponse.redirect(
        new URL(
          "/admin",
          request.url
        )
      );

    response.cookies.set(
      "admin-auth",
      "authenticated",
      {
        httpOnly: true,
        secure:
          process.env.NODE_ENV ===
          "production",
        path: "/",
        maxAge: 60 * 60 * 24,
      }
    );

    return response;
  }

  return NextResponse.redirect(
    new URL(
      "/admin/login",
      request.url
    )
  );
}
