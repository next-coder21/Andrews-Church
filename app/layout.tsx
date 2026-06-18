import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, Noto_Sans_Tamil } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./context/LanguageContext";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant-var",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans-var",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const notoTamil = Noto_Sans_Tamil({
  variable: "--font-tamil-var",
  subsets: ["tamil"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "C.S.I St. Andrew's Church – Koodankulam",
  description:
    "C.S.I St. Andrew's Church Koodankulam, Tamil Nadu 627106. CSI Kanyakumari Diocese. சி.எஸ்.ஐ. செயின்ட் ஆண்ட்ரூஸ் திருச்சபை கூடங்குளம்.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ta"
      className={`${cormorant.variable} ${dmSans.variable} ${notoTamil.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-white text-navy">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
