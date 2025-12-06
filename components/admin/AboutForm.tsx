'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ImageUpload from './ImageUpload'

interface AboutFormProps {
  about?: {
    id: string
    title?: string | null
    content?: string | null
    imageUrl?: string | null
  }
}

export default function AboutForm({ about }: AboutFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: about?.title || '',
    content: about?.content || '',
    imageUrl: about?.imageUrl || '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const url = about ? `/api/admin/about/${about.id}` : '/api/admin/about'
      const method = about ? 'PUT' : 'POST'
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      
      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || 'Xəta baş verdi')
      }
      
      router.push('/admin/about')
      router.refresh()
    } catch (error) {
      alert('Xəta: ' + (error instanceof Error ? error.message : 'Naməlum xəta'))
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Başlıq *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Başlıq daxil edin"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Şəkil
          </label>
          <ImageUpload
            value={formData.imageUrl}
            onChange={(url) => setFormData({ ...formData, imageUrl: url })}
            label="Şəkil yüklə"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Məzmun *
          </label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            rows={10}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Məzmun daxil edin"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-4 border-t">
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
