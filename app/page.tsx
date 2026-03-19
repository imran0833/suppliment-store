"use client";

import Link from "next/link";
import HeroSlider from "@/components/HeroSlider";
import ProductCarousel from "@/components/ProductCarousel";

export default function HomePage(){

  return(

    <div>

      {/* HERO SECTION */}
      <HeroSlider />

      {/* CATEGORY SECTION */}
      <section className="max-w-7xl mx-auto px-4 py-8 md:p-12">

        <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">
          Shop By Category
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">

          <Link href="/products">
            <div className="border p-4 md:p-6 rounded shadow hover:shadow-lg text-center">
              💪 Protein
            </div>
          </Link>

          <Link href="/products">
            <div className="border p-4 md:p-6 rounded shadow hover:shadow-lg text-center">
              ⚡ Creatine
            </div>
          </Link>

          <Link href="/products">
            <div className="border p-4 md:p-6 rounded shadow hover:shadow-lg text-center">
              🥤 Mass Gainer
            </div>
          </Link>

          <Link href="/products">
            <div className="border p-4 md:p-6 rounded shadow hover:shadow-lg text-center">
              🔥 Pre Workout
            </div>
          </Link>

        </div>

      </section>

      {/* FEATURED PRODUCTS */}
      <section className="bg-gray-100 px-4 py-8 md:p-12">

        <div className="max-w-7xl mx-auto">

          <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">
            Featured Supplements
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">

            {[1,2,3,4].map((item)=>(
              <Link href="/products" key={item}>
                <div className="border p-3 md:p-4 rounded bg-white shadow hover:shadow-lg">

                  <img
                    src="https://images.unsplash.com/photo-1600180758890-6b94519a8ba5"
                    className="w-full h-32 md:h-40 object-cover"
                  />

                  <h3 className="font-semibold mt-2 md:mt-3 text-sm md:text-base">
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
      <section className="max-w-7xl mx-auto px-4 py-8 md:p-12">

        <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">
          Trending Supplements
        </h2>

        <ProductCarousel/>

      </section>

      {/* WHY CHOOSE US */}
      <section className="max-w-7xl mx-auto px-4 py-8 md:p-12">

        <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">
          Why Choose Us
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">

          <div className="border p-4 md:p-6 rounded shadow text-center">
            🚚 Fast Delivery
          </div>

          <div className="border p-4 md:p-6 rounded shadow text-center">
            ✅ 100% Authentic Supplements
          </div>

          <div className="border p-4 md:p-6 rounded shadow text-center">
            💳 Secure Payments
          </div>

        </div>

      </section>

    </div>

  )
}