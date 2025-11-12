"use client";

import React from "react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-6 sm:p-12">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-green-600">
          Privacy Policy
        </h1>
        <p className="text-gray-600 mt-2">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </header>

      {/* Content */}
      <main className="space-y-6 text-gray-700">
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Introduction</h2>
          <p>
            This Privacy Policy explains how EnergyVest collects, uses, and protects 
            the information you provide when using our platform.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Information Collection</h2>
          <p>
            We may collect personal information such as your name, email address, 
            and payment details when you register or make transactions on our platform.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Use of Information</h2>
          <p>
            The information collected is used to provide our services, improve your 
            experience, process payments, and communicate important updates.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Data Security</h2>
          <p>
            We implement reasonable security measures to protect your data. However, 
            no method of transmission over the internet is 100% secure.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Your Rights</h2>
          <p>
            You have the right to access, modify, or delete your personal information 
            stored on our platform. Contact us if you wish to exercise these rights.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Contact Us</h2>
          <p>
            For any privacy-related questions, please reach out to 
            <a href="mailto:support@energyvest.com" className="text-green-600 underline">
              support@energyvest.com
            </a>.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-12 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} EnergyVest. All rights reserved.
      </footer>
    </div>
  );
}
