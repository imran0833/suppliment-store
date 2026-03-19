"use client";

import "./globals.css";
import Navbar from "@/components/Navbar";
import { SessionProvider } from "next-auth/react";
import BottomNav from "@/components/BottomNav";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">

        <SessionProvider>
          <Navbar />

          {/* MAIN CONTENT */}
          <div className="pb-20 md:pb-0">
            {children}
          </div>

          {/* MOBILE APP NAV */}
          <BottomNav />
        </SessionProvider>

      </body>
    </html>
  );
}