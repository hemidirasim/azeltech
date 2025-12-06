import Image from 'next/image'
import { prisma } from '@/lib/prisma'

async function getAbout() {
  try {
    const about = await prisma.aboutSection.findFirst({
      orderBy: { createdAt: 'desc' },
    })
    return about
  } catch (error) {
    console.error('Error fetching about:', error)
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

export default async function AboutPage() {
  const about = await getAbout()

  if (!about) {
    return (
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Haqqımızda</h1>
            <p className="text-gray-700">Məzmun əlavə edilməyib.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {about.imageUrl && (
            <div className="relative w-full h-96 bg-gray-200">
              <Image
                src={getImageUrl(about.imageUrl)}
                alt={about.title || 'Haqqımızda'}
                fill
                className="object-cover"
                sizes="100vw"
                unoptimized={about.imageUrl.startsWith('http')}
              />
            </div>
          )}
          
          <div className="p-8 md:p-12">
            {about.title && (
              <h1 className="text-4xl font-bold text-gray-900 mb-6">
                {about.title}
              </h1>
            )}
            
            {about.content ? (
              <div 
                className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-line"
              >
                {about.content}
              </div>
            ) : (
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                <p>Məzmun əlavə edilməyib.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
