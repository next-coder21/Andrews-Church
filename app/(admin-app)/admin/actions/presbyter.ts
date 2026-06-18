'use server'

import { revalidatePath } from 'next/cache'
import { readData, writeData } from '../../../../lib/data'
import { saveUploadedImage, deleteUploadedImage } from '../../../../lib/image'

interface Presbyter {
  name: string; nameTa: string; title: string; titleTa: string;
  bio: string; bioTa: string; photo: string;
}

export async function updatePresbyterInfo(formData: FormData): Promise<void> {
  const current = await readData<Presbyter>('presbyter')
  let photo = current.photo
  const file = formData.get('photo') as File
  if (file && file.size > 0) {
    if (photo) await deleteUploadedImage(photo)
    photo = await saveUploadedImage(file, 400)
  }
  await writeData<Presbyter>('presbyter', {
    name: formData.get('name') as string,
    nameTa: formData.get('nameTa') as string,
    title: formData.get('title') as string,
    titleTa: formData.get('titleTa') as string,
    bio: formData.get('bio') as string,
    bioTa: formData.get('bioTa') as string,
    photo,
  })
  revalidatePath('/admin/presbyter')
  revalidatePath('/')
}
