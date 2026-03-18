import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

export async function GET() {
  try {
    await connectDB();
    return NextResponse.json({ message: "Database Connected Successfully ✅" });
  } catch (error: any) {
    console.error("DB ERROR:", error);   // 👈 Terminal me full error print karega
    return NextResponse.json({ 
      message: "Database Connection Failed ❌",
      error: error.message              // 👈 Browser me exact reason dikhega
    });
  }
}