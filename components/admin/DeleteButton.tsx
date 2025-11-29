'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface DeleteButtonProps {
  id: string
  endpoint: string
  redirectPath: string
  confirmMessage?: string
}

export default function DeleteButton({ 
  id, 
  endpoint, 
  redirectPath,
  confirmMessage = 'Silmək istədiyinizə əminsiniz?'
}: DeleteButtonProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    if (!confirm(confirmMessage)) {
      return
    }

    setLoading(true)
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
      })

      if (!res.ok) {
        throw new Error('Silinmə uğursuz oldu')
      }

      router.refresh()
    } catch (error) {
      alert('Xəta: ' + (error instanceof Error ? error.message : 'Naməlum xəta'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-red-600 hover:text-red-900 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? 'Silinir...' : 'Sil'}
    </button>
  )
}

