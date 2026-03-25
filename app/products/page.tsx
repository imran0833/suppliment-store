"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import Preloader from "@/components/Preloaders";
import { motion } from "framer-motion";
import { addToWishlist, removeFromWishlist, getWishlist } from "@/utils/wishlist";

type Product = {
  _id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description?: string;
};

export default function ProductsPage() {

  const searchParams = useSearchParams();
  const categoryFromURL = searchParams.get("category") || "All";

  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [category, setCategory] = useState(categoryFromURL);
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState(10000);

  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/product/list")
      .then(res => res.json())
      .then(data => {
        setProducts(data.products || []);
        setFiltered(data.products || []);
      })
      .finally(() => setLoading(false));

    const items = getWishlist();
    setWishlist(items.map((i: any) => i._id));
  }, []);

  useEffect(() => {
    let temp = [...products];

    if (category !== "All") {
      temp = temp.filter(p => p.category?.toLowerCase() === category.toLowerCase());
    }

    temp = temp.filter(p => p.price <= maxPrice);

    if (search) {
      temp = temp.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(temp);

  }, [category, search, maxPrice, products]);

  const categories = ["All", "Protein", "Creatine", "Mass Gainer", "Pre Workout"];

  const toggleWishlist = (product: Product) => {
    if (wishlist.includes(product._id)) {
      removeFromWishlist(product._id);
      setWishlist(wishlist.filter(id => id !== product._id));
    } else {
      addToWishlist(product);
      setWishlist([...wishlist, product._id]);
    }
  };

  if (loading) return <Preloader />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">

      <h1 className="text-2xl font-bold mb-6">All Supplements</h1>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">

        {/* FILTER */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="md:col-span-1 bg-white rounded-2xl shadow p-4 h-fit"
        >

          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 w-full mb-4 rounded-lg"
          />

          <h3 className="font-semibold mb-2">Category</h3>

          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`block w-full text-left px-2 py-1 rounded-lg mb-1 transition 
                ${category === c ? "bg-black text-white" : "hover:bg-gray-100"}`}
            >
              {c}
            </button>
          ))}

          <h3 className="mt-4 font-semibold">Max Price</h3>

          <input
            type="range"
            min="0"
            max="10000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full mt-2"
          />

          <p className="text-sm mt-1">₹ {maxPrice}</p>

        </motion.div>

        {/* PRODUCTS */}
        <motion.div
          layout
          className="md:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-5"
        >

          {filtered.map((p) => (
            <motion.div
              key={p._id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative"
            >

              <button
                onClick={() => toggleWishlist(p)}
                className="absolute top-2 right-2 bg-white p-2 rounded-full shadow hover:scale-110 transition z-10"
              >
                {wishlist.includes(p._id) ? "❤️" : "🤍"}
              </button>

              <ProductCard product={p} />

            </motion.div>
          ))}

        </motion.div>

      </div>

    </div>
  );
}