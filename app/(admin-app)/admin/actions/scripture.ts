'use server'

import { revalidatePath } from 'next/cache'
import { writeData } from '../../../../lib/data'

export async function updateScripture(formData: FormData) {
  await writeData('scripture', {
    verseTa: formData.get('verseTa') as string,
    verse: formData.get('verse') as string,
    referenceTa: formData.get('referenceTa') as string,
    reference: formData.get('reference') as string,
  })
  revalidatePath('/')
}
