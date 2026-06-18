import { readData } from '../../../../lib/data'
import { createMinistry, updateMinistry, deleteMinistry } from '../actions/ministries'

interface Ministry {
  id: number; nameTa: string; name: string; leader: string; leaderTa: string;
  schedule: string; scheduleTa: string; descTa: string; description: string;
}

function MinistryForm({ ministry, action, label }: { ministry?: Ministry; action: (f: FormData) => Promise<void>; label: string }) {
  return (
    <form action={action} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {ministry && <input type="hidden" name="id" value={ministry.id} />}
      <input name="nameTa" defaultValue={ministry?.nameTa} placeholder="Name (Tamil)" required className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
      <input name="name" defaultValue={ministry?.name} placeholder="Name (English)" required className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
      <input name="leaderTa" defaultValue={ministry?.leaderTa} placeholder="Leader (Tamil)" required className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
      <input name="leader" defaultValue={ministry?.leader} placeholder="Leader (English)" required className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
      <input name="scheduleTa" defaultValue={ministry?.scheduleTa} placeholder="Schedule (Tamil)" required className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
      <input name="schedule" defaultValue={ministry?.schedule} placeholder="Schedule (English)" required className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
      <textarea name="descTa" defaultValue={ministry?.descTa} placeholder="Description (Tamil)" required rows={2} className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean sm:col-span-2" />
      <textarea name="description" defaultValue={ministry?.description} placeholder="Description (English)" required rows={2} className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean sm:col-span-2" />
      <button type="submit" className="sm:col-span-2 bg-cerulean text-white rounded-lg py-2 text-sm font-semibold hover:bg-navy transition-colors">{label}</button>
    </form>
  )
}

export default async function AdminMinistriesPage() {
  const ministries = await readData<Ministry[]>('ministries')
  return (
    <div className="max-w-3xl">
      <h1 className="text-xl font-bold text-navy mb-6">Ministries</h1>
      <div className="bg-white border border-slate-200 rounded-xl p-5 mb-6">
        <h2 className="text-sm font-semibold text-slate-700 mb-4">Add New Ministry</h2>
        <MinistryForm action={createMinistry} label="Add Ministry" />
      </div>
      <div className="space-y-3">
        {ministries.map((m) => (
          <details key={m.id} className="bg-white border border-slate-200 rounded-xl">
            <summary className="px-5 py-4 cursor-pointer flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-navy">{m.name}</p>
                <p className="text-xs text-slate-400">{m.leader} · {m.schedule}</p>
              </div>
              <span className="text-xs text-slate-400">Edit ▾</span>
            </summary>
            <div className="px-5 pb-5 border-t border-slate-100 pt-4 space-y-3">
              <MinistryForm ministry={m} action={updateMinistry} label="Save Changes" />
              <form action={deleteMinistry}>
                <input type="hidden" name="id" value={m.id} />
                <button type="submit" className="text-red-500 text-xs hover:underline">Delete this ministry</button>
              </form>
            </div>
          </details>
        ))}
      </div>
    </div>
  )
}
