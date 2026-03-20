"use client";

import Link from "next/link";
import { Home, ShoppingCart, User, Heart } from "lucide-react";
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

      <Link href="/"><Home/></Link>
      <Link href="/wishlist"><Heart/></Link>

      <Link href="/cart" className="relative">
        <ShoppingCart/>
        {count>0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
            {count}
          </span>
        )}
      </Link>

      <Link href="/account"><User/></Link>

    </div>
  );
}