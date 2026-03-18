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
  },[]);

  return(

    <div className="max-w-7xl mx-auto p-10">

      <h1 className="text-3xl font-bold mb-8">
        Your Wishlist ❤️
      </h1>

      {items.length === 0 && (
        <p>No items in wishlist</p>
      )}

      <div className="grid grid-cols-4 gap-6">

        {items.map((p:any)=>(

          <div
          key={p._id}
          className="border p-4 rounded-lg shadow"
          >

            <img
            src={p.image ? p.image : "/no-image.png"}
            className="w-full h-40 object-cover"
            />

            <h2 className="font-bold mt-2">
              {p.name}
            </h2>

            <p className="text-gray-500">
              {p.category}
            </p>

            <p className="font-bold mt-2">
              ₹ {p.price}
            </p>


            <div className="flex gap-3 mt-4">

              {/* Add to Cart */}

              <button
              onClick={()=>{
                addToCart(p);
                alert("Added to cart 🛒");
              }}
              className="bg-black text-white px-3 py-2 rounded"
              >
                Add To Cart
              </button>


              {/* Remove */}

              <button
              onClick={()=>{
                removeFromWishlist(p._id);
                load();
              }}
              className="text-red-500"
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