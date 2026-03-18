"use client";

import ProductCard from "./ProductCard";

export default function ProductGrid({ products }: any) {

  if(!products || products.length === 0){
    return <p>No products found</p>;
  }

  return (

    <div className="grid grid-cols-4 gap-6">

      {products.map((product:any)=>(
        <ProductCard
          key={product._id}
          product={product}
        />
      ))}

    </div>

  );

}