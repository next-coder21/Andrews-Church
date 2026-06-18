import { readData } from '../../../../lib/data'
import { createAnnouncement, updateAnnouncement, toggleAnnouncement, deleteAnnouncement } from '../actions/announcements'

interface Announcement {
  id: number; titleTa: string; title: string;
  bodyTa: string; body: string; date: string; active: boolean;
}

export default async function AdminAnnouncementsPage() {
  const items = await readData<Announcement[]>('announcements')
  return (
    <div className="max-w-3xl">
      <h1 className="text-xl font-bold text-navy mb-6">Announcements</h1>
      <div className="bg-white border border-slate-200 rounded-xl p-5 mb-6">
        <h2 className="text-sm font-semibold text-slate-700 mb-4">Add New Announcement</h2>
        <form action={createAnnouncement} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input name="titleTa" placeholder="Title (Tamil)" required className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
          <input name="title" placeholder="Title (English)" required className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
          <textarea name="bodyTa" placeholder="Body (Tamil)" required rows={2} className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean sm:col-span-2" />
          <textarea name="body" placeholder="Body (English)" required rows={2} className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean sm:col-span-2" />
          <button type="submit" className="sm:col-span-2 bg-cerulean text-white rounded-lg py-2 text-sm font-semibold hover:bg-navy transition-colors">Add Announcement</button>
        </form>
      </div>
      <div className="space-y-3">
        {items.map((a) => (
          <details key={a.id} className="bg-white border border-slate-200 rounded-xl">
            <summary className="px-5 py-4 cursor-pointer flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-navy">{a.title}</p>
                <p className="text-xs text-slate-400">
                  {a.date} · <span className={a.active ? 'text-green-500' : 'text-slate-400'}>{a.active ? 'Active' : 'Hidden'}</span>
                </p>
              </div>
              <span className="text-xs text-slate-400">Edit ▾</span>
            </summary>
            <div className="px-5 pb-5 border-t border-slate-100 pt-4 space-y-3">
              <form action={updateAnnouncement} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input type="hidden" name="id" value={a.id} />
                <input name="titleTa" defaultValue={a.titleTa} placeholder="Title (Tamil)" required className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
                <input name="title" defaultValue={a.title} placeholder="Title (English)" required className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
                <textarea name="bodyTa" defaultValue={a.bodyTa} placeholder="Body (Tamil)" required rows={2} className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean sm:col-span-2" />
                <textarea name="body" defaultValue={a.body} placeholder="Body (English)" required rows={2} className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean sm:col-span-2" />
                <button type="submit" className="sm:col-span-2 bg-cerulean text-white rounded-lg py-2 text-sm font-semibold hover:bg-navy transition-colors">Save Changes</button>
              </form>
              <div className="flex gap-3">
                <form action={toggleAnnouncement}>
                  <input type="hidden" name="id" value={a.id} />
                  <button type="submit" className="text-xs text-cerulean hover:underline">{a.active ? 'Hide' : 'Show'}</button>
                </form>
                <form action={deleteAnnouncement}>
                  <input type="hidden" name="id" value={a.id} />
                  <button type="submit" className="text-red-500 text-xs hover:underline">Delete</button>
                </form>
              </div>
            </div>
          </details>
        ))}
        {items.length === 0 && <p className="text-slate-400 text-sm">No announcements yet.</p>}
      </div>
    </div>
  )
}
