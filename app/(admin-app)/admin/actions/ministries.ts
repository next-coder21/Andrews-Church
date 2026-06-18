'use server'

import { revalidatePath } from 'next/cache'
import { readData, writeData } from '../../../../lib/data'

interface Ministry {
  id: number; nameTa: string; name: string; leader: string; leaderTa: string;
  schedule: string; scheduleTa: string; descTa: string; description: string;
}

export async function createMinistry(formData: FormData) {
  const ministries = await readData<Ministry[]>('ministries')
  const newId = ministries.length > 0 ? Math.max(...ministries.map(m => m.id)) + 1 : 1
  ministries.push({
    id: newId,
    nameTa: formData.get('nameTa') as string,
    name: formData.get('name') as string,
    leader: formData.get('leader') as string,
    leaderTa: formData.get('leaderTa') as string,
    schedule: formData.get('schedule') as string,
    scheduleTa: formData.get('scheduleTa') as string,
    descTa: formData.get('descTa') as string,
    description: formData.get('description') as string,
  })
  await writeData('ministries', ministries)
  revalidatePath('/admin/ministries')
  revalidatePath('/ministries')
}

export async function updateMinistry(formData: FormData) {
  const id = Number(formData.get('id'))
  const ministries = await readData<Ministry[]>('ministries')
  const idx = ministries.findIndex(m => m.id === id)
  if (idx === -1) return
  ministries[idx] = {
    id,
    nameTa: formData.get('nameTa') as string,
    name: formData.get('name') as string,
    leader: formData.get('leader') as string,
    leaderTa: formData.get('leaderTa') as string,
    schedule: formData.get('schedule') as string,
    scheduleTa: formData.get('scheduleTa') as string,
    descTa: formData.get('descTa') as string,
    description: formData.get('description') as string,
  }
  await writeData('ministries', ministries)
  revalidatePath('/admin/ministries')
  revalidatePath('/ministries')
}

export async function deleteMinistry(formData: FormData) {
  const id = Number(formData.get('id'))
  const ministries = await readData<Ministry[]>('ministries')
  await writeData('ministries', ministries.filter(m => m.id !== id))
  revalidatePath('/admin/ministries')
  revalidatePath('/ministries')
}
