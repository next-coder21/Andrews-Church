"use client";

import { events } from "../../data/events";
import { useLanguage } from "../../context/LanguageContext";

export default function EventsPage() {
  const { lang, t } = useLanguage();

  return (
    <div className="bg-white">
      <section className="bg-surface border-b border-slate-100 px-4 sm:px-6 lg:px-10 py-14">
        <div className="mx-auto max-w-7xl">
          <p className={`text-cerulean text-[11px] tracking-wide uppercase font-semibold mb-3 ${lang === "ta" ? "font-tamil" : ""}`}>
            {t("திட்டமிடுங்கள்", "Plan Ahead")}
          </p>
          <h1
            className={`text-navy font-bold leading-tight mb-1 ${lang === "ta" ? "font-tamil" : ""}`}
            style={{ fontSize: "clamp(28px,5vw,56px)" }}
          >
            {t("நிகழ்வுகள்", "Events")}
          </h1>
          <p className="text-slate-400 text-[14px]" style={{ fontFamily: "var(--font-display)" }}>
            {t("Events & Gatherings", "நிகழ்வுகள் மற்றும் கூட்டங்கள்")}
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-10 py-10">
        <div className="mx-auto max-w-7xl divide-y divide-slate-100 border border-slate-100 rounded-xl overflow-hidden">
          {events.map((e) => (
            <div key={e.id} className="bg-white px-5 sm:px-8 py-6 hover:bg-surface transition-colors">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="font-tamil text-[11px] font-semibold text-cerulean bg-ice px-3 py-1 rounded-full">
                  {e.date}
                </span>
                <span className="text-[12px] text-slate-400">{e.time}</span>
              </div>
              <h2 className={`text-navy font-bold text-[17px] leading-snug mb-0.5 ${lang === "ta" ? "font-tamil" : ""}`}>
                {t(e.titleTa, e.title)}
              </h2>
              <p className="text-[12px] text-slate-400 italic mb-3" style={{ fontFamily: "var(--font-display)" }}>
                {lang === "ta" ? e.title : e.titleTa}
              </p>
              <p className={`text-[13px] text-slate-500 leading-relaxed ${lang === "ta" ? "font-tamil" : ""}`}>
                {t(e.descTa, e.description)}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
