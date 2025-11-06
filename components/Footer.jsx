"use client";
import {
  Mail,
  Phone,
  MapPin,
  Shield,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 w-full">
      {/* Newsletter Signup Section */}
      <div className="bg-gray-800 py-10 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Stay Updated
          </h2>
          <p className="text-gray-400 mb-5 text-sm sm:text-base">
            Subscribe to our newsletter to receive the latest investment news and opportunities.
          </p>
          <form className="flex flex-col sm:flex-row justify-center items-center gap-3 w-full sm:w-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:w-2/3 md:w-1/2 px-4 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg text-white font-semibold w-full sm:w-auto transition duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Energyvest</h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            Smart investments made simple. Trusted by thousands of investors worldwide.
          </p>
          <div className="flex space-x-3 mt-5">
            <a
              href="#"
              className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 transition"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 transition"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 transition"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 transition"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm sm:text-base">
            <li>
              <a href="/" className="hover:text-blue-400 transition">
                Home
              </a>
            </li>
            <li>
              <a href="/dashboard" className="hover:text-blue-400 transition">
                Dashboard
              </a>
            </li>
            <li>
              <a href="/investments" className="hover:text-blue-400 transition">
                Investments
              </a>
            </li>
            <li>
              <a href="/trading" className="hover:text-blue-400 transition">
                Trading
              </a>
            </li>
            <li>
              <a href="/referrals" className="hover:text-blue-400 transition">
                Referrals
              </a>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
          <ul className="space-y-2 text-sm sm:text-base">
            <li>
              <a href="/about" className="hover:text-blue-400 transition">
                About Us
              </a>
            </li>
            <li>
              <a href="/privacy" className="hover:text-blue-400 transition">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:text-blue-400 transition">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="/support" className="hover:text-blue-400 transition">
                Support
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
          <ul className="space-y-3 text-sm sm:text-base">
            <li className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-blue-400" />
              <span>energyvest18@gmail.com</span>
            </li>
            <li className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-blue-400" />
              <span>+1 (873) 900-4468</span>
            </li>
            <li className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-blue-400" />
              <span>New York, USA</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-5 text-center text-gray-400 text-sm px-4">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-2">
          <div className="flex items-center justify-center gap-2">
            <Shield className="w-4 h-4 text-green-400" />
            <span>SSL Secured & Regulated</span>
          </div>
          <span className="hidden sm:inline">|</span>
          <p>© {new Date().getFullYear()} Energyvest. All Rights Reserved.</p>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Investing involves risks. Please invest wisely.
        </p>
      </div>
    </footer>
  );
}
