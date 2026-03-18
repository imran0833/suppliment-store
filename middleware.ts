import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: any) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload }: any = await jwtVerify(token, secret);

    if (payload.role !== "admin") {
      return NextResponse.json(
        { message: "Access Denied ❌ Admin Only" },
        { status: 403 }
      );
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/api/admin/:path*"],
};