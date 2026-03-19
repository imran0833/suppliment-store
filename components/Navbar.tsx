"use client";

import Link from "next/link";
import SearchBar from "./SearchBar";
import { useEffect, useState, useRef } from "react";
import { getCart } from "@/utils/cart";
import {
  ShoppingCart,
  User,
  Heart,
  Menu,
  X
} from "lucide-react";

import { useSession, signOut } from "next-auth/react";

export default function Navbar(){

  const [count,setCount] = useState(0);
  const [menu,setMenu] = useState(false);
  const [open,setOpen] = useState(false);

  const dropdownRef = useRef<any>(null);
  const { data: session } = useSession();

  const loadCartCount = () => {
    const cart = getCart();
    const total = cart.reduce((sum:any,item:any)=> sum + item.quantity,0);
    setCount(total);
  };

  useEffect(()=>{
    loadCartCount();
    window.addEventListener("storage",loadCartCount);
  },[]);

  return(

    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 border-b">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">

        {/* Logo */}
        <Link href="/" className="text-lg md:text-2xl font-bold text-black">
          💪 Store
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">

          <div className="w-64">
            <SearchBar/>
          </div>

          <Link href="/products" className="text-gray-700 hover:text-black font-medium">
            Products
          </Link>

          <Link href="/wishlist">
            <Heart size={20}/>
          </Link>

          <Link href="/cart" className="relative">
            <ShoppingCart size={20}/>
            {count > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 rounded-full">
                {count}
              </span>
            )}
          </Link>

          {/* Account */}
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={()=>setOpen(!open)} 
              className="bg-black text-white px-3 py-1 rounded-lg"
            >
              <User size={18}/>
            </button>

            {open && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-xl w-40 z-50">
                {!session ? (
                  <>
                    <Link href="/login" className="block px-4 py-2 hover:bg-gray-100">Login</Link>
                    <Link href="/register" className="block px-4 py-2 hover:bg-gray-100">Register</Link>
                  </>
                ) : (
                  <button 
                    onClick={()=>signOut()} 
                    className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                )}
              </div>
            )}
          </div>

        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden" 
          onClick={()=>setMenu(!menu)}
        >
          {menu ? <X/> : <Menu/>}
        </button>

      </div>

      {/* MOBILE MENU */}
      {menu && (
        <div className="md:hidden bg-white border-t p-4 flex flex-col gap-4">

          <SearchBar/>

          <Link href="/products" className="font-medium">Products</Link>
          <Link href="/wishlist" className="font-medium">Wishlist</Link>
          <Link href="/cart" className="font-medium">
            Cart ({count})
          </Link>

        </div>
      )}

    </nav>
  )
}