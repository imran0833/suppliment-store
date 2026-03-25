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

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/product/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (res.ok) {
      alert("Product Added ✅");
      setForm({
        name: "",
        category: "",
        price: "",
        stock: "",
        image: "",
        description: ""
      });
    } else {
      alert(data.message || "Error");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

      <div className="bg-white shadow-xl rounded-2xl w-full max-w-2xl p-8">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Add New Product 🚀
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Product Name */}
          <input
            value={form.name}
            placeholder="Product Name"
            className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-black"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          {/* Category */}
          <select
            value={form.category}
            className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-black"
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            required
          >
            <option value="">Select Category</option>
            <option value="protein">Protein</option>
            <option value="creatine">Creatine</option>
            <option value="mass">Mass Gainer</option>
            <option value="preworkout">Pre Workout</option>
          </select>

          {/* Price */}
          <input
            value={form.price}
            placeholder="Price ₹"
            type="number"
            className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-black"
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
          />

          {/* Stock */}
          <input
            value={form.stock}
            placeholder="Stock"
            type="number"
            className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-black"
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
            required
          />

          {/* Image */}
          <input
            value={form.image}
            placeholder="Image URL"
            className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-black"
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            required
          />

          {/* Description */}
          <textarea
            value={form.description}
            placeholder="Description"
            className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-black"
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />

          {/* Button */}
          <button
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
          >
            {loading ? "Adding..." : "Add Product"}
          </button>

        </form>

      </div>

    </div>
  );
}