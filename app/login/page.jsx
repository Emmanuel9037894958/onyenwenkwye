"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase"; // ✅ your Firebase config path
import { useClient } from "@/app/context/ClientContext";

export default function LoginPage() {
  const router = useRouter();
  const { setClient } = useClient();

  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [postLogin, setPostLogin] = useState(false);

  // ✅ Auto-login check (if already logged in)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData = {
          uid: user.uid,
          email: user.email,
          fullName: user.displayName || "User",
        };
        setClient(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        router.push("/dashboard"); // redirect to user dashboard
      }
    });
    return () => unsubscribe();
  }, [router, setClient]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    try {
      // ✅ Firebase authentication
      const userCredential = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      const user = userCredential.user;
      const userData = {
        uid: user.uid,
        email: user.email,
        fullName: user.displayName || "User",
      };

      // ✅ Store globally and locally
      setClient(userData);
      localStorage.setItem("user", JSON.stringify(userData));

      setPostLogin(true);
      setTimeout(() => router.push("/dashboard"), 2000);
    } catch (error) {
      console.error("Login error:", error);
      switch (error.code) {
        case "auth/user-not-found":
          setMsg("❌ No account found with that email.");
          break;
        case "auth/wrong-password":
          setMsg("⚠️ Incorrect password. Try again.");
          break;
        case "auth/invalid-email":
          setMsg("❌ Invalid email format.");
          break;
        default:
          setMsg("Error: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // ✅ Animated loading screen after successful login
  if (postLogin) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-green-500 to-emerald-600 text-white">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-14 h-14 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg font-semibold animate-pulse">
            Logging you in… Please wait
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-100">
      <div className="w-full max-w-md px-8 py-10 bg-white rounded-2xl shadow-xl border border-orange-100">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-2">
          Welcome Back
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Log in to{" "}
          <span className="text-orange-600 font-semibold">EnergyVest</span>
        </p>

        {msg && (
          <p className="text-center text-red-600 font-medium mb-4 animate-pulse">
            {msg}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-green-600 text-white font-semibold shadow-md hover:bg-green-700 focus:ring-2 focus:ring-green-300 transition-colors duration-300 disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-orange-600 font-medium hover:underline hover:text-orange-700"
          >
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}
