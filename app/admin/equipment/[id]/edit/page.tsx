import { redirect } from 'next/navigation'
import { getAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import EquipmentForm from '@/components/admin/EquipmentForm'
import Link from 'next/link'

export default async function EditEquipmentPage({ params }: { params: Promise<{ id: string }> }) {
  const admin = await getAdmin()
  if (!admin) redirect('/admin/login')
  const { id } = await params
  const equipment = await prisma.equipmentPark.findUnique({
    where: { id },
    include: {
      category: true,
    },
  })
  if (!equipment) redirect('/admin/equipment')
  return (
    <div>
      <div className="mb-8">
        <Link href="/admin/equipment" className="text-primary-600 hover:text-primary-700 font-semibold mb-4 inline-block">← Geri</Link>
        <h1 className="text-3xl font-bold text-gray-900">Texnika Redaktəsi</h1>
      </div>
      <EquipmentForm equipment={equipment} />
    </div>
  )
}



