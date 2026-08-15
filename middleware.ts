import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // PUBLIC
  if (
    path.startsWith("/participant") ||
    path.startsWith("/login") ||
    path.startsWith("/results/login") ||
    path === "/api/login" ||
    path === "/api/results-login"
  ) {
    return NextResponse.next();
  }

  // RESULTS — separate password
  if (path.startsWith("/results")) {
    const resultsAuth = req.cookies.get("xds-results-auth");

    if (!resultsAuth || resultsAuth.value !== "yes") {
      return NextResponse.redirect(
        new URL("/results/login", req.url)
      );
    }

    return NextResponse.next();
  }

  // ORGANIZER / JUDGE / OTHER STAFF PAGES
  const auth = req.cookies.get("xds-auth");

  if (!auth || auth.value !== "yes") {
    return NextResponse.redirect(
      new URL("/login", req.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!_next|favicon.ico).*)",
};