import { prisma } from '@/lib/prisma'

async function getAboutSections() {
  try {
    const sections = await prisma.aboutSection.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    })
    return sections
  } catch (error) {
    console.error('Error fetching about sections:', error)
    return []
  }
}

export default async function AboutPage() {
  const sections = await getAboutSections()

  // Group sections by type
  const companySection = sections.find(s => s.sectionType === 'company')
  const missionSection = sections.find(s => s.sectionType === 'mission')
  const valuesSections = sections.filter(s => s.sectionType === 'value')
  const whyUsSections = sections.filter(s => s.sectionType === 'why-us')

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Haqqımızda</h1>
          
          <div className="prose prose-lg max-w-none">
            {/* Company Section */}
            {companySection && (
              <section className="mb-8">
                {companySection.titleAz && (
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    {companySection.titleAz}
                  </h2>
                )}
                {companySection.contentAz && (
                  <div 
                    className="text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: companySection.contentAz.replace(/\n/g, '<br />') }}
                  />
                )}
              </section>
            )}

            {/* Mission Section */}
            {missionSection && (
              <section className="mb-8">
                {missionSection.titleAz && (
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    {missionSection.titleAz}
                  </h2>
                )}
                {missionSection.contentAz && (
                  <p className="text-gray-700 leading-relaxed">
                    {missionSection.contentAz}
                  </p>
                )}
              </section>
            )}

            {/* Values Section */}
            {valuesSections.length > 0 && (
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Dəyərlərimiz</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  {valuesSections.map((value) => (
                    <li key={value.id}>
                      {value.titleAz && <strong>{value.titleAz}:</strong>} {value.contentAz}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Why Us Section */}
            {whyUsSections.length > 0 && (
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Niyə Bizi Seçməlisiniz?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {whyUsSections.map((item) => (
                    <div key={item.id} className="bg-primary-50 p-6 rounded-lg">
                      {item.titleAz && (
                        <h3 className="text-xl font-semibold text-primary-800 mb-2">
                          {item.titleAz}
                        </h3>
                      )}
                      {item.contentAz && (
                        <p className="text-gray-700">{item.contentAz}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Default content if no sections */}
            {sections.length === 0 && (
              <>
                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">Şirkətimiz</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Azeltech ağır iş maşınlarının icarəsi sahəsində aparıcı şirkətdir. 
                    Biz müştərilərimizə yüksək keyfiyyətli, etibarlı və müasir texnologiyalı 
                    maşınlar təqdim edirik.
                  </p>
                </section>
                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">Missiyamız</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Müştərilərimizin layihələrini uğurla həyata keçirmələrinə kömək etmək, 
                    ən yüksək keyfiyyət standartlarını təmin etmək və sürətli, etibarlı xidmət 
                    göstərmək missiyamızdır.
                  </p>
                </section>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
