"use client";
import { useState } from "react"; // crypto
// import LiveStocks from "./LiveStocks"; // stocks
// import TradingViewChart from "./TradingViewChart";
import Hero from "./Hero";
import MiddleRange from "./MiddleRange";
import LearnMore from "./LearnMore";
import LivePrices from "./LivePrices";
import ServicesSection from "./ServicesSection";
import TrustAndMarket from "./TrustAndMarket";
import Footer from "./Footer";
import PayoutProofs from "./PayoutProofs";

export default function Dashboard() {
  const [selectedSymbol, setSelectedSymbol] = useState("BINANCE:BTCUSDT");

  const cards = [
    { title: "Total Investment", value: "$12,500", color: "bg-blue-600" },
    { title: "Profit Earned", value: "$3,200", color: "bg-green-600" },
    { title: "Active Plans", value: "4", color: "bg-yellow-500" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* <Navbar /> */}
      <Hero />

      {/* Hero */}

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto w-full p-6">
        {/* Heading */}
        <h1 className="text-xl font-bold mb-4 text-gray-600">
          Energyvest Investment Platform your number one partner for reliable,
          future-driven energy investments that empower growth across borders.
        </h1>
        <hr />

        <MiddleRange />
        <h2
          className="
    text-2xl sm:text-3xl md:text-4xl lg:text-5xl /* Responsive Text Size */
    font-extrabold 
    mt-8 mb-4 sm:mb-6 /* Responsive Margins */
    text-transparent bg-clip-text 
    bg-gradient-to-r from-green-500 to-teal-400 /* Bright Gradient */
    drop-shadow-lg 
    tracking-tight 
    transition-all duration-300 transform 
    hover:scale-[1.01] hover:drop-shadow-xl
  "
        >
          Stock Market
        </h2>
        {/* <LiveStocks onSymbolClick={setSelectedSymbol} /> */}
        <LivePrices />

        <div className="mt-6 bg-white p-4 rounded-xl shadow">
          {/* <TradingViewChart symbol={selectedSymbol} /> */}
        </div>
        <PayoutProofs />
        <LearnMore />
        <ServicesSection />
        <TrustAndMarket />
        <Footer />
      </main>
    </div>
  );
}
