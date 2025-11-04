"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase"; // ✅ your real Firebase config

// Lucide icons for nice visuals
import { User, Lock, LogIn, AlertTriangle, CheckCircle, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1️⃣ Sign in with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2️⃣ Get user document from Firestore
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        setError("No user record found in Firestore.");
        setLoading(false);
        return;
      }

      const userData = docSnap.data();

      // 3️⃣ Check admin role
      if (userData.role === "admin") {
        setError("Success! Access granted. Redirecting...");
        router.push("/admin/dashboard");
      } else {
        setError("You are not authorized to access the admin dashboard.");
      }
    } catch (err) {
      console.error("Admin login error:", err.message);
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  const ErrorDisplay = () => {
    if (!error) return null;
    const isSuccess = error.includes("Success");
    const classes = isSuccess
      ? "bg-green-800/40 text-green-300 border-green-700"
      : "bg-red-800/40 text-red-300 border-red-700";
    const Icon = isSuccess ? CheckCircle : AlertTriangle;

    return (
      <div
        className={`p-3 rounded-lg border flex items-start space-x-2 mb-6 
        ${classes} transition-opacity duration-300 shadow-md`}
      >
        <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
        <p className="text-sm font-medium leading-relaxed">{error}</p>
      </div>
    );
  };

  return (
    <div
      className="
        flex items-center justify-center min-h-screen 
        bg-gray-950 font-sans p-4
        bg-[radial-gradient(ellipse_at_top_right,_var(--tw-color-gray-950)_0%,_var(--tw-color-indigo-900/10)_50%,_var(--tw-color-gray-950)_100%)]
      "
    >
      <form
        onSubmit={handleLogin}
        className="
          bg-gray-900/80 backdrop-blur-md shadow-[0_15px_60px_rgba(49,46,129,0.7)] 
          rounded-2xl p-8 w-full max-w-md border border-indigo-700/30
          transform transition-all duration-500 hover:shadow-[0_15px_80px_rgba(49,46,129,1)]
        "
      >
        <div className="text-center mb-8">
          <h2
            className="
            text-4xl font-extrabold text-transparent bg-clip-text 
            bg-gradient-to-r from-indigo-300 to-purple-400 
            tracking-tight mb-2
          "
          >
            Admin Access
          </h2>
          <p className="text-gray-400 text-sm">Secure Access Required</p>
        </div>

        <ErrorDisplay />

        {/* Email Field */}
        <div className="mb-5 relative">
          <label className="text-sm font-medium text-gray-300 block mb-2">Email</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-indigo-400/70" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@example.com"
              className="
                w-full pl-11 pr-4 py-3 border-none rounded-xl mt-1 
                bg-gray-800 text-white placeholder-gray-500
                focus:outline-none focus:ring-4 focus:ring-indigo-500/50 focus:bg-gray-700
                transition duration-300 shadow-inner shadow-gray-900
              "
              disabled={loading}
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="mb-8 relative">
          <label className="text-sm font-medium text-gray-300 block mb-2">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-indigo-400/70" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter password"
              className="
                w-full pl-11 pr-4 py-3 border-none rounded-xl mt-1 
                bg-gray-800 text-white placeholder-gray-500
                focus:outline-none focus:ring-4 focus:ring-indigo-500/50 focus:bg-gray-700
                transition duration-300 shadow-inner shadow-gray-900
              "
              disabled={loading}
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="
            w-full flex items-center justify-center space-x-2 
            bg-gradient-to-r from-indigo-600 to-purple-600 
            text-white font-bold py-3 rounded-xl 
            shadow-xl shadow-indigo-500/20
            hover:shadow-2xl hover:shadow-indigo-500/40 
            hover:from-indigo-700 hover:to-purple-700
            active:scale-[0.98] transition-all duration-300
            disabled:opacity-60 disabled:cursor-not-allowed
          "
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Authenticating...</span>
            </>
          ) : (
            <>
              <LogIn className="w-5 h-5" />
              <span>Sign In Securely</span>
            </>
          )}
        </button>

        <p className="text-center text-gray-500 text-xs mt-6">
          © 2025 EnergyVest Admin Panel | Data integrity secured.
        </p>
      </form>
    </div>
  );
}
