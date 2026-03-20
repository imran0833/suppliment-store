"use client";

import { useEffect,useState } from "react";
import { getWishlist,removeFromWishlist } from "@/utils/wishlist";
import { addToCart } from "@/utils/cart";

export default function WishlistPage(){

  const [items,setItems] = useState<any[]>([]);

  const load = () => {
    setItems(getWishlist());
  };

  useEffect(()=>{
    load();

    const update = () => load();
    window.addEventListener("storage", update);

    return () => window.removeEventListener("storage", update);
  },[]);

  return(

    <div className="max-w-7xl mx-auto px-4 py-6">

      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        Your Wishlist ❤️
      </h1>

      {items.length === 0 && (
        <p className="text-gray-500">
          😔 No items yet. Start adding products ❤️
        </p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

        {items.map((p:any)=>(

          <div key={p._id} className="border p-4 rounded-lg shadow">

            <img
              src={p.image || "/no-image.png"}
              className="w-full h-40 object-cover"
            />

            <h2 className="font-bold mt-2">{p.name}</h2>

            <p className="text-gray-500">{p.category}</p>

            <p className="font-bold mt-2">₹ {p.price}</p>

            <div className="flex flex-col gap-2 mt-4">

              <button
                onClick={()=>{
                  addToCart(p);
                  alert("Added to cart 🛒");
                }}
                className="bg-black text-white px-3 py-2 rounded"
              >
                Add To Cart
              </button>

              <button
                onClick={()=>{
                  removeFromWishlist(p._id);
                  load();
                }}
                className="text-red-500 text-sm"
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