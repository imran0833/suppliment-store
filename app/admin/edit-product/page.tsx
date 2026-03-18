"use client";

import { useState } from "react";

export default function EditProduct() {

  const [form,setForm] = useState({
    id:"",
    name:"",
    price:"",
    category:"",
    stock:"",
    image:""
  });

  const handleChange = (e:any)=>{
    setForm({
      ...form,
      [e.target.name]:e.target.value
    })
  }

  const updateProduct = async()=>{

    const res = await fetch("/api/product/update",{
      method:"POST",
      body:JSON.stringify(form)
    })

    const data = await res.json();

    alert(data.message)

  }

  return(

    <div className="max-w-xl mx-auto p-10">

      <h1 className="text-3xl font-bold mb-6">
        Edit Product
      </h1>

      <div className="space-y-4">

        <input
        name="id"
        placeholder="Product ID"
        onChange={handleChange}
        className="border p-2 w-full"
        />

        <input
        name="name"
        placeholder="Product Name"
        onChange={handleChange}
        className="border p-2 w-full"
        />

        <input
        name="price"
        placeholder="Price"
        onChange={handleChange}
        className="border p-2 w-full"
        />

        <input
        name="category"
        placeholder="Category"
        onChange={handleChange}
        className="border p-2 w-full"
        />

        <input
        name="stock"
        placeholder="Stock"
        onChange={handleChange}
        className="border p-2 w-full"
        />

        <input
        name="image"
        placeholder="Image URL"
        onChange={handleChange}
        className="border p-2 w-full"
        />

        <button
        onClick={updateProduct}
        className="bg-black text-white px-4 py-2 rounded"
        >
          Update Product
        </button>

      </div>

    </div>

  )

}