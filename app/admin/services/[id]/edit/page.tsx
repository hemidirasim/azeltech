import { redirect } from 'next/navigation'
import { getAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import ServiceForm from '@/components/admin/ServiceForm'
import Link from 'next/link'

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const admin = await getAdmin()
  if (!admin) redirect('/admin/login')

  const { id } = await params
  const service = await prisma.service.findUnique({ where: { id } })

  if (!service) redirect('/admin/services')

  return (
    <div>
      <div className="mb-8">
        <Link href="/admin/services" className="text-primary-600 hover:text-primary-700 font-semibold mb-4 inline-block">← Geri</Link>
        <h1 className="text-3xl font-bold text-gray-900">Xidmət Redaktəsi</h1>
      </div>
      <ServiceForm service={service} />
    </div>
  )
}






