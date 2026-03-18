import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function POST(req: Request) {

  await connectDB();

  const { id } = await req.json();

  try {

    await Product.findByIdAndDelete(id);

    return NextResponse.json({
      message: "Product deleted successfully"
    });

  } catch (error) {

    return NextResponse.json({
      message: "Delete failed"
    });

  }

}