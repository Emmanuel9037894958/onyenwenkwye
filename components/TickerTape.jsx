"use client";
import { useEffect, useRef } from "react";

export default function TickerTape() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // ✅ Clean container before injecting new script
    container.innerHTML = "";

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.async = true;

    // ✅ Safer stringified configuration (TradingView expects JSON inside <script>)
    script.innerHTML = JSON.stringify({
      symbols: [
        { proName: "FOREXCOM:SPXUSD", title: "S&P 500" },
        { proName: "FOREXCOM:NSXUSD", title: "US 100" },
        { proName: "FX_IDC:EURUSD", title: "EUR/USD" },
        { proName: "BITSTAMP:BTCUSD", title: "Bitcoin" },
        { proName: "BITSTAMP:ETHUSD", title: "Ethereum" },
        { proName: "BINANCE:BNBUSDT", title: "BNB" }, // Added 6th symbol
      ],
      showSymbolLogo: true,
      colorTheme: "dark",
      displayMode: "adaptive",
      isTransparent: false,
      locale: "en",
    });

    container.appendChild(script);

    // ✅ Cleanup on component unmount
    return () => {
      container.innerHTML = "";
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="tradingview-widget-container"
      style={{
        width: "100%",
        height: "60px", // 🔹 slightly shorter height for cleaner fit
        overflow: "hidden",
        borderRadius: "10px",
        backgroundColor: "#000",
      }}
    />
  );
}
