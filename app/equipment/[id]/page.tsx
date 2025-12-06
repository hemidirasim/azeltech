import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'

async function getEquipment(id: string) {
  try {
    const equipment = await prisma.equipmentPark.findUnique({
      where: { id },
      include: {
        category: true,
      },
    })
    return equipment
  } catch (error) {
    console.error('Error fetching equipment:', error)
    return null
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

export default async function EquipmentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const equipment = await getEquipment(id)

  if (!equipment) {
    notFound()
  }

  const specifications = equipment.specifications as Record<string, any> | null

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/equipment"
          className="text-primary-600 hover:text-primary-700 font-semibold mb-6 inline-block"
        >
          ← Texnika Parkına Qayıt
        </Link>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Section */}
            <div className="relative bg-gray-200 h-96 lg:h-full min-h-[400px] flex items-center justify-center overflow-hidden">
              {equipment.imageUrl ? (
                <Image
                  src={getImageUrl(equipment.imageUrl)}
                  alt={equipment.titleAz || equipment.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  unoptimized={equipment.imageUrl.startsWith('http')}
                />
              ) : (
                <svg className="w-32 h-32 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              )}
            </div>

            {/* Details Section */}
            <div className="p-8">
              <div className="mb-6">
                {equipment.category && (
                  <span className="bg-primary-100 text-primary-800 text-sm font-semibold px-3 py-1 rounded">
                    {equipment.category.nameAz || equipment.category.name}
                  </span>
                )}
                <h1 className="text-3xl font-bold text-gray-900 mt-4 mb-6">
                  {equipment.titleAz || equipment.title}
                </h1>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3">Təsvir</h2>
                <p className="text-gray-700 leading-relaxed">
                  {equipment.descriptionAz || equipment.description || 'Təsvir mövcud deyil.'}
                </p>
              </div>

              {specifications && Object.keys(specifications).length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-3">Texniki Xüsusiyyətlər</h2>
                  <dl className="grid grid-cols-2 gap-4">
                    {Object.entries(specifications).map(([key, value]) => (
                      <div key={key} className="border-l-4 border-primary-500 pl-4">
                        <dt className="text-sm font-medium text-gray-500">{key}</dt>
                        <dd className="text-lg font-semibold text-gray-900">{String(value)}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              <div className="mb-6">
                <div className={`inline-block px-4 py-2 rounded-full ${
                  equipment.isActive
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {equipment.isActive ? 'Mövcuddur' : 'Mövcud deyil'}
                </div>
              </div>

              <div className="mt-8">
                <Link
                  href="/contact"
                  className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
                >
                  Əlaqə Saxla
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

