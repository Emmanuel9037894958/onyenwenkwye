"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import {
  User,
  Lock,
  LogIn,
  AlertTriangle,
  CheckCircle,
  Loader2,
  Eye,
  EyeOff,
  ShieldCheck,
  Fingerprint,
} from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const router = useRouter();

  // Auto-load saved email if “Remember me” was checked
  useEffect(() => {
    const savedEmail = localStorage.getItem("adminEmail");
    if (savedEmail) setEmail(savedEmail);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Prevent brute force
    if (failedAttempts >= 3) {
      setError("Too many failed attempts. Try again later.");
      setLoading(false);
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        setError("No user record found in Firestore.");
        setLoading(false);
        return;
      }

      const userData = docSnap.data();

      if (userData.role === "admin") {
        await setDoc(
          doc(db, "admin_logins", `${user.uid}_${Date.now()}`),
          {
            email: user.email,
            timestamp: serverTimestamp(),
            status: "success",
          }
        );

        setError("✅ Success! Redirecting to dashboard...");
        localStorage.setItem("adminEmail", email);
        setTimeout(() => router.push("/admin/dashboard"), 1500);
      } else {
        throw new Error("You are not authorized to access admin panel.");
      }
    } catch (err) {
      console.error("Admin login error:", err.message);
      setFailedAttempts((prev) => prev + 1);
      await setDoc(
        doc(db, "admin_logins", `${Date.now()}`),
        {
          email,
          timestamp: serverTimestamp(),
          status: "failed",
          message: err.message,
        }
      );
      setError("⚠️ Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) return alert("Please enter your email first.");
    setResetting(true);
    setError("");

    try {
      await sendPasswordResetEmail(auth, email);
      setError("✅ Password reset email sent! Check your inbox.");
    } catch (err) {
      console.error("Password reset error:", err.message);
      setError("Error sending password reset email.");
    } finally {
      setResetting(false);
    }
  };

  const ErrorDisplay = () => {
    if (!error) return null;
    const isSuccess = error.includes("✅") || error.includes("sent");
    const classes = isSuccess
      ? "bg-green-800/40 text-green-300 border-green-700"
      : "bg-red-800/40 text-red-300 border-red-700";
    const Icon = isSuccess ? CheckCircle : AlertTriangle;

    return (
      <div
        className={`p-3 rounded-lg border flex items-start space-x-2 mb-6 ${classes} transition-all duration-500 shadow-lg`}
      >
        <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
        <p className="text-sm font-medium">{error}</p>
      </div>
    );
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen 
      bg-gradient-to-br from-gray-950 via-indigo-950 to-gray-900 
      animate-gradient bg-[length:400%_400%] font-sans p-4"
    >
      <form
        onSubmit={handleLogin}
        className="bg-gray-900/90 backdrop-blur-xl rounded-2xl p-8 
        w-full max-w-md border border-indigo-800/40 shadow-[0_20px_80px_rgba(49,46,129,0.8)]
        transition-all duration-500 hover:shadow-[0_25px_90px_rgba(99,102,241,1)]"
      >
        <div className="text-center mb-8">
          <ShieldCheck className="w-10 h-10 text-indigo-400 mx-auto mb-3" />
          <h2
            className="text-4xl font-extrabold bg-clip-text text-transparent 
            bg-gradient-to-r from-indigo-300 to-purple-400"
          >
            Admin Access
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Secure portal for authorized personnel only
          </p>
        </div>

        <ErrorDisplay />

        {/* Email */}
        <div className="mb-5 relative">
          <label className="text-sm font-medium text-gray-300 block mb-2">
            Email Address
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-400/70" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@example.com"
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-800 text-white 
              placeholder-gray-500 focus:outline-none focus:ring-4 
              focus:ring-indigo-500/40 focus:bg-gray-700 transition"
              disabled={loading || resetting}
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-4 relative">
          <label className="text-sm font-medium text-gray-300 block mb-2">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-400/70" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full pl-11 pr-10 py-3 rounded-xl bg-gray-800 text-white 
              placeholder-gray-500 focus:outline-none focus:ring-4 
              focus:ring-indigo-500/40 focus:bg-gray-700 transition"
              disabled={loading || resetting}
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5 text-indigo-400/70" />
              ) : (
                <Eye className="w-5 h-5 text-indigo-400/70" />
              )}
            </div>
          </div>
        </div>

        {/* Remember Me */}
        <div className="flex items-center justify-between mb-6">
          <label className="flex items-center space-x-2 text-gray-400 text-sm">
            <input
              type="checkbox"
              onChange={(e) =>
                e.target.checked
                  ? localStorage.setItem("adminEmail", email)
                  : localStorage.removeItem("adminEmail")
              }
              className="w-4 h-4 rounded border-gray-600 text-indigo-500 focus:ring-indigo-600"
            />
            <span>Remember me</span>
          </label>
          <button
            type="button"
            onClick={handleForgotPassword}
            disabled={loading || resetting}
            className="text-indigo-400 text-sm hover:underline"
          >
            {resetting ? "Sending..." : "Forgot Password?"}
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading || resetting}
          className="w-full flex items-center justify-center gap-2 
          bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold 
          py-3 rounded-xl shadow-xl hover:from-indigo-700 hover:to-purple-700
          active:scale-[0.98] transition-all duration-300 disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Authenticating...</span>
            </>
          ) : (
            <>
              <Fingerprint className="w-5 h-5" />
              <span>Sign In Securely</span>
            </>
          )}
        </button>

        <p className="text-center text-gray-500 text-xs mt-6">
          © 2025 EnergyVest Admin | End-to-end encrypted access.
        </p>
      </form>
    </div>
  );
}
