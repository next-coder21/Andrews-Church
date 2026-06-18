import Link from 'next/link'

const sections = [
  { href: '/admin/events', label: 'Events', desc: 'Add, edit or remove church events' },
  { href: '/admin/sermons', label: 'Sermons', desc: 'Manage sermon recordings and notes' },
  { href: '/admin/ministries', label: 'Ministries', desc: 'Update ministry details and leaders' },
  { href: '/admin/hero', label: 'Hero Text', desc: 'Edit home page headline' },
  { href: '/admin/announcements', label: 'Announcements', desc: 'Post and manage notices' },
  { href: '/admin/gallery', label: 'Gallery', desc: 'Upload and remove photos' },
  { href: '/admin/scripture', label: 'Scripture', desc: 'Update the year verse' },
  { href: '/admin/presbyter', label: 'Presbyter', desc: 'Update presbyter info and photo' },
  { href: '/admin/committee', label: 'Committee', desc: 'Manage committee members' },
]

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-navy mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="bg-white border border-slate-200 rounded-xl p-5 hover:border-cerulean hover:shadow-sm transition-all"
          >
            <p className="font-semibold text-navy text-sm mb-1">{s.label}</p>
            <p className="text-xs text-slate-400">{s.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
