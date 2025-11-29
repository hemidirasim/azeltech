import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import RentalForm from '@/components/RentalForm'

async function getMachinery(id: string) {
  try {
    const machinery = await prisma.machinery.findUnique({
      where: { id },
    })
    return machinery
  } catch (error) {
    console.error('Error fetching machinery:', error)
    return null
  }
}

export default async function MachineryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const machinery = await getMachinery(id)

  if (!machinery) {
    notFound()
  }

  const specifications = machinery.specifications as Record<string, any> | null

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Section */}
            <div className="bg-gray-200 h-96 lg:h-full min-h-[400px] flex items-center justify-center">
              {machinery.imageUrl ? (
                <img
                  src={machinery.imageUrl}
                  alt={machinery.nameAz}
                  className="w-full h-full object-cover"
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
                <span className="bg-primary-100 text-primary-800 text-sm font-semibold px-3 py-1 rounded">
                  {machinery.categoryAz}
                </span>
                <h1 className="text-3xl font-bold text-gray-900 mt-4 mb-6">
                  {machinery.nameAz}
                </h1>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3">Təsvir</h2>
                <p className="text-gray-700 leading-relaxed">
                  {machinery.descriptionAz || machinery.description || 'Təsvir mövcud deyil.'}
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
                  machinery.isAvailable
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {machinery.isAvailable ? 'Mövcuddur' : 'Mövcud deyil'}
                </div>
              </div>
            </div>
          </div>

          {/* Rental Form Section */}
          {machinery.isAvailable && (
            <div className="border-t p-8">
              <h2 className="text-2xl font-bold mb-6">İcarə Formu</h2>
              <RentalForm machineryId={machinery.id} pricePerDay={machinery.pricePerDay} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

