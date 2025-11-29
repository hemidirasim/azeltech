'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ImageUpload from './ImageUpload'

interface ContactInfo {
  id?: string
  type: 'phone' | 'address' | 'email'
  labelAz?: string
  valueAz?: string
  order: number
  isActive: boolean
}

interface SettingsFormProps {
  settings: {
    id: string
    siteName?: string | null
    siteNameAz?: string | null
    slogan?: string | null
    sloganAz?: string | null
    logoUrl?: string | null
    faviconUrl?: string | null
    email?: string | null
    facebook?: string | null
    instagram?: string | null
    linkedin?: string | null
    twitter?: string | null
    youtube?: string | null
    whatsapp?: string | null
    mapUrl?: string | null
    contactInfo?: Array<{
      id: string
      type: string
      labelAz?: string | null
      valueAz?: string | null
      order: number
      isActive: boolean
    }>
  }
}

export default function SettingsForm({ settings }: SettingsFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    siteNameAz: settings?.siteNameAz || '',
    sloganAz: settings?.sloganAz || '',
    logoUrl: settings?.logoUrl || '',
    faviconUrl: settings?.faviconUrl || '',
    email: settings?.email || '',
    facebook: settings?.facebook || '',
    instagram: settings?.instagram || '',
    linkedin: settings?.linkedin || '',
    twitter: settings?.twitter || '',
    youtube: settings?.youtube || '',
    whatsapp: settings?.whatsapp || '',
    mapUrl: settings?.mapUrl || '',
  })

  const [contactInfo, setContactInfo] = useState<ContactInfo[]>(
    settings?.contactInfo?.map(ci => ({
      id: ci.id,
      type: ci.type as 'phone' | 'address' | 'email',
      labelAz: ci.labelAz || '',
      valueAz: ci.valueAz || '',
      order: ci.order,
      isActive: ci.isActive,
    })) || []
  )

  const addContactInfo = () => {
    setContactInfo([...contactInfo, {
      type: 'phone',
      labelAz: '',
      valueAz: '',
      order: contactInfo.length,
      isActive: true,
    }])
  }

  const removeContactInfo = (index: number) => {
    setContactInfo(contactInfo.filter((_, i) => i !== index))
  }

  const updateContactInfo = (index: number, field: keyof ContactInfo, value: any) => {
    const updated = [...contactInfo]
    updated[index] = { ...updated[index], [field]: value }
    setContactInfo(updated)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch(`/api/admin/settings/${settings.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          contactInfo,
        }),
      })

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        throw new Error(errorData.error || 'Xəta baş verdi')
      }

      router.refresh()
      alert('Parametrlər uğurla yeniləndi!')
      setLoading(false)
    } catch (error) {
      console.error('Settings form error:', error)
      alert('Xəta: ' + (error instanceof Error ? error.message : 'Naməlum xəta'))
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Ümumi Məlumatlar</h2>
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Sayt Adı</label>
          <input
            type="text"
            value={formData.siteNameAz}
            onChange={(e) => setFormData({ ...formData, siteNameAz: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Slogan</label>
          <textarea
            value={formData.sloganAz}
            onChange={(e) => setFormData({ ...formData, sloganAz: e.target.value })}
            rows={2}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div>
          <ImageUpload
            value={formData.logoUrl}
            onChange={(url) => setFormData({ ...formData, logoUrl: url })}
            label="Logo"
          />
        </div>

        <div>
          <ImageUpload
            value={formData.faviconUrl}
            onChange={(url) => setFormData({ ...formData, faviconUrl: url })}
            label="Favicon"
          />
        </div>
      </div>

      <div className="border-t pt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Əlaqə Məlumatları</h2>
          <button
            type="button"
            onClick={addContactInfo}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm"
          >
            + Əlavə et
          </button>
        </div>

        <div className="space-y-4">
          {contactInfo.map((info, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-start">
                <h3 className="font-medium text-gray-700">Əlaqə #{index + 1}</h3>
                <button
                  type="button"
                  onClick={() => removeContactInfo(index)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Sil
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Növ</label>
                  <select
                    value={info.type}
                    onChange={(e) => updateContactInfo(index, 'type', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="phone">Telefon</option>
                    <option value="address">Ünvan</option>
                    <option value="email">Email</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Etiket (məs: Əsas ofis)</label>
                  <input
                    type="text"
                    value={info.labelAz || ''}
                    onChange={(e) => updateContactInfo(index, 'labelAz', e.target.value)}
                    placeholder="Əsas ofis"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Dəyər</label>
                  <input
                    type="text"
                    value={info.valueAz || ''}
                    onChange={(e) => updateContactInfo(index, 'valueAz', e.target.value)}
                    placeholder="+994 12 345 67 89"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={`active-${index}`}
                    checked={info.isActive}
                    onChange={(e) => updateContactInfo(index, 'isActive', e.target.checked)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`active-${index}`} className="ml-2 block text-sm text-gray-700">Aktiv</label>
                </div>
                <div className="flex items-center space-x-2">
                  <label className="text-sm text-gray-700">Sıra:</label>
                  <input
                    type="number"
                    value={info.order}
                    onChange={(e) => updateContactInfo(index, 'order', parseInt(e.target.value))}
                    className="w-20 px-2 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
            </div>
          ))}

          {contactInfo.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>Hazırda əlaqə məlumatı yoxdur.</p>
              <button
                type="button"
                onClick={addContactInfo}
                className="mt-4 text-primary-600 hover:text-primary-700 font-semibold"
              >
                İlk əlaqə məlumatını əlavə edin →
              </button>
            </div>
          )}
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Xəritə URL (Google Maps embed URL)</label>
          <input
            type="text"
            value={formData.mapUrl}
            onChange={(e) => setFormData({ ...formData, mapUrl: e.target.value })}
            placeholder="https://www.google.com/maps/embed?pb=..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>

      <div className="border-t pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Sosial Media</h2>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Facebook</label>
            <input
              type="url"
              value={formData.facebook}
              onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
              placeholder="https://facebook.com/..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Instagram</label>
            <input
              type="url"
              value={formData.instagram}
              onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
              placeholder="https://instagram.com/..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
            <input
              type="url"
              value={formData.linkedin}
              onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
              placeholder="https://linkedin.com/..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Twitter</label>
            <input
              type="url"
              value={formData.twitter}
              onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
              placeholder="https://twitter.com/..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">YouTube</label>
            <input
              type="url"
              value={formData.youtube}
              onChange={(e) => setFormData({ ...formData, youtube: e.target.value })}
              placeholder="https://youtube.com/..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp</label>
            <input
              type="text"
              value={formData.whatsapp}
              onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
              placeholder="+994501234567"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-6 border-t">
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
