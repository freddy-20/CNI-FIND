import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySessionToken } from "@/lib/auth";

const PUBLIC_ADMIN_PATHS = ["/admin/login", "/admin/setup"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    const response = pathname && !PUBLIC_ADMIN_PATHS.includes(pathname)
      ? await checkAuth(request)
      : NextResponse.next();

    // Empêche le navigateur de garder une page admin en cache (bouton "Retour")
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
    return response;
  }

  return NextResponse.next();
}

async function checkAuth(request: NextRequest) {
  const token = request.cookies.get("admin-session")?.value;
  const valid = await verifySessionToken(token);

  if (!valid) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
