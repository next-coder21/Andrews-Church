import { readData } from '../../../../lib/data'
import { updateHero } from '../actions/hero'

interface Hero { headingTa: string; heading: string; subtextTa: string; subtext: string }

export default async function AdminHeroPage() {
  const hero = await readData<Hero>('hero')
  return (
    <div className="max-w-xl">
      <h1 className="text-xl font-bold text-navy mb-6">Hero Text</h1>
      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <form action={updateHero} className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Heading (Tamil)</label>
            <input name="headingTa" defaultValue={hero.headingTa} required className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Heading (English)</label>
            <input name="heading" defaultValue={hero.heading} required className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Subtext (Tamil)</label>
            <input name="subtextTa" defaultValue={hero.subtextTa} required className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Subtext (English)</label>
            <input name="subtext" defaultValue={hero.subtext} required className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
          </div>
          <button type="submit" className="w-full bg-cerulean text-white rounded-lg py-2 text-sm font-semibold hover:bg-navy transition-colors">Save Changes</button>
        </form>
      </div>
    </div>
  )
}
