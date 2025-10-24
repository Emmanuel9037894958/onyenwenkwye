"use client";
import { useEffect, useState } from "react";

export default function AlertNotification() {
  const names = [
    // 🇺🇸 USA
      "Diego", "Camila", "Carlos", "Valentina", "Javier", "Elena",
    "Santiago", "Lucía", "Goragy", "Isabel", "Maria", "Rafael",
    "Carmen", "Luis", "Paula", "Juan", "Alejandro", "Cristina",

    "James", "Sophia", "Michael", "Antonio", "William", "Olivia",
    "Benjamin", "Ava", "Lucas", "Isabella", "Ethan", "Mia",
    "Alexander", "Charlotte", "Daniel", "Amelia", "Henry", "Harper",
    "Matthew", "Evelyn", "Jack", "Ella", "Noah", "Scarlett",
    "Elijah", "Grace", "Liam", "Lily", "Mason", "Aria",

    // 🇮🇹 Italy
    "Alessandro", "Giulia", "Lorenzo", "Chiara", "Matteo", "Sofia",
    "Francesca", "Leonardo", "Martina", "Andrea", "Lucia", "Gabriele",
    "Vittoria", "Marco", "Beatrice",

    // 🇪🇸 Spain
  
  ];
    const actions = [
    "just deposited $5,000 into their investment account!",
    "withdrew $1,200 profit — smooth and easy!",
    "started trading with $3,500 in Forex markets!",
    "invested $7,800 into a new energy portfolio!",
    "just made a profit of $900 in less than an hour!",
    "joined the platform with a $4,000 start — welcome aboard!",
    "is actively trading with over $10,000 in assets!",
    "just opened a verified investment account!",
    "made a successful withdrawal of $5,300 — no delays!",
    "is making big investment moves today!",
    "upgraded to a premium investor plan!",
    "just referred a new investor and earned a $250 bonus!",
    "secured a 12% return on their last trade!",
    "diversified their portfolio into crypto and stocks!",
    "received a $1,000 performance bonus!",
    "is climbing the leaderboard  top 10 traders this week!",
    "just closed a winning trade on Bitcoin!",
    "started a new position in the oil & gas market!",
    "is exploring renewable energy investments!",
    "earned a referral commission from a new signup!",
    "completed KYC verification successfully!",
    "hit a personal best profit of $2,700 today!",
    "just subscribed to the advanced trading plan!",
    "locked in profits from the US stock market!",
    "secured a new investment contract  impressive!",
    "made their first successful withdrawal  confidence boosted!",
    "reached a new trading milestone  100 trades completed!",
    "just deposited $2,500 to boost their portfolio value!",
    "is now trading live on the global exchange!",
    "cashed out profits from yesterday’s market rally!",
    "just received instant payout confirmation!",
  ];

 
  const countryAlerts = [
    "Someone from USA just deposited $5,000!",
    "A user from Nigeria withdrew $1,200!",
    "Investor from Canada started trading with $3,500!",
    "Someone from Germany invested $7,800!",
    "Trader from UK made a profit of $900!",
  ];

  const [message, setMessage] = useState("");
  const [position, setPosition] = useState("middle");

  useEffect(() => {
    const randomMsg = () => {
      if (Math.random() > 0.5) {
        const n = names[Math.floor(Math.random() * names.length)];
        const a = actions[Math.floor(Math.random() * actions.length)];
        return `🔥 ${n} ${a}`;
      }
      return countryAlerts[Math.floor(Math.random() * countryAlerts.length)];
    };

    const showNotification = () => {
      setMessage(randomMsg());
      setPosition((prev) => (prev === "middle" ? "bottom" : "middle"));
    };

    showNotification();
    const interval = setInterval(showNotification, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* 🔥 Notification */}
      <div
        className={`fixed z-[9999] px-5 py-3 rounded-lg 
        text-orange-600 font-bold bg-white text-sm sm:text-base md:text-lg 
        shadow-lg transition-all duration-500 ease-in-out
        ${
          position === "middle"
            ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-slide-down"
            : "bottom-8 left-1/2 -translate-x-1/2 animate-slide-up"
        }`}
      >
        {message}
      </div>

      <style jsx>{`
        @keyframes slideDown {
          from {
            transform: translate(-50%, -150%);
            opacity: 0;
          }
          to {
            transform: translate(-50%, -50%);
            opacity: 1;
          }
        }
        @keyframes slideUp {
          from {
            transform: translate(-50%, 150%);
            opacity: 0;
          }
          to {
            transform: translate(-50%, 0%);
            opacity: 1;
          }
        }
        .animate-slide-down {
          animation: slideDown 0.5s ease-out;
        }
        .animate-slide-up {
          animation: slideUp 0.5s ease-out;
        }
      `}</style>
    </>
  );
}
