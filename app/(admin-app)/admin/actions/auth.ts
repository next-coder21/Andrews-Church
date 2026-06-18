'use server'

import { redirect } from 'next/navigation'
import { createSession, deleteSession } from '../../../../lib/session'

export async function login(_prevState: { error: string } | undefined, formData: FormData) {
  const username = formData.get('username') as string
  const password = formData.get('password') as string

  if (
    username !== process.env.ADMIN_USERNAME ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return { error: 'Invalid credentials' }
  }

  await createSession()
  redirect('/admin')
}

export async function logout() {
  await deleteSession()
  redirect('/admin/login')
}
