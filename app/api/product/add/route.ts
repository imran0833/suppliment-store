import { NextResponse } from "next/server";
import Product from "@/models/Product";
import { connectDB } from "@/lib/mongodb";

export async function POST(req: Request) {

  await connectDB();

  const body = await req.json();

  const product = await Product.create(body);

  return NextResponse.json({
    message: "Product Added Successfully ✅",
    product
  });

}