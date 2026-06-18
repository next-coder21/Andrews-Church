"use client";

import { useLanguage } from "../../context/LanguageContext";

export default function ContactPage() {
  const { lang, t } = useLanguage();

  return (
    <div className="bg-white">
      <section className="bg-surface border-b border-slate-100 px-4 sm:px-6 lg:px-10 py-14">
        <div className="mx-auto max-w-7xl">
          <p className={`text-cerulean text-[11px] tracking-wide uppercase font-semibold mb-3 ${lang === "ta" ? "font-tamil" : ""}`}>
            {t("தொடர்பு", "Contact")}
          </p>
          <h1
            className={`text-navy font-bold leading-tight mb-1 ${lang === "ta" ? "font-tamil" : ""}`}
            style={{ fontSize: "clamp(28px,5vw,56px)" }}
          >
            {t("தொடர்பு கொள்க", "Get in Touch")}
          </h1>
          <p className="text-slate-400 text-[14px]" style={{ fontFamily: "var(--font-display)" }}>
            {t("Get in Touch · Contact Us", "தொடர்பு கொள்ளுங்கள்")}
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-10 py-10">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-10">
          {/* Info */}
          <div>
            <div className="space-y-6">
              {[
                {
                  labelTa: "முகவரி",
                  labelEn: "Address",
                  linesTa: [
                    "சி.எஸ்.ஐ. செயின்ட் ஆண்ட்ரூஸ் திருச்சபை",
                    "கூடங்குளம், ராதாபுரம் வட்டம்",
                    "திருநெல்வேலி மாவட்டம், தமிழ்நாடு 627106",
                  ],
                  linesEn: [
                    "C.S.I St. Andrew's Church, Koodankulam",
                    "Radhapuram Block, Tirunelveli District",
                    "Tamil Nadu 627106",
                  ],
                },
                {
                  labelTa: "வழிபாடு நேரம்",
                  labelEn: "Service Times",
                  linesTa: [
                    "ஞாயிறு தமிழ் வழிபாடு — காலை 8:30",
                    "புதன் வேதாகம வகுப்பு — மாலை 7:00",
                    "வெள்ளி இளைஞர் கூட்டம் — மாலை 6:00",
                  ],
                  linesEn: [
                    "Sunday Tamil Service — 8:30 AM",
                    "Wednesday Bible Study — 7:00 PM",
                    "Friday Youth Meeting — 6:00 PM",
                  ],
                },
                {
                  labelTa: "மறைமாவட்டம்",
                  labelEn: "Diocese",
                  linesTa: ["CSI கன்னியாகுமரி மறைமாவட்டம்"],
                  linesEn: ["CSI Kanyakumari Diocese"],
                },
              ].map((b) => (
                <div key={b.labelEn} className="bg-surface rounded-xl border border-slate-100 p-5">
                  <p className={`text-[10px] tracking-widest uppercase font-semibold text-slate-300 mb-3 ${lang === "ta" ? "font-tamil" : ""}`}>
                    {t(b.labelTa, b.labelEn)} · {lang === "ta" ? b.labelEn : b.labelTa}
                  </p>
                  {(lang === "ta" ? b.linesTa : b.linesEn).map((line) => (
                    <p key={line} className={`text-[14px] text-slate-600 leading-relaxed ${lang === "ta" ? "font-tamil" : ""}`}>{line}</p>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="bg-surface rounded-xl border border-slate-100 p-6 sm:p-8">
            <h2 className={`text-navy font-bold text-[20px] mb-6 ${lang === "ta" ? "font-tamil" : ""}`}>
              {t("செய்தி அனுப்புங்கள்", "Send a Message")}
            </h2>
            <form className="space-y-5">
              {[
                { labelTa: "உங்கள் பெயர்", labelEn: "Your name", type: "text" },
                { labelTa: "மின்னஞ்சல்", labelEn: "Email address", type: "email" },
                { labelTa: "தொலைபேசி", labelEn: "Phone (optional)", type: "tel" },
              ].map((f) => (
                <div key={f.type + f.labelEn}>
                  <label className={`block text-[11px] font-semibold text-slate-400 mb-1.5 ${lang === "ta" ? "font-tamil" : ""}`}>
                    {t(f.labelTa, f.labelEn)} <span className="text-[10px] font-normal text-slate-300">· {lang === "ta" ? f.labelEn : f.labelTa}</span>
                  </label>
                  <input
                    type={f.type}
                    className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-[14px] text-navy focus:outline-none focus:ring-2 focus:ring-azure/25 focus:border-azure transition-colors"
                  />
                </div>
              ))}
              <div>
                <label className={`block text-[11px] font-semibold text-slate-400 mb-1.5 ${lang === "ta" ? "font-tamil" : ""}`}>
                  {t("செய்தி", "Message")} <span className="text-[10px] font-normal text-slate-300">· {lang === "ta" ? "Message" : "செய்தி"}</span>
                </label>
                <textarea
                  rows={4}
                  className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-[14px] text-navy focus:outline-none focus:ring-2 focus:ring-azure/25 focus:border-azure transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className={`w-full bg-cerulean text-white font-semibold text-[15px] py-3.5 rounded-lg hover:bg-navy transition-colors active:scale-95 ${lang === "ta" ? "font-tamil" : ""}`}
              >
                {t("அனுப்புக", "Send Message")}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
