"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function ProductDetails() {

  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();

  const id = params?.id as string;

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (!id) return;

    const loadProduct = async () => {
      try {
        const res = await fetch(`/api/product/${id}`);
        const data = await res.json();
        setProduct(data.product);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();

  }, [id]);

  // ✅ ADD TO CART
  const addToCart = () => {

    if (!session) {
      alert("Please login first");
      router.push("/login");
      return;
    }

    let cart: any = localStorage.getItem("cart");
    cart = cart ? JSON.parse(cart) : [];

    const index = cart.findIndex((item: any) => item._id === product._id);

    if (index > -1) {
      cart[index].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Product Added To Cart");
  };

  // ✅ LOADING
  if (loading) {
    return <p className="p-6 text-lg">Loading...</p>;
  }

  // ❌ NOT FOUND
  if (!product) {
    return <p className="p-6 text-red-500">Product not found</p>;
  }

  return (

    <div className="max-w-7xl mx-auto px-4 py-8">

      <div className="grid md:grid-cols-2 gap-6">

        {/* IMAGE */}
        <div className="bg-white p-4 rounded-xl shadow">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-72 md:h-[400px] object-cover rounded-lg"
          />
        </div>

        {/* DETAILS */}
        <div>

          <h1 className="text-2xl md:text-3xl font-bold">
            {product.name}
          </h1>

          <p className="text-yellow-500 mt-2">
            {"⭐".repeat(Math.round(product.rating || 4))}
          </p>

          <p className="text-gray-500 mt-2">
            {product.category}
          </p>

          <p className="text-xl font-bold mt-4">
            ₹ {product.price}
          </p>

          <p className="mt-4 text-gray-700">
            {product.description}
          </p>

          <button
            onClick={addToCart}
            className="mt-6 bg-black text-white px-6 py-3 rounded-lg w-full md:w-auto"
          >
            Add To Cart
          </button>

        </div>

      </div>

    </div>
  );
}