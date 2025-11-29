import { prisma } from '@/lib/prisma'
import { format } from 'date-fns'

async function getCertificates() {
  try {
    const certificates = await prisma.certificate.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    })
    return certificates
  } catch (error) {
    console.error('Error fetching certificates:', error)
    return []
  }
}

async function getPartners() {
  try {
    const partners = await prisma.partner.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    })
    return partners
  } catch (error) {
    console.error('Error fetching partners:', error)
    return []
  }
}

export default async function CertificatesPage() {
  const [certificates, partners] = await Promise.all([
    getCertificates(),
    getPartners(),
  ])

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Certificates Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Sertifikatlar</h1>
            <p className="text-xl text-gray-600">
              Şirkətimizin sertifikatları və lisenziyaları
            </p>
          </div>

          {certificates.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <p className="text-gray-600 text-lg">Hazırda sertifikat məlumatı yoxdur.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1"
                >
                  {cert.imageUrl ? (
                    <div className="h-64 bg-gray-200">
                      <img
                        src={cert.imageUrl}
                        alt={cert.titleAz}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-64 bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                      <svg className="w-20 h-20 text-white opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {cert.titleAz}
                    </h3>
                    {cert.issuerAz && (
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Verən orqan:</strong> {cert.issuerAz}
                      </p>
                    )}
                    {cert.issueDate && (
                      <p className="text-sm text-gray-600 mb-1">
                        <strong>Verilmə tarixi:</strong> {format(new Date(cert.issueDate), 'dd.MM.yyyy')}
                      </p>
                    )}
                    {cert.expiryDate && (
                      <p className="text-sm text-gray-600">
                        <strong>Bitmə tarixi:</strong> {format(new Date(cert.expiryDate), 'dd.MM.yyyy')}
                      </p>
                    )}
                    {cert.descriptionAz && (
                      <p className="text-gray-700 mt-4 text-sm">
                        {cert.descriptionAz}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Partners Section */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Tərəfdaşlarımız</h2>
            <p className="text-xl text-gray-600">
              Bizimlə işləyən şirkətlər
            </p>
          </div>

          {partners.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <p className="text-gray-600 text-lg">Hazırda tərəfdaş məlumatı yoxdur.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {partners.map((partner) => (
                <div
                  key={partner.id}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition text-center"
                >
                  {partner.logoUrl ? (
                    <img
                      src={partner.logoUrl}
                      alt={partner.nameAz || partner.name}
                      className="h-24 w-full object-contain mb-4"
                    />
                  ) : (
                    <div className="h-24 bg-gray-100 rounded flex items-center justify-center mb-4">
                      <span className="text-2xl font-bold text-gray-400">
                        {(partner.nameAz || partner.name).charAt(0)}
                      </span>
                    </div>
                  )}
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {partner.nameAz || partner.name}
                  </h3>
                  {partner.categoryAz && (
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {partner.categoryAz}
                    </span>
                  )}
                  {partner.website && (
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700 text-sm mt-2 inline-block"
                    >
                      Veb sayt →
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}



