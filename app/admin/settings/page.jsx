"use client";

import React, { useEffect, useState } from "react";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Check, X, Loader2 } from "lucide-react";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    companyName: "",
    supportEmail: "",
    supportPhone: "",
    minDeposit: 0,
    minWithdrawal: 0,
    withdrawalFeePercent: 0,
    bannerText: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  // Fetch settings on load
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const docRef = doc(db, "settings", "main");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setSettings(docSnap.data());
        } else {
          // If document doesn't exist, create it with defaults
          await setDoc(docRef, settings);
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  // Save settings
  const handleSave = async () => {
    setSaving(true);
    try {
      const docRef = doc(db, "settings", "main");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        await updateDoc(docRef, settings);
      } else {
        await setDoc(docRef, settings); // create if missing
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Error saving settings:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-green-400 animate-pulse">
        <Loader2 className="w-6 h-6 mr-2 animate-spin" /> Loading settings...
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-10 bg-gray-950 text-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-green-400 mb-2 flex items-center gap-2">
        <Check className="w-6 h-6 text-green-400" /> Website Settings
      </h2>
      <p className="text-gray-400 mb-6">
        Update website settings. Changes are saved directly to Firestore.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Company Name */}
        <div className="flex flex-col">
          <label className="mb-1 text-gray-300 font-medium">Company Name</label>
          <input
            type="text"
            name="companyName"
            value={settings.companyName}
            onChange={handleChange}
            className="px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-green-400"
          />
        </div>

        {/* Support Email */}
        <div className="flex flex-col">
          <label className="mb-1 text-gray-300 font-medium">Support Email</label>
          <input
            type="email"
            name="supportEmail"
            value={settings.supportEmail}
            onChange={handleChange}
            className="px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-green-400"
          />
        </div>

        {/* Support Phone */}
        <div className="flex flex-col">
          <label className="mb-1 text-gray-300 font-medium">Support Phone</label>
          <input
            type="text"
            name="supportPhone"
            value={settings.supportPhone}
            onChange={handleChange}
            className="px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-green-400"
          />
        </div>

        {/* Min Deposit */}
        <div className="flex flex-col">
          <label className="mb-1 text-gray-300 font-medium">Minimum Deposit ($)</label>
          <input
            type="number"
            name="minDeposit"
            value={settings.minDeposit}
            onChange={handleChange}
            className="px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-green-400"
          />
        </div>

        {/* Min Withdrawal */}
        <div className="flex flex-col">
          <label className="mb-1 text-gray-300 font-medium">Minimum Withdrawal ($)</label>
          <input
            type="number"
            name="minWithdrawal"
            value={settings.minWithdrawal}
            onChange={handleChange}
            className="px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-green-400"
          />
        </div>

        {/* Withdrawal Fee Percent */}
        <div className="flex flex-col">
          <label className="mb-1 text-gray-300 font-medium">Withdrawal Fee (%)</label>
          <input
            type="number"
            name="withdrawalFeePercent"
            value={settings.withdrawalFeePercent}
            onChange={handleChange}
            className="px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-green-400"
          />
        </div>

        {/* Banner Text */}
        <div className="flex flex-col sm:col-span-2">
          <label className="mb-1 text-gray-300 font-medium">Banner Text</label>
          <input
            type="text"
            name="bannerText"
            value={settings.bannerText}
            onChange={handleChange}
            className="px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-green-400 w-full"
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-6 flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2 bg-green-600 hover:bg-green-500 rounded-lg text-white font-medium transition flex items-center gap-2"
        >
          {saving && <Loader2 className="w-5 h-5 animate-spin" />}
          Save Settings
        </button>
        {success && (
          <span className="text-green-400 font-medium flex items-center gap-1">
            <Check className="w-4 h-4" /> Saved successfully!
          </span>
        )}
      </div>
    </div>
  );
}
