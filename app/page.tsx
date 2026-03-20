"use client";

import Link from "next/link";
import HeroSlider from "@/components/HeroSlider";
import ProductCarousel from "@/components/ProductCarousel";

export default function HomePage() {
  return (
    <div className="pb-20">

      {/* HERO */}
      <HeroSlider />

      {/* CATEGORY */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-6">Shop By Category</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {["Protein","Creatine","Mass Gainer","Pre Workout"].map((item)=>(
            <Link href="/products" key={item}>
              <div className="bg-white p-5 rounded-2xl shadow hover:shadow-xl text-center transition">
                {item}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="bg-gray-100 py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Featured Supplements</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1,2,3,4].map((item)=>(
              <div key={item} className="bg-white p-3 rounded-2xl shadow">
                <img
                  src="https://images.unsplash.com/photo-1600180758890-6b94519a8ba5"
                  className="w-full h-40 object-cover rounded-xl"
                />
                <h3 className="mt-2 font-semibold">Whey Protein</h3>
                <p className="text-gray-500 text-sm">Premium</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRENDING */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-6">Trending</h2>
        <ProductCarousel />
      </section>

      {/* WHY CHOOSE US (BACK) */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-6">Why Choose Us</h2>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-xl shadow text-center">
            🚚 Fast Delivery
          </div>
          <div className="bg-white p-5 rounded-xl shadow text-center">
            ✅ Authentic Products
          </div>
          <div className="bg-white p-5 rounded-xl shadow text-center">
            💳 Secure Payment
          </div>
        </div>
      </section>

    </div>
  );
}