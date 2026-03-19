"use client";

import ProductCard from "./ProductCard";

export default function ProductCarousel(){

  const products = [
    {
      id:1,
      name:"Whey Protein",
      desc:"Muscle gain",
      price:1999,
      image:"https://images.unsplash.com/photo-1600180758890-6b94519a8ba5"
    },
    {
      id:2,
      name:"Creatine",
      desc:"Strength boost",
      price:999,
      image:"https://images.unsplash.com/photo-1594737625785-a6cbdabd333c"
    },
    {
      id:3,
      name:"Mass Gainer",
      desc:"Weight gain",
      price:2499,
      image:"https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b"
    },
  ];

  return(

    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">

      {products.map((p)=>(
        <div key={p.id} className="min-w-[200px]">
          <ProductCard product={p}/>
        </div>
      ))}

    </div>
  )
}