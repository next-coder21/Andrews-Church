"use client";

import { useLanguage } from "../../context/LanguageContext";

interface Sermon {
  id: number; titleTa: string; title: string; speaker: string; speakerTa: string;
  date: string; series: string; seriesTa: string; descTa: string; description: string;
}

export default function SermonsPageClient({ sermons }: { sermons: Sermon[] }) {
  const { lang, t } = useLanguage();
  const [featured, ...rest] = sermons;

  return (
    <div className="bg-white">
      <section className="bg-surface border-b border-slate-100 px-4 sm:px-6 lg:px-10 py-14">
        <div className="mx-auto max-w-7xl">
          <p className={`text-cerulean text-[11px] tracking-wide uppercase font-semibold mb-3 ${lang === "ta" ? "font-tamil" : ""}`}>
            {t("செய்திகள்", "Messages")}
          </p>
          <h1
            className={`text-navy font-bold leading-tight mb-1 ${lang === "ta" ? "font-tamil" : ""}`}
            style={{ fontSize: "clamp(28px,5vw,56px)" }}
          >
            {t("பிரசங்கங்கள்", "Sermons")}
          </h1>
          <p className="text-slate-400 text-[14px]" style={{ fontFamily: "var(--font-display)" }}>
            {t("Sermons & Teaching", "வேதபோதனை மற்றும் செய்திகள்")}
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-10 py-10">
        <div className="mx-auto max-w-7xl">
          {/* Featured */}
          <div className="bg-navy rounded-xl p-6 sm:p-10 mb-6">
            <p className={`text-azure text-[10px] tracking-widest uppercase font-semibold mb-3 ${lang === "ta" ? "font-tamil" : ""}`}>
              {t("சமீபத்திய செய்தி · Latest Message", "Latest Message · சமீபத்திய செய்தி")}
            </p>
            <span className={`inline-block text-[11px] font-semibold text-cerulean bg-white/10 px-3 py-1.5 rounded-full mb-4 ${lang === "ta" ? "font-tamil" : ""}`}>
              {t(featured.seriesTa, featured.series)}
            </span>
            <h2 className={`text-white font-bold leading-snug mb-1 ${lang === "ta" ? "font-tamil" : ""}`} style={{ fontSize: "clamp(20px,3.5vw,36px)" }}>
              {t(featured.titleTa, featured.title)}
            </h2>
            <p className="text-[13px] text-white/40 italic mb-3" style={{ fontFamily: "var(--font-display)" }}>
              {lang === "ta" ? featured.title : featured.titleTa}
            </p>
            <p className={`text-[12px] text-azure/70 mb-4 ${lang === "ta" ? "font-tamil" : ""}`}>
              {t(featured.speakerTa, featured.speaker)} · {featured.date}
            </p>
            <p className={`text-[13px] text-white/45 leading-relaxed max-w-xl ${lang === "ta" ? "font-tamil" : ""}`}>
              {t(featured.descTa, featured.description)}
            </p>
          </div>

          {/* List */}
          <div className="divide-y divide-slate-100 border border-slate-100 rounded-xl overflow-hidden">
            {rest.map((s) => (
              <div key={s.id} className="bg-white px-5 sm:px-7 py-5 hover:bg-surface transition-colors">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className={`text-[10px] font-semibold text-cerulean bg-ice px-2.5 py-1 rounded-full ${lang === "ta" ? "font-tamil" : ""}`}>
                    {t(s.seriesTa, s.series)}
                  </span>
                  <span className="text-[11px] text-slate-400">{s.date}</span>
                </div>
                <h3 className={`text-navy font-bold text-[16px] leading-snug mb-0.5 ${lang === "ta" ? "font-tamil" : ""}`}>
                  {t(s.titleTa, s.title)}
                </h3>
                <p className="text-[12px] text-slate-400 italic mb-2" style={{ fontFamily: "var(--font-display)" }}>
                  {lang === "ta" ? s.title : s.titleTa}
                </p>
                <p className={`text-[11px] text-cerulean mb-2 ${lang === "ta" ? "font-tamil" : ""}`}>
                  {t(s.speakerTa, s.speaker)}
                </p>
                <p className={`text-[13px] text-slate-500 leading-relaxed ${lang === "ta" ? "font-tamil" : ""}`}>
                  {t(s.descTa, s.description)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
