"use client";

import { useEffect, useState } from "react";
import { getWishlist, removeFromWishlist } from "@/utils/wishlist";
import { addToCart } from "@/utils/cart";

export default function WishlistPage(){

  const [items,setItems] = useState<any[]>([]);

  const load = () => {
    setItems(getWishlist());
  };

  useEffect(()=>{
    load();
  },[]);

  return(

    <div className="max-w-7xl mx-auto px-4 py-6 md:p-10">

      <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">
        Your Wishlist ❤️
      </h1>

      {items.length === 0 && (
        <p className="text-gray-500 text-center mt-10">
          No items in wishlist 😔
        </p>
      )}

      {/* ✅ RESPONSIVE GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">

        {items.map((p:any)=>(

          <div
            key={p._id}
            className="border p-3 md:p-4 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 bg-white"
          >

            {/* Image */}
            <img
              src={p.image ? p.image : "/no-image.png"}
              className="w-full h-32 md:h-40 object-cover rounded"
            />

            {/* Title */}
            <h2 className="font-semibold mt-2 text-sm md:text-base line-clamp-2">
              {p.name}
            </h2>

            {/* Category */}
            <p className="text-gray-500 text-xs md:text-sm">
              {p.category}
            </p>

            {/* Price */}
            <p className="font-bold mt-1 md:mt-2 text-sm md:text-base">
              ₹ {p.price}
            </p>

            {/* Buttons */}
            <div className="flex flex-col md:flex-row gap-2 mt-3">

              {/* Add to Cart */}
              <button
                onClick={()=>{
                  addToCart(p);
                  alert("Added to cart 🛒");
                }}
                className="bg-black text-white text-xs md:text-sm px-3 py-2 rounded-lg w-full"
              >
                Add To Cart
              </button>

              {/* Remove */}
              <button
                onClick={()=>{
                  removeFromWishlist(p._id);
                  load();
                }}
                className="text-red-500 text-xs md:text-sm border border-red-500 px-3 py-2 rounded-lg w-full"
              >
                Remove
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  )
}