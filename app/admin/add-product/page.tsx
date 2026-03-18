"use client";

import { useState } from "react";

export default function AddProductPage() {

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    image: "",
    description: ""
  });

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    const res = await fetch("/api/product/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    alert(data.message);
  };

  return (

    <div className="max-w-3xl mx-auto p-10">

      <h1 className="text-3xl font-bold mb-6">
        Add Product
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          placeholder="Product Name"
          className="border p-2 w-full"
          onChange={(e)=>setForm({...form,name:e.target.value})}
        />

        <input
          placeholder="Category"
          className="border p-2 w-full"
          onChange={(e)=>setForm({...form,category:e.target.value})}
        />

        <input
          placeholder="Price"
          className="border p-2 w-full"
          onChange={(e)=>setForm({...form,price:e.target.value})}
        />

        <input
          placeholder="Stock"
          className="border p-2 w-full"
          onChange={(e)=>setForm({...form,stock:e.target.value})}
        />

        <input
          placeholder="Image URL"
          className="border p-2 w-full"
          onChange={(e)=>setForm({...form,image:e.target.value})}
        />

        <textarea
          placeholder="Description"
          className="border p-2 w-full"
          onChange={(e)=>setForm({...form,description:e.target.value})}
        />

        <button className="bg-black text-white px-6 py-2 rounded">
          Add Product
        </button>

      </form>

    </div>

  );
}