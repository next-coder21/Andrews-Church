import { readData } from "../../../lib/data";
import MinistriesPageClient from "./MinistriesPageClient";

interface Ministry {
  id: number; nameTa: string; name: string; leader: string; leaderTa: string;
  schedule: string; scheduleTa: string; descTa: string; description: string;
}

export default async function MinistriesPage() {
  const ministries = await readData<Ministry[]>("ministries");
  return <MinistriesPageClient ministries={ministries} />;
}
