import Link from 'next/link'
import Image from 'next/image'
import { Suspense } from 'react'
import { prisma } from '@/lib/prisma'
import EquipmentFilter from '@/components/EquipmentFilter'

async function getEquipmentByCategoryId(categoryId: string) {
  try {
    const equipment = await prisma.equipmentPark.findMany({
      where: {
        isActive: true,
        categoryId: categoryId,
      },
      include: {
        category: true,
      },
      orderBy: { order: 'asc' },
    })
    return equipment
  } catch (error) {
    console.error('Error fetching equipment by categoryId:', error)
    return []
  }
}

async function getAllEquipment() {
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
    console.error('Error fetching all equipment:', error)
    return []
  }
}

function getImageUrl(imageUrl: string | null | undefined): string {
  if (!imageUrl) return ''
  
  // If it's already a full URL, return as is
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl
  }
  
  // If it starts with /, it's already a relative path
  if (imageUrl.startsWith('/')) {
    return imageUrl
  }
  
  // Otherwise, assume it's in the uploads folder
  return `/uploads/${imageUrl}`
}

export default async function EquipmentPage({
  searchParams,
}: {
  searchParams: { category?: string; categoryId?: string }
}) {
  const selectedCategoryId = searchParams.categoryId
  const equipment = selectedCategoryId
    ? await getEquipmentByCategoryId(selectedCategoryId)
    : await getAllEquipment()

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Suspense fallback={<div className="mb-8 bg-white rounded-lg shadow-md p-6">Yüklənir...</div>}>
          <EquipmentFilter />
        </Suspense>
        
        {/* Show Machinery */}
        <div>
          {selectedCategoryId && (
            <>
              <Link
                href="/equipment"
                className="text-primary-600 hover:text-primary-700 font-semibold mb-6 inline-block"
              >
                ← Bütün Texnikalara Qayıt
              </Link>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                {equipment[0]?.category?.nameAz || 'Kateqoriya'}
              </h2>
            </>
          )}
          {!selectedCategoryId && (
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Bütün Texnikalar</h2>
          )}
          {equipment.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <p className="text-gray-600 text-lg">
                {selectedCategoryId 
                  ? 'Bu kateqoriyada texnika tapılmadı.' 
                  : 'Hazırda texnika tapılmadı.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {equipment.map((item) => (
                <Link
                  key={item.id}
                  href={`/equipment/${item.id}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1"
                >
                  <div className="relative h-64 bg-gray-200 flex items-center justify-center overflow-hidden">
                    {item.imageUrl ? (
                      <Image
                        src={getImageUrl(item.imageUrl)}
                        alt={item.titleAz || item.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        unoptimized={item.imageUrl.startsWith('http')}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="w-20 h-20 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {item.titleAz || item.title}
                    </h3>
                    {item.category && (
                      <p className="text-primary-600 text-sm mb-2">
                        {item.category.nameAz || item.category.name}
                      </p>
                    )}
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {item.descriptionAz || item.description || ''}
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
