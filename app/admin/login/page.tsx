"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminLogin(){

  const router = useRouter();

  const { data: session, status } = useSession();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [loading,setLoading] = useState(false);

  // 🔥 Already logged in → direct dashboard
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/admin/dashboard");
    }
  }, [status]);

  const handleLogin = async (e:any) => {
    e.preventDefault();
    setLoading(true);

    const res = await signIn("credentials",{
      redirect:false,
      email,
      password,
      callbackUrl: "/admin/dashboard" // ✅ best practice
    });

    console.log("LOGIN RESPONSE 🔥", res);

    if(res?.ok){
      router.push(res.url || "/admin/dashboard");
    }else{
      alert("Invalid email or password");
    }

    setLoading(false);
  };

  return(
    <div className="flex items-center justify-center h-screen bg-gray-100">

      <form 
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-xl shadow w-80"
      >

        <h1 className="text-xl font-bold mb-4 text-center">
          Admin Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="border p-2 w-full mb-3 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded"
        >
          {loading ? "Logging..." : "Login"}
        </button>

      </form>

    </div>
  )
}