import { readData } from '../../../../lib/data'
import { createSermon, updateSermon, deleteSermon } from '../actions/sermons'

interface Sermon {
  id: number; titleTa: string; title: string; speaker: string; speakerTa: string;
  date: string; series: string; seriesTa: string; descTa: string; description: string;
}

function SermonForm({ sermon, action, label }: { sermon?: Sermon; action: (f: FormData) => Promise<void>; label: string }) {
  return (
    <form action={action} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {sermon && <input type="hidden" name="id" value={sermon.id} />}
      <input name="titleTa" defaultValue={sermon?.titleTa} placeholder="Title (Tamil)" required className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
      <input name="title" defaultValue={sermon?.title} placeholder="Title (English)" required className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
      <input name="speakerTa" defaultValue={sermon?.speakerTa} placeholder="Speaker (Tamil)" required className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
      <input name="speaker" defaultValue={sermon?.speaker} placeholder="Speaker (English)" required className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
      <input name="date" defaultValue={sermon?.date} placeholder="Date" required className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
      <input name="series" defaultValue={sermon?.series} placeholder="Series" required className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
      <input name="seriesTa" defaultValue={sermon?.seriesTa} placeholder="Series (Tamil)" required className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
      <div />
      <textarea name="descTa" defaultValue={sermon?.descTa} placeholder="Description (Tamil)" required rows={2} className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean sm:col-span-2" />
      <textarea name="description" defaultValue={sermon?.description} placeholder="Description (English)" required rows={2} className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean sm:col-span-2" />
      <button type="submit" className="sm:col-span-2 bg-cerulean text-white rounded-lg py-2 text-sm font-semibold hover:bg-navy transition-colors">{label}</button>
    </form>
  )
}

export default async function AdminSermonsPage() {
  const sermons = await readData<Sermon[]>('sermons')
  return (
    <div className="max-w-3xl">
      <h1 className="text-xl font-bold text-navy mb-6">Sermons</h1>
      <div className="bg-white border border-slate-200 rounded-xl p-5 mb-6">
        <h2 className="text-sm font-semibold text-slate-700 mb-4">Add New Sermon</h2>
        <SermonForm action={createSermon} label="Add Sermon" />
      </div>
      <div className="space-y-3">
        {sermons.map((s) => (
          <details key={s.id} className="bg-white border border-slate-200 rounded-xl">
            <summary className="px-5 py-4 cursor-pointer flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-navy">{s.title}</p>
                <p className="text-xs text-slate-400">{s.speaker} · {s.date}</p>
              </div>
              <span className="text-xs text-slate-400">Edit ▾</span>
            </summary>
            <div className="px-5 pb-5 border-t border-slate-100 pt-4 space-y-3">
              <SermonForm sermon={s} action={updateSermon} label="Save Changes" />
              <form action={deleteSermon}>
                <input type="hidden" name="id" value={s.id} />
                <button type="submit" className="text-red-500 text-xs hover:underline">Delete this sermon</button>
              </form>
            </div>
          </details>
        ))}
      </div>
    </div>
  )
}
