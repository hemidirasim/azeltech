import { prisma } from '@/lib/prisma'
import ContactForm from '@/components/ContactForm'

async function getContactInfo() {
  try {
    const settings = await prisma.siteSettings.findFirst({
      include: {
        contactInfo: {
          where: { isActive: true },
          orderBy: { order: 'asc' },
        },
      },
    })
    return settings
  } catch (error) {
    console.error('Error fetching contact info:', error)
    return null
  }
}

function getContactValue(contactInfo: any[], type: string, label?: string): string | null {
  const items = contactInfo.filter(item => item.type === type)
  
  if (label) {
    const item = items.find(item => item.labelAz === label || item.label === label)
    return item ? (item.valueAz || item.value) : null
  }
  
  // Return first item if no label specified
  return items.length > 0 ? (items[0].valueAz || items[0].value) : null
}

export default async function ContactPage() {
  const settings = await getContactInfo()
  
  const contactInfo = settings?.contactInfo || []
  const email = settings?.email || getContactValue(contactInfo, 'email')
  const phone = getContactValue(contactInfo, 'phone')
  const address = getContactValue(contactInfo, 'address')
  const whatsapp = settings?.whatsapp

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Əlaqə</h1>
          <p className="text-xl text-gray-600">
            Bizimlə əlaqə saxlayın. Sizin suallarınızı cavablandırmağa hazırıq.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Əlaqə Məlumatları</h2>
            
            <div className="space-y-6">
              {phone && (
                <div className="flex items-start">
                  <div className="bg-primary-100 p-3 rounded-lg mr-4">
                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Telefon</h3>
                    <p className="text-gray-600">{phone}</p>
                    {whatsapp && (
                      <a 
                        href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-700 text-sm mt-1 inline-block"
                      >
                        WhatsApp: {whatsapp}
                      </a>
                    )}
                  </div>
                </div>
              )}

              {email && (
                <div className="flex items-start">
                  <div className="bg-primary-100 p-3 rounded-lg mr-4">
                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <a href={`mailto:${email}`} className="text-gray-600 hover:text-primary-600">
                      {email}
                    </a>
                  </div>
                </div>
              )}

              {address && (
                <div className="flex items-start">
                  <div className="bg-primary-100 p-3 rounded-lg mr-4">
                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Ünvan</h3>
                    <p className="text-gray-600">{address}</p>
                  </div>
                </div>
              )}

              {/* Show all contact info items */}
              {contactInfo.map((item) => {
                // Skip if already shown above
                if ((item.type === 'phone' && phone) || 
                    (item.type === 'email' && email) || 
                    (item.type === 'address' && address)) {
                  return null
                }
                
                return (
                  <div key={item.id} className="flex items-start">
                    <div className="bg-primary-100 p-3 rounded-lg mr-4">
                      {item.type === 'phone' && (
                        <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      )}
                      {item.type === 'email' && (
                        <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      )}
                      {item.type === 'address' && (
                        <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      )}
                      {!['phone', 'email', 'address'].includes(item.type) && (
                        <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {item.labelAz || item.label || item.type}
                      </h3>
                      <p className="text-gray-600">{item.valueAz || item.value}</p>
                    </div>
                  </div>
                )
              })}

              <div className="flex items-start">
                <div className="bg-primary-100 p-3 rounded-lg mr-4">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">İş Saatları</h3>
                  <p className="text-gray-600">Bazar ertəsidən - Cümə: 09:00 - 18:00</p>
                  <p className="text-gray-600">Şənbə: 10:00 - 16:00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <ContactForm />
        </div>
      </div>
    </div>
  )
}
