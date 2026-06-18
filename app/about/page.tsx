"use client";

import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import WaveDivider from "../components/WaveDivider";

const vp = { once: false, amount: 0.2 };

const stats = [
  { val: "1842", laTa: "நிறுவப்பட்ட ஆண்டு",       laEn: "Year Founded" },
  { val: "CSI",  laTa: "தென்னிந்திய திருச்சபை",    laEn: "Church of South India" },
  { val: "6+",   laTa: "சுறுசுறுப்பான ஊழியங்கள்", laEn: "Active Ministries" },
  { val: "180+", laTa: "குடும்பங்கள்",              laEn: "Families" },
];

const committee = [
  { nameTa: "திரு. சாமுவேல் ராஜ்",     name: "Mr. Samuel Raj",       roleTa: "தலைவர்",            roleEn: "Chairman" },
  { nameTa: "திருமதி. அன்னம்மா ஜான்",  name: "Mrs. Annamma John",    roleTa: "செயலாளர்",          roleEn: "Secretary" },
  { nameTa: "திரு. தாமஸ் பவுல்",       name: "Mr. Thomas Paul",      roleTa: "பொருளாளர்",         roleEn: "Treasurer" },
  { nameTa: "திரு. பீட்டர் மோசே",      name: "Mr. Peter Moses",      roleTa: "உதவி செயலாளர்",     roleEn: "Asst. Secretary" },
  { nameTa: "திருமதி. ரோஜா தாமஸ்",    name: "Mrs. Rosa Thomas",     roleTa: "பெண்கள் பிரதிநிதி", roleEn: "Women's Rep." },
  { nameTa: "திரு. யோவான் சாமுவேல்",  name: "Mr. Yovan Samuel",     roleTa: "இளைஞர் பிரதிநிதி", roleEn: "Youth Rep." },
];

// card entry directions: left, up, right cycling
const cardDir = (i: number) => {
  const dirs = [
    { opacity: 0, x: -32 },
    { opacity: 0, y: 28 },
    { opacity: 0, x: 32 },
  ];
  return dirs[i % 3];
};

export default function AboutPage() {
  const { lang, t } = useLanguage();

  return (
    <div className="bg-white">

      {/* ── HERO HEADER ── */}
      <section className="bg-surface px-4 sm:px-6 lg:px-10 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <motion.p
            className={`text-cerulean text-[11px] tracking-wide uppercase font-semibold mb-3 ${lang === "ta" ? "font-tamil" : ""}`}
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {t("எங்களைப் பற்றி", "About Us")}
          </motion.p>
          <motion.h1
            className={`text-navy font-bold leading-tight mb-2 ${lang === "ta" ? "font-tamil" : ""}`}
            style={{ fontSize: "clamp(28px,5vw,56px)" }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
          >
            {t("விசுவாசத்தில் வேரூன்றிய சபை", "A Congregation Rooted in Faith")}
          </motion.h1>
          <motion.p
            className="text-slate-400 text-[14px] italic"
            style={{ fontFamily: "var(--font-display)" }}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.22 }}
          >
            {t("A congregation rooted in faith since 1842", "1842 முதல் விசுவாசத்தில் நிலைத்திருக்கும் சபை")}
          </motion.p>
        </div>
      </section>

      <WaveDivider fill="#ffffff" background="#f4f9fb" />

      {/* ── CHURCH STORY ── */}
      <section className="px-4 sm:px-6 lg:px-10 py-14 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-start">

            {/* text — slides from left */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, x: -36 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={vp}
              transition={{ duration: 0.65 }}
            >
              {lang === "ta" ? (
                <>
                  <p className="font-tamil text-[15px] text-slate-600 leading-relaxed">
                    கூடங்குளம் சி.எஸ்.ஐ. செயின்ட் ஆண்ட்ரூஸ் திருச்சபை, திருநெல்வேலி மாவட்டத்தில் உள்ள ஒரு பாரம்பரியமான தமிழ் கிறிஸ்தவ சபை. சி.எஸ்.ஐ. கன்னியாகுமரி மறைமாவட்டத்தின் கீழ் இயங்கும் இச்சபை நூற்றாண்டுகளாக கூடங்குளம் மக்களுக்கு ஒளியாக விளங்குகிறது.
                  </p>
                  <p className="font-tamil text-[15px] text-slate-600 leading-relaxed">
                    வழிபாடு, வேத போதனை மற்றும் சமூக சேவை மூலம் கிறிஸ்துவின் அன்பை பகிர்வதே எங்கள் நோக்கம். புதிதாக விசுவாசத்தில் அடியெடுத்து வைப்பவராக இருந்தாலும், பல ஆண்டுகளாக நம்பிக்கையில் நடப்பவராக இருந்தாலும் — இங்கே உங்களுக்கென்று ஒரு இடம் உண்டு.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-[15px] text-slate-600 leading-relaxed">
                    C.S.I St. Andrew&apos;s Church, Koodankulam is a historic Tamil Christian congregation in Tirunelveli District. Under the CSI Kanyakumari Diocese, this church has been a light for the people of Koodankulam for generations.
                  </p>
                  <p className="text-[15px] text-slate-600 leading-relaxed">
                    Our aim is to share the love of Christ through worship, biblical teaching, and community service. Whether you are taking your first steps of faith or have walked in belief for many years — there is a place here for you.
                  </p>
                </>
              )}
            </motion.div>

            {/* stats grid — slides from right */}
            <motion.div
              className="grid grid-cols-2 gap-3"
              initial={{ opacity: 0, x: 36 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={vp}
              transition={{ duration: 0.65, delay: 0.1 }}
            >
              {stats.map((s, i) => (
                <motion.div
                  key={s.val}
                  className="bg-surface rounded-xl p-5 border border-slate-100"
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={vp}
                  transition={{ duration: 0.45, delay: 0.15 + i * 0.07 }}
                >
                  <p
                    className="text-navy font-bold leading-none mb-2"
                    style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px,4vw,40px)" }}
                  >
                    {s.val}
                  </p>
                  <p className={`text-[11px] text-slate-600 font-medium ${lang === "ta" ? "font-tamil" : ""}`}>{t(s.laTa, s.laEn)}</p>
                  <p className="text-[10px] text-slate-400">{lang === "ta" ? s.laEn : s.laTa}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <WaveDivider fill="#03045e" background="#ffffff" />

      {/* ── WORD FROM PRESBYTER ── */}
      <section className="bg-navy px-4 sm:px-6 lg:px-10 py-14 sm:py-20">
        <div className="mx-auto max-w-6xl">

          {/* label — drops from top */}
          <motion.p
            className={`text-azure text-[11px] tracking-widest uppercase font-semibold mb-10 text-center ${lang === "ta" ? "font-tamil" : ""}`}
            initial={{ opacity: 0, y: -14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 0.5 }}
          >
            {t("ஆயரின் வார்த்தைகள்", "Word from Our Presbyter")}
          </motion.p>

          <div className="flex flex-col md:flex-row gap-10 md:gap-14 items-start">

            {/* LEFT — pastor photo — slides from left */}
            <motion.div
              className="w-full md:w-64 lg:w-72 flex-shrink-0"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={vp}
              transition={{ duration: 0.7 }}
            >
              {/* Photo placeholder — replace src when real photo is available */}
              <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-navy border border-white/10 shadow-2xl flex flex-col items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-cerulean/20 border border-cerulean/30 flex items-center justify-center mb-3">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <circle cx="12" cy="8" r="4" stroke="#00b4d8" strokeWidth="1.5" />
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#00b4d8" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <p className="text-white/30 text-[11px] tracking-widest text-center px-4">Photo</p>
                {/* Overlay gradient */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-navy to-transparent" />
              </div>

              {/* Name card below photo */}
              <div className="mt-4 text-center">
                <p className={`text-white font-semibold text-[15px] ${lang === "ta" ? "font-tamil" : ""}`}>
                  {t("போதகர். ———", "Rev. ———")}
                </p>
                <p className={`text-azure/70 text-[12px] mt-0.5 ${lang === "ta" ? "font-tamil" : ""}`}>
                  {t("ஆயர், செயின்ட் ஆண்ட்ரூஸ்", "Presbyter, St. Andrew's Church")}
                </p>
                <p className="text-white/25 text-[11px] font-mono mt-1">CSI Kanyakumari Diocese</p>
              </div>
            </motion.div>

            {/* RIGHT — presbyter's words — slides from right */}
            <motion.div
              className="flex-1 min-w-0"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={vp}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              {/* Opening quote mark */}
              <motion.div
                className="text-cerulean/30 leading-none mb-4 select-none"
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(60px,8vw,100px)" }}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={vp}
                transition={{ duration: 0.4, delay: 0.2 }}
                aria-hidden
              >
                &ldquo;
              </motion.div>

              {lang === "ta" ? (
                <motion.p
                  className="font-tamil text-white/85 text-[16px] sm:text-[18px] leading-relaxed mb-6"
                  initial={{ opacity: 0, scale: 0.97 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={vp}
                  transition={{ duration: 0.75, delay: 0.25 }}
                >
                  தேவனுடைய கிருபையால் இந்தச் சபை இன்னும் நிலைத்து நிற்கிறது. கூடங்குளம் மக்களுக்கு நாம் ஒளியாகவும், அன்பாகவும் இருக்க வேண்டும். தேவன் நம்மைத் திரட்டினார் — ஒரு நோக்கத்துக்காக. ஒவ்வொரு ஞாயிறும் வரும்போது, அது வழிபாட்டிற்கு மட்டுமல்ல — ஒரு குடும்பமாக ஒன்று சேருவதற்காக. கர்த்தர் உங்கள் ஒவ்வொருவரையும் ஆசீர்வதிப்பாராக.
                </motion.p>
              ) : (
                <motion.p
                  className="text-white/85 text-[16px] sm:text-[18px] leading-relaxed mb-6"
                  initial={{ opacity: 0, scale: 0.97 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={vp}
                  transition={{ duration: 0.75, delay: 0.25 }}
                >
                  By God&apos;s grace, this congregation continues to stand. We are called to be a light and a love for the people of Koodankulam. God has gathered us together — for a purpose. Every Sunday when you come, it is not merely for worship — it is to gather as one family. May the Lord bless each and every one of you.
                </motion.p>
              )}

              {/* Scripture reference */}
              <motion.div
                className="border-l-2 border-cerulean/40 pl-4"
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={vp}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <p
                  className="text-white/50 italic text-[14px]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  &ldquo;And let us consider how to stir up one another to love and good works.&rdquo;
                </p>
                <p className="text-azure/60 text-[11px] tracking-widest uppercase mt-1">Hebrews 10:24</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <WaveDivider fill="#f4f9fb" background="#03045e" />

      {/* ── COMMITTEE MEMBERS ── */}
      <section className="bg-surface px-4 sm:px-6 lg:px-10 py-14 sm:py-20">
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
              {t("சபை நிர்வாகம்", "Church Governance")}
            </p>
            <h2
              className={`text-navy font-bold leading-snug ${lang === "ta" ? "font-tamil" : ""}`}
              style={{ fontSize: "clamp(22px,4vw,42px)" }}
            >
              {t("குழு உறுப்பினர்கள்", "Committee Members")}
            </h2>
            <p className={`text-slate-400 text-[13px] mt-1 ${lang === "ta" ? "font-tamil" : ""}`}>
              {t("2024–2026 நிர்வாகக் குழு", "2024–2026 Executive Committee")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {committee.map((m, i) => (
              <motion.div
                key={m.name}
                className="bg-white rounded-xl border border-slate-100 p-5 hover:border-azure/30 hover:shadow-sm transition-all flex items-start gap-4"
                initial={cardDir(i)}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={vp}
                transition={{ duration: 0.55, delay: i * 0.07 }}
              >
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-ice border border-mist/40 flex items-center justify-center flex-shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <circle cx="12" cy="8" r="4" stroke="#0077b6" strokeWidth="1.5" />
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#0077b6" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <h3 className={`text-navy font-semibold text-[14px] leading-snug ${lang === "ta" ? "font-tamil" : ""}`}>
                    {t(m.nameTa, m.name)}
                  </h3>
                  <p className="text-[11px] text-slate-400 mb-1">{lang === "ta" ? m.name : m.nameTa}</p>
                  <span className={`inline-block text-[11px] font-medium text-cerulean bg-ice px-2 py-0.5 rounded-full ${lang === "ta" ? "font-tamil" : ""}`}>
                    {t(m.roleTa, m.roleEn)}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider fill="#ffffff" background="#f4f9fb" />

      {/* ── LOCATION ── */}
      <section className="px-4 sm:px-6 lg:px-10 py-12 bg-white">
        <div className="mx-auto max-w-7xl">
          <motion.p
            className={`text-cerulean text-[11px] tracking-wide uppercase font-semibold mb-3 ${lang === "ta" ? "font-tamil" : ""}`}
            initial={{ opacity: 0, y: -12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 0.5 }}
          >
            {t("இருப்பிடம்", "Location")}
          </motion.p>
          <motion.div
            className="bg-surface rounded-xl border border-slate-100 p-6 max-w-xl"
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={vp}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className={`text-navy font-semibold text-[15px] mb-1 ${lang === "ta" ? "font-tamil" : ""}`}>
              {t("சி.எஸ்.ஐ. செயின்ட் ஆண்ட்ரூஸ் திருச்சபை", "C.S.I St. Andrew's Church")}
            </p>
            <p className={`text-[13px] text-slate-500 ${lang === "ta" ? "font-tamil" : ""}`}>
              {t("கூடங்குளம், ராதாபுரம் வட்டம்", "Koodankulam, Radhapuram Block")}
            </p>
            <p className={`text-[13px] text-slate-500 ${lang === "ta" ? "font-tamil" : ""}`}>
              {t("திருநெல்வேலி மாவட்டம், தமிழ்நாடு 627106", "Tirunelveli District, Tamil Nadu 627106")}
            </p>
            <p className="text-[12px] text-slate-400 mt-2">CSI Kanyakumari Diocese · Tirunelveli District</p>
            <p className="text-[12px] text-slate-400">57 km south of Tirunelveli · Near Koodankulam Nuclear Power Plant</p>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
