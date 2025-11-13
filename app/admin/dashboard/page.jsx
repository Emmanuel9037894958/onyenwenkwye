"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import Link from "next/link";
import {
  LogOut,
  Shield,
  User,
  Users,
  Wallet,
  Settings,
  BarChart3,
  Activity,
  Menu,
  X,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function AdminDashboard() {
  const router = useRouter();
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const data = [
    { name: "Mon", value: 300 },
    { name: "Tue", value: 450 },
    { name: "Wed", value: 400 },
    { name: "Thu", value: 600 },
    { name: "Fri", value: 550 },
    { name: "Sat", value: 700 },
    { name: "Sun", value: 800 },
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists() && userSnap.data().role === "admin") {
          setAdmin(userSnap.data());
        } else router.push("/admin/login");
      } else router.push("/admin/login");
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/admin/login");
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-950 text-white">
        <div className="text-green-400 text-xl animate-pulse">
          Loading Admin Dashboard...
        </div>
      </div>
    );

  if (!admin) return null;

  // ✅ Sidebar Component
  const Sidebar = () => (
    <aside className="w-64 bg-gray-900/90 border-r border-gray-800 p-6 flex flex-col space-y-8 h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6 text-green-400" />
          <h1 className="text-xl font-bold text-green-400">EnergyVest</h1>
        </div>
        <button
          className="md:hidden text-gray-400 hover:text-green-400"
          onClick={() => setMenuOpen(false)}
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <nav className="flex flex-col space-y-4 text-gray-300">
        <Link href="/admin" className="flex items-center gap-2 hover:text-green-400 transition">
          <BarChart3 className="w-5 h-5" /> Dashboard
        </Link>
        <Link href="/admin/users" className="flex items-center gap-2 hover:text-green-400 transition">
          <Users className="w-5 h-5" /> Users
        </Link>
        <Link href="/admin/investments" className="flex items-center gap-2 hover:text-green-400 transition">
          <Wallet className="w-5 h-5" /> Investments
        </Link>
        <Link href="/admin/payments" className="flex items-center gap-2 hover:text-green-400 transition">
          <Activity className="w-5 h-5" /> Payments
        </Link>
        <Link href="/admin/settings" className="flex items-center gap-2 hover:text-green-400 transition">
          <Settings className="w-5 h-5" /> Settings
        </Link>
      </nav>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 text-red-500 hover:text-red-400 transition mt-auto"
      >
        <LogOut className="w-5 h-5" /> Logout
      </button>
    </aside>
  );

  return (
    <div className="min-h-screen flex bg-gray-950 text-gray-100 relative overflow-hidden">
      {/* ✅ Sidebar Desktop */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* ✅ Sidebar Mobile */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900/95 shadow-lg z-50 transform transition-transform duration-300 ease-in-out
        ${menuOpen ? "translate-x-0" : "-translate-x-full"} md:hidden`}
      >
        <Sidebar />
      </div>

      {/* ✅ Mobile Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      {/* ✅ Main Section */}
      <main className="flex-1 p-4 sm:p-6 md:p-10 space-y-8 overflow-y-auto">
        {/* Header */}
        <header className="flex justify-between items-center border-b border-gray-800 pb-4">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden text-gray-300 hover:text-green-400"
              onClick={() => setMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-sm font-semibold text-green-400">
               {admin.fullName || admin.email}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-green-400" />
            <span className="text-sm">{admin.email}</span>
          </div>
        </header>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <input
            type="text"
            placeholder="Search users or investments..."
            className="w-full sm:w-1/2 px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-green-400"
          />
          <button className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded-lg text-sm font-medium text-white">
            + Add New Investment
          </button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Total Users", value: "1,254", icon: <Users /> },
            { title: "Active Investments", value: "320", icon: <Wallet /> },
            { title: "Pending Withdrawals", value: "45", icon: <Activity /> },
            { title: "Total Revenue", value: "$85,000", icon: <BarChart3 /> },
          ].map((card, i) => (
            <div
              key={i}
              className="bg-gray-900/70 border border-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-green-900/30 transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-green-300">
                  {card.title}
                </h3>
                <div className="text-green-400">{card.icon}</div>
              </div>
              <p className="text-3xl font-bold">{card.value}</p>
            </div>
          ))}
        </div>

        {/* Chart Section */}
        <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-green-300 mb-4">
            Weekly Investment Growth
          </h3>
          <div className="w-full h-64">
            <ResponsiveContainer>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#22c55e"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-gray-800 text-center py-4 text-xs text-gray-500">
          © {new Date().getFullYear()} EnergyVest Admin Dashboard. All rights reserved.
        </footer>
      </main>
    </div>
  );
}
