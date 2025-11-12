"use client";
import React, { useState, useEffect } from "react"

export default function LivePrices() {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch only 6 coins from CoinGecko
  const fetchPrices = async () => {
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,bnb,xrp,solana,cardano"
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      const formatted = data.map((coin) => ({
        id: coin.id,
        symbol: coin.symbol.toUpperCase(),
        price: coin.current_price,
        image: coin.image,
      }));

      setPrices(formatted);
    } catch (err) {
      console.error("Failed to fetch prices:", err);
      setPrices([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-7 text-white xl: ml-4">
      {loading ? (
        <p className="col-span-full text-center text-gray-400">
          Loading prices...
        </p>
      ) : prices.length ? (
        prices.map((p) => (
          <div
            key={p.id}
            className="rounded-xl border border-slate-800 bg-slate-900 p-3 text-center shadow-sm hover:shadow-md transition"
          >
            <img
              src={p.image}
              alt={p.symbol}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/fallback.png";
              }}
              className="w-8 h-8 mx-auto mb-2 rounded-full border border-slate-700 object-cover"
            />
            <p className="font-semibold text-sm">{p.symbol}</p>
            <p className="text-green-400 font-mono text-xs">
              ${Number(p.price).toLocaleString()}
            </p>
          </div>
        ))
      ) : (
        <p className="col-span-full text-center text-gray-400">
          No prices available
        </p>
      )}
    </div>
  )
};
