"use client";

import Link from "next/link";
import { Home, ShoppingCart, User, Heart, Store } from "lucide-react";
import { useEffect, useState } from "react";
import { getCart } from "@/utils/cart";

export default function BottomNav(){

  const [count,setCount] = useState(0);

  useEffect(()=>{
    const cart = getCart();
    const total = cart.reduce((s:any,i:any)=> s+i.quantity,0);
    setCount(total);
  },[]);

  return(
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-2 md:hidden z-50">

      {/* Home */}
      <Link href="/" className="flex flex-col items-center text-xs">
        <Home size={20}/>
        Home
      </Link>

      {/* Shop (FIXED) */}
      <Link href="/products" className="flex flex-col items-center text-xs">
        <Store size={20}/>
        Shop
      </Link>

      {/* Wishlist */}
      <Link href="/wishlist" className="flex flex-col items-center text-xs">
        <Heart size={20}/>
        Wishlist
      </Link>

      {/* Cart */}
      <Link href="/cart" className="relative flex flex-col items-center text-xs">
        <ShoppingCart size={20}/>
        Cart

        {count>0 && (
          <span className="absolute -top-1 right-2 bg-red-500 text-white text-xs px-1 rounded-full">
            {count}
          </span>
        )}
      </Link>

      {/* Account */}
      <Link href="/account" className="flex flex-col items-center text-xs">
        <User size={20}/>
        Account
      </Link>

    </div>
  );
}