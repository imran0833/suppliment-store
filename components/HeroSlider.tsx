"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function HeroSlider(){

  const slides = [

    {
      image:"https://images.unsplash.com/photo-1599058917212-d750089bc07e",
      title:"Build Your Perfect Body",
      text:"Premium supplements for muscle growth",
    },

    {
      image:"https://images.unsplash.com/photo-1605296867304-46d5465a13f1",
      title:"Increase Your Strength",
      text:"Creatine and performance boosters",
    },

    {
      image:"https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b",
      title:"Boost Your Energy",
      text:"Pre workout supplements",
    }

  ];

  const [index,setIndex] = useState(0);

  useEffect(()=>{

    const timer = setInterval(()=>{
      setIndex((prev)=> (prev + 1) % slides.length)
    },3000)

    return ()=>clearInterval(timer)

  },[])

  const next = () =>{
    setIndex((index + 1) % slides.length)
  }

  const prev = () =>{
    setIndex(index === 0 ? slides.length - 1 : index - 1)
  }

  const slide = slides[index];

  return(

    <div className="relative overflow-hidden bg-black text-white">

      <AnimatePresence mode="wait">

        <motion.div
        key={index}
        initial={{opacity:0, y:40}}
        animate={{opacity:1, y:0}}
        exit={{opacity:0, y:-40}}
        transition={{duration:0.6}}
        className="max-w-7xl mx-auto grid grid-cols-2 items-center p-16"
        >

          {/* Text */}

          <div>

            <motion.h1
            initial={{opacity:0, x:-50}}
            animate={{opacity:1, x:0}}
            transition={{delay:0.2}}
            className="text-5xl font-bold"
            >
              {slide.title}
            </motion.h1>

            <motion.p
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{delay:0.4}}
            className="mt-4 text-gray-300"
            >
              {slide.text}
            </motion.p>

            <motion.div
            initial={{scale:0.8}}
            animate={{scale:1}}
            transition={{delay:0.6}}
            >

              <Link
              href="/products"
              className="inline-block mt-6 bg-white text-black px-6 py-3 rounded font-semibold hover:bg-gray-200"
              >
                Shop Now
              </Link>

            </motion.div>

          </div>


          {/* Image */}

          <motion.div
          initial={{scale:0.9}}
          animate={{scale:1}}
          transition={{duration:0.8}}
          >

            <img
            src={slide.image}
            className="rounded-lg h-96 w-full object-cover"
            />

          </motion.div>

        </motion.div>

      </AnimatePresence>


      {/* Arrows */}

      <button
      onClick={prev}
      className="absolute left-6 top-1/2 -translate-y-1/2 text-3xl"
      >
        ◀
      </button>

      <button
      onClick={next}
      className="absolute right-6 top-1/2 -translate-y-1/2 text-3xl"
      >
        ▶
      </button>


      {/* Dots */}

      <div className="absolute bottom-6 w-full flex justify-center gap-3">

        {slides.map((_,i)=>(

          <div
          key={i}
          onClick={()=>setIndex(i)}
          className={`w-3 h-3 rounded-full cursor-pointer ${
            i === index ? "bg-white" : "bg-gray-500"
          }`}
          />

        ))}

      </div>

    </div>

  )

}