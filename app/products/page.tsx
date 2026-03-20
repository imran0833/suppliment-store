"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import Preloader from "@/components/Preloaders";
import { addToWishlist, removeFromWishlist, getWishlist } from "@/utils/wishlist";

type Product = {
  _id:string;
  name:string;
  price:number;
  category:string;
  image:string;
};

export default function ProductsPage(){

  const [products,setProducts] = useState<Product[]>([]);
  const [filtered,setFiltered] = useState<Product[]>([]);
  const [loading,setLoading] = useState(true);

  const [category,setCategory] = useState("All");
  const [maxPrice,setMaxPrice] = useState(10000);
  const [search,setSearch] = useState("");

  const [showFilters,setShowFilters] = useState(false);

  // ✅ Wishlist state
  const [wishlist,setWishlist] = useState<string[]>([]);

  useEffect(()=>{
    fetch("/api/product/list")
    .then(res=>res.json())
    .then(data=>{
      if(data.products){
        setProducts(data.products);
        setFiltered(data.products);
      }
    })
    .catch(()=>{
      alert("Failed to load products");
    })
    .finally(()=>setLoading(false));

    // wishlist load
    const items = getWishlist();
    setWishlist(items.map((i:any)=>i._id));

  },[]);

  useEffect(()=>{
    let temp = [...products];

    if(category !== "All"){
      temp = temp.filter((p)=>p.category === category);
    }

    temp = temp.filter((p)=>p.price <= maxPrice);

    if(search){
      temp = temp.filter((p)=>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(temp);

  },[category,maxPrice,search,products]);

  const categories = ["All","Protein","Creatine","Mass Gainer","Pre Workout"];

  // ❤️ Toggle wishlist
  const toggleWishlist = (product:Product)=>{
    if(wishlist.includes(product._id)){
      removeFromWishlist(product._id);
      setWishlist(wishlist.filter(id=>id !== product._id));
    }else{
      addToWishlist(product);
      setWishlist([...wishlist,product._id]);
    }
  };

  // 🔥 PRELOADER
  if(loading){
    return <Preloader />;
  }

  return(

    <div className="max-w-7xl mx-auto px-4 py-6">

      <h1 className="text-2xl md:text-3xl font-bold mb-4">
        All Supplements
      </h1>

      {/* MOBILE FILTER BUTTON */}
      <button
        onClick={()=>setShowFilters(true)}
        className="md:hidden mb-4 bg-black text-white px-4 py-2 rounded-lg"
      >
        Filters
      </button>

      {/* 🔥 MOBILE FILTER DRAWER WITH ANIMATION */}
      <div className={`fixed inset-0 z-50 ${showFilters ? "visible" : "invisible"}`}>

        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${showFilters ? "opacity-100" : "opacity-0"}`}
          onClick={()=>setShowFilters(false)}
        />

        {/* Drawer */}
        <div className={`absolute left-0 top-0 h-full w-3/4 bg-white p-5 overflow-y-auto transform transition-transform duration-300 ${showFilters ? "translate-x-0" : "-translate-x-full"}`}>

          <div className="flex justify-between mb-4">
            <h2 className="font-bold text-lg">Filters</h2>
            <button onClick={()=>setShowFilters(false)}>✖</button>
          </div>

          <input
            type="text"
            placeholder="Search product..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            className="border p-2 w-full rounded mb-4"
          />

          <h3 className="font-semibold mb-2">Category</h3>

          <div className="flex flex-col gap-2 mb-6">
            {categories.map((c)=>(
              <button
                key={c}
                onClick={()=>setCategory(c)}
                className={category === c ? "font-bold" : ""}
              >
                {c}
              </button>
            ))}
          </div>

          <input
            type="range"
            min="0"
            max="10000"
            value={maxPrice}
            onChange={(e)=>setMaxPrice(Number(e.target.value))}
            className="w-full"
          />

          <p>₹ {maxPrice}</p>

          <button
            onClick={()=>setShowFilters(false)}
            className="mt-4 w-full bg-black text-white py-2 rounded-lg"
          >
            Apply Filters
          </button>

        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">

        {/* DESKTOP FILTER */}
        <div className="hidden md:block md:col-span-1 border p-4 rounded shadow h-fit sticky top-24">

          <input
            type="text"
            placeholder="Search product..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            className="border p-2 w-full rounded mb-4"
          />

          <h3 className="font-semibold mb-2">Category</h3>

          <div className="flex flex-col gap-2 mb-6">
            {categories.map((c)=>(
              <button
                key={c}
                onClick={()=>setCategory(c)}
                className={category === c ? "font-bold" : ""}
              >
                {c}
              </button>
            ))}
          </div>

          <input
            type="range"
            min="0"
            max="10000"
            value={maxPrice}
            onChange={(e)=>setMaxPrice(Number(e.target.value))}
            className="w-full"
          />

          <p>₹ {maxPrice}</p>

        </div>

        {/* PRODUCTS */}
        <div className="col-span-1 md:col-span-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

          {filtered.length === 0 ? (
            <p>No products found 😔</p>
          ) : (
            filtered.map((p)=>(
              <div key={p._id} className="relative">

                {/* ❤️ Wishlist Button */}
                <button
                  onClick={()=>toggleWishlist(p)}
                  className="absolute top-2 right-2 z-10 bg-white p-2 rounded-full shadow"
                >
                  {wishlist.includes(p._id) ? "❤️" : "🤍"}
                </button>

                <ProductCard product={p}/>
              </div>
            ))
          )}

        </div>

      </div>

    </div>
  )
}