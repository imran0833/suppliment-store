"use client";

import Link from "next/link";
import SearchBar from "./SearchBar";
import { useEffect, useState, useRef } from "react";
import { getCart } from "@/utils/cart";
import {
  ShoppingCart,
  Package,
  User,
  ShoppingBag,
  Heart
} from "lucide-react";

import { useSession, signOut } from "next-auth/react";

export default function Navbar(){

  const [count,setCount] = useState(0);
  const [open,setOpen] = useState(false);

  const dropdownRef = useRef<any>(null);

  const { data: session } = useSession();

  const loadCartCount = () => {

    const cart = getCart();

    const total = cart.reduce(
      (sum:any,item:any)=> sum + item.quantity,
      0
    );

    setCount(total);
  };

  useEffect(()=>{
    loadCartCount();
    window.addEventListener("storage",loadCartCount);
  },[]);

  // 🔥 CLOSE DROPDOWN OUTSIDE CLICK
  useEffect(() => {
    const handleClickOutside = (event:any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return(

    <nav className="bg-white shadow-md sticky top-0 z-50">

      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">

        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          SUPPLEMENT STORE
        </Link>

        {/* Search */}
        <SearchBar/>

        {/* Menu */}
        <div className="flex items-center gap-6">

          {/* Products */}
          <Link href="/products" className="flex gap-1 items-center">
            <ShoppingBag size={20}/> Products
          </Link>

          {/* Wishlist */}
          <Link href="/wishlist" className="flex gap-1 items-center">
            <Heart size={20}/> Wishlist
          </Link>

          {/* Cart */}
          <Link href="/cart" className="relative flex gap-1 items-center">
            <ShoppingCart size={20}/> Cart

            {count > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {count}
              </span>
            )}
          </Link>

          {/* ACCOUNT DROPDOWN */}
          <div className="relative" ref={dropdownRef}>

            <button
              onClick={()=>setOpen(!open)}
              className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded"
            >
              <User size={18}/>
              {session ? session.user?.name : "Account"}
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">

                {!session ? (
                  <>
                    <Link
                      href="/login"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={()=>setOpen(false)}
                    >
                      Login
                    </Link>

                    <Link
                      href="/register"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={()=>setOpen(false)}
                    >
                      Register
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={()=>setOpen(false)}
                    >
                      Profile
                    </Link>

                    <Link
                      href="/orders"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={()=>setOpen(false)}
                    >
                      My Orders
                    </Link>

                    {session.user?.role === "admin" && (
                      <Link
                        href="/admin"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={()=>setOpen(false)}
                      >
                        Admin Panel
                      </Link>
                    )}

                    <button
                      onClick={()=>{
                        setOpen(false);
                        signOut();
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                    >
                      Logout
                    </button>
                  </>
                )}

              </div>
            )}

          </div>

        </div>

      </div>

    </nav>
  )
}