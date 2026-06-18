"use client";

import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

interface Scripture {
  verseTa: string; verse: string; referenceTa: string; reference: string;
}

const vp = { once: false, amount: 0.25 };

export default function YearVerseSection({ scripture }: { scripture: Scripture }) {
  const { lang } = useLanguage();

  return (
    <section className="bg-white px-4 sm:px-6 lg:px-10 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl text-center">

        {/* label — drops from top */}
        <motion.p
          className={`text-cerulean text-[11px] tracking-widest uppercase font-semibold mb-3 ${lang === "ta" ? "font-tamil" : ""}`}
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.5 }}
        >
          {lang === "ta" ? "இந்த ஆண்டின் வேத வசனம்" : "Verse of the Year"}
        </motion.p>

        {/* year badge — slides from left */}
        <motion.div
          className="inline-flex items-center gap-2 bg-ice border border-mist/40 rounded-full px-4 py-1.5 mb-8"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={vp}
          transition={{ duration: 0.45, delay: 0.1 }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cerulean inline-block" />
          <span className="text-cerulean text-[12px] tracking-widest font-mono font-semibold">
            {new Date().getFullYear()}
          </span>
        </motion.div>

        {/* quote — scales in */}
        <motion.blockquote
          className={`text-navy font-medium leading-relaxed mb-5 ${lang === "ta" ? "font-tamil" : "italic"}`}
          style={{ fontFamily: lang === "ta" ? undefined : "var(--font-display)", fontSize: "clamp(20px, 3.2vw, 38px)", lineHeight: 1.65 }}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={vp}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          &ldquo;{lang === "ta" ? scripture.verseTa : scripture.verse}&rdquo;
        </motion.blockquote>

        {/* secondary text — slides from right */}
        <motion.p
          className={`mb-6 text-slate-400 ${lang === "ta" ? "italic" : "font-bamini"}`}
          style={{ fontFamily: lang === "ta" ? "var(--font-display)" : undefined, fontSize: "clamp(13px, 1.6vw, 18px)", lineHeight: 1.8 }}
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={vp}
          transition={{ duration: 0.55, delay: 0.3 }}
        >
          &ldquo;{lang === "ta" ? scripture.verse : scripture.verseTa}&rdquo;
        </motion.p>

        {/* reference — fades up */}
        <motion.cite
          className={`text-cerulean/70 text-[12px] tracking-widest uppercase not-italic ${lang === "ta" ? "font-tamil" : ""}`}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {lang === "ta"
            ? `${scripture.referenceTa} · ${scripture.reference}`
            : `${scripture.reference} · ${scripture.referenceTa}`}
        </motion.cite>
      </div>
    </section>
  );
}
