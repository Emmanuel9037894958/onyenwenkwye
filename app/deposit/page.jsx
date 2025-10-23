"use client";
import { useState } from "react";
import { FaBitcoin, FaGift, FaPaypal } from "react-icons/fa";
import { useUser } from "@/app/context/UserContext";

export default function DepositPage() {
  const { user } = useUser();
  const [email, setEmail] = useState(user?.email || "");
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("crypto");
  const [loading, setLoading] = useState(false);

  if (!user) {
    return (
      <p className="p-6 text-center text-red-600">
        You must be logged in to make a deposit.
      </p>
    );
  }

  const handleDeposit = async () => {
    if (!amount || Number(amount) <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    try {
      setLoading(true);
      // 🔹 Replace with your actual backend endpoint that connects to NOWPayments API
      const response = await fetch("https://your-backend-url.com/api/nowpayments/create-invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          price_amount: amount,
          price_currency: "usd",
          pay_currency: "btc", // or "eth", "usdt", etc.
          order_description: `Deposit by ${email}`,
          user_email: email,
        }),
      });

      const data = await response.json();

      if (data && data.invoice_url) {
        window.location.href = data.invoice_url; // Redirect user to NOWPayments page
      } else {
        alert("Failed to create payment. Try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Error creating payment. Check your backend connection.");
    } finally {
      setLoading(false);
    }
  };

  const paymentMethods = [
    { key: "crypto", label: "Crypto (NOWPayments)", color: "yellow", icon: <FaBitcoin className="inline mr-1" /> },
    { key: "paypal", label: "PayPal", color: "blue", icon: <FaPaypal className="inline mr-1" /> },
    { key: "gift", label: "Gift Card", color: "pink", icon: <FaGift className="inline mr-1" /> },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Make a Deposit</h1>

        {/* Amount */}
        <input
          type="number"
          placeholder="Enter amount (USD)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border rounded-lg p-3 mb-4 w-full"
        />

        {/* Payment Method */}
        <div className="flex justify-between mb-4 space-x-2">
          {paymentMethods.map((pm) => (
            <button
              key={pm.key}
              onClick={() => setMethod(pm.key)}
              className={`flex-1 flex items-center justify-center p-3 rounded-lg border font-semibold 
                ${method === pm.key ? `bg-${pm.color}-500 text-white border-${pm.color}-500` : "bg-white text-gray-800 border-gray-300"}
                hover:opacity-90 transition`}
            >
              {pm.icon} {pm.label}
            </button>
          ))}
        </div>

        {/* Action Button */}
        {method === "crypto" ? (
          <button
            onClick={handleDeposit}
            disabled={loading}
            className="bg-yellow-500 text-white p-3 rounded-lg w-full font-semibold disabled:opacity-50"
          >
            {loading ? "Processing..." : "Pay with NOWPayments"}
          </button>
        ) : (
          <button
            className="bg-gray-600 text-white p-3 rounded-lg w-full font-semibold"
            onClick={() => alert(`Payment via ${method} is coming soon!`)}
          >
            Continue with {method.charAt(0).toUpperCase() + method.slice(1)}
          </button>
        )}
      </div>
    </div>
  );
}
