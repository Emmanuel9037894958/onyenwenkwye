
import Navbar from "@/components/Navbar";
import { BarChart } from "lucide-react";
import AlertNotification from "@/components/AlertNotification";

import "./globals.css";
// ✅ Import both contexts
import { UserProvider } from "@/app/context/UserContext";
import { ClientProvider } from "@/app/context/ClientContext";


export const metadata = {
  title: "Energy-Vest Platform",
  description: "Secure investment dashboard",
  icons: {
    icon: "/barchart.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      </head>

      <body className="min-h-screen bg-gray-50 text-gray-900 relative">
        <UserProvider>
          <ClientProvider>
            <AlertNotification />

            <header className="w-full flex items-center justify-center sm:justify-start bg-white shadow-md">
              <BarChart className="w-8 h-8 text-orange-500 mr-2" />
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                Energy-Vest
              </h1>
            </header>

            <Navbar />
            <main className="pt-6">{children}</main>
          </ClientProvider>
        </UserProvider>
      </body>
    </html>
  );
}
