import Image from 'next/image'
import { readData } from '../../../../lib/data'
import { addMember, updateMember, deleteMember } from '../actions/committee'

interface CommitteeMember {
  id: number; name: string; nameTa: string; role: string; roleTa: string; photo: string;
}

export default async function AdminCommitteePage() {
  const items = await readData<CommitteeMember[]>('committee')
  return (
    <div className="max-w-3xl">
      <h1 className="text-xl font-bold text-navy mb-6">Church Committee</h1>
      <div className="bg-white border border-slate-200 rounded-xl p-5 mb-6">
        <h2 className="text-sm font-semibold text-slate-700 mb-4">Add Member</h2>
        <form action={addMember} className="grid grid-cols-1 sm:grid-cols-2 gap-3" encType="multipart/form-data">
          <input name="name" placeholder="Name (English)" required className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
          <input name="nameTa" placeholder="Name (Tamil)" required className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
          <input name="role" placeholder="Role (English)" required className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
          <input name="roleTa" placeholder="Role (Tamil)" required className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
          <div className="sm:col-span-2">
            <label className="block text-xs text-slate-500 mb-1">Photo (optional)</label>
            <input name="photo" type="file" accept="image/*" className="border border-slate-200 rounded-lg px-3 py-2 text-sm w-full file:mr-3 file:bg-cerulean file:text-white file:rounded file:border-0 file:px-3 file:py-1 file:text-sm" />
          </div>
          <button type="submit" className="sm:col-span-2 bg-cerulean text-white rounded-lg py-2 text-sm font-semibold hover:bg-navy transition-colors">Add Member</button>
        </form>
      </div>
      <div className="space-y-3">
        {items.map((m) => (
          <details key={m.id} className="bg-white border border-slate-200 rounded-xl">
            <summary className="px-5 py-4 cursor-pointer flex items-center gap-3">
              {m.photo && (
                <Image src={`/uploads/${m.photo}`} alt={m.name} width={40} height={40} className="rounded-full object-cover w-10 h-10 flex-shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-navy truncate">{m.name}</p>
                <p className="text-xs text-slate-400 truncate">{m.role}</p>
              </div>
              <span className="text-xs text-slate-400 flex-shrink-0">Edit ▾</span>
            </summary>
            <div className="px-5 pb-5 border-t border-slate-100 pt-4 space-y-3">
              <form action={updateMember} className="grid grid-cols-1 sm:grid-cols-2 gap-3" encType="multipart/form-data">
                <input type="hidden" name="id" value={m.id} />
                <input name="name" defaultValue={m.name} placeholder="Name (English)" required className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
                <input name="nameTa" defaultValue={m.nameTa} placeholder="Name (Tamil)" required className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
                <input name="role" defaultValue={m.role} placeholder="Role (English)" required className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
                <input name="roleTa" defaultValue={m.roleTa} placeholder="Role (Tamil)" required className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
                <div className="sm:col-span-2">
                  <label className="block text-xs text-slate-500 mb-1">Replace photo (optional)</label>
                  <input name="photo" type="file" accept="image/*" className="border border-slate-200 rounded-lg px-3 py-2 text-sm w-full file:mr-3 file:bg-cerulean file:text-white file:rounded file:border-0 file:px-3 file:py-1 file:text-sm" />
                </div>
                <button type="submit" className="sm:col-span-2 bg-cerulean text-white rounded-lg py-2 text-sm font-semibold hover:bg-navy transition-colors">Save Changes</button>
              </form>
              <form action={deleteMember}>
                <input type="hidden" name="id" value={m.id} />
                <button type="submit" className="text-red-500 text-xs hover:underline">Delete Member</button>
              </form>
            </div>
          </details>
        ))}
        {items.length === 0 && <p className="text-slate-400 text-sm">No committee members yet.</p>}
      </div>
    </div>
  )
}
