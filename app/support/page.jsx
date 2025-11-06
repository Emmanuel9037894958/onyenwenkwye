"use client";

import React from "react";
import { Mail, Phone, MessageCircle, ShieldCheck, DollarSign } from "lucide-react";

export default function SupportPage() {
  return (
    <section className="min-h-screen bg-gray-50 flex flex-col items-center py-16 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="text-center max-w-3xl">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
          We're Here to Help You
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          Whether you're new to{" "}
          <span className="font-semibold text-orange-500">Energy-Vest</span> or an
          experienced investor, our support team is committed to ensuring your
          investment journey is secure, transparent, and profitable.
        </p>
      </header>

      {/* Info Cards */}
      <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl">
        {/* Investment Support */}
        <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition duration-300">
          <DollarSign className="w-12 h-12 text-orange-500 mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Investment Support
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Get help choosing the right investment plan, tracking your progress,
            or optimizing your returns. Our support advisors are always ready to
            assist at every stage of your investment.
          </p>
        </div>

        {/* Fund Security */}
        <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition duration-300">
          <ShieldCheck className="w-12 h-12 text-green-500 mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Fund Security
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Your funds are fully protected with advanced encryption, trusted
            payment gateways, and 24/7 account monitoring — ensuring safety and
            peace of mind for every investor.
          </p>
        </div>

        {/* Live Support */}
        <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition duration-300">
          <MessageCircle className="w-12 h-12 text-blue-500 mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            24/7 Live Assistance
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Our expert team is available day and night via live chat, phone, or
            email. Quick responses, real solutions — because your success is our
            mission.
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <div className="mt-20 bg-white rounded-3xl shadow-md p-10 max-w-4xl w-full">
        <h3 className="text-2xl font-bold text-gray-900 text-center mb-6">
          Contact Our Support Team
        </h3>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-gray-700">
          <div className="flex items-center gap-3">
            <Mail className="w-6 h-6 text-orange-500" />
            <span className="font-medium"><a href="mailto:energyvest18@gmail.com">energyvest18@gmail.com</a></span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-6 h-6 text-green-600" />
            <span className="font-medium"><a href="tel:+1 (873) 900-4468">+1 (873) 900-4468</a></span>
          </div>
        </div>

        <p className="text-center mt-8 text-sm text-gray-500">
          Our team typically responds within{" "}
          <span className="text-orange-500 font-medium">1–3 hours</span>.  
          Your satisfaction and financial growth are our top priorities.
        </p>
      </div>
    </section>
  );
}
