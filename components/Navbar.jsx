// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import { AnimatePresence } from "framer-motion";
// import { useClient } from "@/app/context/ClientContext";
// import { Bell, User, ChevronDown, BarChart, Moon, Sun } from "lucide-react";
// import { FlagIcon } from "react-flag-kit";
// import Link from "next/link";

// export default function Navbar() {
//   const { client: user, logout } = useClient();
//   const [mounted, setMounted] = useState(false);
//   useEffect(() => setMounted(true), []);

//   const [activeSubMenu, setActiveSubMenu] = useState(null);
//   const [profileMenuOpen, setProfileMenuOpen] = useState(false);
//   const [langMenuOpen, setLangMenuOpen] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [theme, setTheme] = useState("light");

//   const [selectedLang, setSelectedLang] = useState({
//     code: "US",
//     name: "English",
//     gcode: "en",
//   });

//   const profileRef = useRef(null);
//   const langRef = useRef(null);

//   // ---------------------------------------------------
//   // GOOGLE TRANSLATE SCRIPT
//   // ---------------------------------------------------
//   useEffect(() => {
//     if (document.getElementById("google-translate-script")) return;

//     window.googleTranslateElementInit = () => {
//       new window.google.translate.TranslateElement(
//         {
//           pageLanguage: "en",
//           includedLanguages:
//             "en,fr,es,de,it,pt,ru,zh-CN,ja,ko,ar,hi,yo,tw,zu",
//           autoDisplay: false,
//         },
//         "google_translate_element"
//       );
//     };

//     const script = document.createElement("script");
//     script.id = "google-translate-script";
//     script.src =
//       "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
//     document.body.appendChild(script);
//   }, []);

//   const setGoogleLanguage = (gcode) => {
//     const trySet = () => {
//       const sel = document.querySelector(".goog-te-combo");
//       if (sel) {
//         sel.value = gcode;
//         const ev = document.createEvent("HTMLEvents");
//         ev.initEvent("change", true, true);
//         sel.dispatchEvent(ev);
//         return true;
//       }
//       return false;
//     };

//     if (!trySet()) {
//       let attempts = 0;
//       const id = setInterval(() => {
//         attempts++;
//         if (trySet() || attempts > 20) clearInterval(id);
//       }, 300);
//     }
//   };

//   const applyLanguage = (lang) => {
//     setSelectedLang(lang);
//     setLangMenuOpen(false);
//     setGoogleLanguage(lang.gcode);
//   };

//   // ---------------------------------------------------

//   const languages = [
//     { code: "US", name: "English", gcode: "en" },
//     { code: "FR", name: "French", gcode: "fr" },
//     { code: "ES", name: "Spanish", gcode: "es" },
//     { code: "DE", name: "German", gcode: "de" },
//     { code: "IT", name: "Italian", gcode: "it" },
//     { code: "PT", name: "Portuguese", gcode: "pt" },
//     { code: "RU", name: "Russian", gcode: "ru" },
//     { code: "CN", name: "Chinese", gcode: "zh-CN" },
//     { code: "JP", name: "Japanese", gcode: "ja" },
//     { code: "KR", name: "Korean", gcode: "ko" },
//     { code: "SA", name: "Arabic", gcode: "ar" },
//     { code: "IN", name: "Hindi", gcode: "hi" },
//     { code: "NG", name: "Yoruba", gcode: "yo" },
//     { code: "GH", name: "Twi", gcode: "tw" },
//     { code: "ZA", name: "Zulu", gcode: "zu" },
//   ];

//   useEffect(() => {
//     function handleClickOutside(e) {
//       if (profileRef.current && !profileRef.current.contains(e.target)) {
//         setProfileMenuOpen(false);
//       }
//       if (langRef.current && !langRef.current.contains(e.target)) {
//         setLangMenuOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const toggleTheme = () => {
//     const newTheme = theme === "dark" ? "light" : "dark";
//     setTheme(newTheme);
//     document.documentElement.classList.toggle("dark");
//   };

//   const mainLinks = [
//     { label: "Home", href: "/" },
//     { label: "Dashboard", href: "/dashboard" },
//     {
//       label: "Investments",
//       href: "/investments",
//       submenu: [
//         { label: "Stocks", href: "/investments/stocks" },
//         { label: "Crypto", href: "/investments/crypto" },
//         { label: "Forex", href: "/investments/forex" },
//       ],
//     },
//     {
//       label: "Trading",
//       href: "/trading",
//       submenu: [
//         { label: "Live Tracker", href: "/live-tracker" },
//         { label: "Charts", href: "/charts" },
//       ],
//     },
//     { label: "Referrals", href: "/referrals" },
//     { label: "About", href: "/about" },
//     { label: "Privacy", href: "/privacy" },
//     { label: "Terms", href: "/terms" },
//   ];

//   return (
//     <nav className="bg-white dark:bg-gray-900 fixed top-0 left-0 w-full z-50 border-b border-gray-200 dark:border-gray-700 transition-colors">

//       {/* REQUIRED for Google Translate */}
//       <div id="google_translate_element" className="hidden"></div>

//       <div className="mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3">

//         {/* Logo */}
//         <Link href="/" className="flex items-center space-x-2">
//           <BarChart className="w-10 h-9 text-blue-700" />
//           <span className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
//             Energyvest
//           </span>
//         </Link>

//         {/* Desktop Links */}
//         <div className="hidden lg:flex items-center space-x-6">
//           {mainLinks.map((link) => (
//             <div key={link.label} className="relative group">
//               <button
//                 onMouseEnter={() => link.submenu && setActiveSubMenu(link.label)}
//                 onMouseLeave={() => setActiveSubMenu(null)}
//                 className="flex items-center space-x-1 text-gray-900 dark:text-white font-medium hover:text-blue-600 dark:hover:text-blue-400 transition"
//               >
//                 <Link href={link.href}>{link.label}</Link>
//                 {link.submenu && <ChevronDown className="w-4 h-4" />}
//               </button>

//               {link.submenu && activeSubMenu === link.label && (
//                 <div className="absolute top-10 left-0 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg p-2 z-50 w-40">
//                   {link.submenu.map((item) => (
//                     <Link
//                       key={item.href}
//                       href={item.href}
//                       className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg"
//                     >
//                       {item.label}
//                     </Link>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}

//           {/* Admin */}
//           {mounted && user?.role === "admin" && (
//             <Link
//               href="/admin"
//               className="flex items-center space-x-1 text-gray-900 dark:text-white font-medium hover:text-blue-600 dark:hover:text-blue-400 transition"
//             >
//               Admin
//             </Link>
//           )}
//         </div>

//         {/* Right Side: Language + Theme + Bell + Profile + Mobile */}
//         <div className="flex items-center space-x-3">

//           {/* Language Dropdown INLINE */}
//           <div className="relative" ref={langRef}>
//             <button
//               onClick={() => setLangMenuOpen((s) => !s)}
//               className="flex items-center space-x-2 px-2 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
//             >
//               <FlagIcon code={selectedLang.code} size={20} />
//               <span className="hidden sm:block text-gray-900 dark:text-white text-sm">
//                 {selectedLang.name}
//               </span>
//               <ChevronDown className="w-4 h-4" />
//             </button>

//             {langMenuOpen && (
//               <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-md z-50 max-h-60 overflow-y-auto">
//                 {languages.map((lang) => (
//                   <button
//                     key={lang.code}
//                     onClick={() => applyLanguage(lang)}
//                     className="flex items-center w-full px-3 py-2 text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg text-sm"
//                   >
//                     <FlagIcon code={lang.code} size={18} className="mr-2" />
//                     {lang.name}
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Theme Toggle */}
//           <button
//             onClick={toggleTheme}
//             className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
//           >
//             {theme === "dark" ? (
//               <Sun className="w-5 h-5 text-yellow-400" />
//             ) : (
//               <Moon className="w-5 h-5 text-gray-700" />
//             )}
//           </button>

//           {/* Notification */}
//           <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
//             <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
//             <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-1 ring-white"></span>
//           </button>

//           {/* Profile */}
//           <div className="relative hidden lg:block" ref={profileRef}>
//             <button
//               onClick={() => setProfileMenuOpen((s) => !s)}
//               className="flex items-center space-x-1 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
//             >
//               <User className="w-5 h-5 text-gray-600 dark:text-gray-300" />
//               <span className="hidden sm:block text-gray-900 dark:text-white text-sm">
//                 {mounted && user ? user.username || user.email : "Account"}
//               </span>
//               <ChevronDown className="w-4 h-4" />
//             </button>

//             {profileMenuOpen && (
//               <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-md z-50">
//                 {mounted && user ? (
//                   <button
//                     onClick={logout}
//                     className="w-full text-left px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg text-sm"
//                   >
//                     Logout
//                   </button>
//                 ) : (
//                   <>
//                     <Link
//                       href="/login"
//                       className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg text-sm"
//                     >
//                       Login
//                     </Link>
//                     <Link
//                       href="/register"
//                       className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg text-sm"
//                     >
//                       Register
//                     </Link>
//                   </>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
//             onClick={() => setMobileOpen((s) => !s)}
//           >
//             <svg
//               className="w-6 h-6 text-gray-700 dark:text-gray-200"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth={2}
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M4 6h16M4 12h16M4 18h16"
//               />
//             </svg>
//           </button>
//         </div>
//       </div>

//       {/* MOBILE MENU */}
//       <AnimatePresence>
//         {mobileOpen && (
//           <div className="fixed inset-y-0 left-0 w-72 shadow-lg z-40 lg:hidden p-4 overflow-y-auto backdrop-blur-lg bg-white/60 dark:bg-gray-900/80">
//             <button
//               className="mb-6 text-gray-700 dark:text-gray-200 font-bold"
//               onClick={() => setMobileOpen(false)}
//             >
//               X
//             </button>

//             {mainLinks.map((link) => (
//               <Link
//                 key={link.label}
//                 href={link.href}
//                 onClick={() => setMobileOpen(false)}
//                 className="block py-2 text-orange-600 dark:text-gray-100 font-bold border-b border-gray-200 dark:border-gray-700"
//               >
//                 {link.label}
//               </Link>
//             ))}

//             {mounted && user?.role === "admin" && (
//               <Link
//                 href="/admin"
//                 onClick={() => setMobileOpen(false)}
//                 className="block py-2 text-gray-900 dark:text-gray-100 font-medium border-b border-gray-200 dark:border-gray-700"
//               >
//                 Admin
//               </Link>
//             )}

//             {/* Mobile Language */}
//             <div className="mt-4">
//               <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
//                 Language
//               </p>
//               {languages.map((lang) => (
//                 <button
//                   key={lang.code}
//                   onClick={() => {
//                     setSelectedLang(lang);
//                     setMobileOpen(false);
//                     setGoogleLanguage(lang.gcode);
//                   }}
//                   className="flex items-center w-full px-2 py-1 text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg text-sm"
//                 >
//                   <FlagIcon code={lang.code} size={18} className="mr-2" />
//                   {lang.name}
//                 </button>
//               ))}
//             </div>

//             {/* Mobile Profile */}
//             <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
//               {mounted && user ? (
//                 <>
//                   <p className="text-gray-900 dark:text-gray-100 mb-2">
//                     {user.username || user.email}
//                   </p>
//                   <button
//                     onClick={() => {
//                       logout();
//                       setMobileOpen(false);
//                     }}
//                     className="w-full text-left px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg text-sm"
//                   >
//                     Logout
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <Link
//                     href="/login"
//                     onClick={() => setMobileOpen(false)}
//                     className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg text-sm"
//                   >
//                     Login
//                   </Link>
//                   <Link
//                     href="/register"
//                     onClick={() => setMobileOpen(false)}
//                     className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg text-sm"
//                   >
//                     Register
//                   </Link>
//                 </>
//               )}
//             </div>
//           </div>
//         )}
//       </AnimatePresence>
//     </nav>
//   );
// }



"use client";
import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { useClient } from "@/app/context/ClientContext";
import { Bell, User, ChevronDown, BarChart, Moon, Sun } from "lucide-react";
import { FlagIcon } from "react-flag-kit";
import Link from "next/link";

export default function Navbar() {
  const { client: user, logout } = useClient();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  const [selectedLang, setSelectedLang] = useState({
    code: "US",
    name: "English",
    gcode: "en",
  });

  const profileRef = useRef(null);
  const langRef = useRef(null);

  // -----------------------------
  // GOOGLE TRANSLATE (hidden)
  // -----------------------------
  useEffect(() => {
    if (document.getElementById("google-translate-script")) return;

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages:
            "en,fr,es,de,it,pt,ru,zh-CN,ja,ko,ar,hi,yo,tw,zu",
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };

    const script = document.createElement("script");
    script.id = "google-translate-script";
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.body.appendChild(script);
  }, []);

  const setGoogleLanguage = (gcode) => {
    const trySet = () => {
      const sel = document.querySelector(".goog-te-combo");
      if (sel) {
        sel.value = gcode;
        const ev = document.createEvent("HTMLEvents");
        ev.initEvent("change", true, true);
        sel.dispatchEvent(ev);
        return true;
      }
      return false;
    };

    if (!trySet()) {
      let attempts = 0;
      const id = setInterval(() => {
        attempts++;
        if (trySet() || attempts > 20) clearInterval(id);
      }, 300);
    }
  };

  const applyLanguage = (lang) => {
    setSelectedLang(lang);
    setLangMenuOpen(false);
    setGoogleLanguage(lang.gcode);
  };

  const languages = [
    { code: "US", name: "English", gcode: "en" },
    { code: "FR", name: "French", gcode: "fr" },
    { code: "ES", name: "Spanish", gcode: "es" },
    { code: "DE", name: "German", gcode: "de" },
    { code: "IT", name: "Italian", gcode: "it" },
    { code: "PT", name: "Portuguese", gcode: "pt" },
    { code: "RU", name: "Russian", gcode: "ru" },
    { code: "CN", name: "Chinese", gcode: "zh-CN" },
    { code: "JP", name: "Japanese", gcode: "ja" },
    { code: "KR", name: "Korean", gcode: "ko" },
    { code: "SA", name: "Arabic", gcode: "ar" },
    { code: "IN", name: "Hindi", gcode: "hi" },
    { code: "NG", name: "Yoruba", gcode: "yo" },
    { code: "GH", name: "Twi", gcode: "tw" },
    { code: "ZA", name: "Zulu", gcode: "zu" },
  ];

  useEffect(() => {
    function handleClickOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileMenuOpen(false);
      }
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
  };

  const mainLinks = [
    { label: "Home", href: "/" },
    { label: "Dashboard", href: "/dashboard" },
    {
      label: "Investments",
      href: "/investments",
      submenu: [
        { label: "Stocks", href: "/investments/stocks" },
        { label: "Crypto", href: "/investments/crypto" },
        { label: "Forex", href: "/investments/forex" },
      ],
    },
    {
      label: "Trading",
      href: "/trading",
      submenu: [
        { label: "Live Tracker", href: "/live-tracker" },
        { label: "Charts", href: "/charts" },
      ],
    },
    { label: "Referrals", href: "/referrals" },
    { label: "About", href: "/about" },
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 fixed top-0 left-0 w-full z-50 border-b border-gray-200 dark:border-gray-700 transition-colors">

      {/* Hidden Google Translate container */}
      <div id="google_translate_element" className="hidden"></div>

      <div className="mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3">

        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <BarChart className="w-10 h-9 text-blue-700" />
          <span className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
            Energyvest
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center space-x-6">
          {mainLinks.map((link) => (
            <div key={link.label} className="relative group">
              <button
                onMouseEnter={() => link.submenu && setActiveSubMenu(link.label)}
                onMouseLeave={() => setActiveSubMenu(null)}
                className="flex items-center space-x-1 text-gray-900 dark:text-white font-medium hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                <Link href={link.href}>{link.label}</Link>
                {link.submenu && <ChevronDown className="w-4 h-4" />}
              </button>

              {link.submenu && activeSubMenu === link.label && (
                <div className="absolute top-10 left-0 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg p-2 z-50 w-40">
                  {link.submenu.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          {mounted && user?.role === "admin" && (
            <Link
              href="/admin"
              className="flex items-center space-x-1 text-gray-900 dark:text-white font-medium hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              Admin
            </Link>
          )}
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-3">

          {/* Language Dropdown */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangMenuOpen((s) => !s)}
              className="flex items-center space-x-2 px-2 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <FlagIcon code={selectedLang.code} size={20} />
              <span className="hidden sm:block text-gray-900 dark:text-white text-sm">
                {selectedLang.name}
              </span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-md z-50 max-h-60 overflow-y-auto">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => applyLanguage(lang)}
                    className="flex items-center w-full px-3 py-2 text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg text-sm"
                  >
                    <FlagIcon code={lang.code} size={18} className="mr-2" />
                    {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-700" />
            )}
          </button>

          {/* Notification */}
          <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
            <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-1 ring-white"></span>
          </button>

          {/* Profile */}
          <div className="relative hidden lg:block" ref={profileRef}>
            <button
              onClick={() => setProfileMenuOpen((s) => !s)}
              className="flex items-center space-x-1 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <User className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              <span className="hidden sm:block text-gray-900 dark:text-white text-sm">
                {mounted && user ? user.username || user.email : "Account"}
              </span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {profileMenuOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-md z-50">
                {mounted && user ? (
                  <button
                    onClick={logout}
                    className="w-full text-left px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg text-sm"
                  >
                    Logout
                  </button>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg text-sm"
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg text-sm"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => setMobileOpen((s) => !s)}
          >
            <svg
              className="w-6 h-6 text-gray-700 dark:text-gray-200"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-y-0 left-0 w-72 shadow-lg z-40 lg:hidden p-4 overflow-y-auto backdrop-blur-lg bg-white/60 dark:bg-gray-900/80">
            <button
              className="mb-6 text-gray-700 dark:text-gray-200 font-bold"
              onClick={() => setMobileOpen(false)}
            >
              X
            </button>

            {mainLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-orange-600 dark:text-gray-100 font-bold border-b border-gray-200 dark:border-gray-700"
              >
                {link.label}
              </Link>
            ))}

            {mounted && user?.role === "admin" && (
              <Link
                href="/admin"
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-gray-900 dark:text-gray-100 font-medium border-b border-gray-200 dark:border-gray-700"
              >
                Admin
              </Link>
            )}

            {/* Mobile Language */}
            <div className="mt-4">
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
                Language
              </p>
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setSelectedLang(lang);
                    setMobileOpen(false);
                    setGoogleLanguage(lang.gcode);
                  }}
                  className="flex items-center w-full px-2 py-1 text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg text-sm"
                >
                  <FlagIcon code={lang.code} size={18} className="mr-2" />
                  {lang.name}
                </button>
              ))}
            </div>

            {/* Mobile Profile */}
            <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
              {mounted && user ? (
                <>
                  <p className="text-gray-900 dark:text-gray-100 mb-2">
                    {user.username || user.email}
                  </p>
                  <button
                    onClick={() => {
                      logout();
                      setMobileOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg text-sm"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg text-sm"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg text-sm"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </AnimatePresence>
    </nav>
  );
}

