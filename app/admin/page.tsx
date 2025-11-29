import { redirect } from 'next/navigation'
import { getAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function AdminDashboard() {
  const admin = await getAdmin()

  if (!admin) {
    redirect('/admin/login')
  }

  // Get counts for dashboard
  const [
    sliderCount,
    serviceCount,
    projectCount,
    equipmentCount,
    categoryCount,
    newsCount,
    careerCount,
    aboutCount,
  ] = await Promise.all([
    prisma.slider.count(),
    prisma.service.count(),
    prisma.project.count(),
    prisma.equipmentPark.count(),
    prisma.equipmentCategory.count(),
    prisma.news.count(),
    prisma.career.count(),
    prisma.aboutSection.count(),
  ])

  const stats = [
    { name: 'Slider', count: sliderCount, href: '/admin/sliders', color: 'bg-blue-500', icon: '🖼️' },
    { name: 'Haqqımızda', count: aboutCount, href: '/admin/about', color: 'bg-purple-500', icon: 'ℹ️' },
    { name: 'Xidmətlər', count: serviceCount, href: '/admin/services', color: 'bg-green-500', icon: '🔧' },
    { name: 'Layihələr', count: projectCount, href: '/admin/projects', color: 'bg-yellow-500', icon: '📁' },
    { name: 'Texnika Kateqoriyaları', count: categoryCount, href: '/admin/categories', color: 'bg-cyan-500', icon: '📂' },
    { name: 'Texnika Parkı', count: equipmentCount, href: '/admin/equipment', color: 'bg-indigo-500', icon: '🚜' },
    { name: 'Xəbərlər', count: newsCount, href: '/admin/news', color: 'bg-pink-500', icon: '📰' },
    { name: 'Karyera', count: careerCount, href: '/admin/careers', color: 'bg-teal-500', icon: '💼' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Bütün bölmələrin ümumi görünüşü</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Link
            key={stat.name}
            href={stat.href}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.name}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.count}</p>
              </div>
              <div className={`${stat.color} w-16 h-16 rounded-lg flex items-center justify-center`}>
                <span className="text-3xl">{stat.icon}</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <span className="text-sm text-primary-600 font-medium">İdarə et →</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Sürətli Əməliyyatlar</h2>
          <div className="space-y-3">
            <Link href="/admin/sliders/new" className="block text-primary-600 hover:text-primary-700 font-medium">
              + Yeni Slider əlavə et
            </Link>
            <Link href="/admin/services/new" className="block text-primary-600 hover:text-primary-700 font-medium">
              + Yeni Xidmət əlavə et
            </Link>
            <Link href="/admin/projects/new" className="block text-primary-600 hover:text-primary-700 font-medium">
              + Yeni Layihə əlavə et
            </Link>
            <Link href="/admin/news/new" className="block text-primary-600 hover:text-primary-700 font-medium">
              + Yeni Xəbər əlavə et
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Statistika</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Ümumi elementlər:</span>
              <span className="font-semibold">
                {sliderCount + serviceCount + projectCount + equipmentCount + categoryCount + newsCount + careerCount + aboutCount}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Aktiv layihələr:</span>
              <span className="font-semibold">{projectCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Texnika sayı:</span>
              <span className="font-semibold">{equipmentCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Kateqoriya sayı:</span>
              <span className="font-semibold">{categoryCount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
