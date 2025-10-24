"use client";
import React from "react";
import {
  Info,
  Briefcase,
  MessageSquare,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  BarChart3,
  DollarSign,
  Globe,
} from "lucide-react";
import Invest from "./Invest";

// 🔹 Cards Data
const cards = [
  {
    id: 1,
    icon: <Info className="w-9 h-9 text-orange-500" />,
    title: "About Us",
    text: "Trusted investment platform focused on innovation and transparency.",
  },
  {
    id: 2,
    icon: <Briefcase className="w-9 h-9 text-orange-500" />,
    title: "Our Services",
    text: "From oil & gas to sustainable investments, we provide global solutions.",
  },
  {
    id: 3,
    icon: <MessageSquare className="w-9 h-9 text-orange-500" />,
    title: "Get in Touch",
    text: "We are here to answer your questions and guide your investment journey.",
  },
  {
    id: 4,
    icon: <TrendingUp className="w-9 h-9 text-orange-500" />,
    title: "Investment Plans",
    text: "Flexible plans designed to help you achieve financial freedom.",
  },
];

const features = [
  {
    icon: <ShieldCheck className="w-7 h-7 text-orange-500" />,
    title: "Secure & Trusted",
    desc: "We prioritize security and transparency, ensuring your funds are always safe.",
  },
  {
    icon: <BarChart3 className="w-7 h-7 text-orange-500" />,
    title: "Smart Analytics",
    desc: "Track investments in real-time with advanced analytics and reports.",
  },
  {
    icon: <DollarSign className="w-7 h-7 text-orange-500" />,
    title: "Profitable Growth",
    desc: "Get access to high-return opportunities backed by expert strategies.",
  },
  {
    icon: <Globe className="w-7 h-7 text-orange-500" />,
    title: "Global Reach",
    desc: "Invest across multiple industries and global markets with ease.",
  },
];

const testimonials = [
  {
    name: "Michael O.",
    text: "Energy-vest has completely transformed the way I invest. I now have a steady passive income stream and total control over my assets.",
  },
  {
    name: "Sarah A.",
    text: "I love the transparency! Their reports are clear, and withdrawals are always smooth. Highly recommended.",
  },
  {
    name: "James K.",
    text: "Best investment platform I've ever used. Their oil & gas plans are unmatched in profitability and security.",
  },
];

function LearnMore() {
  return (
    <div className="bg-gray-50 px-2 sm:px-4 md:px-10 lg:px-16 py-6 sm:py-10 md:py-14 space-y-10 sm:space-y-14 md:space-y-16 w-full">
      {/* 🔹 Heading */}
      <section className="text-center space-y-3 max-w-3xl mx-auto">
        <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-gray-800">
          Learn More About <span className="text-orange-500">Energy-vest</span>
        </h2>
        <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed px-2">
          At Energy-vest, we go beyond ordinary investment opportunities. We empower our clients with reliable, transparent, and global investment solutions designed to secure financial freedom.
        </p>
      </section>

      {/* 🔹 Cards Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 w-full">
        {cards.map((card) => (
          <div
            key={card.id}
            className="flex flex-col items-center text-center border rounded-lg shadow-sm p-4 sm:p-5 bg-white hover:shadow-lg hover:shadow-orange-500/40 transition-all w-full"
          >
            {card.icon}
            <h3 className="mt-3 text-base sm:text-lg font-semibold text-gray-800">{card.title}</h3>
            <p className="mt-2 text-gray-600 text-sm leading-relaxed">{card.text}</p>
          </div>
        ))}
      </section>

      {/* 🔹 Trust Section */}
      <section className="bg-white rounded-xl shadow-sm p-4 sm:p-6 md:p-8 w-full">
        <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-800 text-center md:text-left leading-snug">
          TRUST, <span className="text-orange-500">Security</span>, Prosperity, Insight, Success.
        </h3>
        <p className="mt-4 text-gray-700 text-sm sm:text-base md:text-lg text-justify">
          We are a global financial institution specializing in diversified investment activities across both traditional financial markets and the rapidly evolving digital asset space. Our operations are powered by a team of highly skilled professional traders with deep expertise in equities, commodities, foreign exchange, and cryptocurrency exchanges — delivering reliable strategies designed for long-term growth and stability.
        </p>
        <div className="mt-6 flex justify-center md:justify-start">
          <button className="flex items-center gap-2 bg-black text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium hover:bg-orange-500 hover:shadow-md transition-all">
            Learn More <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 🔹 Features Section */}
      <section className="w-full">
        <h3 className="text-xl sm:text-3xl font-bold text-center text-gray-800">
          Why Choose <span className="text-orange-500">Us</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mt-6 sm:mt-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="border rounded-lg shadow-sm bg-white p-4 sm:p-6 flex flex-col items-center text-center hover:shadow-md transition w-full"
            >
              {feature.icon}
              <h4 className="mt-3 text-base sm:text-lg font-semibold text-gray-800">{feature.title}</h4>
              <p className="mt-2 text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 🔹 Video Section */}
      <section className="max-w-3xl mx-auto w-full">
        <div className="relative w-full overflow-hidden rounded-lg shadow-md" style={{ paddingTop: "56.25%" }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/VIKJXdkwVgA"
            frameBorder="0"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            title="Energy-vest Introduction"
          />
        </div>
      </section>

      {/* 🔹 Testimonials Section */}
      <section className="w-full">
        <h3 className="text-xl sm:text-3xl font-bold text-center text-gray-800">
          What Our Clients Say
        </h3>
        <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="border rounded-lg shadow-sm bg-white p-4 sm:p-5 text-center hover:shadow-md transition w-full"
            >
              <p className="text-gray-600 italic text-sm sm:text-base">"{t.text}"</p>
              <h4 className="mt-3 font-semibold text-gray-800 text-sm sm:text-base">{t.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* 🔹 CTA Section */}
      <section className="bg-orange-500 py-8 sm:py-10 px-3 sm:px-6 rounded-2xl text-white text-center space-y-3 sm:space-y-4 w-full">
        <h3 className="text-xl sm:text-3xl font-bold">Ready to Secure Your Financial Future?</h3>
        <p className="text-sm sm:text-base md:text-lg">
          Join thousands of investors and start growing your wealth today.
        </p>
        <button className="bg-white text-orange-600 px-5 sm:px-8 py-2.5 sm:py-3 rounded-lg shadow-md hover:shadow-lg font-semibold">
          Get Started Now
        </button>
      </section>

      {/* 🔹 Investment Plans Section */}
      <Invest />
    </div>
  );
}

export default LearnMore;
