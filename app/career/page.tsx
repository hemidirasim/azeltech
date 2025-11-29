import { prisma } from '@/lib/prisma'

async function getCareers() {
  try {
    const careers = await prisma.career.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    })
    return careers
  } catch (error) {
    console.error('Error fetching careers:', error)
    return []
  }
}

function getTypeLabel(type: string | null) {
  const types: Record<string, string> = {
    'full-time': 'Tam iş günü',
    'part-time': 'Yarım iş günü',
    'contract': 'Müqavilə əsaslı',
  }
  return types[type || ''] || type || 'Tam iş günü'
}

export default async function CareerPage() {
  const careers = await getCareers()

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Karyera</h1>
          <p className="text-xl text-gray-600">
            Bizim komandaya qoşulun
          </p>
        </div>

        {careers.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <p className="text-gray-600 text-lg mb-4">Hazırda aktiv vakansiya yoxdur.</p>
            <p className="text-gray-500">
              Lakin bizimlə əlaqə saxlayaraq CV-nizi göndərə bilərsiniz.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {careers.map((career) => (
              <div
                key={career.id}
                className="bg-white rounded-lg shadow-md p-6 md:p-8 hover:shadow-xl transition"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                      {career.titleAz}
                    </h3>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                      {career.locationAz && (
                        <span className="flex items-center">
                          📍 {career.locationAz}
                        </span>
                      )}
                      {career.type && (
                        <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full">
                          {getTypeLabel(career.type)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                {career.descriptionAz && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Təsvir:</h4>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {career.descriptionAz}
                    </p>
                  </div>
                )}
                
                {career.requirementsAz && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Tələblər:</h4>
                    <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {career.requirementsAz}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 bg-white rounded-lg shadow-md p-6 md:p-8 text-center">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            CV-nizi göndərin
          </h3>
          <p className="text-gray-600 mb-6">
            Aktiv vakansiya olmasa belə, CV-nizi göndərə bilərsiniz. 
            Uyğun vakansiya açılanda sizinlə əlaqə saxlayacağıq.
          </p>
          <a
            href="/contact"
            className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
          >
            Əlaqə Saxla
          </a>
        </div>
      </div>
    </div>
  )
}



