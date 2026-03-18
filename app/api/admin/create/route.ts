import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function GET() {

  await connectDB();

  const admin = await User.create({
    name: "Admin",
    email: "admin@gym.com",
    password: "123456",
    role: "admin"
  });

  return NextResponse.json({
    message: "Admin Created",
    admin
  });

}