"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function CheckoutPage() {

  const { data: session } = useSession();

  const [cart, setCart] = useState<any[]>([]);
  const [country, setCountry] = useState("India");

  const [name,setName] = useState("");
  const [phone,setPhone] = useState("");
  const [address,setAddress] = useState("");
  const [city,setCity] = useState("");

  // 🔥 Load cart
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  // 🔥 Total
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // 🔒 LOGIN CHECK (MOST IMPORTANT)
  if (!session) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-2xl font-bold mb-4">
          Please Login First 🔒
        </h1>

        <a
          href="/login"
          className="bg-black text-white px-6 py-3 rounded"
        >
          Go to Login
        </a>
      </div>
    );
  }

  // 🛒 EMPTY CART CHECK
  if (cart.length === 0) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-2xl font-bold mb-4">
          Your Cart is Empty 🛒
        </h1>

        <a
          href="/products"
          className="bg-black text-white px-6 py-3 rounded"
        >
          Shop Now
        </a>
      </div>
    );
  }

  // 🚀 PLACE ORDER
  const placeOrder = async () => {

    if(!name || !phone || !address || !city){
      alert("Please fill all details");
      return;
    }

    const orderData = {
      userId: session.user?.email, // ✅ FIXED
      products: cart,
      total,
      country,
      name,
      phone,
      address,
      city
    };

    const res = await fetch("/api/order/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(orderData)
    });

    const data = await res.json();

    if (data.order) {

      alert("Order placed successfully ✅");

      localStorage.removeItem("cart");

      window.location.href = "/orders";
    } else {
      alert("Something went wrong ❌");
    }

  };

  return (

    <div className="max-w-7xl mx-auto p-10">

      <h1 className="text-3xl font-bold mb-8">
        Checkout
      </h1>

      <div className="grid grid-cols-3 gap-10">

        {/* LEFT SIDE FORM */}

        <div className="col-span-2 border p-6 rounded shadow">

          <h2 className="text-xl font-semibold mb-6">
            Shipping Details
          </h2>

          <div className="grid grid-cols-2 gap-4">

            <input
              type="text"
              placeholder="Full Name"
              className="border p-3 rounded"
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Phone Number"
              className="border p-3 rounded"
              value={phone}
              onChange={(e)=>setPhone(e.target.value)}
            />

          </div>

          <textarea
            placeholder="Full Address"
            className="border p-3 rounded w-full mt-4"
            value={address}
            onChange={(e)=>setAddress(e.target.value)}
          />

          <div className="grid grid-cols-2 gap-4 mt-4">

            <input
              type="text"
              placeholder="City"
              className="border p-3 rounded"
              value={city}
              onChange={(e)=>setCity(e.target.value)}
            />

            <select
              className="border p-3 rounded"
              value={country}
              onChange={(e)=>setCountry(e.target.value)}
            >
              <option>India</option>
              <option>USA</option>
              <option>UAE</option>
              <option>UK</option>
            </select>

          </div>

        </div>


        {/* ORDER SUMMARY */}

        <div className="border p-6 rounded shadow h-fit">

          <h2 className="text-xl font-semibold mb-4">
            Order Summary
          </h2>

          {cart.map((item) => (

            <div
              key={item._id}
              className="flex justify-between border-b py-2"
            >

              <span className="text-gray-700">
                {item.name} x {item.quantity}
              </span>

              <span className="font-medium">
                ₹ {item.price * item.quantity}
              </span>

            </div>

          ))}

          <div className="flex justify-between mt-4 text-lg font-bold">

            <span>Total</span>

            <span>₹ {total}</span>

          </div>

          <button
            onClick={placeOrder}
            className="bg-black text-white w-full py-3 rounded mt-6 hover:bg-gray-800"
          >
            Place Order
          </button>

        </div>

      </div>

    </div>

  );
}