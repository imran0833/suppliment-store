"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function SearchBar(){

  const [query,setQuery] = useState("");
  const [products,setProducts] = useState<any[]>([]);
  const [results,setResults] = useState<any[]>([]);

  useEffect(()=>{

    fetch("/api/product/list")
    .then(res=>res.json())
    .then(data=>{
      if(data.products){
        setProducts(data.products);
      }
    })

  },[]);


  useEffect(()=>{

    if(!query){
      setResults([]);
      return;
    }

    const filtered = products.filter((p:any)=>
      p.name.toLowerCase().includes(query.toLowerCase())
    );

    setResults(filtered.slice(0,5));

  },[query,products]);


  return(

    <div className="relative w-96">

      <input
      type="text"
      placeholder="Search supplements..."
      value={query}
      onChange={(e)=>setQuery(e.target.value)}
      className="border p-2 w-full rounded"
      />

      {results.length > 0 && (

        <div className="absolute bg-white border w-full mt-1 rounded shadow z-50">

          {results.map((p:any)=>(

            <Link
            key={p._id}
            href={`/products/${p._id}`}
            className="flex items-center gap-3 p-2 hover:bg-gray-100"
            >

              <img
              src={p.image}
              className="w-10 h-10 object-cover"
              />

              <span>
                {p.name}
              </span>

            </Link>

          ))}

        </div>

      )}

    </div>

  )

}