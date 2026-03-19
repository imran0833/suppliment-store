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
      <section className="max-w-7xl mx-auto px-4 py-10 md:py-14">

        <h2 className="text-2xl md:text-4xl font-bold mb-8">
          Shop By Category
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-5 md:gap-8">

          {[
            {name:"Protein",icon:"💪"},
            {name:"Creatine",icon:"⚡"},
            {name:"Mass Gainer",icon:"🥤"},
            {name:"Pre Workout",icon:"🔥"}
          ].map((cat)=>(
            <Link href="/products" key={cat.name}>
              <div className="bg-white/70 backdrop-blur-lg border border-gray-200 p-5 md:p-6 rounded-2xl shadow-sm hover:shadow-2xl transition duration-300 text-center group">

                <div className="text-2xl md:text-4xl mb-2 group-hover:scale-110 transition">
                  {cat.icon}
                </div>

                <p className="font-semibold text-sm md:text-base">
                  {cat.name}
                </p>

              </div>
            </Link>
          ))}

        </div>

      </section>

      {/* FEATURED */}
      <section className="bg-gray-100/60 backdrop-blur px-4 py-10 md:py-14">

        <div className="max-w-7xl mx-auto">

          <h2 className="text-2xl md:text-4xl font-bold mb-8">
            Featured Supplements
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-5 md:gap-8">

            {[1,2,3,4].map((item)=>(
              <Link href="/products" key={item}>
                <div className="bg-white rounded-2xl shadow-sm hover:shadow-2xl transition duration-300 p-3 md:p-4 group">

                  <div className="overflow-hidden rounded-xl">
                    <img
                      src="https://images.unsplash.com/photo-1600180758890-6b94519a8ba5"
                      className="w-full h-32 md:h-44 object-cover group-hover:scale-110 transition duration-500"
                    />
                  </div>

                  <h3 className="font-semibold mt-3 text-sm md:text-base group-hover:text-blue-600">
                    Whey Protein
                  </h3>

                  <p className="text-gray-500 text-xs md:text-sm">
                    Premium quality
                  </p>

                </div>
              </Link>
            ))}

          </div>

        </div>

      </section>

      {/* TRENDING */}
      <section className="max-w-7xl mx-auto px-4 py-10 md:py-14 overflow-hidden">

        <h2 className="text-2xl md:text-4xl font-bold mb-8">
          Trending Supplements
        </h2>

        <div className="relative">
          <ProductCarousel/>
        </div>

      </section>

      {/* WHY CHOOSE US */}
      <section className="max-w-7xl mx-auto px-4 py-10 md:py-14">

        <h2 className="text-2xl md:text-4xl font-bold mb-8">
          Why Choose Us
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-8">

          <div className="bg-white border rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-xl transition text-center">
            <div className="text-3xl mb-2">🚚</div>
            <p className="font-semibold">Fast Delivery</p>
          </div>

          <div className="bg-white border rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-xl transition text-center">
            <div className="text-3xl mb-2">✅</div>
            <p className="font-semibold">100% Authentic Supplements</p>
          </div>

          <div className="bg-white border rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-xl transition text-center">
            <div className="text-3xl mb-2">💳</div>
            <p className="font-semibold">Secure Payments</p>
          </div>

        </div>

      </section>

    </div>

  )
}