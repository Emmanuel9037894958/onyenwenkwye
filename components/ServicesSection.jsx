"use client";
import React from "react";
import Link from "next/link";
import FaqPreview from "./FaqPreview";

export default function ServicesSection() {
  const services = [
    {
      id: 1,
      title: "Forex Trading",
      description:
        "Forex is a portmanteau of foreign currency and exchange...",
      link: "https://financialit.net/news/trading-systems/forex-indicators-every-trader-should-know",
      image: "/forext.jpeg",
    },
    {
      id: 2,
      title: "Real Estate Investments",
      description:
        "Real estate investments involve the purchase, ownership, and management...",
      link: "/services/real-estate",
      image: "/realEastate.jpeg",
    },
    {
      id: 3,
      title: "Gold Investments",
      description: "Commonly seen as a great store of wealth...",
      link: "/services/gold-investments",
      image: "/Gold.jpg",
    },
    {
      id: 4,
      title: "Retirement Planning",
      description: "Saving for retirement can be a daunting task...",
      link: "/services/retirement-planning",
      image: "/recuriteimage.jpeg",
    },
    {
      id: 5,
      title: "Medical Cannabis",
      description:
        "For many years we have been working conscientiously...",
      link: "/services/medical-cannabis",
      image: "/medicine.jpeg",
    },
    {
      id: 6,
      title: "Cryptocurrencies",
      description:
        "Energy-Vest.xyz now offers all traders the opportunity to trade top-ranked digital coins 24/7...",
      link: "/services/cryptocurrencies",
      image: "/currency.jpeg",
    },
    {
      id: 7,
      title: "Financial Planning",
      description:
        "A financial plan is a comprehensive evaluation of an investor's current and future financial state...",
      link: "/services/financial-planning",
      image: "/finical.jpeg",
    },
    {
      id: 8,
      title: "Oil and Gas",
      description: "Anyone can invest in the oil market to make a profit...",
      link: "/services/oil-gas",
      image: "/oil.webp",
    },
    {
      id: 9,
      title: "Loans and Grants",
      description: "Getting a loan does not have to be intimidating...",
      link: "/services/loans-grants",
      image: "/loans2.jpeg",
    },
    {
      id: 10,
      title: "Stock or Share",
      description:
        "A stock or share represents ownership in a company...",
      link: "https://corporatefinanceinstitute.com/resources/equities/what-is-a-stock/",
      image: "/stocks.jpeg",
    },
  ];

  return (
    <section
      id="learn-more"
      className=" md:px-10 bg-gray-100 py-12 sm:py-16"
    >
      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 leading-snug">
          Our Services
        </h2>
        <p className="mt-3 sm:mt-4 text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
          Explore a wide range of investment opportunities tailored for your
          financial growth.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white shadow-md hover:shadow-lg transition-all duration-300 rounded-xl overflow-hidden flex flex-col"
          >
            {/* Image */}
            <div className="h-44 sm:h-48 md:h-52 lg:h-56 overflow-hidden">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col flex-grow items-center text-center p-5">
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">
                {service.description}
              </p>

              <Link href={service.link}>
                <button className="bg-orange-500 text-white font-semibold px-5 py-2 rounded-full hover:bg-orange-600 transition-all">
                  Learn More
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="mt-16">
        <FaqPreview />
      </div>
    </section>
  );
}
