"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Lang = "ta" | "en";

interface LanguageContextType {
  lang: Lang;
  toggle: () => void;
  t: (ta: string, en: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "ta",
  toggle: () => {},
  t: (ta) => ta,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ta");

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang | null;
    if (saved === "en" || saved === "ta") setLang(saved);
  }, []);

  const toggle = () => {
    setLang((prev) => {
      const next = prev === "ta" ? "en" : "ta";
      localStorage.setItem("lang", next);
      return next;
    });
  };

  const t = (ta: string, en: string) => (lang === "ta" ? ta : en);

  return (
    <LanguageContext.Provider value={{ lang, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
