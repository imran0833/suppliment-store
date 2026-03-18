import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";

export async function PUT(req: Request) {

  try {

    await connectDB();

    const { id, status } = await req.json();

    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      order
    });

  } catch (error) {

    return NextResponse.json({
      success: false,
      message: "Status update failed"
    });

  }

}