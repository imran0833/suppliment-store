"use client";

import { useEffect, useState } from "react";
import { getCart } from "@/utils/cart";
import CartItem from "@/components/CartItem";

export default function CartPage() {

  const [cart, setCart] = useState<any[]>([]);

  const loadCart = () => {
    setCart(getCart());
  };

  useEffect(() => {
    loadCart();
  }, []);

  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  return (

    <div className="max-w-5xl mx-auto p-10">

      <h1 className="text-3xl font-bold mb-6">
        Your Cart
      </h1>

      <div className="space-y-4">

        {cart.length === 0 && (
          <p>Your cart is empty</p>
        )}

        {cart.map((item) => (
          <CartItem
            key={item._id}
            item={item}
            refresh={loadCart}
          />
        ))}

      </div>

      {cart.length > 0 && (

        <div className="mt-6 border p-6 rounded">

          <h2 className="text-xl font-bold">
            Total: ₹ {total}
          </h2>

          <button
onClick={()=>window.location.href="/checkout"}
className="bg-black text-white px-6 py-3 mt-4 rounded"
>
Checkout
</button>

        </div>

      )}

    </div>

  );
}