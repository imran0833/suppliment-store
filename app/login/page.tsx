"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleLogin = async () => {

    const res = await signIn("credentials",{
      email,
      password,
      redirect: false
    });

    if(res?.ok){
      alert("Login Success ✅");
      window.location.href = "/";
    } else {
      alert("Invalid Credentials ❌");
    }
  };

  return(

    <div className="flex items-center justify-center h-screen">

      <div className="border p-8 rounded w-80 shadow">

        <h1 className="text-2xl font-bold mb-4">
          Login
        </h1>

        <input
          placeholder="Email"
          className="border p-2 w-full mb-3"
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-3"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-black text-white w-full py-2 rounded"
        >
          Login
        </button>

        {/* 👇 NEW PART */}
        <p className="text-sm mt-4 text-center">
          New user?{" "}
          <a
            href="/register"
            className="text-blue-600 cursor-pointer"
          >
            Create Account
          </a>
        </p>

      </div>

    </div>

  );
}