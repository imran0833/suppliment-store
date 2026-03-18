import { NextResponse } from "next/server";
import PDFDocument from "pdfkit";
import Order from "@/models/Order";
import { connectDB } from "@/lib/mongodb";

export async function GET(req: Request, { params }: any) {

  await connectDB();

  const order = await Order.findById(params.id);

  const doc = new PDFDocument();

  const chunks: any[] = [];

 doc.on("data", (chunk: any) => chunks.push(chunk));

  doc.text("Invoice");
  doc.text(`Order ID: ${order._id}`);
  doc.text(`Total: ₹ ${order.total}`);
  doc.text(`Tax: ₹ ${order.tax}`);

  doc.end();

  return new NextResponse(Buffer.concat(chunks), {
    headers: {
      "Content-Type": "application/pdf"
    }
  });

}