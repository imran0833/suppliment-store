import { NextResponse } from "next/server";
import Order from "@/models/Order";
import { connectDB } from "@/lib/mongodb";

export async function GET(req: Request, { params }: any) {

  await connectDB();

  const order = await Order.findById(params.id);

  return NextResponse.json({
    order
  });

}