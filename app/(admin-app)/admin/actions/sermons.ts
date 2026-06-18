'use server'

import { revalidatePath } from 'next/cache'
import { readData, writeData } from '../../../../lib/data'

interface Sermon {
  id: number; titleTa: string; title: string; speaker: string; speakerTa: string;
  date: string; series: string; seriesTa: string; descTa: string; description: string;
}

export async function createSermon(formData: FormData) {
  const sermons = await readData<Sermon[]>('sermons')
  const newId = sermons.length > 0 ? Math.max(...sermons.map(s => s.id)) + 1 : 1
  sermons.push({
    id: newId,
    titleTa: formData.get('titleTa') as string,
    title: formData.get('title') as string,
    speaker: formData.get('speaker') as string,
    speakerTa: formData.get('speakerTa') as string,
    date: formData.get('date') as string,
    series: formData.get('series') as string,
    seriesTa: formData.get('seriesTa') as string,
    descTa: formData.get('descTa') as string,
    description: formData.get('description') as string,
  })
  await writeData('sermons', sermons)
  revalidatePath('/admin/sermons')
  revalidatePath('/sermons')
}

export async function updateSermon(formData: FormData) {
  const id = Number(formData.get('id'))
  const sermons = await readData<Sermon[]>('sermons')
  const idx = sermons.findIndex(s => s.id === id)
  if (idx === -1) return
  sermons[idx] = {
    id,
    titleTa: formData.get('titleTa') as string,
    title: formData.get('title') as string,
    speaker: formData.get('speaker') as string,
    speakerTa: formData.get('speakerTa') as string,
    date: formData.get('date') as string,
    series: formData.get('series') as string,
    seriesTa: formData.get('seriesTa') as string,
    descTa: formData.get('descTa') as string,
    description: formData.get('description') as string,
  }
  await writeData('sermons', sermons)
  revalidatePath('/admin/sermons')
  revalidatePath('/sermons')
}

export async function deleteSermon(formData: FormData) {
  const id = Number(formData.get('id'))
  const sermons = await readData<Sermon[]>('sermons')
  await writeData('sermons', sermons.filter(s => s.id !== id))
  revalidatePath('/admin/sermons')
  revalidatePath('/sermons')
}
