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

      <section className="max-w-7xl mx-auto p-12">

        <h2 className="text-3xl font-bold mb-8">
          Shop By Category
        </h2>

        <div className="grid grid-cols-4 gap-6">

          <Link href="/products">
            <div className="border p-6 rounded shadow hover:shadow-lg text-center">
              💪 Protein
            </div>
          </Link>

          <Link href="/products">
            <div className="border p-6 rounded shadow hover:shadow-lg text-center">
              ⚡ Creatine
            </div>
          </Link>

          <Link href="/products">
            <div className="border p-6 rounded shadow hover:shadow-lg text-center">
              🥤 Mass Gainer
            </div>
          </Link>

          <Link href="/products">
            <div className="border p-6 rounded shadow hover:shadow-lg text-center">
              🔥 Pre Workout
            </div>
          </Link>

        </div>

      </section>



      {/* FEATURED PRODUCTS */}

      <section className="bg-gray-100 p-12">

        <div className="max-w-7xl mx-auto">

          <h2 className="text-3xl font-bold mb-8">
            Featured Supplements
          </h2>

          <div className="grid grid-cols-4 gap-6">

            <Link href="/products">
              <div className="border p-4 rounded bg-white shadow hover:shadow-lg">

                <img
                src="https://images.unsplash.com/photo-1600180758890-6b94519a8ba5"
                className="w-full h-40 object-cover"
                />

                <h3 className="font-semibold mt-3">
                  Whey Protein
                </h3>

                <p className="text-gray-500">
                  Premium quality
                </p>

              </div>
            </Link>

            <Link href="/products">
              <div className="border p-4 rounded bg-white shadow hover:shadow-lg">

                <img
                src="https://images.unsplash.com/photo-1605296867304-46d5465a13f1"
                className="w-full h-40 object-cover"
                />

                <h3 className="font-semibold mt-3">
                  Creatine
                </h3>

                <p className="text-gray-500">
                  Strength booster
                </p>

              </div>
            </Link>

            <Link href="/products">
              <div className="border p-4 rounded bg-white shadow hover:shadow-lg">

                <img
                src="https://images.unsplash.com/photo-1594737625785-cb8b6b5b06b3"
                className="w-full h-40 object-cover"
                />

                <h3 className="font-semibold mt-3">
                  Mass Gainer
                </h3>

                <p className="text-gray-500">
                  Weight gain
                </p>

              </div>
            </Link>

            <Link href="/products">
              <div className="border p-4 rounded bg-white shadow hover:shadow-lg">

                <img
                src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b"
                className="w-full h-40 object-cover"
                />

                <h3 className="font-semibold mt-3">
                  Pre Workout
                </h3>

                <p className="text-gray-500">
                  Energy booster
                </p>

              </div>
            </Link>

          </div>

        </div>

      </section>

{/* TRENDING PRODUCTS */}

<section className="max-w-7xl mx-auto p-12">

  <h2 className="text-3xl font-bold mb-8">
    Trending Supplements
  </h2>

  <ProductCarousel/>

</section>

      {/* WHY CHOOSE US */}

      <section className="max-w-7xl mx-auto p-12">

        <h2 className="text-3xl font-bold mb-8">
          Why Choose Us
        </h2>

        <div className="grid grid-cols-3 gap-8">

          <div className="border p-6 rounded shadow text-center">
            🚚 Fast Delivery
          </div>

          <div className="border p-6 rounded shadow text-center">
            ✅ 100% Authentic Supplements
          </div>

          <div className="border p-6 rounded shadow text-center">
            💳 Secure Payments
          </div>

        </div>

      </section>

    </div>

  )

}