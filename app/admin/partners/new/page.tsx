import { redirect } from 'next/navigation'
import { getAdmin } from '@/lib/auth'
import PartnerForm from '@/components/admin/PartnerForm'

export default async function NewPartnerPage() {
  const admin = await getAdmin()
  if (!admin) redirect('/admin/login')

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Yeni Tərəfdaş</h1>
      <PartnerForm />
    </div>
  )
}

