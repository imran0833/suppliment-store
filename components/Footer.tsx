"use client";

import Link from "next/link";

export default function Footer(){

  return(

    <footer className="bg-white border-t mt-20">

      {/* 🔥 MAIN FOOTER */}

      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 p-10 text-sm text-gray-600">

        {/* Column 1 */}
        <div>
          <h3 className="font-semibold mb-3 text-black">About</h3>
          <ul className="space-y-2">
            <li><Link href="#">About Us</Link></li>
            <li><Link href="#">Contact</Link></li>
            <li><Link href="#">Careers</Link></li>
          </ul>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="font-semibold mb-3 text-black">Help</h3>
          <ul className="space-y-2">
            <li><Link href="#">Payments</Link></li>
            <li><Link href="#">Shipping</Link></li>
            <li><Link href="#">Returns</Link></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="font-semibold mb-3 text-black">Policy</h3>
          <ul className="space-y-2">
            <li><Link href="#">Privacy Policy</Link></li>
            <li><Link href="#">Terms</Link></li>
            <li><Link href="#">Security</Link></li>
          </ul>
        </div>

        {/* Column 4 */}
        <div>
          <h3 className="font-semibold mb-3 text-black">Social</h3>
          <ul className="space-y-2">
            <li><Link href="#">Instagram</Link></li>
            <li><Link href="#">Facebook</Link></li>
            <li><Link href="#">YouTube</Link></li>
          </ul>
        </div>

      </div>

      {/* 🔻 BOTTOM BAR */}

      <div className="border-t text-center text-xs text-gray-500 py-4 relative group">

        © 2026 Supplement Store. All rights reserved.

        {/* 🔥 ADMIN LINK (FIXED) */}
        <Link
          href="/admin/login"
          className="absolute right-4 bottom-2 text-[10px] text-gray-400 opacity-0 group-hover:opacity-100 transition"
        >
          .
        </Link>

      </div>

    </footer>

  );
}