import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { password } = await req.json();

  if (password !== process.env.RESULTS_PASSWORD) {
    return NextResponse.json(
      { error: "Invalid password" },
      { status: 401 }
    );
  }

  const cookieStore = await cookies();

  cookieStore.set("xds-results-auth", "yes", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });

  return NextResponse.json({ ok: true });
}