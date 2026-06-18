"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";
import WaveDivider from "./WaveDivider";

export default function HeroSection() {
  const { lang, t } = useLanguage();

  return (
    <section className="relative min-h-[100svh] flex flex-col justify-center bg-white overflow-hidden pb-20">

      {/* ── RIGHT IMAGE — absolute, full section height, right half on md+ ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="hidden md:block absolute inset-y-0 right-0 w-[45%] lg:w-[42%]"
      >
        <Image
          src="/church/church-hero.png"
          alt="C.S.I St. Andrew's Church, Koodankulam"
          fill
          priority
          sizes="45vw"
          className="object-cover object-top"
        />
        {/* Left-side fade so image blends into white background */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent" />
        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white/40 to-transparent" />
      </motion.div>

      {/* Background tint */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-azure/5 rounded-full blur-3xl" />
      </div>

      {/* Ghost year */}
      <div
        className="absolute left-4 bottom-10 select-none pointer-events-none leading-none hidden sm:block"
        aria-hidden
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(60px, 10vw, 160px)",
          fontWeight: 700,
          color: "transparent",
          WebkitTextStroke: "1.5px rgba(0,180,216,0.06)",
          lineHeight: 0.85,
        }}
      >
        1842
      </div>

      {/* ── LEFT TEXT — constrained to left ~55% on md+ ── */}
      <div className="relative z-10 w-full md:w-[55%] lg:w-[52%] px-4 sm:px-8 lg:px-14 py-24">

        {/* Diocese badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-ice border border-mist/40 rounded-full px-3 py-1.5 mb-6"
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
            <rect x="11" y="1" width="2" height="22" fill="#0077b6" />
            <rect x="1" y="8" width="22" height="2" fill="#0077b6" />
          </svg>
          <span className="text-cerulean text-[11px] font-semibold tracking-wide">
            {t("CSI கன்னியாகுமரி மறைமாவட்டம்", "CSI Kanyakumari Diocese")}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className={`text-navy leading-tight font-bold mb-3 ${lang === "ta" ? "font-tamil" : ""}`}
          style={{ fontSize: "clamp(28px, 4vw, 56px)" }}
        >
          {lang === "ta" ? (
            <>தேவனுடைய இல்லத்திற்கு<br /><span className="text-cerulean">வருக வருக</span></>
          ) : (
            <>Welcome to<br /><span className="text-cerulean">God&apos;s House</span></>
          )}
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className={`font-light mb-1 ${lang === "ta" ? "font-tamil text-slate-500" : "text-slate-400 italic"}`}
          style={{ fontFamily: lang === "ta" ? undefined : "var(--font-display)", fontSize: "clamp(15px, 1.6vw, 21px)" }}
        >
          {t("Welcome to God's House", "சி.எஸ்.ஐ. செயின்ட் ஆண்ட்ரூஸ் திருச்சபை")}
        </motion.p>

        {/* Church name */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className={`text-[13px] sm:text-[14px] text-slate-400 mb-8 ${lang === "ta" ? "font-tamil" : ""}`}
        >
          {t(
            "சி.எஸ்.ஐ. செயின்ட் ஆண்ட்ரூஸ் திருச்சபை, கூடங்குளம் · Tamil Nadu 627106",
            "C.S.I St. Andrew's Church, Koodankulam · Tamil Nadu 627106"
          )}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-3 mb-10"
        >
          <Link
            href="/events"
            className={`flex items-center justify-center px-6 py-3 bg-cerulean text-white text-[14px] font-semibold rounded-lg hover:bg-navy transition-colors active:scale-95 ${lang === "ta" ? "font-tamil" : ""}`}
          >
            {t("இந்த ஞாயிறு வாருங்கள்", "Join Us This Sunday")}
          </Link>
          <Link
            href="/about"
            className={`flex items-center justify-center px-6 py-3 border border-slate-200 text-navy text-[14px] font-medium rounded-lg hover:border-cerulean hover:text-cerulean transition-colors active:scale-95 ${lang === "ta" ? "font-tamil" : ""}`}
          >
            {t("எங்களைப் பற்றி அறிக", "Learn About Us")}
          </Link>
        </motion.div>

        {/* Service times */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="flex flex-wrap gap-2"
        >
          {[
            { ta: "ஞாயிறு வழிபாடு", en: "Sunday Service", time: "8:30 AM" },
            { ta: "புதன் வேதாகமம்", en: "Wed Bible Study", time: "7:00 PM" },
            { ta: "வெள்ளி இளைஞர்", en: "Fri Youth", time: "6:00 PM" },
          ].map((s) => (
            <div
              key={s.ta}
              className="flex items-center gap-1.5 bg-surface border border-slate-100 rounded-full px-3 py-1.5"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-azure shrink-0" />
              <span className={`text-[11px] text-slate-600 font-medium ${lang === "ta" ? "font-tamil" : ""}`}>
                {t(s.ta, s.en)}
              </span>
              <span className="text-[11px] text-slate-400">{s.time}</span>
            </div>
          ))}
        </motion.div>

        {/* Mobile image — shown below text on small screens */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="md:hidden mt-10 w-full aspect-[4/3] relative rounded-2xl overflow-hidden shadow-xl"
        >
          <Image
            src="/church/church-hero.png"
            alt="C.S.I St. Andrew's Church, Koodankulam"
            fill
            priority
            sizes="100vw"
            className="object-cover object-top"
          />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/30 to-transparent" />
        </motion.div>

      </div>

      {/* Wave pinned to bottom — no gap between hero and navy scripture section */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <WaveDivider fill="#03045e" background="transparent" />
      </div>
    </section>
  );
}
