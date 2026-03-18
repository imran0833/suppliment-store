import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET(req: Request, context: any) {

  await connectDB();

  const { id } = await context.params;

  const product = await Product.findById(id);

  if (!product) {
    return NextResponse.json({
      error: "Product not found"
    });
  }

  return NextResponse.json({
    product
  });

}