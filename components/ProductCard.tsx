"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { addToCart } from "@/utils/cart";
import { addToWishlist, getWishlist } from "@/utils/wishlist";

export default function ProductCard({ product }: any) {

  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const list = getWishlist();
    const exists = list.find((p: any) => p._id === product._id);
    if (exists) setLiked(true);
  }, [product._id]);

  const handleWishlist = (e: any) => {
    e.stopPropagation();
    addToWishlist(product);
    setLiked(true);
  };

  return (
    <div className="bg-white/70 backdrop-blur-lg border border-gray-200 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 p-3 md:p-4 relative group">

      {/* Wishlist */}
      <button
        onClick={handleWishlist}
        className="absolute top-3 right-3 bg-white p-2 rounded-full shadow"
      >
        <Heart
          size={18}
          className={liked ? "text-red-500" : "text-gray-400"}
          fill={liked ? "red" : "none"}
        />
      </button>

      {/* Image */}
      <Link href={`/products/${product._id}`}>
        <div className="overflow-hidden rounded-xl">
          <img
            src={product.image || "/no-image.png"}
            className="w-full h-36 md:h-48 object-cover group-hover:scale-110 transition duration-500"
          />
        </div>
      </Link>

      {/* Name */}
      <Link href={`/products/${product._id}`}>
        <h3 className="text-sm md:text-lg font-semibold mt-3 line-clamp-2 group-hover:text-blue-600 transition">
          {product.name}
        </h3>
      </Link>

      {/* Rating */}
      <div className="flex items-center gap-1 mt-1 text-yellow-500">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={14} fill="gold" />
        ))}
      </div>

      {/* Price */}
      <p className="font-bold text-lg mt-1">
        ₹ {product.price}
      </p>

      {/* Button */}
      <button
        onClick={() => {
          addToCart(product);
          alert("Added to cart 🛒");
        }}
        className="mt-3 w-full bg-black text-white py-2 rounded-xl hover:bg-gray-800 transition flex items-center justify-center gap-2"
      >
        <ShoppingCart size={16} />
        Add To Cart
      </button>

    </div>
  );
}