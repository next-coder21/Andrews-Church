import HeroSection from "./components/HeroSection";
import ScriptureSection from "./components/ScriptureSection";
import YearVerseSection from "./components/YearVerseSection";
import ValuesSection from "./components/ValuesSection";
import EventsCarousel from "./components/EventsCarousel";
import WaveDivider from "./components/WaveDivider";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ScriptureSection />
      <WaveDivider fill="#ffffff" background="#03045e" />
      <YearVerseSection />
      <WaveDivider fill="#f4f9fb" background="#ffffff" />
      <ValuesSection />
      <WaveDivider fill="#ffffff" background="#f4f9fb" />
      <EventsCarousel />
    </>
  );
}
