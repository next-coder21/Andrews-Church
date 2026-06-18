"use client";

import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";
import WaveDivider from "./WaveDivider";

const pages = [
  { href: "/about", ta: "எங்களைப் பற்றி", en: "About" },
  { href: "/sermons", ta: "பிரசங்கம்", en: "Sermons" },
  { href: "/ministries", ta: "ஊழியம்", en: "Ministries" },
  { href: "/events", ta: "நிகழ்வுகள்", en: "Events" },
  { href: "/contact", ta: "தொடர்பு", en: "Contact" },
];

export default function Footer() {
  const { lang, t } = useLanguage();

  return (
    <footer className="bg-navy pb-20 md:pb-0">
      <WaveDivider fill="#03045e" background="#ffffff" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <rect x="11" y="1" width="2" height="22" fill="#00b4d8" />
                <rect x="1" y="8" width="22" height="2" fill="#00b4d8" />
              </svg>
              <span className={`text-white text-[15px] font-semibold ${lang === "ta" ? "font-tamil" : ""}`}>
                {t("சி.எஸ்.ஐ. செயின்ட் ஆண்ட்ரூஸ்", "C.S.I St. Andrew's Church")}
              </span>
            </div>
            <p className={`text-[13px] text-white/35 leading-relaxed mb-1 ${lang === "ta" ? "font-tamil" : ""}`}>
              {t("கூடங்குளம், திருநெல்வேலி மாவட்டம்", "Koodankulam, Tirunelveli District")}
            </p>
            <p className="text-[12px] text-white/25">Tamil Nadu 627106</p>
            <p className="text-[12px] text-white/25 mt-0.5">CSI Kanyakumari Diocese</p>
          </div>

          {/* Pages */}
          <div>
            <p className={`text-[10px] tracking-widest uppercase font-semibold text-white/25 mb-4 ${lang === "ta" ? "font-tamil" : ""}`}>
              {t("பக்கங்கள்", "Pages")}
            </p>
            <ul className="space-y-3">
              {pages.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} className="flex items-center gap-2 group">
                    <span className={`text-[13px] text-white/45 group-hover:text-white transition-colors ${lang === "ta" ? "font-tamil" : ""}`}>
                      {t(p.ta, p.en)}
                    </span>
                    <span className="text-[11px] text-white/20">{lang === "ta" ? p.en : p.ta}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service times */}
          <div>
            <p className={`text-[10px] tracking-widest uppercase font-semibold text-white/25 mb-4 ${lang === "ta" ? "font-tamil" : ""}`}>
              {t("வழிபாடு நேரம்", "Service Times")}
            </p>
            <ul className="space-y-2.5 text-[13px] text-white/35">
              <li className={lang === "ta" ? "font-tamil" : ""}>{t("ஞாயிறு — காலை 8:30", "Sunday — 8:30 AM")}</li>
              <li className={lang === "ta" ? "font-tamil" : ""}>{t("புதன் — மாலை 7:00", "Wednesday — 7:00 PM")}</li>
              <li className={lang === "ta" ? "font-tamil" : ""}>{t("வெள்ளி — மாலை 6:00", "Friday — 6:00 PM")}</li>
            </ul>
            <div className="mt-5 pt-5 border-t border-white/8 space-y-1.5 text-[12px] text-white/30">
              <p>Koodankulam, Radhapuram Block</p>
              <p>Tirunelveli Dist., TN 627106</p>
            </div>
          </div>
        </div>

        <div className="py-4 border-t border-white/8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
          <span className={`text-[11px] text-white/20 ${lang === "ta" ? "font-tamil" : ""}`}>
            &copy; {new Date().getFullYear()} {t("சி.எஸ்.ஐ. செயின்ட் ஆண்ட்ரூஸ் திருச்சபை", "C.S.I St. Andrew's Church, Koodankulam")}
          </span>
          <span className="text-[11px] text-white/15">Est. 1842 · C.S.I</span>
        </div>
      </div>
    </footer>
  );
}
