'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ImageUpload from './ImageUpload'

interface CategoryFormProps {
  category?: {
    id: string
    name: string
    nameAz: string
    description?: string | null
    descriptionAz?: string | null
    imageUrl?: string | null
    order: number
    isActive: boolean
  }
}

export default function CategoryForm({ category }: CategoryFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    nameAz: category?.nameAz || '',
    descriptionAz: category?.descriptionAz || '',
    imageUrl: category?.imageUrl || '',
    order: category?.order || 0,
    isActive: category?.isActive ?? true,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = category ? `/api/admin/categories/${category.id}` : '/api/admin/categories'
      const method = category ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        throw new Error(errorData.error || 'Xəta baş verdi')
      }

      router.push('/admin/categories')
      router.refresh()
    } catch (error) {
      console.error('Category form error:', error)
      alert('Xəta: ' + (error instanceof Error ? error.message : 'Naməlum xəta'))
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Ad</label>
          <input
            type="text"
            value={formData.nameAz}
            onChange={(e) => setFormData({ ...formData, nameAz: e.target.value })}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Şəkil</label>
          <ImageUpload
            value={formData.imageUrl}
            onChange={(url) => setFormData({ ...formData, imageUrl: url })}
            label="Şəkil yüklə"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Təsvir</label>
          <textarea
            value={formData.descriptionAz}
            onChange={(e) => setFormData({ ...formData, descriptionAz: e.target.value })}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Sıra</label>
          <input
            type="number"
            value={formData.order}
            onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isActive"
            checked={formData.isActive}
            onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">Aktiv</label>
        </div>
      </div>
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
        >
          Ləğv et
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
        >
          {loading ? 'Saxlanılır...' : 'Saxla'}
        </button>
      </div>
    </form>
  )
}




