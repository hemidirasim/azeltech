import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'
import { format } from 'date-fns'

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

async function getNews() {
  try {
    const news = await prisma.news.findMany({
      where: { isActive: true },
      orderBy: { publishedAt: 'desc' },
    })
    return news
  } catch (error) {
    console.error('Error fetching news:', error)
    return []
  }
}

export default async function NewsPage() {
  const news = await getNews()

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Xəbərlər və Yeniliklər</h1>
          <p className="text-xl text-gray-600">
            Şirkətimizdən ən son xəbərlər və yeniliklər
          </p>
        </div>

        {news.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Hazırda xəbər yoxdur.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item) => (
              <Link
                key={item.id}
                href={`/news/${item.id}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1"
              >
                {item.imageUrl ? (
                  <div className="relative h-48 bg-gray-200">
                    <Image
                      src={getImageUrl(item.imageUrl)}
                      alt={item.titleAz || item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      unoptimized={item.imageUrl.startsWith('http')}
                    />
                  </div>
                ) : (
                  <div className="h-48 bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                    <svg className="w-20 h-20 text-white opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  </div>
                )}
                <div className="p-6">
                  {item.categoryAz && (
                    <span className="bg-primary-100 text-primary-800 text-xs font-semibold px-2 py-1 rounded mb-2 inline-block">
                      {item.categoryAz}
                    </span>
                  )}
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {item.titleAz}
                  </h3>
                  {item.publishedAt && (
                    <p className="text-sm text-gray-500 mb-3">
                      {format(new Date(item.publishedAt), 'dd.MM.yyyy')}
                    </p>
                  )}
                  {item.contentAz && (
                    <p className="text-gray-600 line-clamp-3">
                      {item.contentAz}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

