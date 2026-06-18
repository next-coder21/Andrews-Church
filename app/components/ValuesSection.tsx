"use client";

import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

const values = [
  {
    ta: "விசுவாசம்",
    en: "Faith",
    headTa: "வேதத்தில் வேரூன்றியவர்கள்",
    headEn: "Rooted in Scripture",
    bodyTa: "ஒவ்வொரு ஞாயிறும், ஒவ்வொரு வகுப்பும் — தேவ வார்த்தையின் அடிப்படையில்.",
    bodyEn: "Every Sunday, every class — grounded in God's Word.",
  },
  {
    ta: "சமூகம்",
    en: "Community",
    headTa: "ஒன்றாக வாழ்கிறோம்",
    headEn: "Belonging Together",
    bodyTa: "யாரும் தனியாக நடக்க மாட்டோம். ஒருவர் சுமையை மற்றவர் சுமக்கிறோம்.",
    bodyEn: "No one walks alone. We carry each other's burdens.",
  },
  {
    ta: "சேவை",
    en: "Service",
    headTa: "கூடங்குளத்தை நேசிக்கிறோம்",
    headEn: "Loving Our City",
    bodyTa: "விசுவாசம் செயலில் வெளிப்படும். திறந்த கைகளோடு நம் சமூகத்தை சேவிக்கிறோம்.",
    bodyEn: "Faith in action — serving our community with open hands.",
  },
];

// Cards alternate: left → centre (up) → right
const cardInitial = [
  { opacity: 0, x: -40 },
  { opacity: 0, y: 32 },
  { opacity: 0, x: 40 },
];

const vp = { once: false, amount: 0.2 };

export default function ValuesSection() {
  const { lang, t } = useLanguage();

  return (
    <section className="py-16 sm:py-24 bg-surface px-4 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">

        {/* heading — slides from left */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={vp}
          transition={{ duration: 0.6 }}
        >
          <p className={`text-cerulean text-[11px] tracking-wide uppercase font-semibold mb-3 ${lang === "ta" ? "font-tamil" : ""}`}>
            {t("நாம் நம்புவது", "What We Believe")}
          </p>
          <h2
            className={`text-navy font-bold leading-snug ${lang === "ta" ? "font-tamil" : ""}`}
            style={{ fontSize: "clamp(24px, 4vw, 44px)" }}
          >
            {t("மூன்று தூண்கள்", "Three Pillars")}
          </h2>
          <p className="text-slate-400 text-[13px] mt-1">
            {t("செயின்ட் ஆண்ட்ரூஸ் திருச்சபையில் வாழ்க்கையின் மூன்று அடிப்படைகள்", "Three pillars of life at St Andrew's")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {values.map((v, i) => (
            <motion.div
              key={v.ta}
              className="bg-white rounded-xl border border-slate-100 p-6 hover:border-azure/30 hover:shadow-sm transition-all"
              initial={cardInitial[i]}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={vp}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className={`text-[13px] font-bold text-cerulean ${lang === "ta" ? "font-tamil" : ""}`}>
                  {t(v.ta, v.en)}
                </span>
                <span className="text-[11px] text-slate-300">·</span>
                <span className="text-[11px] text-slate-400">{lang === "ta" ? v.en : v.ta}</span>
              </div>
              <div className="h-0.5 w-8 bg-cerulean mb-4" />
              <h3 className={`text-navy font-semibold text-[16px] leading-snug mb-2 ${lang === "ta" ? "font-tamil" : ""}`}>
                {t(v.headTa, v.headEn)}
              </h3>
              <p className={`text-[13px] text-slate-500 leading-relaxed ${lang === "ta" ? "font-tamil" : ""}`}>
                {t(v.bodyTa, v.bodyEn)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
