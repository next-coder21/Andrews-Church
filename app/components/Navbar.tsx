"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

const links = [
  { href: "/", ta: "முகப்பு", en: "Home" },
  { href: "/about", ta: "எங்களைப் பற்றி", en: "About" },
  { href: "/sermons", ta: "பிரசங்கம்", en: "Sermons" },
  { href: "/ministries", ta: "ஊழியம்", en: "Ministries" },
  { href: "/events", ta: "நிகழ்வுகள்", en: "Events" },
  { href: "/contact", ta: "தொடர்பு", en: "Contact" },
];

function LangToggle() {
  const { lang, toggle } = useLanguage();
  return (
    <button
      onClick={toggle}
      className="flex items-center rounded-full border border-slate-200 overflow-hidden text-[11px] font-semibold transition-colors hover:border-cerulean"
      aria-label="Switch language"
    >
      <span className={`px-2.5 py-1.5 transition-colors font-tamil ${lang === "ta" ? "bg-cerulean text-white" : "text-slate-400 hover:text-slate-600"}`}>
        தமிழ்
      </span>
      <span className={`px-2.5 py-1.5 transition-colors ${lang === "en" ? "bg-cerulean text-white" : "text-slate-400 hover:text-slate-600"}`}>
        EN
      </span>
    </button>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { lang, t } = useLanguage();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-sm border-b border-slate-100" : "bg-white/95 backdrop-blur-sm"}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 flex h-16 items-center justify-between gap-3">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 min-w-0 shrink">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="shrink-0">
            <rect x="11" y="1" width="2" height="22" fill="#0077b6" />
            <rect x="1" y="8" width="22" height="2" fill="#0077b6" />
          </svg>
          <div className="min-w-0 hidden sm:block">
            <p className={`text-navy text-[13px] font-semibold leading-tight truncate ${lang === "ta" ? "font-tamil" : ""}`}>
              {lang === "ta" ? "சி.எஸ்.ஐ. செயின்ட் ஆண்ட்ரூஸ்" : "C.S.I St. Andrew's Church"}
            </p>
            <p className="text-slate-400 text-[10px] leading-tight">
              {lang === "ta" ? "கூடங்குளம்" : "Koodankulam, TN 627106"}
            </p>
          </div>
          <div className="sm:hidden">
            <p className="text-navy text-[13px] font-semibold">St. Andrew&apos;s</p>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-0.5">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-2 rounded text-[12px] font-medium transition-colors ${lang === "ta" ? "font-tamil" : ""} ${
                pathname === link.href
                  ? "text-cerulean bg-ice/50"
                  : "text-slate-500 hover:text-navy hover:bg-slate-50"
              }`}
            >
              {t(link.ta, link.en)}
            </Link>
          ))}
          <Link
            href="/contact"
            className={`ml-3 px-4 py-2 bg-cerulean text-white text-[12px] font-semibold rounded hover:bg-navy transition-colors ${lang === "ta" ? "font-tamil" : ""}`}
          >
            {t("தொடர்பு கொள்க", "Contact Us")}
          </Link>
        </nav>

        {/* Right side: toggle + hamburger */}
        <div className="flex items-center gap-2 shrink-0">
          <LangToggle />
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 text-slate-500 hover:text-navy rounded-lg hover:bg-slate-50 transition-colors"
            aria-label="Menu"
          >
            <svg width="20" height="20" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              {open ? (
                <><line x1="4" y1="4" x2="18" y2="18" /><line x1="18" y1="4" x2="4" y2="18" /></>
              ) : (
                <><line x1="3" y1="6" x2="19" y2="6" /><line x1="3" y1="11" x2="19" y2="11" /><line x1="3" y1="16" x2="19" y2="16" /></>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden overflow-hidden bg-white border-t border-slate-100 shadow-lg"
          >
            <nav className="px-4 py-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center justify-between py-3.5 border-b border-slate-50 transition-colors ${
                    pathname === link.href ? "text-cerulean" : "text-navy hover:text-cerulean"
                  }`}
                >
                  <span className={`text-[15px] font-medium ${lang === "ta" ? "font-tamil" : ""}`}>
                    {t(link.ta, link.en)}
                  </span>
                  <span className="text-[11px] text-slate-300">
                    {lang === "ta" ? link.en : link.ta}
                  </span>
                </Link>
              ))}
              <div className="pt-3 pb-2">
                <Link
                  href="/contact"
                  className={`block w-full text-center py-3 bg-cerulean text-white font-semibold text-[15px] rounded-lg hover:bg-navy transition-colors ${lang === "ta" ? "font-tamil" : ""}`}
                >
                  {t("தொடர்பு கொள்க", "Contact Us")}
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
