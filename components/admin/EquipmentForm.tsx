'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ImageUpload from './ImageUpload'

interface EquipmentFormProps {
  equipment?: {
    id: string
    titleAz: string
    descriptionAz?: string | null
    categoryId?: string | null
    imageUrl?: string | null
    specifications?: any
    order: number
    isActive: boolean
  }
}

interface Category {
  id: string
  nameAz: string
}

export default function EquipmentForm({ equipment }: EquipmentFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [specs, setSpecs] = useState<Record<string, string>>(
    equipment?.specifications && typeof equipment.specifications === 'object' 
      ? equipment.specifications as Record<string, string>
      : {}
  )
  const [newSpecKey, setNewSpecKey] = useState('')
  const [newSpecValue, setNewSpecValue] = useState('')
  const [formData, setFormData] = useState({
    titleAz: equipment?.titleAz || '',
    descriptionAz: equipment?.descriptionAz || '',
    categoryId: equipment?.categoryId || '',
    imageUrl: equipment?.imageUrl || '',
    order: equipment?.order || 0,
    isActive: equipment?.isActive ?? true,
  })

  useEffect(() => {
    fetch('/api/admin/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error('Error fetching categories:', err))
  }, [])

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
      const url = equipment ? `/api/admin/equipment/${equipment.id}` : '/api/admin/equipment'
      const method = equipment ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, specifications: specs }),
      })

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        throw new Error(errorData.error || 'Xəta baş verdi')
      }

      router.push('/admin/equipment')
      router.refresh()
    } catch (error) {
      console.error('Equipment form error:', error)
      alert('Xəta: ' + (error instanceof Error ? error.message : 'Naməlum xəta'))
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700 mb-2">Başlıq</label><input type="text" value={formData.titleAz} onChange={(e) => setFormData({ ...formData, titleAz: e.target.value })} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500" /></div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Kateqoriya</label>
          <select
            value={formData.categoryId}
            onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            <option value="">Kateqoriya seçin</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.nameAz}
              </option>
            ))}
          </select>
        </div>
        <div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700 mb-2">Təsvir</label><textarea value={formData.descriptionAz} onChange={(e) => setFormData({ ...formData, descriptionAz: e.target.value })} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500" /></div>
        <div className="md:col-span-2">
          <ImageUpload
            value={formData.imageUrl}
            onChange={(url) => setFormData({ ...formData, imageUrl: url })}
            label="Şəkil"
          />
        </div>
        <div><label className="block text-sm font-medium text-gray-700 mb-2">Sıra</label><input type="number" value={formData.order} onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500" /></div>
        <div className="flex items-center"><input type="checkbox" id="isActive" checked={formData.isActive} onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })} className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" /><label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">Aktiv</label></div>
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

