'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ImageUpload from './ImageUpload'

interface SliderFormProps {
  slider?: {
    id: string
    titleAz: string
    subtitleAz?: string | null
    imageUrl: string
    buttonTextAz?: string | null
    buttonLink?: string | null
    order: number
    isActive: boolean
  }
}

export default function SliderForm({ slider }: SliderFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    titleAz: slider?.titleAz || '',
    subtitleAz: slider?.subtitleAz || '',
    imageUrl: slider?.imageUrl || '',
    buttonTextAz: slider?.buttonTextAz || '',
    buttonLink: slider?.buttonLink || '',
    order: slider?.order || 0,
    isActive: slider?.isActive ?? true,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = slider
        ? `/api/admin/sliders/${slider.id}`
        : '/api/admin/sliders'
      const method = slider ? 'PUT' : 'POST'

      if (!formData.imageUrl) {
        alert('Zəhmət olmasa şəkil yükləyin')
        setLoading(false)
        return
      }

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        throw new Error('Xəta baş verdi')
      }

      router.push('/admin/sliders')
      router.refresh()
    } catch (error) {
      alert('Xəta: ' + (error instanceof Error ? error.message : 'Naməlum xəta'))
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Başlıq
          </label>
          <input
            type="text"
            value={formData.titleAz}
            onChange={(e) => setFormData({ ...formData, titleAz: e.target.value })}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Alt Başlıq
          </label>
          <textarea
            value={formData.subtitleAz}
            onChange={(e) => setFormData({ ...formData, subtitleAz: e.target.value })}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div className="md:col-span-2">
          <ImageUpload
            value={formData.imageUrl}
            onChange={(url) => setFormData({ ...formData, imageUrl: url })}
            label="Şəkil"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Düymə Mətni
          </label>
          <input
            type="text"
            value={formData.buttonTextAz}
            onChange={(e) => setFormData({ ...formData, buttonTextAz: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Düymə Linki
          </label>
          <input
            type="url"
            value={formData.buttonLink}
            onChange={(e) => setFormData({ ...formData, buttonLink: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sıra
          </label>
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
          <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
            Aktiv
          </label>
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

