import Link from 'next/link'
import { logout } from './admin/actions/auth'

const navItems = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/events', label: 'Events' },
  { href: '/admin/sermons', label: 'Sermons' },
  { href: '/admin/ministries', label: 'Ministries' },
  { href: '/admin/hero', label: 'Hero' },
  { href: '/admin/announcements', label: 'Announcements' },
  { href: '/admin/gallery', label: 'Gallery' },
  { href: '/admin/scripture', label: 'Scripture' },
  { href: '/admin/presbyter', label: 'Presbyter' },
  { href: '/admin/committee', label: 'Committee' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Sidebar */}
      <aside className="hidden md:flex w-52 flex-col bg-white border-r border-slate-200 shrink-0">
        <div className="px-4 py-5 border-b border-slate-100">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Admin Panel</p>
          <p className="text-sm font-bold text-navy mt-0.5">St. Andrew&apos;s</p>
        </div>
        <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-50 hover:text-navy transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t border-slate-100">
          <form action={logout}>
            <button type="submit" className="w-full text-left px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-50 transition-colors">
              Log out
            </button>
          </form>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 inset-x-0 z-10 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <p className="text-sm font-bold text-navy">St. Andrew&apos;s Admin</p>
        <div className="flex gap-2 overflow-x-auto text-xs">
          {navItems.slice(1).map((item) => (
            <Link key={item.href} href={item.href} className="text-slate-500 hover:text-navy shrink-0">{item.label}</Link>
          ))}
        </div>
      </div>

      {/* Main */}
      <main className="flex-1 p-4 md:p-8 mt-12 md:mt-0 overflow-auto">{children}</main>
    </div>
  )
}
