import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { format } from 'date-fns'

async function getNews(id: string) {
  try {
    const news = await prisma.news.findUnique({
      where: { id },
    })
    return news
  } catch (error) {
    console.error('Error fetching news:', error)
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

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const news = await getNews(id)

  if (!news) {
    notFound()
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/news"
          className="text-primary-600 hover:text-primary-700 font-semibold mb-6 inline-block"
        >
          ← Xəbərlərə Qayıt
        </Link>
        
        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Image Section */}
          {news.imageUrl && (
            <div className="relative w-full h-96 bg-gray-200">
              <Image
                src={getImageUrl(news.imageUrl)}
                alt={news.titleAz || news.title}
                fill
                className="object-cover"
                sizes="100vw"
                unoptimized={news.imageUrl.startsWith('http')}
              />
            </div>
          )}

          {/* Content Section */}
          <div className="p-8">
            <div className="mb-6">
              {news.categoryAz && (
                <span className="bg-primary-100 text-primary-800 text-sm font-semibold px-3 py-1 rounded mb-4 inline-block">
                  {news.categoryAz}
                </span>
              )}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {news.titleAz || news.title}
              </h1>
              {news.publishedAt && (
                <p className="text-gray-500 text-sm mb-6">
                  {format(new Date(news.publishedAt), 'dd MMMM yyyy', { locale: undefined })}
                </p>
              )}
            </div>

            <div className="prose prose-lg max-w-none">
              {news.contentAz || news.content ? (
                <div 
                  className="text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ 
                    __html: (news.contentAz || news.content || '').replace(/\n/g, '<br />') 
                  }}
                />
              ) : (
                <p className="text-gray-600">Məzmun mövcud deyil.</p>
              )}
            </div>

            <div className="mt-8 pt-6 border-t">
              <Link
                href="/news"
                className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
              >
                Digər Xəbərlər
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}

