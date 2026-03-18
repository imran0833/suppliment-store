import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email, password } = body;

    // Temporary response (later DB connect karenge)
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and Password required" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: "Login API working ✅",
      user: {
        email,
      },
    });

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}