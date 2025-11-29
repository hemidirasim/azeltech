'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ImageUpload from './ImageUpload'

interface MachineryFormProps {
  machinery?: {
    id: string
    name: string
    nameAz: string
    description?: string | null
    descriptionAz?: string | null
    category: string
    categoryAz: string
    pricePerDay: number
    imageUrl?: string | null
    specifications?: any
    isAvailable: boolean
  }
}

export default function MachineryForm({ machinery }: MachineryFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [specs, setSpecs] = useState<Record<string, string>>(
    machinery?.specifications && typeof machinery.specifications === 'object' 
      ? machinery.specifications as Record<string, string>
      : {}
  )
  const [newSpecKey, setNewSpecKey] = useState('')
  const [newSpecValue, setNewSpecValue] = useState('')
  const [formData, setFormData] = useState({
    name: machinery?.name || '',
    nameAz: machinery?.nameAz || '',
    description: machinery?.description || '',
    descriptionAz: machinery?.descriptionAz || '',
    category: machinery?.category || '',
    categoryAz: machinery?.categoryAz || '',
    pricePerDay: machinery?.pricePerDay || 0,
    imageUrl: machinery?.imageUrl || '',
    isAvailable: machinery?.isAvailable ?? true,
  })

  const addSpec = () => {
    if (newSpecKey && newSpecValue) {
      setSpecs({ ...specs, [newSpecKey]: newSpecValue })
      setNewSpecKey('')
      setNewSpecValue('')
    }
  }

  const removeSpec = (key: string) => {
    const newSpecs = { ...specs }
    delete newSpecs[key]
    setSpecs(newSpecs)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const url = machinery ? `/api/admin/machinery/${machinery.id}` : '/api/admin/machinery'
      const method = machinery ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, specifications: specs }),
      })
      if (!res.ok) throw new Error('Xəta baş verdi')
      router.push('/admin/machinery')
      router.refresh()
    } catch (error) {
      alert('Xəta: ' + (error instanceof Error ? error.message : 'Naməlum xəta'))
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div><label className="block text-sm font-medium text-gray-700 mb-2">Ad (EN)</label><input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500" /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-2">Ad (AZ)</label><input type="text" value={formData.nameAz} onChange={(e) => setFormData({ ...formData, nameAz: e.target.value })} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500" /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-2">Kateqoriya (EN)</label><input type="text" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500" /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-2">Kateqoriya (AZ)</label><input type="text" value={formData.categoryAz} onChange={(e) => setFormData({ ...formData, categoryAz: e.target.value })} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500" /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-2">Günlük Qiymət (AZN)</label><input type="number" step="0.01" value={formData.pricePerDay} onChange={(e) => setFormData({ ...formData, pricePerDay: parseFloat(e.target.value) })} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500" /></div>
        <div className="md:col-span-2">
          <ImageUpload
            value={formData.imageUrl}
            onChange={(url) => setFormData({ ...formData, imageUrl: url })}
            label="Şəkil"
          />
        </div>
        <div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700 mb-2">Təsvir (AZ)</label><textarea value={formData.descriptionAz} onChange={(e) => setFormData({ ...formData, descriptionAz: e.target.value })} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500" /></div>
        <div className="flex items-center"><input type="checkbox" id="isAvailable" checked={formData.isAvailable} onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })} className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" /><label htmlFor="isAvailable" className="ml-2 block text-sm text-gray-700">Mövcuddur</label></div>
      </div>
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">Texniki Xüsusiyyətlər</h3>
        <div className="space-y-2 mb-4">
          {Object.entries(specs).map(([key, value]) => (
            <div key={key} className="flex items-center space-x-2">
              <span className="flex-1 font-medium">{key}:</span>
              <span className="flex-1">{value}</span>
              <button type="button" onClick={() => removeSpec(key)} className="text-red-600 hover:text-red-800">Sil</button>
            </div>
          ))}
        </div>
        <div className="flex space-x-2">
          <input type="text" placeholder="Xüsusiyyət adı" value={newSpecKey} onChange={(e) => setNewSpecKey(e.target.value)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg" />
          <input type="text" placeholder="Dəyər" value={newSpecValue} onChange={(e) => setNewSpecValue(e.target.value)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg" />
          <button type="button" onClick={addSpec} className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">Əlavə et</button>
        </div>
      </div>
      <div className="flex justify-end space-x-4">
        <button type="button" onClick={() => router.back()} className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Ləğv et</button>
        <button type="submit" disabled={loading} className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50">{loading ? 'Saxlanılır...' : 'Saxla'}</button>
      </div>
    </form>
  )
}

