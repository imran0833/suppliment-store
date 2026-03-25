"use client";

import Link from "next/link";
import SearchBar from "./SearchBar";
import { useEffect, useState } from "react";
import { getCart } from "@/utils/cart";
import { ShoppingCart, User, Heart, Menu, X } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {

  const [count, setCount] = useState(0);
  const [menu, setMenu] = useState(false);
  const [open, setOpen] = useState(false);

  const { data: session } = useSession();

  useEffect(() => {
    const cart = getCart();
    const total = cart.reduce((sum: any, item: any) => sum + item.quantity, 0);
    setCount(total);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">

        {/* LOGO */}
        <Link 
          href="/" 
          className="flex items-center gap-2 text-xl font-bold leading-none"
        >
          💪 <span>GymStore</span>
        </Link>

        {/* DESKTOP */}
        <div className="hidden md:flex items-center gap-6 h-full">

          {/* SEARCH */}
          <div className="w-64 flex items-center">
            <SearchBar />
          </div>

          {/* MENU */}
          <Link 
            href="/products" 
            className="text-sm font-medium flex items-center h-full hover:text-black"
          >
            Shop
          </Link>

          {/* ICONS */}
          <Link 
            href="/wishlist" 
            className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-gray-100 transition"
          >
            <Heart size={20} />
          </Link>

          <Link 
            href="/cart" 
            className="relative flex items-center justify-center h-10 w-10 rounded-full hover:bg-gray-100 transition"
          >
            <ShoppingCart size={20} />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 py-[1px] rounded-full">
                {count}
              </span>
            )}
          </Link>

          {/* ACCOUNT */}
          <div className="relative">

            <button
              onClick={() => setOpen(!open)}
              className="flex items-center justify-center h-10 w-10 rounded-full bg-black text-white hover:scale-105 transition"
            >
              <User size={18} />
            </button>

            {open && (
              <div className="absolute right-0 top-12 bg-white shadow-lg rounded-xl w-40 z-50 overflow-hidden">

                {!session ? (
                  <>
                    <Link href="/login" className="block px-4 py-2 hover:bg-gray-100">
                      Login
                    </Link>
                    <Link href="/register" className="block px-4 py-2 hover:bg-gray-100">
                      Register
                    </Link>
                  </>
                ) : (
                  <button
                    onClick={() => signOut()}
                    className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                )}

              </div>
            )}

          </div>

        </div>

        {/* MOBILE BUTTON */}
        <button 
          className="md:hidden flex items-center justify-center h-10 w-10"
          onClick={() => setMenu(!menu)}
        >
          {menu ? <X /> : <Menu />}
        </button>

      </div>

      {/* MOBILE MENU */}
      {menu && (
        <div className="md:hidden bg-white border-t p-4 flex flex-col gap-4">

          <SearchBar />

          <Link href="/products" className="font-medium">
            Shop
          </Link>

          <Link href="/wishlist" className="font-medium">
            Wishlist
          </Link>

          <Link href="/cart" className="font-medium">
            Cart ({count})
          </Link>

        </div>
      )}

    </nav>
  );
}