import Link from 'next/link'
import { prisma } from '@/lib/prisma'

async function getAllMachinery() {
  try {
    const machinery = await prisma.machinery.findMany({
      where: { isAvailable: true },
      orderBy: { createdAt: 'desc' },
    })
    return machinery
  } catch (error) {
    console.error('Error fetching machinery:', error)
    return []
  }
}

async function getCategories() {
  try {
    const machinery = await prisma.machinery.findMany({
      where: { isAvailable: true },
      select: { category: true, categoryAz: true },
      distinct: ['category'],
    })
    return machinery.map(m => ({ category: m.category, categoryAz: m.categoryAz }))
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

export default async function MachineryPage({
  searchParams,
}: {
  searchParams: { category?: string }
}) {
  const [allMachinery, categories] = await Promise.all([
    getAllMachinery(),
    getCategories(),
  ])

  const selectedCategory = searchParams.category
  const machinery = selectedCategory
    ? allMachinery.filter(m => m.category === selectedCategory)
    : allMachinery

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">İcarə Üçün Maşınlar</h1>
          <p className="text-xl text-gray-600">
            Geniş çeşidli ağır iş maşınlarımızdan birini seçin
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/machinery"
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                !selectedCategory
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-primary-50'
              }`}
            >
              Hamısı
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.category}
                href={`/machinery?category=${encodeURIComponent(cat.category)}`}
                className={`px-6 py-2 rounded-lg font-semibold transition ${
                  selectedCategory === cat.category
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-primary-50'
                }`}
              >
                {cat.categoryAz}
              </Link>
            ))}
          </div>
        </div>

        {/* Results Count */}
        {selectedCategory && (
          <div className="mb-6 text-center">
            <p className="text-gray-600">
              <span className="font-semibold">{machinery.length}</span> maşın tapıldı
              {categories.find(c => c.category === selectedCategory) && (
                <span className="ml-2">
                  ({categories.find(c => c.category === selectedCategory)?.categoryAz})
                </span>
              )}
            </p>
          </div>
        )}

        {machinery.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              {selectedCategory ? 'Bu kateqoriyada maşın tapılmadı.' : 'Hazırda mövcud maşın yoxdur.'}
            </p>
            {selectedCategory && (
              <Link
                href="/machinery"
                className="mt-4 inline-block text-primary-600 hover:text-primary-700 font-semibold"
              >
                Bütün maşınları görüntülə
              </Link>
            )}
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
