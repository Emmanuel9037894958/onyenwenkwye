"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { StatCard } from "@/components/StatCard";
import { PerformanceChart } from "@/components/PerformanceChart";
import { ProfileSettings } from "@/components/ProfileSettings";
import { TradeForm } from "@/components/TradeForm";
import {
  Wallet,
  TrendingUp,
  DollarSign,
  FileText,
  Menu,
  X,
} from "lucide-react";

// Firebase imports
import { db } from "@/lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";

// ---------------------------
// Helper to safely parse numbers
// ---------------------------
const parseNumber = (val) => {
  const num =
    typeof val === "number"
      ? val
      : typeof val === "string"
      ? parseFloat(val.replace(/[^0-9.-]+/g, ""))
      : 0;
  return isNaN(num) ? 0 : num;
};

// Default initial dashboard data (fallback)
const initialDashboardData = {
  totalManagedAssets: 0,
  marketChange: 0,
  availableCash: 0,
  totalPnl: 0,
};

export default function DashboardPage() {
  // ---------------------------
  // Dashboard summary state
  // ---------------------------
  const [summary, setSummary] = useState({
    totalAssets: initialDashboardData.totalManagedAssets,
    dailyChange: initialDashboardData.marketChange,
    totalGainLoss: initialDashboardData.totalPnl,
    cashBalance: initialDashboardData.availableCash,
  });

  const [performance, setPerformance] = useState([]);
  const [holdings, setHoldings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [userName, setUserName] = useState("Amamchukwu Emmanuel");
  const [userTier, setUserTier] = useState("Investor");
  const [userImage, setUserImage] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleProfile = () => setShowProfile((prev) => !prev);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  // ---------------------------
  // Firestore: Listen to dashboard summary
  // ---------------------------
  useEffect(() => {
    setIsLoading(true);

    const docRef = doc(db, "dashboard", "main"); // Your Firestore dashboard doc path
    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();

          setSummary({
            totalAssets: parseNumber(data.totalManagedAssets),
            dailyChange: parseNumber(data.marketChange),
            cashBalance: parseNumber(data.availableCash),
            totalGainLoss: parseNumber(data.totalPnl),
          });
        } else {
          console.warn("Dashboard document does not exist!");
          setSummary(initialDashboardData);
        }
        setIsLoading(false);
      },
      (err) => {
        console.error("Error fetching dashboard summary:", err);
        setError("Failed to fetch dashboard summary");
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // ---------------------------
  // Trade form state
  // ---------------------------
  const [tradeSymbol, setTradeSymbol] = useState("AAPL");
  const [tradeQty, setTradeQty] = useState(1);
  const [tradeType, setTradeType] = useState("buy");

  const handlePlaceOrder = () => {
    if (tradeQty <= 0) return alert("Quantity must be positive");
    alert(
      `Order executed: ${tradeType.toUpperCase()} ${tradeQty} shares of ${tradeSymbol}`
    );
    setTradeQty(1);
  };

  // ---------------------------
  // Safely handle NaN before rendering
  // ---------------------------
  const safeSummary = {
    totalAssets: isNaN(summary.totalAssets) ? 0 : summary.totalAssets,
    dailyChange: isNaN(summary.dailyChange) ? 0 : summary.dailyChange,
    cashBalance: isNaN(summary.cashBalance) ? 0 : summary.cashBalance,
    totalGainLoss: isNaN(summary.totalGainLoss) ? 0 : summary.totalGainLoss,
  };

  // ---------------------------
  // Render
  // ---------------------------
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 antialiased">
      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden flex items-center justify-between bg-indigo-600 text-white p-4 shadow-md">
        <h1 className="text-lg font-semibold">EnergyVest Dashboard</h1>
        <button
          onClick={toggleSidebar}
          className="text-white focus:outline-none"
        >
          {sidebarOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 lg:w-64 z-40`}
      >
        <Sidebar onClose={toggleSidebar} />
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-30"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          toggleProfile={toggleProfile}
          userName={userName}
          userTier={userTier}
        />

        <main className="flex-1 overflow-y-auto bg-gray-100 p-4 md:p-8 space-y-8">
          {/* Profile Settings */}
          {showProfile && (
            <ProfileSettings
              userName={userName}
              setUserName={setUserName}
              userImage={userImage}
              setUserImage={setUserImage}
            />
          )}

          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <StatCard
              title="Total Managed Assets"
              value={safeSummary.totalAssets} // ✅ Pass as number
              icon={Wallet}
              change={safeSummary.totalGainLoss}
            />

            <StatCard
              title="24h Market Change"
              value={safeSummary.dailyChange} // ✅ Number
              icon={TrendingUp}
              change={safeSummary.dailyChange}
            />

            <StatCard
              title="Available Cash Balance"
              value={safeSummary.cashBalance} // ✅ Number
              icon={DollarSign}
            />

            <StatCard
              title="Total P&L (All Time)"
              value={safeSummary.totalGainLoss} // ✅ Number
              icon={FileText}
              change={safeSummary.totalGainLoss}
            />
          </div>

          {/* Performance Chart */}
          <div className="grid grid-cols-1 gap-6">
            <PerformanceChart data={performance} isLoading={isLoading} />
          </div>

          {/* Trade Form */}
          <div className="grid grid-cols-1 gap-6">
            <TradeForm
              tradeSymbol={tradeSymbol}
              setTradeSymbol={setTradeSymbol}
              tradeQty={tradeQty}
              setTradeQty={setTradeQty}
              tradeType={tradeType}
              setTradeType={setTradeType}
              handlePlaceOrder={handlePlaceOrder}
            />
          </div>

          {error && <p className="text-red-500 font-semibold mt-4">{error}</p>}
        </main>
      </div>
    </div>
  );
}
