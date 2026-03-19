"use client";

import Link from "next/link";
import HeroSlider from "@/components/HeroSlider";
import ProductCarousel from "@/components/ProductCarousel";
import SkeletonCard from "@/components/SkeletonCard";
import { useEffect, useState } from "react";

export default function HomePage(){

  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    setTimeout(()=>setLoading(false),1500);
  },[]);

  return(

    <div className="bg-gradient-to-b from-gray-50 to-white">

      <HeroSlider />

      {/* CATEGORY */}
      <section className="max-w-7xl mx-auto px-4 py-10">

        <h2 className="text-2xl font-bold mb-6">
          Shop By Category
        </h2>

        <div className="grid grid-cols-2 gap-4">

          {["Protein","Creatine","Mass","Pre"].map((item)=>(
            <Link href="/products" key={item}>
              <div className="bg-white p-5 rounded-xl shadow text-center active:scale-95">
                {item}
              </div>
            </Link>
          ))}

        </div>

      </section>

      {/* FEATURED */}
      <section className="px-4 py-10 bg-gray-100">

        <h2 className="text-2xl font-bold mb-6">
          Featured
        </h2>

        <div className="grid grid-cols-2 gap-4">

          {loading
            ? Array(4).fill(0).map((_,i)=><SkeletonCard key={i}/>)
            : Array(4).fill(0).map((_,i)=>(
              <div key={i} className="bg-white p-3 rounded-xl shadow">
                Product
              </div>
            ))
          }

        </div>

      </section>

      {/* TRENDING */}
      <section className="px-4 py-10">

        <h2 className="text-2xl font-bold mb-6">
          Trending
        </h2>

        <ProductCarousel/>

      </section>

    </div>
  )
}