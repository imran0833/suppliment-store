"use client";

import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>

        <SessionProvider>
          <Navbar />

          <main className="min-h-screen">
            {children}
          </main>

          <Footer />   {/* ✅ wapas add */}
          <BottomNav />
        </SessionProvider>

      </body>
    </html>
  );
}