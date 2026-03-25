"use client";

import { useState } from "react";
import { addToCart } from "@/utils/cart";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ProductCard({ product }: any) {

  const [added, setAdded] = useState(false);

  const handleCart = (e: any) => {
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (

    <Link href={`/product/${product._id}`}>

      <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-3 relative overflow-hidden cursor-pointer"
      >

        <img
          src={product.image}
          className="w-full h-36 object-cover rounded-xl"
        />

        <h3 className="mt-3 font-semibold text-sm">
          {product.name}
        </h3>

        <p className="text-gray-500 text-xs line-clamp-2">
          {product.description}
        </p>

        <p className="font-bold mt-1">
          ₹{product.price}
        </p>

        <button
          onClick={handleCart}
          className="mt-3 w-full bg-black text-white py-2 rounded-xl active:scale-95"
        >
          Add to Cart
        </button>

        {added && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute inset-0 bg-green-500/80 flex items-center justify-center text-white font-bold"
          >
            Added ✔
          </motion.div>
        )}

      </motion.div>

    </Link>
  );
}