"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Check, X, Clock, Wallet } from "lucide-react";

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all payments
  const fetchPayments = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "payments"));
      const paymentData = querySnapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));
      setPayments(paymentData);
    } catch (error) {
      console.error("Error fetching payments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  // Approve payment
  const handleApprove = async (id) => {
    try {
      const paymentRef = doc(db, "payments", id);
      await updateDoc(paymentRef, { status: "approved" });
      setPayments((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status: "approved" } : p))
      );
      alert("✅ Payment approved successfully!");
    } catch (err) {
      console.error("Error approving:", err);
    }
  };

  // Reject payment
  const handleReject = async (id) => {
    try {
      const paymentRef = doc(db, "payments", id);
      await updateDoc(paymentRef, { status: "rejected" });
      setPayments((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status: "rejected" } : p))
      );
      alert("❌ Payment rejected!");
    } catch (err) {
      console.error("Error rejecting:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-green-400 text-lg animate-pulse">
        Loading payments...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-gray-100 p-6 sm:p-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-2">
          <Wallet className="w-6 h-6 text-green-400" />
          <h2 className="text-3xl font-semibold text-green-400">
            Payments & Withdrawals
          </h2>
        </div>
        <p className="text-gray-400 text-sm sm:text-base text-center sm:text-right max-w-lg">
          Review, approve, or reject all user payment and withdrawal requests in
          real time.
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-gray-900/70 backdrop-blur-md border border-gray-800 rounded-2xl shadow-2xl">
        <table className="min-w-full text-sm sm:text-base text-gray-300">
          <thead className="bg-gray-800/70 text-gray-200 uppercase text-xs sm:text-sm">
            <tr>
              <th className="p-4 text-left">User</th>
              <th className="p-4 text-left">Amount</th>
              <th className="p-4 text-left">Method</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr
                key={payment.id}
                className="border-t border-gray-800 hover:bg-gray-800/60 transition-colors duration-200"
              >
                <td className="p-4 whitespace-nowrap">{payment.userEmail}</td>
                <td className="p-4 font-semibold text-green-400">
                  ${payment.amount?.toLocaleString() || "—"}
                </td>
                <td className="p-4">{payment.method || "—"}</td>
                <td className="p-4 capitalize">
                  {payment.status === "pending" && (
                    <span className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                      <Clock size={14} /> Pending
                    </span>
                  )}
                  {payment.status === "approved" && (
                    <span className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                      <Check size={14} /> Approved
                    </span>
                  )}
                  {payment.status === "rejected" && (
                    <span className="inline-flex items-center gap-2 bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                      <X size={14} /> Rejected
                    </span>
                  )}
                </td>
                <td className="p-4 text-center">
                  {payment.status === "pending" ? (
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => handleApprove(payment.id)}
                        className="px-4 py-1.5 bg-green-600 hover:bg-green-500 text-white rounded-lg text-xs sm:text-sm font-medium transition transform hover:scale-105"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(payment.id)}
                        className="px-4 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs sm:text-sm font-medium transition transform hover:scale-105"
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <span className="text-gray-500 text-xs italic">Done</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty state */}
      {payments.length === 0 && (
        <div className="text-center text-gray-500 mt-10">
          No payment records found.
        </div>
      )}
    </div>
  );
}
