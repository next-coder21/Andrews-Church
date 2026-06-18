import { readData } from "../../../lib/data";
import EventsPageClient from "./EventsPageClient";

interface ChurchEvent {
  id: number; titleTa: string; title: string;
  date: string; time: string; descTa: string; description: string;
}

export default async function EventsPage() {
  const events = await readData<ChurchEvent[]>("events");
  return <EventsPageClient events={events} />;
}
