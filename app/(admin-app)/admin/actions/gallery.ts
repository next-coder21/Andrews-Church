'use server'

import { revalidatePath } from 'next/cache'
import { readData, writeData } from '../../../../lib/data'
import { saveUploadedImage, deleteUploadedImage } from '../../../../lib/image'

interface GalleryItem {
  id: number; filename: string; caption: string; captionTa: string; uploadedAt: string;
}

export async function uploadPhoto(formData: FormData): Promise<{ error: string } | void> {
  const file = formData.get('photo') as File
  if (!file || file.size === 0) return { error: 'No file selected' }
  if (!file.type.startsWith('image/')) return { error: 'File must be an image' }
  if (file.size > 5 * 1024 * 1024) return { error: 'File must be under 5MB' }

  const filename = await saveUploadedImage(file, 1200)
  const items = await readData<GalleryItem[]>('gallery')
  const newId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1
  items.push({
    id: newId,
    filename,
    caption: formData.get('caption') as string ?? '',
    captionTa: formData.get('captionTa') as string ?? '',
    uploadedAt: new Date().toISOString().slice(0, 10),
  })
  await writeData('gallery', items)
  revalidatePath('/admin/gallery')
  revalidatePath('/gallery')
}

export async function deletePhoto(formData: FormData) {
  const id = Number(formData.get('id'))
  const items = await readData<GalleryItem[]>('gallery')
  const item = items.find(i => i.id === id)
  if (item) await deleteUploadedImage(item.filename)
  await writeData('gallery', items.filter(i => i.id !== id))
  revalidatePath('/admin/gallery')
  revalidatePath('/gallery')
}
