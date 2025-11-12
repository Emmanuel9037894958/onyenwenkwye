"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Wallet, CheckCircle, XCircle } from "lucide-react";

export default function InvestmentsPage() {
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch investments
  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "investments"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setInvestments(data);
      } catch (error) {
        console.error("Error loading investments:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInvestments();
  }, []);

  // Approve investment
  const approveInvestment = async (id) => {
    try {
      await updateDoc(doc(db, "investments", id), { status: "approved" });
      setInvestments((prev) =>
        prev.map((inv) =>
          inv.id === id ? { ...inv, status: "approved" } : inv
        )
      );
      alert("✅ Investment approved successfully!");
    } catch (error) {
      console.error("Error approving:", error);
      alert("❌ Failed to approve investment.");
    }
  };

  // Reject investment
  const rejectInvestment = async (id) => {
    try {
      await updateDoc(doc(db, "investments", id), { status: "rejected" });
      setInvestments((prev) =>
        prev.map((inv) =>
          inv.id === id ? { ...inv, status: "rejected" } : inv
        )
      );
      alert("⚠️ Investment rejected!");
    } catch (error) {
      console.error("Error rejecting:", error);
      alert("❌ Failed to reject investment.");
    }
  };

  return (
    <div className="p-6 text-gray-100 min-h-screen bg-gray-950">
      <h1 className="text-2xl font-bold text-green-400 mb-2 flex items-center gap-2">
        <Wallet className="w-6 h-6 text-green-400" />
        Manage Investments
      </h1>
      <p className="text-gray-400 mb-6">Approve or reject user investments.</p>

      {loading ? (
        <div className="text-green-400">Loading investments...</div>
      ) : investments.length === 0 ? (
        <div className="text-gray-500">No investments found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-900 border border-gray-800 rounded-lg">
            <thead>
              <tr className="bg-gray-800 text-green-300 text-left">
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Plan</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {investments.map((inv) => (
                <tr
                  key={inv.id}
                  className="border-t border-gray-800 hover:bg-gray-800/50"
                >
                  <td className="py-3 px-4">{inv.userEmail || "—"}</td>
                  <td className="py-3 px-4">${inv.amount}</td>
                  <td className="py-3 px-4">{inv.plan || "—"}</td>
                  <td className="py-3 px-4 capitalize">{inv.status}</td>
                  <td className="py-3 px-4 flex gap-3">
                    <button
                      onClick={() => approveInvestment(inv.id)}
                      className="text-green-400 hover:text-green-300"
                    >
                      <CheckCircle className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => rejectInvestment(inv.id)}
                      className="text-red-500 hover:text-red-400"
                    >
                      <XCircle className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
