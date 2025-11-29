import Link from 'next/link'
import { prisma } from '@/lib/prisma'

async function getServices() {
  try {
    const services = await prisma.service.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    })
    return services
  } catch (error) {
    console.error('Error fetching services:', error)
    return []
  }
}

export default async function ServicesPage() {
  const services = await getServices()

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Xidmətlərimiz</h1>
          <p className="text-xl text-gray-600">
            Peşəkar xidmətlərimizlə layihələrinizə dəstək göstəririk
          </p>
        </div>

        {services.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Hazırda xidmət məlumatı yoxdur.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1"
              >
                <div className="h-64 bg-gray-200 relative">
                  {service.imageUrl ? (
                    <img
                      src={service.imageUrl}
                      alt={service.titleAz}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="h-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                      <svg className="w-20 h-20 text-white opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-white bg-opacity-90 rounded-full w-12 h-12 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary-600">
                      {index + 1}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {index + 1}. {service.titleAz}
                  </h3>
                  {service.descriptionAz && (
                    <div className="text-gray-600 leading-relaxed whitespace-pre-line">
                      {service.descriptionAz}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            href="/contact"
            className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
          >
            Xidmətlərimizdən İstifadə Edin
          </Link>
        </div>
      </div>
    </div>
  )
}
