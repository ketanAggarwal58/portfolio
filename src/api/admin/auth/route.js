import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req) {
  const { password } = await req.json();

  if (password === process.env.ADMIN_PASSWORD) {
    cookies().set({
      name: "admin-auth",
      value: "authenticated",
      httpOnly: true,
      path: "/",            // important: make cookie visible to /admin/*
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
    });
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ error: "Invalid password" }, { status: 401 });
}
