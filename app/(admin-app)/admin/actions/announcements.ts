'use server'

import { revalidatePath } from 'next/cache'
import { readData, writeData } from '../../../../lib/data'

interface Announcement {
  id: number; titleTa: string; title: string;
  bodyTa: string; body: string; date: string; active: boolean;
}

export async function createAnnouncement(formData: FormData) {
  const items = await readData<Announcement[]>('announcements')
  const newId = items.length > 0 ? Math.max(...items.map(a => a.id)) + 1 : 1
  items.unshift({
    id: newId,
    titleTa: formData.get('titleTa') as string,
    title: formData.get('title') as string,
    bodyTa: formData.get('bodyTa') as string,
    body: formData.get('body') as string,
    date: new Date().toISOString().slice(0, 10),
    active: true,
  })
  await writeData('announcements', items)
  revalidatePath('/admin/announcements')
  revalidatePath('/')
}

export async function updateAnnouncement(formData: FormData) {
  const id = Number(formData.get('id'))
  const items = await readData<Announcement[]>('announcements')
  const idx = items.findIndex(a => a.id === id)
  if (idx === -1) return
  items[idx] = {
    ...items[idx],
    titleTa: formData.get('titleTa') as string,
    title: formData.get('title') as string,
    bodyTa: formData.get('bodyTa') as string,
    body: formData.get('body') as string,
  }
  await writeData('announcements', items)
  revalidatePath('/admin/announcements')
  revalidatePath('/')
}

export async function toggleAnnouncement(formData: FormData) {
  const id = Number(formData.get('id'))
  const items = await readData<Announcement[]>('announcements')
  const idx = items.findIndex(a => a.id === id)
  if (idx === -1) return
  items[idx].active = !items[idx].active
  await writeData('announcements', items)
  revalidatePath('/admin/announcements')
  revalidatePath('/')
}

export async function deleteAnnouncement(formData: FormData) {
  const id = Number(formData.get('id'))
  const items = await readData<Announcement[]>('announcements')
  await writeData('announcements', items.filter(a => a.id !== id))
  revalidatePath('/admin/announcements')
  revalidatePath('/')
}
