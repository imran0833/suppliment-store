"use client";

import { useState } from "react";
import { addToCart } from "@/utils/cart";
import { motion } from "framer-motion";

export default function ProductCard({ product }: any){

  const [added,setAdded] = useState(false);

  const handleCart = () => {
    addToCart(product);
    setAdded(true);

    setTimeout(()=>setAdded(false),1500);
  };

  return(

    <motion.div 
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-3 relative overflow-hidden"
    >

      {/* IMAGE */}
      <img
        src={product.image}
        className="w-full h-36 object-cover rounded-xl"
      />

      {/* TITLE */}
      <h3 className="mt-3 font-semibold text-sm">
        {product.name}
      </h3>

      <p className="text-gray-500 text-xs">
        {product.desc}
      </p>

      {/* PRICE */}
      <p className="font-bold mt-1">
        ₹{product.price}
      </p>

      {/* BUTTON */}
      <button
        onClick={handleCart}
        className="mt-3 w-full bg-black text-white py-2 rounded-xl active:scale-95 transition"
      >
        Add to Cart
      </button>

      {/* ANIMATION */}
      {added && (
        <motion.div
          initial={{ scale:0 }}
          animate={{ scale:1 }}
          className="absolute inset-0 bg-green-500/80 flex items-center justify-center text-white font-bold text-lg"
        >
          Added ✔
        </motion.div>
      )}

    </motion.div>
  )
}