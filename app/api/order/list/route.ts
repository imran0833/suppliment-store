import { NextResponse } from "next/server";
import Order from "@/models/Order";
import { connectDB } from "@/lib/mongodb";

export async function GET() {

  await connectDB();

  const orders = await Order.find().sort({ createdAt: -1 });

  return NextResponse.json({
    orders
  });

}