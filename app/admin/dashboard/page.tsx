"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminDashboard() {

  const router = useRouter();

  const [stats, setStats] = useState({
    sales: 0,
    orders: 0,
    products: 0,
    users: 0
  });

  useEffect(() => {

    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      router.push("/login");
      return;
    }

    const user = JSON.parse(storedUser);

    if (user.role !== "admin") {
      router.push("/login");
      return;
    }

    fetch("/api/admin/stats")
      .then(res => res.json())
      .then(data => {
        if (data) {
          setStats(data);
        }
      });

  }, []);

  const logout = () => {

    localStorage.removeItem("user");

    router.push("/login");

  };

  return (

    <div className="min-h-screen bg-gray-100">

      {/* Top Bar */}

      <div className="flex justify-between items-center bg-white shadow px-10 py-4">

        <h1 className="text-2xl font-bold">
          Admin Panel
        </h1>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>

      </div>


      <div className="max-w-7xl mx-auto p-10">

        <h2 className="text-3xl font-bold mb-8">
          Dashboard
        </h2>


        {/* Stats */}

        <div className="grid grid-cols-4 gap-6 mb-10">

          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-500">Total Sales</p>
            <h3 className="text-2xl font-bold">
              ₹ {stats.sales}
            </h3>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-500">Orders</p>
            <h3 className="text-2xl font-bold">
              {stats.orders}
            </h3>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-500">Products</p>
            <h3 className="text-2xl font-bold">
              {stats.products}
            </h3>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-500">Users</p>
            <h3 className="text-2xl font-bold">
              {stats.users}
            </h3>
          </div>

        </div>


        {/* Admin Actions */}

        <div className="grid grid-cols-3 gap-6">

          <Link href="/admin/add-product">

            <div className="bg-white border p-6 rounded-lg shadow hover:bg-gray-100 cursor-pointer">

              <h3 className="text-lg font-semibold">
                Add Product
              </h3>

              <p className="text-gray-500">
                Create new supplement
              </p>

            </div>

          </Link>


          <Link href="/admin/products">

            <div className="bg-white border p-6 rounded-lg shadow hover:bg-gray-100 cursor-pointer">

              <h3 className="text-lg font-semibold">
                Manage Products
              </h3>

              <p className="text-gray-500">
                Edit or delete products
              </p>

            </div>

          </Link>


          <Link href="/admin/orders">

            <div className="bg-white border p-6 rounded-lg shadow hover:bg-gray-100 cursor-pointer">

              <h3 className="text-lg font-semibold">
                Orders
              </h3>

              <p className="text-gray-500">
                Manage customer orders
              </p>

            </div>

          </Link>

        </div>

      </div>

    </div>

  );
}