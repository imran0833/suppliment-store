import { NextResponse } from "next/server";
import Cart from "@/models/Cart";
import { connectDB } from "@/lib/mongodb";
import mongoose from "mongoose";

export async function POST(req: Request) {
  await connectDB();

  const { userId, productId, quantity } = await req.json();

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = await Cart.create({
      userId,
      items: [{ productId, quantity }],
    });
  } else {
    const existingItem = cart.items.find(
      (item: any) =>
        item.productId.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
  }

  return NextResponse.json({ message: "Added to Cart ✅" });
}