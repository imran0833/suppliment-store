"use client";

import Link from "next/link";
import HeroSlider from "@/components/HeroSlider";
import ProductCarousel from "@/components/ProductCarousel";

export default function HomePage(){

  return(

    <div className="bg-gray-50">

      <HeroSlider />

      {/* CATEGORY */}
      <section className="max-w-7xl mx-auto px-4 py-10">

        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          Shop By Category
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          {["Protein","Creatine","Mass","Pre"].map((c)=>(
            <Link href="/products" key={c}>
              <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl text-center transition">
                {c}
              </div>
            </Link>
          ))}

        </div>

      </section>

      {/* TRENDING */}
      <section className="max-w-7xl mx-auto px-4 py-10">

        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          Trending
        </h2>

        <ProductCarousel/>

      </section>

    </div>

  )
}