"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";
import { addToCart } from "@/utils/cart";
import { addToWishlist, getWishlist } from "@/utils/wishlist";

export default function ProductCard({ product }: any) {

  const [liked,setLiked] = useState(false);

  useEffect(()=>{

    const list = getWishlist();

    const exists = list.find((p:any)=>p._id === product._id);

    if(exists){
      setLiked(true);
    }

  },[product._id]);


  const handleWishlist = (e:any)=>{
    e.stopPropagation();
    addToWishlist(product);
    setLiked(true);
  }

  return(

    <div className="bg-white border rounded-lg shadow hover:shadow-xl transition p-4 relative">

      {/* Wishlist */}

      <button
      onClick={handleWishlist}
      aria-label="Add to wishlist"
      className="absolute top-3 right-3 z-10"
      >
        <Heart
        size={22}
        className={liked ? "text-red-500" : "text-gray-400"}
        fill={liked ? "red" : "none"}
        />
      </button>


      {/* Image */}

      <Link href={`/products/${product._id}`}>

        <img
            src={product.image ? product.image : "/no-image.png"}
            className="w-full h-44 object-cover hover:scale-105 transition"
          />

      </Link>


      {/* Name */}

      <Link href={`/products/${product._id}`}>

        <h3 className="text-lg font-semibold mt-3 hover:text-blue-600">
          {product.name}
        </h3>

      </Link>


      {/* Rating */}

      <p className="text-yellow-500 text-sm">
        {"⭐".repeat(Math.round(product.rating || 4))}
      </p>


      {/* Price */}

      <p className="font-bold text-lg mt-1">
        ₹ {product.price}
      </p>


      {/* Cart */}

      <button
      onClick={()=>{
        addToCart(product);
        alert("Added to cart 🛒");
      }}
      className="mt-3 w-full bg-black text-white py-2 rounded hover:bg-gray-800 flex items-center justify-center gap-2"
      >
        <ShoppingCart size={18}/>
        Add To Cart
      </button>

    </div>

  )

}