'use server'

import { revalidatePath } from 'next/cache'
import { writeData } from '../../../../lib/data'

export async function updateHero(formData: FormData) {
  await writeData('hero', {
    headingTa: formData.get('headingTa') as string,
    heading: formData.get('heading') as string,
    subtextTa: formData.get('subtextTa') as string,
    subtext: formData.get('subtext') as string,
  })
  revalidatePath('/')
}
