import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // Only handle /admin paths
  if (!pathname.startsWith("/admin")) return NextResponse.next();

  // Allow the login page and its static assets
  if (pathname === "/admin/login") return NextResponse.next();
  if (pathname.startsWith("/_next") || pathname.startsWith("/admin/_next")) return NextResponse.next();

  // Read cookie
  const authed = req.cookies.get("admin-auth")?.value === "authenticated";
  if (!authed) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.search = ""; // avoid loops with search params
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"], // nothing else
};
