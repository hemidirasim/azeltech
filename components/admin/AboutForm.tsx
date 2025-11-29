'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface AboutFormProps {
  section?: {
    id: string
    title?: string | null
    titleAz?: string | null
    content?: string | null
    contentAz?: string | null
    sectionType: string
    order: number
    isActive: boolean
  }
}

export default function AboutForm({ section }: AboutFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: section?.title || '',
    titleAz: section?.titleAz || '',
    content: section?.content || '',
    contentAz: section?.contentAz || '',
    sectionType: section?.sectionType || 'company',
    order: section?.order || 0,
    isActive: section?.isActive ?? true,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const url = section ? `/api/admin/about/${section.id}` : '/api/admin/about'
      const method = section ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (!res.ok) throw new Error('Xəta baş verdi')
      router.push('/admin/about')
      router.refresh()
    } catch (error) {
      alert('Xəta: ' + (error instanceof Error ? error.message : 'Naməlum xəta'))
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div><label className="block text-sm font-medium text-gray-700 mb-2">Başlıq (AZ)</label><input type="text" value={formData.titleAz} onChange={(e) => setFormData({ ...formData, titleAz: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500" /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-2">Bölmə Tipi</label><select value={formData.sectionType} onChange={(e) => setFormData({ ...formData, sectionType: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"><option value="company">Şirkət</option><option value="mission">Missiya</option><option value="value">Dəyər</option><option value="why-us">Niyə Biz</option></select></div>
        <div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700 mb-2">Məzmun (AZ)</label><textarea value={formData.contentAz} onChange={(e) => setFormData({ ...formData, contentAz: e.target.value })} rows={6} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500" /></div>
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



