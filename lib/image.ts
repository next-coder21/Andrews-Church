import sharp from 'sharp'
import { promises as fs } from 'fs'
import path from 'path'
import { randomUUID } from 'crypto'

const uploadsDir = path.join(process.cwd(), 'public', 'uploads')

export async function saveUploadedImage(
  file: File,
  maxWidth: number
): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer())
  const filename = `${randomUUID()}.webp`
  const dest = path.join(uploadsDir, filename)

  await sharp(buffer)
    .resize({ width: maxWidth, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(dest)

  return filename
}

export async function deleteUploadedImage(filename: string): Promise<void> {
  if (!filename) return
  const filePath = path.join(uploadsDir, filename)
  try {
    await fs.unlink(filePath)
  } catch {
    // file may already be gone
  }
}
