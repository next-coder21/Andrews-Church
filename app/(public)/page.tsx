import { readData } from "../../lib/data";
import HeroSection from "../components/HeroSection";
import ScriptureSection from "../components/ScriptureSection";
import WaveDivider from "../components/WaveDivider";
import YearVerseSection from "../components/YearVerseSection";
import ValuesSection from "../components/ValuesSection";
import EventsCarousel from "../components/EventsCarousel";

interface Scripture {
  verseTa: string; verse: string; referenceTa: string; reference: string;
}
interface ChurchEvent {
  id: number; titleTa: string; title: string;
  date: string; time: string; descTa: string; description: string;
}

export default async function Home() {
  const scripture = await readData<Scripture>("scripture");
  const events = await readData<ChurchEvent[]>("events");

  return (
    <>
      <HeroSection />
      <ScriptureSection />
      <WaveDivider fill="#ffffff" background="#03045e" />
      <YearVerseSection scripture={scripture} />
      <WaveDivider fill="#f4f9fb" background="#ffffff" />
      <ValuesSection />
      <WaveDivider fill="#ffffff" background="#f4f9fb" />
      <EventsCarousel events={events} />
    </>
  );
}
