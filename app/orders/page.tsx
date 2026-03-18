"use client";

import { useEffect, useState } from "react";

export default function OrdersPage() {

  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/orders/user")
      .then((res) => res.json())
      .then((data) => {
        if (data.orders) {
          setOrders(data.orders);
        }
      });
  }, []);

  return (

    <div className="max-w-6xl mx-auto p-10">

      <h1 className="text-3xl font-bold mb-6">
        My Orders
      </h1>

      {orders.length === 0 && (
        <p>No orders found</p>
      )}

      <div className="space-y-6">

        {orders.map((order) => (

          <div
            key={order._id}
            className="border p-6 rounded-lg shadow"
          >

            <div className="flex justify-between mb-3">

              <p className="font-semibold">
                Order ID: {order._id}
              </p>

              <p className="text-gray-500">
                Payment: {order.paymentStatus}
              </p>

            </div>

            <div className="space-y-2">

              {order.products.map((p: any, i: number) => (

                <div
                  key={i}
                  className="flex justify-between border-b pb-1"
                >

                  <span>
                    {p.name} x {p.quantity}
                  </span>

                  <span>
                    ₹ {p.price * p.quantity}
                  </span>

                </div>

              ))}

            </div>

            <div className="mt-3 flex justify-between font-bold">

              <p>
                Tax: ₹ {order.tax}
              </p>

              <p>
                Total: ₹ {order.total}
              </p>

            </div>

            {/* Buttons Section */}

            <div className="mt-4 flex gap-6">

              <a
                href={`/orders/${order._id}`}
                className="text-blue-600 underline"
              >
                Track Order
              </a>

              <a
                href={`/api/invoice/${order._id}`}
                className="text-green-600 underline"
              >
                Download Invoice
              </a>

            </div>

          </div>

        ))}

      </div>

    </div>

  );
}