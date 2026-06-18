import Image from 'next/image'
import { readData } from '../../../../lib/data'
import { updatePresbyterInfo } from '../actions/presbyter'

interface Presbyter {
  name: string; nameTa: string; title: string; titleTa: string;
  bio: string; bioTa: string; photo: string;
}

export default async function AdminPresbyterPage() {
  const p = await readData<Presbyter>('presbyter')
  return (
    <div className="max-w-2xl">
      <h1 className="text-xl font-bold text-navy mb-6">Presbyter</h1>
      <div className="bg-white border border-slate-200 rounded-xl p-5">
        {p.photo && (
          <div className="mb-4">
            <Image src={`/uploads/${p.photo}`} alt={p.name} width={120} height={120} className="rounded-full object-cover w-24 h-24" />
          </div>
        )}
        <form action={updatePresbyterInfo} className="grid grid-cols-1 sm:grid-cols-2 gap-3" encType="multipart/form-data">
          <input name="name" defaultValue={p.name} placeholder="Name (English)" required className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
          <input name="nameTa" defaultValue={p.nameTa} placeholder="Name (Tamil)" required className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
          <input name="title" defaultValue={p.title} placeholder="Title (English)" required className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
          <input name="titleTa" defaultValue={p.titleTa} placeholder="Title (Tamil)" required className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
          <textarea name="bio" defaultValue={p.bio} placeholder="Bio (English)" rows={3} className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean sm:col-span-2" />
          <textarea name="bioTa" defaultValue={p.bioTa} placeholder="Bio (Tamil)" rows={3} className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean sm:col-span-2" />
          <div className="sm:col-span-2">
            <label className="block text-xs text-slate-500 mb-1">Photo (leave blank to keep current)</label>
            <input name="photo" type="file" accept="image/*" className="border border-slate-200 rounded-lg px-3 py-2 text-sm w-full file:mr-3 file:bg-cerulean file:text-white file:rounded file:border-0 file:px-3 file:py-1 file:text-sm" />
          </div>
          <button type="submit" className="sm:col-span-2 bg-cerulean text-white rounded-lg py-2 text-sm font-semibold hover:bg-navy transition-colors">Save Changes</button>
        </form>
      </div>
    </div>
  )
}
