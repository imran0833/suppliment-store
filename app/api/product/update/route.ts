import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function POST(req: Request) {

  await connectDB();

  const { id, name, price, category, stock, image } = await req.json();

  try {

    const product = await Product.findByIdAndUpdate(
      id,
      {
        name,
        price,
        category,
        stock,
        image
      },
      { new: true }
    );

    return NextResponse.json({
      message: "Product updated",
      product
    });

  } catch (error) {

    return NextResponse.json({
      message: "Update failed"
    });

  }

}