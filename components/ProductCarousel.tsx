"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductCarousel() {

  const [products,setProducts] = useState<any[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(()=>{

    fetch("/api/product/list")
    .then(res=>res.json())
    .then(data=>{
      if(data.products){
        setProducts(data.products)
      }
    })

  },[])


  /* AUTO SCROLL */

  useEffect(()=>{

    const interval = setInterval(()=>{

      if(!scrollRef.current) return;

      scrollRef.current.scrollBy({
        left:280,
        behavior:"smooth"
      })

      const maxScroll =
        scrollRef.current.scrollWidth -
        scrollRef.current.clientWidth;

      if(scrollRef.current.scrollLeft >= maxScroll-5){

        scrollRef.current.scrollTo({
          left:0,
          behavior:"smooth"
        })

      }

    },4000)

    return ()=>clearInterval(interval)

  },[])


  /* ARROWS */

  const scrollLeft = ()=>{
    scrollRef.current?.scrollBy({
      left:-300,
      behavior:"smooth"
    })
  }

  const scrollRight = ()=>{
    scrollRef.current?.scrollBy({
      left:300,
      behavior:"smooth"
    })
  }


  return(

    <div className="relative">

      {/* LEFT BUTTON */}

      <button
      onClick={scrollLeft}
      aria-label="Previous product"
      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow p-3 rounded-full hover:scale-110 transition"
      >
        <ChevronLeft size={26}/>
      </button>


      {/* RIGHT BUTTON */}

      <button
      onClick={scrollRight}
      aria-label="Next product"
      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow p-3 rounded-full hover:scale-110 transition"
      >
        <ChevronRight size={26}/>
      </button>


      {/* PRODUCT ROW */}

      <div
      ref={scrollRef}
      className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory px-8 py-4 cursor-grab active:cursor-grabbing"
      >

        {products.map((p:any)=>(

          <Link
          key={p._id}
          href={`/products/${p._id}`}
          className="min-w-[260px] snap-start"
          >

            <div className="bg-white rounded-xl shadow hover:shadow-2xl transition transform hover:-translate-y-1">

              <img
                  src={p.image ? p.image : "/no-image.png"}
className="w-full h-44 object-cover hover:scale-105 transition"
                />

              <div className="p-4">

                <h3 className="font-semibold text-lg">
                  {p.name}
                </h3>

                <p className="text-gray-500 text-sm">
                  {p.category}
                </p>

                <p className="font-bold mt-2">
                  ₹ {p.price}
                </p>

              </div>

            </div>

          </Link>

        ))}

      </div>

    </div>

  )

}