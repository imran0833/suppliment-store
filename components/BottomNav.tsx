"use client";

import Link from "next/link";
import { Home, ShoppingBag, Heart, ShoppingCart, User } from "lucide-react";
import { usePathname } from "next/navigation";

export default function BottomNav(){

  const path = usePathname();

  const navItems = [
    {name:"Home",icon:Home,link:"/"},
    {name:"Shop",icon:ShoppingBag,link:"/products"},
    {name:"Wishlist",icon:Heart,link:"/wishlist"},
    {name:"Cart",icon:ShoppingCart,link:"/cart"},
    {name:"Account",icon:User,link:"/profile"},
  ];

  return(

    <div className="fixed bottom-0 left-0 w-full bg-white border-t shadow-lg flex justify-around items-center py-2 z-50 md:hidden">

      {navItems.map((item)=>{

        const Icon = item.icon;
        const active = path === item.link;

        return(
          <Link
            key={item.name}
            href={item.link}
            className={`flex flex-col items-center text-xs ${
              active ? "text-black font-semibold" : "text-gray-400"
            }`}
          >
            <Icon size={20}/>
            {item.name}
          </Link>
        )
      })}

    </div>
  )
}