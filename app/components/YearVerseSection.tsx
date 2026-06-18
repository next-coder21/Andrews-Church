"use client";

import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

const vp = { once: false, amount: 0.25 };

export default function YearVerseSection() {
  const { lang, t } = useLanguage();

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
          {t("இந்த ஆண்டின் வேத வசனம்", "Verse of the Year")}
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
        {lang === "ta" ? (
          <motion.blockquote
            className="font-bamini text-navy leading-relaxed mb-5"
            style={{ fontSize: "clamp(20px, 3.2vw, 36px)", lineHeight: 1.8 }}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={vp}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            &ldquo;இதோ, நான் புதிய காரியம் செய்கிறேன்; இப்பொழுது அது தோன்றும், நீங்கள் அதை அறியீர்களா? நான் வனாந்தரத்திலே ஒரு வழியையும், மறுபாலைநிலத்திலே ஆறுகளையும் உண்டாக்குவேன்.&rdquo;
          </motion.blockquote>
        ) : (
          <motion.blockquote
            className="text-navy font-medium leading-relaxed mb-5 italic"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(20px, 3.2vw, 38px)", lineHeight: 1.65 }}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={vp}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            &ldquo;See, I am doing a new thing! Now it springs up; do you not perceive it? I am making a way in the wilderness and streams in the wasteland.&rdquo;
          </motion.blockquote>
        )}

        {/* secondary text — slides from right */}
        <motion.p
          className={`mb-6 text-slate-400 ${lang === "ta" ? "italic" : "font-bamini"}`}
          style={{
            fontFamily: lang === "ta" ? "var(--font-display)" : undefined,
            fontSize: "clamp(13px, 1.6vw, 18px)",
            lineHeight: 1.8,
          }}
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={vp}
          transition={{ duration: 0.55, delay: 0.3 }}
        >
          {lang === "ta"
            ? <>&ldquo;See, I am doing a new thing! Now it springs up; do you not perceive it?&rdquo;</>
            : <>&ldquo;இதோ, நான் புதிய காரியம் செய்கிறேன்; இப்பொழுது அது தோன்றும்…&rdquo;</>
          }
        </motion.p>

        {/* reference — fades up */}
        <motion.cite
          className={`text-cerulean/70 text-[12px] tracking-widest uppercase not-italic ${lang === "ta" ? "font-tamil" : ""}`}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {lang === "ta" ? "ஏசாயா 43:19 · Isaiah 43:19" : "Isaiah 43:19 · ஏசாயா 43:19"}
        </motion.cite>
      </div>
    </section>
  );
}
