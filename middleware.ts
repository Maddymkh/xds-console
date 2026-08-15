import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Public login pages
  if (
    pathname.startsWith("/login") ||
    pathname.startsWith("/judge/login") ||
    pathname.startsWith("/results/login") ||
    pathname === "/api/login" ||
    pathname === "/api/results-login" ||
    pathname.startsWith("/participant")
  ) {
    return NextResponse.next();
  }

  // Results has a SECOND password
  if (pathname.startsWith("/results")) {
    const resultsAuth = req.cookies.get("xds-results-auth");

    if (!resultsAuth || resultsAuth.value !== "yes") {
      return NextResponse.redirect(
        new URL("/results/login", req.url)
      );
    }

    return NextResponse.next();
  }

  // Everything else uses the NORMAL login
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