"use client";

import { ministries } from "../../data/ministries";
import { useLanguage } from "../../context/LanguageContext";

export default function MinistriesPage() {
  const { lang, t } = useLanguage();

  return (
    <div className="bg-white">
      <section className="bg-surface border-b border-slate-100 px-4 sm:px-6 lg:px-10 py-14">
        <div className="mx-auto max-w-7xl">
          <p className={`text-cerulean text-[11px] tracking-wide uppercase font-semibold mb-3 ${lang === "ta" ? "font-tamil" : ""}`}>
            {t("பங்கெடுக்க வாருங்கள்", "Get Involved")}
          </p>
          <h1
            className={`text-navy font-bold leading-tight mb-1 ${lang === "ta" ? "font-tamil" : ""}`}
            style={{ fontSize: "clamp(28px,5vw,56px)" }}
          >
            {t("ஊழியங்கள்", "Ministries")}
          </h1>
          <p className="text-slate-400 text-[14px]" style={{ fontFamily: "var(--font-display)" }}>
            {t("Ministries & Groups", "ஊழியங்கள் மற்றும் குழுக்கள்")}
          </p>
          <p className={`text-[13px] text-slate-400 mt-2 ${lang === "ta" ? "font-tamil" : ""}`}>
            {t(
              "ஒவ்வொரு ஊழியமும் ஒரு கதவு — உள்ளே வாருங்கள், உங்கள் இடத்தை கண்டுகொள்ளுங்கள்.",
              "Every ministry is a door — come in, find your place."
            )}
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-10 py-10">
        <div className="mx-auto max-w-7xl grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ministries.map((m) => (
            <div key={m.id} className="bg-white rounded-xl border border-slate-100 p-6 hover:border-azure/30 hover:shadow-sm transition-all">
              <p className={`text-[10px] tracking-wide uppercase font-semibold text-azure mb-2 ${lang === "ta" ? "font-tamil" : ""}`}>
                {t(m.scheduleTa, m.schedule)}
              </p>
              <h2 className={`text-navy font-bold text-[17px] leading-snug mb-0.5 ${lang === "ta" ? "font-tamil" : ""}`}>
                {t(m.nameTa, m.name)}
              </h2>
              <p className="text-[11px] text-slate-400 italic mb-1">{lang === "ta" ? m.name : m.nameTa}</p>
              <p className={`text-[12px] text-cerulean mb-4 ${lang === "ta" ? "font-tamil" : ""}`}>
                {t(m.leaderTa, m.leader)}
              </p>
              <div className="h-px bg-slate-100 mb-4" />
              <p className={`text-[13px] text-slate-500 leading-relaxed ${lang === "ta" ? "font-tamil" : ""}`}>
                {t(m.descTa, m.description)}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
