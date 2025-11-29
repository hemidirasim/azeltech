'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

interface Category {
  id: string
  nameAz: string
}

export default function EquipmentFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    searchParams.get('categoryId')
  )

  useEffect(() => {
    fetch('/api/admin/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error('Error fetching categories:', err))
  }, [])

  const handleFilterChange = (categoryId: string | null) => {
    setSelectedCategory(categoryId)
    const params = new URLSearchParams()
    if (categoryId) {
      params.set('categoryId', categoryId)
    }
    router.push(`/equipment${params.toString() ? `?${params.toString()}` : ''}`)
  }

  return (
    <div className="mb-8 bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-wrap items-center gap-4">
        <span className="text-gray-700 font-semibold">Kateqoriya:</span>
        <button
          onClick={() => handleFilterChange(null)}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            !selectedCategory
              ? 'bg-primary-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Hamısı
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleFilterChange(category.id)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              selectedCategory === category.id
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.nameAz}
          </button>
        ))}
      </div>
    </div>
  )
}

