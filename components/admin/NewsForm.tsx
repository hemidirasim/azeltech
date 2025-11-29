'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ImageUpload from './ImageUpload'

interface NewsFormProps {
  news?: {
    id: string
    titleAz: string
    contentAz?: string | null
    imageUrl?: string | null
    categoryAz?: string | null
    publishedAt?: Date | null
    order: number
    isActive: boolean
  }
}

export default function NewsForm({ news }: NewsFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    titleAz: news?.titleAz || '',
    contentAz: news?.contentAz || '',
    imageUrl: news?.imageUrl || '',
    categoryAz: news?.categoryAz || '',
    publishedAt: news?.publishedAt ? new Date(news.publishedAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    order: news?.order || 0,
    isActive: news?.isActive ?? true,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const url = news ? `/api/admin/news/${news.id}` : '/api/admin/news'
      const method = news ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (!res.ok) throw new Error('Xəta baş verdi')
      router.push('/admin/news')
      router.refresh()
    } catch (error) {
      alert('Xəta: ' + (error instanceof Error ? error.message : 'Naməlum xəta'))
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700 mb-2">Başlıq</label><input type="text" value={formData.titleAz} onChange={(e) => setFormData({ ...formData, titleAz: e.target.value })} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500" /></div>
        <div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700 mb-2">Məzmun</label><textarea value={formData.contentAz} onChange={(e) => setFormData({ ...formData, contentAz: e.target.value })} rows={6} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500" /></div>
        <div className="md:col-span-2">
          <ImageUpload
            value={formData.imageUrl}
            onChange={(url) => setFormData({ ...formData, imageUrl: url })}
            label="Şəkil"
          />
        </div>
        <div><label className="block text-sm font-medium text-gray-700 mb-2">Yayım Tarixi</label><input type="date" value={formData.publishedAt} onChange={(e) => setFormData({ ...formData, publishedAt: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500" /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-2">Sıra</label><input type="number" value={formData.order} onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500" /></div>
        <div className="flex items-center"><input type="checkbox" id="isActive" checked={formData.isActive} onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })} className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" /><label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">Aktiv</label></div>
      </div>
      <div className="flex justify-end space-x-4">
        <button type="button" onClick={() => router.back()} className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Ləğv et</button>
        <button type="submit" disabled={loading} className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50">{loading ? 'Saxlanılır...' : 'Saxla'}</button>
      </div>
    </form>
  )
}

