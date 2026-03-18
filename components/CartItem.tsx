"use client";

import { getCart, saveCart, removeFromCart } from "@/utils/cart";

export default function CartItem({ item, refresh }: any) {

  const increase = () => {

    let cart = getCart();

    const product = cart.find((p:any)=>p._id === item._id);

    product.quantity += 1;

    saveCart(cart);

    refresh();

  };

  const decrease = () => {

    let cart = getCart();

    const product = cart.find((p:any)=>p._id === item._id);

    if(product.quantity > 1){
      product.quantity -= 1;
    }

    saveCart(cart);

    refresh();

  };

  const removeItem = () => {

    removeFromCart(item._id);

    refresh();

  };

  return(

    <div className="flex justify-between items-center border p-4 rounded">

      <div className="flex gap-4 items-center">

        <img
        src={item.image}
        className="w-16 h-16 object-cover rounded"
        />

        <div>

          <h2 className="font-bold">
            {item.name}
          </h2>

          <p>
            ₹ {item.price}
          </p>

        </div>

      </div>

      <div className="flex items-center gap-3">

        <button
        onClick={decrease}
        className="px-3 border"
        >
          -
        </button>

        <span>
          {item.quantity}
        </span>

        <button
        onClick={increase}
        className="px-3 border"
        >
          +
        </button>

      </div>

      <button
      onClick={removeItem}
      className="text-red-500"
      >
        Remove
      </button>

    </div>

  )

}