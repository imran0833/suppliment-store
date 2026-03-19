"use client";

import Link from "next/link";
import HeroSlider from "@/components/HeroSlider";
import ProductCarousel from "@/components/ProductCarousel";

export default function HomePage(){

  return(

    <div className="bg-gradient-to-b from-gray-50 to-white">

      {/* HERO */}
      <HeroSlider />

      {/* CATEGORY */}
      <section className="max-w-7xl mx-auto px-4 py-10">

        <h2 className="text-2xl md:text-4xl font-bold mb-8">
          Shop By Category
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

          {["💪 Protein","⚡ Creatine","🥤 Mass","🔥 Pre"].map((item)=>(
            <Link href="/products" key={item}>
              <div className="bg-white/70 backdrop-blur border p-5 rounded-2xl shadow hover:shadow-xl transition text-center">
                {item}
              </div>
            </Link>
          ))}

        </div>

      </section>

      {/* FEATURED */}
      <section className="bg-gray-100 px-4 py-10">

        <div className="max-w-7xl mx-auto">

          <h2 className="text-2xl md:text-4xl font-bold mb-8">
            Featured Supplements
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

            {[1,2,3,4].map((item)=>(
              <Link href="/products" key={item}>
                <div className="bg-white rounded-2xl shadow hover:shadow-xl transition p-3">

                  <img
                    src="https://images.unsplash.com/photo-1600180758890-6b94519a8ba5"
                    className="w-full h-32 md:h-44 object-cover rounded-xl"
                  />

                  <h3 className="mt-3 font-semibold text-sm md:text-base">
                    Whey Protein
                  </h3>

                  <p className="text-gray-500 text-xs">
                    Premium quality
                  </p>

                </div>
              </Link>
            ))}

          </div>

        </div>

      </section>

      {/* TRENDING */}
      <section className="max-w-7xl mx-auto px-4 py-10 overflow-hidden">

        <h2 className="text-2xl md:text-4xl font-bold mb-8">
          Trending Supplements
        </h2>

        <ProductCarousel/>

      </section>

      {/* WHY */}
      <section className="max-w-7xl mx-auto px-4 py-10">

        <h2 className="text-2xl md:text-4xl font-bold mb-8">
          Why Choose Us
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          <div className="bg-white p-6 rounded-2xl shadow text-center">
            🚚 Fast Delivery
          </div>

          <div className="bg-white p-6 rounded-2xl shadow text-center">
            ✅ Authentic Products
          </div>

          <div className="bg-white p-6 rounded-2xl shadow text-center">
            💳 Secure Payment
          </div>

        </div>

      </section>

    </div>

  )
}