"use client";

import { useEffect, useState } from "react";

export default function AdminProducts() {

  const [products,setProducts] = useState<any[]>([]);

  useEffect(()=>{

    fetch("/api/product/list")
    .then(res=>res.json())
    .then(data=>{
      if(data.products){
        setProducts(data.products)
      }
    })

  },[])

  return(

    <div className="max-w-7xl mx-auto p-10">

      <h1 className="text-3xl font-bold mb-6">
        All Products
      </h1>

      <table className="w-full border">

        <thead className="bg-gray-200">

          <tr>

            <th className="p-3 border">Image</th>
            <th className="p-3 border">Name</th>
            <th className="p-3 border">Category</th>
            <th className="p-3 border">Price</th>
            <th className="p-3 border">Stock</th>

          </tr>

        </thead>

        <tbody>

          {products.map((p:any)=>(

            <tr key={p._id}>

              <td className="border p-2">
                <img
                src={p.image}
                className="w-16 h-16 object-cover"
                />
              </td>

              <td className="border p-2">
                {p.name}
              </td>

              <td className="border p-2">
                {p.category}
              </td>

              <td className="border p-2">
                ₹ {p.price}
              </td>

              <td className="border p-2">
                {p.stock}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  )

}