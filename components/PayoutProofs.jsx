"use client";
import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export default function PayoutProofs() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 2500 })]);
  const [payoutData, setPayoutData] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const countries = ["USA", "UK", "Iran", "Germany", "Canada", "France", "Brazil", "Japan", "Australia"];

    // Create 26 items
    const data = Array.from({ length: 25 }, (_, i) => {
      const num = i + 1;
      const randomAvatar = `https://randomuser.me/api/portraits/${
        Math.random() > 0.5 ? "men" : "women"
      }/${Math.floor(Math.random() * 100)}.jpg`;
      const randomCountry = countries[Math.floor(Math.random() * countries.length)];

      // Fetch images from back, i.e., image26 first
      const imageNum = 25 - i;

      return {
        id: num,                  // client number stays 1→26
        image: `/image${imageNum}.jpg`, // images reversed
        avatar: randomAvatar,
        name: `Client ${num}`,
        country: randomCountry,
        message: `Just received payout proof number ${num}!`,
      };
    });

    setPayoutData(data);
  }, []);

  if (!mounted) return null;

  return (
    <section className="bg-gray-50">
      <h2 className="text-center text-3xl font-bold mb-12">Recent Payout Proofs</h2>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6">
          {payoutData.map((item) => (
            <div key={item.id} className="flex-none w-[300px] bg-white rounded-3xl shadow-md overflow-hidden">
              <img
                src={item.image}
                alt={`Payout proof ${item.id}`}
                className="w-full h-56 object-cover"
              />
              <div className="p-5">
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-lg"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.country}</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">{item.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
