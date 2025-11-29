'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface MenuItem {
  name: string
  href: string
  icon: string
}

const menuItems: MenuItem[] = [
  { name: 'Dashboard', href: '/admin', icon: '📊' },
  { name: 'Sayt Parametrləri', href: '/admin/settings', icon: '⚙️' },
  { name: 'Slider', href: '/admin/sliders', icon: '🖼️' },
  { name: 'Haqqımızda', href: '/admin/about', icon: 'ℹ️' },
  { name: 'Xidmətlər', href: '/admin/services', icon: '🔧' },
  { name: 'Layihələr', href: '/admin/projects', icon: '📁' },
  { name: 'Texnika Kateqoriyaları', href: '/admin/categories', icon: '📂' },
  { name: 'Texnika Parkı', href: '/admin/equipment', icon: '🚜' },
  { name: 'Xəbərlər', href: '/admin/news', icon: '📰' },
  { name: 'Karyera', href: '/admin/careers', icon: '💼' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-gray-900 min-h-screen text-white">
      <div className="p-6">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
      </div>
      <nav className="mt-8">
        <ul className="space-y-2 px-4">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname?.startsWith(item.href))
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                    isActive
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}

