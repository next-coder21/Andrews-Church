"use client";

import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

const vp = { once: false, amount: 0.3 };

export default function ScriptureSection() {
  const { lang } = useLanguage();

  return (
    <>
      <section className="bg-navy px-4 sm:px-6 lg:px-10 pt-10 sm:pt-14 pb-16 sm:pb-20">
        <div className="mx-auto max-w-3xl text-center pt-2">

          {/* label — drops from top */}
          <motion.p
            className={`text-azure text-[11px] tracking-widest uppercase font-semibold mb-3 ${lang === "ta" ? "font-tamil" : ""}`}
            initial={{ opacity: 0, y: -16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 0.5 }}
          >
            {lang === "ta" ? "இன்றைய வேத வசனம்" : "Verse of the Day"}
          </motion.p>

          {/* cross — scales in */}
          <motion.div
            className="flex justify-center mb-6"
            initial={{ opacity: 0, scale: 0.4 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={vp}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              <rect x="11" y="2" width="2" height="20" fill="#00b4d8" opacity="0.6" />
              <rect x="2" y="9" width="20" height="2" fill="#00b4d8" opacity="0.6" />
            </svg>
          </motion.div>

          {/* quote — scales up from slightly smaller */}
          {lang === "ta" ? (
            <motion.blockquote
              className="font-bamini text-white/90 leading-relaxed mb-5"
              style={{ fontSize: "clamp(18px,3vw,32px)", lineHeight: 1.8 }}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={vp}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              &ldquo;உங்களைக்குறித்து நான் நினைக்கிற நினைவுகளை நான் அறிவேன்; அவை தீமைக்கல்ல நன்மைக்கேதுவான நினைவுகளே; உங்களுக்கு நம்பிக்கையான எதிர்காலத்தைக் கொடுக்கவே என்று கர்த்தர் சொல்லுகிறார்.&rdquo;
            </motion.blockquote>
          ) : (
            <motion.blockquote
              className="text-white/90 font-medium leading-relaxed mb-5 italic"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(20px,3vw,36px)", lineHeight: 1.6 }}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={vp}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              &ldquo;For I know the plans I have for you — plans to give you hope and a future.&rdquo;
            </motion.blockquote>
          )}

          {/* secondary text — slides from right */}
          <motion.p
            className={`mb-6 text-white/45 ${lang === "ta" ? "italic" : "font-bamini"}`}
            style={{
              fontFamily: lang === "ta" ? "var(--font-display)" : undefined,
              fontSize: "clamp(14px,1.8vw,20px)",
              lineHeight: 1.8,
            }}
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={vp}
            transition={{ duration: 0.55, delay: 0.3 }}
          >
            {lang === "ta"
              ? <>&ldquo;For I know the plans I have for you — plans to give you hope and a future.&rdquo;</>
              : <>&ldquo;உங்களைக்குறித்து நான் நினைக்கிற நினைவுகளை நான் அறிவேன்…&rdquo;</>
            }
          </motion.p>

          {/* reference — slides from left */}
          <motion.cite
            className={`text-azure/70 text-[12px] tracking-widest uppercase not-italic ${lang === "ta" ? "font-tamil" : ""}`}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={vp}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {lang === "ta" ? "எரேமியா 29:11 · Jeremiah 29:11" : "Jeremiah 29:11 · எரேமியா 29:11"}
          </motion.cite>
        </div>
      </section>
    </>
  );
}
