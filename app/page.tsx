import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'
import Slider from '@/components/Slider'
import { format } from 'date-fns'

async function getSliders() {
  try {
    const sliders = await prisma.slider.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    })
    return sliders
  } catch (error) {
    console.error('Error fetching sliders:', error)
    return []
  }
}

async function getHomeSection(sectionType: string) {
  try {
    const section = await prisma.homeSection.findFirst({
      where: { 
        sectionType,
        isActive: true 
      },
    })
    return section
  } catch (error) {
    console.error(`Error fetching ${sectionType} section:`, error)
    return null
  }
}

async function getFeaturedEquipment() {
  try {
    const equipment = await prisma.equipmentPark.findMany({
      where: { isActive: true },
      include: {
        category: true,
      },
      take: 6,
      orderBy: { order: 'asc' },
    })
    return equipment
  } catch (error) {
    console.error('Error fetching equipment:', error)
    return []
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

async function getCategories() {
  try {
    const categories = await prisma.equipmentCategory.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    })
    return categories.map(cat => ({ 
      category: cat.name, 
      categoryAz: cat.nameAz,
      id: cat.id,
      imageUrl: cat.imageUrl
    }))
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

function getCategoryImageUrl(category: { imageUrl?: string | null; category?: string }): string {
  if (category.imageUrl) {
    if (category.imageUrl.startsWith('http://') || category.imageUrl.startsWith('https://')) {
      return category.imageUrl
    }
    if (category.imageUrl.startsWith('/')) {
      return category.imageUrl
    }
    return `/uploads/${category.imageUrl}`
  }
  // Fallback to default image
  return getCategoryImage(category.category || '')
}

async function getLatestNews() {
  try {
    const news = await prisma.news.findMany({
      where: { isActive: true },
      take: 3,
      orderBy: { publishedAt: 'desc' },
    })
    return news
  } catch (error) {
    console.error('Error fetching news:', error)
    return []
  }
}

async function getAboutPreview() {
  try {
    const about = await prisma.aboutSection.findFirst({
      orderBy: { createdAt: 'desc' },
    })
    return about
  } catch (error) {
    console.error('Error fetching about preview:', error)
    return null
  }
}

async function getLatestCareers() {
  try {
    const careers = await prisma.career.findMany({
      where: { isActive: true },
      take: 3,
      orderBy: { createdAt: 'desc' },
    })
    return careers
  } catch (error) {
    console.error('Error fetching careers:', error)
    return []
  }
}

function getCategoryImage(category: string): string {
  const categoryImages: Record<string, string> = {
    'Bulldozer': 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&q=80',
    'Excavator': 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&q=80',
    'Loader': 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&q=80',
    'Backhoe': 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&q=80',
    'Roller': 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&q=80',
    'Grader': 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&q=80',
  }
  return categoryImages[category] || 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&q=80'
}

export default async function Home() {
  const [sliders, ctaSection, featuredEquipment, categories, latestNews, aboutPreview, latestCareers] = await Promise.all([
    getSliders(),
    getHomeSection('cta'),
    getFeaturedEquipment(),
    getCategories(),
    getLatestNews(),
    getAboutPreview(),
    getLatestCareers(),
  ])

  return (
    <div>
      {/* Slider Section */}
      {sliders.length > 0 ? (
        <Slider slides={sliders} />
      ) : (
        <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Ağır İş Maşınlarının İcarəsi
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-primary-100">
                Layihələriniz üçün etibarlı və peşəkar həllər
              </p>
            <Link
              href="/equipment"
              className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition"
            >
              Texnika Parkımızı Görüntülə
            </Link>
            </div>
          </div>
        </section>
      )}

      {/* Categories Section */}
      {categories.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Kateqoriyalar</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {categories.map((cat) => (
                <Link
                  key={cat.id || cat.category}
                  href={cat.id ? `/equipment?categoryId=${cat.id}` : `/equipment?category=${encodeURIComponent(cat.category)}`}
                  className="block relative group"
                >
                  <div className="relative h-48 md:h-64 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                    {/* Background Image */}
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{
                        backgroundImage: `url(${getCategoryImageUrl(cat)})`,
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30"></div>
                    </div>
                    
                    {/* Title Overlay - Centered */}
                    <div className="absolute inset-0 flex items-center justify-center p-4">
                      <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-white drop-shadow-2xl text-center">
                        {cat.categoryAz}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Equipment */}
      {featuredEquipment.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Texnika Parkımız</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredEquipment.map((item) => (
                <Link
                  key={item.id}
                  href={`/equipment/${item.id}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1"
                >
                  <div className="relative h-48 bg-gray-200 flex items-center justify-center overflow-hidden">
                    {item.imageUrl ? (
                      <Image
                        src={getImageUrl(item.imageUrl)}
                        alt={item.titleAz || item.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        unoptimized={item.imageUrl.startsWith('http')}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{item.titleAz || item.title}</h3>
                    {item.category && (
                      <p className="text-primary-600 text-sm mb-2">
                        {item.category.nameAz || item.category.name}
                      </p>
                    )}
                    <p className="text-gray-600 mb-4 line-clamp-2">{item.descriptionAz || item.description || ''}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/equipment"
                className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
              >
                Texnika Parkımızı Görüntülə
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* About Preview Section */}
      {aboutPreview && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                {aboutPreview.title && (
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    {aboutPreview.title}
                  </h2>
                )}
                {aboutPreview.content ? (
                  <p className="text-gray-700 leading-relaxed mb-6 line-clamp-6">
                    {aboutPreview.content}
                  </p>
                ) : null}
                <Link
                  href="/about"
                  className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
                >
                  Daha Ətraflı
                </Link>
              </div>
              {aboutPreview.imageUrl ? (
                <div className="relative h-64 rounded-lg overflow-hidden">
                  <Image
                    src={aboutPreview.imageUrl.startsWith('/') ? aboutPreview.imageUrl : `/uploads/${aboutPreview.imageUrl}`}
                    alt={aboutPreview.title || 'Haqqımızda'}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    unoptimized={aboutPreview.imageUrl.startsWith('http')}
                  />
                </div>
              ) : (
                <div className="h-64 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg flex items-center justify-center">
                  <svg className="w-32 h-32 text-white opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* News Section */}
      {latestNews.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Xəbərlər və Yeniliklər</h2>
              <Link
                href="/news"
                className="text-primary-600 hover:text-primary-700 font-semibold"
              >
                Hamısını Görüntülə →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {latestNews.map((item) => (
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
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
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
          </div>
        </section>
      )}

      {/* Career Section */}
      {latestCareers.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Karyera İmkanları</h2>
              <Link
                href="/career"
                className="text-primary-600 hover:text-primary-700 font-semibold"
              >
                Hamısını Görüntülə →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {latestCareers.map((career) => (
                <Link
                  key={career.id}
                  href="/career"
                  className="bg-gray-50 rounded-lg shadow-md p-6 hover:shadow-xl transition transform hover:-translate-y-1"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {career.titleAz}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {career.locationAz && (
                      <span className="text-sm text-gray-600">
                        📍 {career.locationAz}
                      </span>
                    )}
                  </div>
                  {career.descriptionAz && (
                    <p className="text-gray-600 line-clamp-3 mb-4">
                      {career.descriptionAz}
                    </p>
                  )}
                  <span className="text-primary-600 font-semibold text-sm">
                    Ətraflı məlumat →
                  </span>
                </Link>
              ))}
            </div>
            {latestCareers.length === 0 && (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-600 text-lg mb-4">Hazırda aktiv vakansiya yoxdur.</p>
                <Link
                  href="/career"
                  className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
                >
                  Karyera Səhifəsinə Get
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* CTA Section */}
      {ctaSection && (
        <section className="py-16 bg-primary-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">{ctaSection.titleAz || ctaSection.title}</h2>
            {ctaSection.contentAz || ctaSection.content ? (
              <p className="text-xl mb-8 text-primary-100">{ctaSection.contentAz || ctaSection.content}</p>
            ) : null}
            <Link
              href="/contact"
              className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition"
            >
              Əlaqə Saxla
            </Link>
          </div>
        </section>
      )}
    </div>
  )
}

