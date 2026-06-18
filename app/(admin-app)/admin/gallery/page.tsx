import Image from 'next/image'
import { readData } from '../../../../lib/data'
import { uploadPhoto, deletePhoto } from '../actions/gallery'

interface GalleryItem {
  id: number; filename: string; caption: string; captionTa: string; uploadedAt: string;
}

export default async function AdminGalleryPage() {
  const items = await readData<GalleryItem[]>('gallery')
  return (
    <div className="max-w-4xl">
      <h1 className="text-xl font-bold text-navy mb-6">Gallery</h1>
      <div className="bg-white border border-slate-200 rounded-xl p-5 mb-6">
        <h2 className="text-sm font-semibold text-slate-700 mb-4">Upload Photo</h2>
        <form action={uploadPhoto} className="grid grid-cols-1 sm:grid-cols-2 gap-3" encType="multipart/form-data">
          <input name="photo" type="file" accept="image/*" required className="sm:col-span-2 border border-slate-200 rounded-lg px-3 py-2 text-sm file:mr-3 file:bg-cerulean file:text-white file:rounded file:border-0 file:px-3 file:py-1 file:text-sm" />
          <input name="captionTa" placeholder="Caption (Tamil)" className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
          <input name="caption" placeholder="Caption (English)" className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
          <button type="submit" className="sm:col-span-2 bg-cerulean text-white rounded-lg py-2 text-sm font-semibold hover:bg-navy transition-colors">Upload Photo</button>
        </form>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {items.map((item) => (
          <div key={item.id} className="relative group rounded-xl overflow-hidden border border-slate-200">
            <Image
              src={`/uploads/${item.filename}`}
              alt={item.caption || 'Gallery photo'}
              width={300}
              height={200}
              className="object-cover w-full h-36"
            />
            {item.caption && (
              <p className="text-xs text-slate-600 px-2 py-1 truncate">{item.caption}</p>
            )}
            <form action={deletePhoto} className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <input type="hidden" name="id" value={item.id} />
              <button type="submit" className="bg-red-500 text-white text-xs rounded px-2 py-0.5 hover:bg-red-700">Del</button>
            </form>
          </div>
        ))}
        {items.length === 0 && <p className="col-span-4 text-slate-400 text-sm">No photos yet.</p>}
      </div>
    </div>
  )
}
