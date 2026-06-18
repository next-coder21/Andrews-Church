import { promises as fs } from 'fs'
import path from 'path'

export type DataFile =
  | 'events' | 'sermons' | 'ministries' | 'hero'
  | 'announcements' | 'gallery' | 'scripture'
  | 'presbyter' | 'committee'

const dataDir = path.join(process.cwd(), 'data')

export async function readData<T>(name: DataFile): Promise<T> {
  const file = path.join(dataDir, `${name}.json`)
  const text = await fs.readFile(file, 'utf-8')
  return JSON.parse(text) as T
}

export async function writeData<T>(name: DataFile, data: T): Promise<void> {
  const file = path.join(dataDir, `${name}.json`)
  await fs.writeFile(file, JSON.stringify(data, null, 2), 'utf-8')
}
