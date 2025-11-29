import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'

async function getMachineryByCategory(category: string) {
  try {
    const machinery = await prisma.machinery.findMany({
      where: {
        isAvailable: true,
        category: decodeURIComponent(category),
      },
      orderBy: { createdAt: 'desc' },
    })
    return machinery
  } catch (error) {
    console.error('Error fetching machinery:', error)
    return []
  }
}

async function getCategoryInfo(category: string) {
  try {
    const machine = await prisma.machinery.findFirst({
      where: {
        category: decodeURIComponent(category),
        isAvailable: true,
      },
      select: {
        category: true,
        categoryAz: true,
      },
    })
    return machine
  } catch (error) {
    console.error('Error fetching category info:', error)
    return null
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params
  const [machinery, categoryInfo] = await Promise.all([
    getMachineryByCategory(category),
    getCategoryInfo(category),
  ])

  if (!categoryInfo) {
    notFound()
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/machinery"
            className="text-primary-600 hover:text-primary-700 font-semibold mb-4 inline-block"
          >
            ← Bütün Maşınlara Qayıt
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{categoryInfo.categoryAz}</h1>
          <p className="text-xl text-gray-600">
            {machinery.length} maşın tapıldı
          </p>
        </div>

        {machinery.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Bu kateqoriyada maşın tapılmadı.</p>
            <Link
              href="/machinery"
              className="mt-4 inline-block text-primary-600 hover:text-primary-700 font-semibold"
            >
              Bütün maşınları görüntülə
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {machinery.map((machine) => (
              <Link
                key={machine.id}
                href={`/machinery/${machine.id}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1"
              >
                <div className="h-64 bg-gray-200 flex items-center justify-center">
                  {machine.imageUrl ? (
                    <img src={machine.imageUrl} alt={machine.nameAz} className="w-full h-full object-cover" />
                  ) : (
                    <svg className="w-20 h-20 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{machine.nameAz}</h3>
                    <span className="bg-primary-100 text-primary-800 text-xs font-semibold px-2 py-1 rounded">
                      {machine.categoryAz}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {machine.descriptionAz || machine.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}



