import Link from 'next/link'
import { Suspense } from 'react'
import { prisma } from '@/lib/prisma'
import EquipmentFilter from '@/components/EquipmentFilter'

async function getEquipmentPark() {
  try {
    const equipment = await prisma.equipmentPark.findMany({
      where: { isActive: true },
      include: {
        category: true,
      },
      orderBy: { order: 'asc' },
    })
    return equipment
  } catch (error) {
    console.error('Error fetching equipment park:', error)
    return []
  }
}

async function getMachineryByCategoryId(categoryId: string) {
  try {
    const category = await prisma.equipmentCategory.findUnique({
      where: { id: categoryId },
    })
    
    if (!category) return []
    
    // Map equipment category to machinery category
    const categoryMap: Record<string, string> = {
      'Teleskopik Yükləyici': 'Loader',
      'Bekolader': 'Backhoe',
      'Buldozer': 'Bulldozer',
      'Ekskavator': 'Excavator',
      'Yükləyici': 'Loader',
      'Katok': 'Roller',
      'Qreyder': 'Grader',
    }
    
    const mappedCategory = categoryMap[category.nameAz] || category.name
    
    const machinery = await prisma.machinery.findMany({
      where: {
        isAvailable: true,
        category: mappedCategory,
      },
      orderBy: { createdAt: 'desc' },
    })
    return machinery
  } catch (error) {
    console.error('Error fetching machinery by categoryId:', error)
    return []
  }
}

async function getMachineryByCategory(category: string) {
  try {
    // Map equipment park categories (Azerbaijani) to machinery categories (English)
    const categoryMap: Record<string, string> = {
      'Teleskopik Yükləyici': 'Loader',
      'Bekolader': 'Backhoe',
      'Buldozer': 'Bulldozer',
      'Ekskavator': 'Excavator',
      'Yükləyici': 'Loader',
      'Katok': 'Roller',
      'Qreyder': 'Grader',
    }
    
    // If category is in Azerbaijani, map it to English
    const mappedCategory = categoryMap[category] || category
    
    const machinery = await prisma.machinery.findMany({
      where: {
        isAvailable: true,
        category: mappedCategory,
      },
      orderBy: { createdAt: 'desc' },
    })
    return machinery
  } catch (error) {
    console.error('Error fetching machinery:', error)
    return []
  }
}

async function getAllMachinery() {
  try {
    const machinery = await prisma.machinery.findMany({
      where: { isAvailable: true },
      orderBy: { createdAt: 'desc' },
    })
    return machinery
  } catch (error) {
    console.error('Error fetching all machinery:', error)
    return []
  }
}

async function getMachineryCount() {
  try {
    const count = await prisma.machinery.count({
      where: { isAvailable: true },
    })
    return count
  } catch (error) {
    return 0
  }
}

export default async function EquipmentPage({
  searchParams,
}: {
  searchParams: { category?: string; categoryId?: string }
}) {
  const [equipment, machineryCount] = await Promise.all([
    getEquipmentPark(),
    getMachineryCount(),
  ])

  const selectedCategoryId = searchParams.categoryId
  const selectedCategory = searchParams.category
  const machinery = selectedCategoryId
    ? await getMachineryByCategoryId(selectedCategoryId)
    : selectedCategory
    ? await getMachineryByCategory(selectedCategory)
    : await getAllMachinery()

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section with Background Image and Slogan */}
      <section className="relative h-96 bg-cover bg-center" style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1920&q=80)',
      }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Texnika Parkımız</h1>
            <p className="text-2xl md:text-3xl font-semibold">Etibarlı texnika, peşəkar xidmət</p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Suspense fallback={<div className="mb-8 bg-white rounded-lg shadow-md p-6">Yüklənir...</div>}>
          <EquipmentFilter />
        </Suspense>
        
        {/* Show Machinery */}
        <div>
          {(selectedCategory || selectedCategoryId) && (
            <>
              <Link
                href="/equipment"
                className="text-primary-600 hover:text-primary-700 font-semibold mb-6 inline-block"
              >
                ← Bütün Texnikalara Qayıt
              </Link>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                {selectedCategoryId 
                  ? equipment.find(e => e.categoryId === selectedCategoryId)?.category?.nameAz || 'Kateqoriya'
                  : equipment.find(e => e.category === selectedCategory)?.categoryAz || selectedCategory}
              </h2>
            </>
          )}
          {!selectedCategory && !selectedCategoryId && (
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Bütün Texnikalar</h2>
          )}
          {machinery.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <p className="text-gray-600 text-lg">
                {selectedCategory || selectedCategoryId 
                  ? 'Bu kateqoriyada maşın tapılmadı.' 
                  : 'Hazırda texnika tapılmadı.'}
              </p>
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
                      <img
                        src={machine.imageUrl}
                        alt={machine.nameAz}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <svg className="w-20 h-20 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {machine.nameAz}
                    </h3>
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
    </div>
  )
}
