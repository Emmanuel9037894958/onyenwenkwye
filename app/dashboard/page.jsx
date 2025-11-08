"use client";

import { useState, useEffect, useCallback } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { StatCard } from "@/components/StatCard";
import { PerformanceChart } from "@/components/PerformanceChart";
import { ProfileSettings } from "@/components/ProfileSettings";
import { TradeForm } from "@/components/TradeForm";
import { Wallet, TrendingUp, DollarSign, FileText, Menu, X } from "lucide-react";

// ✅ Firebase imports
import { db } from "@/lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";

export default function DashboardPage() {
  const [summary, setSummary] = useState({
    totalAssets: 0,
    dailyChange: 0,
    totalGainLoss: 0,
    cashBalance: 0,
  });
  const [performance, setPerformance] = useState([]);
  const [holdings, setHoldings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [userName, setUserName] = useState(""); // Will pull from logged-in user
  const [userTier, setUserTier] = useState("Investor");
  const [userImage, setUserImage] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleProfile = () => setShowProfile((prev) => !prev);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  // ✅ Real-time Firestore listener
  const listenToFirestore = useCallback(() => {
    setIsLoading(true);
    setError(null);

    try {
      // 🔥 Listen to investments (correct plural collection)
      const unsubInvestments = onSnapshot(
        collection(db, "investments"),
        (snapshot) => {
          let totalAssets = 0;
          let totalGainLoss = 0;
          let cashBalance = 0;

          snapshot.forEach((doc) => {
            const data = doc.data();
            console.log("Investment doc:", data);

            const amount = Number(data.amount) || 0;
            const profit = Number(data.profit) || 0;
            const balance = Number(data.balance) || 0;

            totalAssets += amount;
            totalGainLoss += profit;
            cashBalance += balance;
          });

          const dailyChange = Number((Math.random() * 2 - 1).toFixed(2));

          setSummary({
            totalAssets,
            totalGainLoss,
            cashBalance,
            dailyChange,
          });

          setIsLoading(false);
        },
        (error) => {
          console.error("Error fetching investments:", error);
          setError("Failed to fetch investment data");
          setIsLoading(false);
        }
      );

      // 🔥 Listen to performance
      const unsubPerformance = onSnapshot(collection(db, "performance"), (snapshot) => {
        const performanceData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPerformance(performanceData);
      });

      // 🔥 Listen to holdings
      const unsubHoldings = onSnapshot(collection(db, "holdings"), (snapshot) => {
        const holdingsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setHoldings(holdingsData);
      });

      // 🧹 Cleanup on unmount
      return () => {
        unsubInvestments();
        unsubPerformance();
        unsubHoldings();
      };
    } catch (err) {
      console.error("Realtime Firestore error:", err);
      setError("Unable to connect to Firestore in real-time");
      setIsLoading(false);
    }
  }, []);

  // 🔁 Start real-time listeners
  useEffect(() => {
    const cleanup = listenToFirestore();
    return cleanup;
  }, [listenToFirestore]);

  // 💰 Trade form (demo)
  const [tradeSymbol, setTradeSymbol] = useState("AAPL");
  const [tradeQty, setTradeQty] = useState(1);
  const [tradeType, setTradeType] = useState("buy");

  const handlePlaceOrder = () => {
    if (tradeQty <= 0) return alert("Quantity must be positive");
    alert(`Order executed: ${tradeType.toUpperCase()} ${tradeQty} shares of ${tradeSymbol}`);
    setTradeQty(1);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 antialiased">
      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden flex items-center justify-between bg-indigo-600 text-white p-4 shadow-md">
        <h1 className="text-lg font-semibold">EnergyVest Dashboard</h1>
        <button onClick={toggleSidebar} className="text-white focus:outline-none">
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

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-30"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header toggleProfile={toggleProfile} userName={userName} userTier={userTier} />

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

          {/* ✅ Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <StatCard
              title="Total Managed Assets"
              value={`$${summary.totalAssets.toLocaleString() || "0.00"}`}
              icon={Wallet}
              change={summary.totalGainLoss}
            />
            <StatCard
              title="24h Market Change"
              value={`${!isNaN(summary.dailyChange) ? summary.dailyChange : 0}%`}
              icon={TrendingUp}
              change={summary.dailyChange}
            />
            <StatCard
              title="Available Cash Balance"
              value={`$${summary.cashBalance.toLocaleString() || "0.00"}`}
              icon={DollarSign}
              change={0}
            />
            <StatCard
              title="Total P&L (All Time)"
              value={`$${summary.totalGainLoss.toLocaleString() || "0.00"}`}
              icon={FileText}
              change={summary.totalGainLoss}
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
