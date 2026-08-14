import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  if (
    req.nextUrl.pathname.startsWith("/login") ||
    req.nextUrl.pathname.startsWith("/api")
  ) {
    return NextResponse.next();
  }

  const auth = req.cookies.get("xds-auth");

  if (!auth) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!_next|favicon.ico).*)",
};