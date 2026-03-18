"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ProductDetails() {

  const params = useParams();
  const id = params.id;

  const [product,setProduct] = useState<any>(null);

  useEffect(()=>{

    if(!id) return;

    const loadProduct = async () => {

      const res = await fetch(`/api/product/${id}`);
      const data = await res.json();

      setProduct(data.product);

    };

    loadProduct();

  },[id]);

  const addToCart = () => {

    let cart:any = localStorage.getItem("cart");

    cart = cart ? JSON.parse(cart) : [];

    cart.push(product);

    localStorage.setItem("cart",JSON.stringify(cart));

    alert("Product Added To Cart");

  }

  if(!product){
    return <p className="p-10 text-xl">Loading...</p>
  }

  return(

    <div className="max-w-6xl mx-auto p-10 grid grid-cols-2 gap-10">

      <img
      src={product.image}
      className="w-full h-96 object-cover"
      />

      <div>

        <h1 className="text-3xl font-bold">
          {product.name}
        </h1>
        <p className="text-yellow-500">
              {"⭐".repeat(Math.round(product.rating))}
            </p>

        <p className="text-gray-500 mt-2">
          {product.category}
        </p>

        <p className="text-xl font-bold mt-4">
          ₹ {product.price}
        </p>

        <p className="mt-4">
          {product.description}
        </p>

        <button
        onClick={addToCart}
        className="mt-6 bg-black text-white px-6 py-3 rounded"
        >
          Add To Cart
        </button>

      </div>

    </div>

  )

}