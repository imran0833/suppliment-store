"use client";

import { useEffect, useState } from "react";

export default function AdminOrdersPage() {

  const [orders, setOrders] = useState<any[]>([]);

  const loadOrders = () => {
    fetch("/api/order/list")
      .then(res => res.json())
      .then(data => setOrders(data.orders || []));
  };

  useEffect(() => {
    loadOrders();
  }, []);

  // ✅ STATUS UPDATE FUNCTION
  const updateStatus = async (id: string, status: string) => {

    await fetch("/api/order/update-status", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id, status })
    });

    alert("Status Updated ✅");

    loadOrders(); // 🔥 reload without refresh
  };

  return (

    <div className="max-w-6xl mx-auto p-10">

      <h1 className="text-3xl font-bold mb-6">
        Manage Orders
      </h1>

      {orders.length === 0 && (
        <p>No orders found</p>
      )}

      {orders.map((order) => (

        <div
          key={order._id}
          className="border p-6 mb-4 rounded"
        >

          <p>
            <b>Order ID:</b> {order._id}
          </p>

          <p>
            <b>Total:</b> ₹ {order.total}
          </p>

          <p>
            <b>Country:</b> {order.country}
          </p>

          {/* ✅ STATUS COLOR */}
          <p className={`font-bold
            ${order.status === "Placed" && "text-gray-500"}
            ${order.status === "Processing" && "text-yellow-500"}
            ${order.status === "Shipped" && "text-blue-500"}
            ${order.status === "Delivered" && "text-green-600"}
          `}>
            Status: {order.status}
          </p>

          <div className="mt-3">

            {order.products.map((p:any) => (
              <p key={p._id}>
                {p.name} × {p.quantity}
              </p>
            ))}

          </div>

          {/* ✅ STATUS BUTTONS */}
          <div className="flex gap-2 mt-4">

            <button
              onClick={() => updateStatus(order._id, "Processing")}
              className="bg-yellow-500 text-white px-3 py-1 rounded"
            >
              Processing
            </button>

            <button
              onClick={() => updateStatus(order._id, "Shipped")}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              Shipped
            </button>

            <button
              onClick={() => updateStatus(order._id, "Delivered")}
              className="bg-green-600 text-white px-3 py-1 rounded"
            >
              Delivered
            </button>

          </div>

        </div>

      ))}

    </div>

  );

}