'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

interface Category {
  category: string
  categoryAz: string
  id?: string
}

interface CategoryCarouselProps {
  categories: Category[]
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

export default function CategoryCarousel({ categories }: CategoryCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (categories.length <= 1) return

    const startAutoPlay = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      
      if (!isHovered) {
        intervalRef.current = setInterval(() => {
          setCurrentIndex((prev) => {
            const next = prev + 1
            // Loop back to start when reaching the end
            return next >= categories.length ? 0 : next
          })
        }, 3000) // 3 saniyədə bir dəyişir
      }
    }

    startAutoPlay()

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isHovered, categories.length])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + categories.length) % categories.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % categories.length)
  }

  if (categories.length === 0) {
    return null
  }

  // Show 4 items on desktop, 2 on mobile
  const itemsPerView = 4
  
  // Calculate visible items
  const visibleItems = Math.min(itemsPerView, categories.length)

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="overflow-hidden px-12">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleItems)}%)`,
          }}
        >
          {categories.map((cat, index) => (
            <div
              key={cat.id || `${cat.category}-${index}`}
              className="flex-shrink-0 px-3"
              style={{ width: `${100 / visibleItems}%` }}
            >
              <Link
                href={cat.id ? `/equipment?categoryId=${cat.id}` : `/equipment?category=${encodeURIComponent(cat.category)}`}
                className="block relative group"
              >
                <div className="relative h-64 md:h-80 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  {/* Background Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{
                      backgroundImage: `url(${getCategoryImage(cat.category)})`,
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30"></div>
                  </div>
                  
                  {/* Title Overlay - Centered */}
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white drop-shadow-2xl text-center">
                      {cat.categoryAz}
                    </h3>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      {categories.length > visibleItems && (
        <>
          <button
            onClick={goToPrevious}
            onMouseEnter={() => setIsHovered(true)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-800 p-4 rounded-full shadow-xl transition-all duration-200 hover:scale-110"
            aria-label="Əvvəlki"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToNext}
            onMouseEnter={() => setIsHovered(true)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-800 p-4 rounded-full shadow-xl transition-all duration-200 hover:scale-110"
            aria-label="Növbəti"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}
    </div>
  )
}
