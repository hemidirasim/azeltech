'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface CareerFormProps {
  career?: {
    id: string
    titleAz: string
    descriptionAz?: string | null
    requirementsAz?: string | null
    locationAz?: string | null
    typeAz?: string | null
    isActive: boolean
  }
}

export default function CareerForm({ career }: CareerFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    titleAz: career?.titleAz || '',
    descriptionAz: career?.descriptionAz || '',
    requirementsAz: career?.requirementsAz || '',
    locationAz: career?.locationAz || '',
    typeAz: career?.typeAz || 'Tam iş günü',
    isActive: career?.isActive ?? true,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const url = career ? `/api/admin/careers/${career.id}` : '/api/admin/careers'
      const method = career ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        throw new Error(errorData.error || 'Xəta baş verdi')
      }
      
      router.push('/admin/careers')
      router.refresh()
    } catch (error) {
      console.error('Career form error:', error)
      alert('Xəta: ' + (error instanceof Error ? error.message : 'Naməlum xəta'))
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700 mb-2">Başlıq</label><input type="text" value={formData.titleAz} onChange={(e) => setFormData({ ...formData, titleAz: e.target.value })} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500" /></div>
        <div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700 mb-2">Təsvir</label><textarea value={formData.descriptionAz} onChange={(e) => setFormData({ ...formData, descriptionAz: e.target.value })} rows={4} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500" /></div>
        <div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700 mb-2">Tələblər</label><textarea value={formData.requirementsAz} onChange={(e) => setFormData({ ...formData, requirementsAz: e.target.value })} rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500" /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-2">Yerləşmə</label><input type="text" value={formData.locationAz} onChange={(e) => setFormData({ ...formData, locationAz: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500" /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-2">Növ</label><input type="text" value={formData.typeAz} onChange={(e) => setFormData({ ...formData, typeAz: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500" /></div>
        <div className="flex items-center"><input type="checkbox" id="isActive" checked={formData.isActive} onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })} className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" /><label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">Aktiv</label></div>
      </div>
      <div className="flex justify-end space-x-4">
        <button type="button" onClick={() => router.back()} className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Ləğv et</button>
        <button type="submit" disabled={loading} className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50">{loading ? 'Saxlanılır...' : 'Saxla'}</button>
      </div>
    </form>
  )
}



