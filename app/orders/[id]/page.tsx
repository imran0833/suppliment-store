"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function OrderTracking() {

  const params = useParams();
  const id = params.id;

  const [order, setOrder] = useState<any>(null);

  useEffect(() => {

    fetch(`/api/orders/${id}`)
      .then(res => res.json())
      .then(data => {
        setOrder(data.order);
      });

  }, [id]);

  if (!order) {
    return <p className="p-10">Loading...</p>;
  }

  return (

    <div className="max-w-5xl mx-auto p-10">

      <h1 className="text-3xl font-bold mb-6">
        Order Tracking
      </h1>

      <div className="border p-6 rounded-lg shadow">

        <p className="mb-3">
          <b>Order ID:</b> {order._id}
        </p>

        <p className="mb-3">
          <b>Payment Status:</b> {order.paymentStatus}
        </p>

        <p className="mb-3">
          <b>Shipping Status:</b> {order.shippingStatus || "Processing"}
        </p>

        <p className="mb-3">
          <b>Tracking ID:</b> {order.trackingId || "Not generated"}
        </p>

      </div>

    </div>

  );
}