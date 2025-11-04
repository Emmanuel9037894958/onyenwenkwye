"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { LogOut, Shield, User } from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            const userData = userSnap.data();
            if (userData.role === "admin") {
              setAdmin(userData);
            } else {
              console.warn("Access denied: not an admin");
              router.push("/admin/login");
            }
          } else {
            console.warn("No Firestore user data found");
            router.push("/admin/login");
          }
        } catch (error) {
          console.error("Error checking admin role:", error);
          router.push("/admin/login");
        }
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
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-gray-100 flex flex-col">
      {/* Header */}
      <header className="flex flex-col sm:flex-row items-center justify-between gap-3 p-6 border-b border-gray-800 bg-gray-900/60 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-start">
          <Shield className="w-6 h-6 text-green-400" />
          <h1 className="text-2xl font-bold text-green-400 text-center sm:text-left">
            EnergyVest Admin
          </h1>
        </div>

        <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 w-full sm:w-auto text-gray-300">
          <div className="flex items-center gap-2 max-w-[180px] sm:max-w-[250px] md:max-w-[300px] overflow-hidden">
            <User className="w-4 h-4 flex-shrink-0 text-green-400" />
            <span
              className="text-sm truncate block"
              title={admin.email}
            >
              {admin.email}
            </span>
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
      <main className="flex-grow p-4 sm:p-8 space-y-8">
        <section className="text-center">
          <h2 className="text-3xl font-semibold text-green-400 break-words">
            Welcome, {admin.fullName || admin.email}
          </h2>
          <p className="text-gray-400 mt-2 text-sm sm:text-base">
            You’re securely logged into the EnergyVest Admin Dashboard.
          </p>
        </section>

        {/* Example Admin Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-900/70 border border-gray-800 rounded-2xl p-6 shadow-lg text-center">
            <h3 className="text-lg font-semibold text-green-300 mb-2">
              Total Users
            </h3>
            <p className="text-3xl font-bold">1,254</p>
          </div>

          <div className="bg-gray-900/70 border border-gray-800 rounded-2xl p-6 shadow-lg text-center">
            <h3 className="text-lg font-semibold text-green-300 mb-2">
              Active Investments
            </h3>
            <p className="text-3xl font-bold">320</p>
          </div>

          <div className="bg-gray-900/70 border border-gray-800 rounded-2xl p-6 shadow-lg text-center">
            <h3 className="text-lg font-semibold text-green-300 mb-2">
              Pending Withdrawals
            </h3>
            <p className="text-3xl font-bold">45</p>
          </div>
        </div>

        <section className="text-center text-gray-500 mt-10 text-sm sm:text-base">
          <p>More admin tools and analytics coming soon...</p>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 text-center py-4 text-xs sm:text-sm text-gray-500 bg-gray-900/60">
        © {new Date().getFullYear()} EnergyVest Admin Panel. All rights reserved.
      </footer>
    </div>
  );
}
