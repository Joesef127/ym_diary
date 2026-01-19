import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json(
    { message: "Logged out successfully" },
    { status: 200 }
  );

  // Clear auth token cookie
  response.cookies.set("authToken", "", {
    httpOnly: false,
    secure: false,
    sameSite: "lax",
    maxAge: 0, // Expire immediately
  });

  return response;
}
