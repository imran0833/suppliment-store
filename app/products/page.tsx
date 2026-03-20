"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";

export default function ProductsPage(){

  const [products,setProducts] = useState<any[]>([]);
  const [filtered,setFiltered] = useState<any[]>([]);

  const [category,setCategory] = useState("All");
  const [maxPrice,setMaxPrice] = useState(10000);
  const [search,setSearch] = useState("");

  useEffect(()=>{
    fetch("/api/product/list")
    .then(res=>res.json())
    .then(data=>{
      if(data.products){
        setProducts(data.products);
        setFiltered(data.products);
      }
    })
  },[]);

  useEffect(()=>{
    let temp = [...products];

    if(category !== "All"){
      temp = temp.filter((p:any)=>p.category === category);
    }

    temp = temp.filter((p:any)=>p.price <= maxPrice);

    if(search){
      temp = temp.filter((p:any)=>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(temp);

  },[category,maxPrice,search,products]);

  const categories = ["All","Protein","Creatine","Mass Gainer","Pre Workout"];

  return(

    <div className="max-w-7xl mx-auto px-4 py-6">

      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        All Supplements
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">

        {/* ✅ Sidebar (hidden on mobile) */}
        <div className="hidden md:block md:col-span-1 border p-4 rounded shadow h-fit sticky top-24">

          <h2 className="font-bold mb-4 text-lg">Filters</h2>

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
                className={`text-left ${
                  category === c
                  ? "font-bold text-black"
                  : "text-gray-600"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <label htmlFor="max-price-range" className="font-semibold mb-2 block">
            Max Price
          </label>

          <input
            type="range"
            id="max-price-range"
            min="0"
            max="10000"
            value={maxPrice}
            onChange={(e)=>setMaxPrice(Number(e.target.value))}
            className="w-full"
            title={`Set maximum price to ₹ ${maxPrice}`}
          />

          <p className="text-sm mt-2">₹ {maxPrice}</p>
        </div>

        {/* ✅ Products */}
        <div className="col-span-1 md:col-span-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

          {filtered.map((p:any)=>(
            <ProductCard key={p._id} product={p}/>
          ))}

        </div>

      </div>

    </div>
  )
}