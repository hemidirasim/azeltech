import { redirect } from 'next/navigation'
import { getAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import PartnerForm from '@/components/admin/PartnerForm'

export default async function EditPartnerPage({ params }: { params: { id: string } }) {
  const admin = await getAdmin()
  if (!admin) redirect('/admin/login')

  const partner = await prisma.partner.findUnique({
    where: { id: params.id },
  })

  if (!partner) {
    redirect('/admin/partners')
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Tərəfdaşı Redaktə Et</h1>
      <PartnerForm partner={partner} />
    </div>
  )
}

