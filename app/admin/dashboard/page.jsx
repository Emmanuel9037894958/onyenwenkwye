"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { LogOut, Shield, User } from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restrict access to authorized admin emails only
  const ADMIN_EMAILS = ["admin@energyvest.com", "energyvest@gmail.com"];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && ADMIN_EMAILS.includes(user.email)) {
        setAdmin(user);
      } else {
        router.push("/admin/login");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("admin");
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-950 text-white">
        <div className="text-green-400 text-xl animate-pulse">
          Loading Admin Panel...
        </div>
      </div>
    );
  }

  if (!admin) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-gray-100">
      {/* Header */}
      <header className="flex items-center justify-between p-6 border-b border-gray-800 bg-gray-900/60 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6 text-green-400" />
          <h1 className="text-2xl font-bold text-green-400">EnergyVest Admin</h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-gray-300">
            <User className="w-4 h-4" />
            <span className="text-sm">{admin.email}</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 px-3 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-white text-sm font-medium transition"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="p-8 space-y-8">
        <section className="text-center">
          <h2 className="text-3xl font-semibold text-green-400">
            Welcome, {admin.email}
          </h2>
          <p className="text-gray-400 mt-2">
            You’re securely logged into the EnergyVest Admin Dashboard.
          </p>
        </section>

        {/* Example Admin Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-900/70 border border-gray-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-green-300 mb-2">
              Total Users
            </h3>
            <p className="text-3xl font-bold">1,254</p>
          </div>

          <div className="bg-gray-900/70 border border-gray-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-green-300 mb-2">
              Active Investments
            </h3>
            <p className="text-3xl font-bold">320</p>
          </div>

          <div className="bg-gray-900/70 border border-gray-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-green-300 mb-2">
              Pending Withdrawals
            </h3>
            <p className="text-3xl font-bold">45</p>
          </div>
        </div>

        <section className="text-center text-gray-500 mt-10">
          <p>More admin tools and analytics coming soon...</p>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 text-center py-4 text-sm text-gray-500 bg-gray-900/60">
        © {new Date().getFullYear()} EnergyVest Admin Panel. All rights reserved.
      </footer>
    </div>
  );
}
