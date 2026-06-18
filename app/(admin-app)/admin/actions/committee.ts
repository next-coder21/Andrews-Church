'use server'

import { revalidatePath } from 'next/cache'
import { readData, writeData } from '../../../../lib/data'
import { saveUploadedImage, deleteUploadedImage } from '../../../../lib/image'

interface CommitteeMember {
  id: number; name: string; nameTa: string; role: string; roleTa: string; photo: string;
}

export async function addMember(formData: FormData): Promise<void> {
  const file = formData.get('photo') as File
  let photo = ''
  if (file && file.size > 0) photo = await saveUploadedImage(file, 400)
  const items = await readData<CommitteeMember[]>('committee')
  const newId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1
  items.push({
    id: newId,
    name: formData.get('name') as string,
    nameTa: formData.get('nameTa') as string,
    role: formData.get('role') as string,
    roleTa: formData.get('roleTa') as string,
    photo,
  })
  await writeData('committee', items)
  revalidatePath('/admin/committee')
  revalidatePath('/')
}

export async function updateMember(formData: FormData): Promise<void> {
  const id = Number(formData.get('id'))
  const items = await readData<CommitteeMember[]>('committee')
  const idx = items.findIndex(m => m.id === id)
  if (idx === -1) return
  let photo = items[idx].photo
  const file = formData.get('photo') as File
  if (file && file.size > 0) {
    if (photo) await deleteUploadedImage(photo)
    photo = await saveUploadedImage(file, 400)
  }
  items[idx] = {
    ...items[idx],
    name: formData.get('name') as string,
    nameTa: formData.get('nameTa') as string,
    role: formData.get('role') as string,
    roleTa: formData.get('roleTa') as string,
    photo,
  }
  await writeData('committee', items)
  revalidatePath('/admin/committee')
  revalidatePath('/')
}

export async function deleteMember(formData: FormData): Promise<void> {
  const id = Number(formData.get('id'))
  const items = await readData<CommitteeMember[]>('committee')
  const item = items.find(m => m.id === id)
  if (item?.photo) await deleteUploadedImage(item.photo)
  await writeData('committee', items.filter(m => m.id !== id))
  revalidatePath('/admin/committee')
  revalidatePath('/')
}
