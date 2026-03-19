"use client";

import Link from "next/link";
import SearchBar from "./SearchBar";
import { useEffect, useState, useRef } from "react";
import { getCart } from "@/utils/cart";
import {
  ShoppingCart,
  User,
  ShoppingBag,
  Heart,
  Menu
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
  },[]);

  return(

    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/70 border-b">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">

        {/* Logo */}
        <Link href="/" className="text-xl md:text-2xl font-bold">
          💪 Store
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">

          <SearchBar/>

          <Link href="/products" className="hover:text-black">
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
            <button onClick={()=>setOpen(!open)} className="bg-black text-white px-3 py-1 rounded-lg" aria-label={session ? "Account menu" : "Open account menu"} title={session ? "Account menu" : "Open account menu"}>
              <User size={18}/>
            </button>

            {open && (
              <div className="absolute right-0 mt-2 bg-white shadow rounded-lg w-40">
                {!session ? (
                  <>
                    <Link href="/login" className="block p-2">Login</Link>
                    <Link href="/register" className="block p-2">Register</Link>
                  </>
                ) : (
                  <button onClick={()=>signOut()} className="block w-full text-left p-2 text-red-500">
                    Logout
                  </button>
                )}
              </div>
            )}
          </div>

        </div>

        {/* Mobile */}
        <button className="md:hidden" onClick={()=>setMenu(!menu)} aria-label={menu ? "Close mobile menu" : "Open mobile menu"} title={menu ? "Close mobile menu" : "Open mobile menu"}>
          <Menu/>
        </button>

      </div>

      {menu && (
        <div className="md:hidden p-4 flex flex-col gap-4 bg-white">
          <SearchBar/>
          <Link href="/products">Products</Link>
          <Link href="/wishlist">Wishlist</Link>
          <Link href="/cart">Cart ({count})</Link>
        </div>
      )}

    </nav>
  )
}