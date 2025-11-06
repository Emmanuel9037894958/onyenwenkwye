import Navbar from "@/components/Navbar";
import { BarChart } from "lucide-react";
import AlertNotification from "@/components/AlertNotification";
import Script from "next/script"; // ✅ import this

import "./globals.css";
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
      <head></head>

      <body className="bg-gray-50 text-gray-900 relative">
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

        {/* ✅ Correct Tawk.to Script */}
        <Script id="tawk-to" strategy="afterInteractive">
          {`
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/690cc1edd0d40e1958e8c1ba/1j9ctb2pj';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
            })();
          `}
        </Script>
      </body>
    </html>
  );
}
