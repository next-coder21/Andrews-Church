import 'server-only'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const secret = new TextEncoder().encode(process.env.SESSION_SECRET)
const COOKIE = 'admin_session'

export async function encrypt(payload: { admin: boolean }): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret)
}

export async function decrypt(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret, { algorithms: ['HS256'] })
    return payload
  } catch {
    return undefined
  }
}

export async function createSession() {
  const token = await encrypt({ admin: true })
  const store = await cookies()
  store.set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })
}

export async function deleteSession() {
  const store = await cookies()
  store.delete(COOKIE)
}

export async function verifySession(): Promise<boolean> {
  const store = await cookies()
  const token = store.get(COOKIE)?.value
  if (!token) return false
  const payload = await decrypt(token)
  return !!payload?.admin
}
