import { readData } from "../../../lib/data";
import SermonsPageClient from "./SermonsPageClient";

interface Sermon {
  id: number; titleTa: string; title: string; speaker: string; speakerTa: string;
  date: string; series: string; seriesTa: string; descTa: string; description: string;
}

export default async function SermonsPage() {
  const sermons = await readData<Sermon[]>("sermons");
  return <SermonsPageClient sermons={sermons} />;
}
