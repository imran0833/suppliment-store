"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";
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

  const handleAddToCart = () => {
    addToCart(product);
    alert("Added to cart 🛒");
  };

  return (
    <div className="bg-white border rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 p-3 md:p-4 relative group">

      {/* Wishlist Button */}
      <button
        onClick={handleWishlist}
        aria-label="Add to wishlist"
        className="absolute top-2 right-2 md:top-3 md:right-3 z-10 bg-white p-1.5 rounded-full shadow"
      >
        <Heart
          size={20}
          className={liked ? "text-red-500" : "text-gray-400"}
          fill={liked ? "red" : "none"}
        />
      </button>

      {/* Product Image */}
      <Link href={`/products/${product._id}`}>
        <div className="overflow-hidden rounded-lg">
          <img
            src={product.image ? product.image : "/no-image.png"}
            alt={product.name}
            className="w-full h-32 md:h-44 object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>

      {/* Product Name */}
      <Link href={`/products/${product._id}`}>
        <h3 className="text-sm md:text-lg font-semibold mt-2 md:mt-3 hover:text-blue-600 line-clamp-2">
          {product.name}
        </h3>
      </Link>

      {/* Rating */}
      <p className="text-yellow-500 text-xs md:text-sm mt-1">
        {"⭐".repeat(Math.round(product.rating || 4))}
      </p>

      {/* Price */}
      <p className="font-bold text-base md:text-lg mt-1">
        ₹ {product.price}
      </p>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className="mt-3 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 flex items-center justify-center gap-2 text-sm md:text-base"
      >
        <ShoppingCart size={18} />
        Add To Cart
      </button>

    </div>
  );
}