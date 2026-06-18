'use server'

import { revalidatePath } from 'next/cache'
import { readData, writeData } from '../../../../lib/data'

interface ChurchEvent {
  id: number; titleTa: string; title: string;
  date: string; time: string; descTa: string; description: string;
}

export async function createEvent(formData: FormData) {
  const events = await readData<ChurchEvent[]>('events')
  const newId = events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1
  events.push({
    id: newId,
    titleTa: formData.get('titleTa') as string,
    title: formData.get('title') as string,
    date: formData.get('date') as string,
    time: formData.get('time') as string,
    descTa: formData.get('descTa') as string,
    description: formData.get('description') as string,
  })
  await writeData('events', events)
  revalidatePath('/admin/events')
  revalidatePath('/')
  revalidatePath('/events')
}

export async function updateEvent(formData: FormData) {
  const id = Number(formData.get('id'))
  const events = await readData<ChurchEvent[]>('events')
  const idx = events.findIndex(e => e.id === id)
  if (idx === -1) return
  events[idx] = {
    id,
    titleTa: formData.get('titleTa') as string,
    title: formData.get('title') as string,
    date: formData.get('date') as string,
    time: formData.get('time') as string,
    descTa: formData.get('descTa') as string,
    description: formData.get('description') as string,
  }
  await writeData('events', events)
  revalidatePath('/admin/events')
  revalidatePath('/')
  revalidatePath('/events')
}

export async function deleteEvent(formData: FormData) {
  const id = Number(formData.get('id'))
  const events = await readData<ChurchEvent[]>('events')
  await writeData('events', events.filter(e => e.id !== id))
  revalidatePath('/admin/events')
  revalidatePath('/')
  revalidatePath('/events')
}
