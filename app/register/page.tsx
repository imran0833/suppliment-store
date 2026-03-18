"use client";

import { useState } from "react";

export default function Register() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const submit = async () => {

    if (!form.name || !form.email || !form.password) {
      alert("All fields required");
      return;
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (res.ok) {
      alert("Account created ✅");
      window.location.href = "/login";
    } else {
      alert(data.error || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">

      <div className="w-96 p-6 border rounded shadow">

        <h1 className="text-2xl font-bold mb-4">
          Register
        </h1>

        <input
          placeholder="Name"
          className="border p-2 w-full mb-3"
          onChange={(e)=>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          placeholder="Email"
          className="border p-2 w-full mb-3"
          onChange={(e)=>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          placeholder="Password"
          type="password"
          className="border p-2 w-full mb-3"
          onChange={(e)=>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button
          onClick={submit}
          className="bg-black text-white w-full p-2 rounded"
        >
          Register
        </button>

        {/* 👇 NEW PART */}
        <p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-600 cursor-pointer"
          >
            Login
          </a>
        </p>

      </div>
    </div>
  );
}