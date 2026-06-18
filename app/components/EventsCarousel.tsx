"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { events } from "../data/events";
import { useLanguage } from "../context/LanguageContext";

export default function EventsCarousel() {
  const [[current, dir], setCurrent] = useState([0, 0]);
  const { lang, t } = useLanguage();

  const go = useCallback((d: number) => {
    setCurrent(([p]) => [(p + d + events.length) % events.length, d]);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => go(1), 5000);
    return () => clearInterval(timer);
  }, [go]);

  const ev = events[current];

  return (
    <section className="py-16 sm:py-24 bg-white px-4 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="flex items-end justify-between mb-8"
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <p className={`text-cerulean text-[11px] tracking-wide uppercase font-semibold mb-2 ${lang === "ta" ? "font-tamil" : ""}`}>
              {t("நிகழ்வுகள்", "Events")}
            </p>
            <h2
              className={`text-navy font-bold leading-tight ${lang === "ta" ? "font-tamil" : ""}`}
              style={{ fontSize: "clamp(22px,4vw,40px)" }}
            >
              {t("வரவிருக்கும் நிகழ்வுகள்", "Upcoming Events")}
            </h2>
          </div>
          <Link href="/events" className={`text-[12px] text-cerulean font-medium hover:text-navy transition-colors shrink-0 ml-4 ${lang === "ta" ? "font-tamil" : ""}`}>
            {t("அனைத்தும் →", "View All →")}
          </Link>
        </motion.div>

        {/* Card */}
        <motion.div
          className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.65, delay: 0.1 }}
        >
          <div className="h-1 bg-gradient-to-r from-cerulean to-azure" />
          <div className="relative overflow-hidden" style={{ minHeight: 240 }}>
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={current}
                custom={dir}
                initial={{ opacity: 0, x: dir * 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -dir * 24 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="font-tamil text-[11px] font-semibold text-cerulean bg-ice px-3 py-1 rounded-full">
                      {ev.date}
                    </span>
                    <span className="text-[12px] text-slate-400">{ev.time}</span>
                  </div>
                  <h3 className={`text-navy font-bold leading-snug mb-2 ${lang === "ta" ? "font-tamil" : ""}`} style={{ fontSize: "clamp(18px,3vw,28px)" }}>
                    {t(ev.titleTa, ev.title)}
                  </h3>
                  <p className="text-[12px] text-slate-400 italic mb-3" style={{ fontFamily: "var(--font-display)" }}>
                    {lang === "ta" ? ev.title : ev.titleTa}
                  </p>
                  <p className={`text-[13px] text-slate-500 leading-relaxed ${lang === "ta" ? "font-tamil" : ""}`}>
                    {t(ev.descTa, ev.description)}
                  </p>
                </div>
                {/* Dots + arrows */}
                <div className="flex items-center justify-between mt-6">
                  <div className="flex gap-1.5">
                    {events.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrent([i, i > current ? 1 : -1])}
                        className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? "w-6 bg-cerulean" : "w-2 bg-slate-200"}`}
                        aria-label={`Event ${i + 1}`}
                      />
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => go(-1)}
                      className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-cerulean hover:text-cerulean transition-colors"
                      aria-label="Previous"
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 11L5 7l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                    </button>
                    <button
                      onClick={() => go(1)}
                      className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-cerulean hover:text-cerulean transition-colors"
                      aria-label="Next"
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Quick-pick cards */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {events.slice(0, 3).map((e, i) => (
            <motion.button
              key={i}
              onClick={() => setCurrent([i, i > current ? 1 : -1])}
              className={`text-left p-4 rounded-lg border transition-all ${i === current ? "border-cerulean bg-ice/30" : "border-slate-100 hover:border-slate-200"}`}
              initial={{ opacity: 0, x: i === 0 ? -24 : i === 2 ? 24 : 0, y: i === 1 ? 20 : 0 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.45, delay: 0.15 + i * 0.08 }}
            >
              <p className={`text-[13px] font-semibold text-navy leading-snug ${lang === "ta" ? "font-tamil" : ""}`}>
                {t(e.titleTa, e.title)}
              </p>
              <p className="font-tamil text-[11px] text-slate-400 mt-1">{e.date}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
