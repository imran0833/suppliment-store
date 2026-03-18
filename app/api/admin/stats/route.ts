import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import Product from "@/models/Product";
import User from "@/models/User";

export async function GET() {

  await connectDB();

  const orders = await Order.countDocuments();
  const products = await Product.countDocuments();
  const users = await User.countDocuments();

  const salesData = await Order.find();

  const sales = salesData.reduce(
    (sum, order) => sum + order.total,
    0
  );

  return NextResponse.json({
    sales,
    orders,
    products,
    users
  });

}