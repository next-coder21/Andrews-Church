import { readData } from '../../../../lib/data'
import { createEvent, updateEvent, deleteEvent } from '../actions/events'

interface ChurchEvent {
  id: number; titleTa: string; title: string;
  date: string; time: string; descTa: string; description: string;
}

function EventForm({ event, action, label }: { event?: ChurchEvent; action: (f: FormData) => Promise<void>; label: string }) {
  return (
    <form action={action} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {event && <input type="hidden" name="id" value={event.id} />}
      <input name="titleTa" defaultValue={event?.titleTa} placeholder="Title (Tamil)" required className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
      <input name="title" defaultValue={event?.title} placeholder="Title (English)" required className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
      <input name="date" defaultValue={event?.date} placeholder="Date" required className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
      <input name="time" defaultValue={event?.time} placeholder="Time" required className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
      <textarea name="descTa" defaultValue={event?.descTa} placeholder="Description (Tamil)" required rows={2} className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean sm:col-span-2" />
      <textarea name="description" defaultValue={event?.description} placeholder="Description (English)" required rows={2} className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean sm:col-span-2" />
      <button type="submit" className="sm:col-span-2 bg-cerulean text-white rounded-lg py-2 text-sm font-semibold hover:bg-navy transition-colors">{label}</button>
    </form>
  )
}

export default async function AdminEventsPage() {
  const events = await readData<ChurchEvent[]>('events')

  return (
    <div className="max-w-3xl">
      <h1 className="text-xl font-bold text-navy mb-6">Events</h1>

      {/* Add new */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 mb-6">
        <h2 className="text-sm font-semibold text-slate-700 mb-4">Add New Event</h2>
        <EventForm action={createEvent} label="Add Event" />
      </div>

      {/* List */}
      <div className="space-y-3">
        {events.map((e) => (
          <details key={e.id} className="bg-white border border-slate-200 rounded-xl">
            <summary className="px-5 py-4 cursor-pointer flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-navy">{e.title}</p>
                <p className="text-xs text-slate-400">{e.date} · {e.time}</p>
              </div>
              <span className="text-xs text-slate-400">Edit ▾</span>
            </summary>
            <div className="px-5 pb-5 border-t border-slate-100 pt-4 space-y-3">
              <EventForm event={e} action={updateEvent} label="Save Changes" />
              <form action={deleteEvent}>
                <input type="hidden" name="id" value={e.id} />
                <button type="submit" className="text-red-500 text-xs hover:underline">Delete this event</button>
              </form>
            </div>
          </details>
        ))}
      </div>
    </div>
  )
}
