import { readData } from '../../../../lib/data'
import { updateScripture } from '../actions/scripture'

interface Scripture { verseTa: string; verse: string; referenceTa: string; reference: string }

export default async function AdminScripturePage() {
  const scripture = await readData<Scripture>('scripture')
  return (
    <div className="max-w-xl">
      <h1 className="text-xl font-bold text-navy mb-6">Year Scripture</h1>
      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <form action={updateScripture} className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Verse (Tamil)</label>
            <textarea name="verseTa" defaultValue={scripture.verseTa} required rows={3} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Verse (English)</label>
            <textarea name="verse" defaultValue={scripture.verse} required rows={3} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Reference (Tamil)</label>
            <input name="referenceTa" defaultValue={scripture.referenceTa} required className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Reference (English)</label>
            <input name="reference" defaultValue={scripture.reference} required className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
          </div>
          <button type="submit" className="w-full bg-cerulean text-white rounded-lg py-2 text-sm font-semibold hover:bg-navy transition-colors">Save Changes</button>
        </form>
      </div>
    </div>
  )
}
