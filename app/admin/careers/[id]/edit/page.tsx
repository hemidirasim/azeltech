import { redirect } from 'next/navigation'
import { getAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import CareerForm from '@/components/admin/CareerForm'
import Link from 'next/link'

export default async function EditCareerPage({ params }: { params: Promise<{ id: string }> }) {
  const admin = await getAdmin()
  if (!admin) redirect('/admin/login')
  const { id } = await params
  const career = await prisma.career.findUnique({ where: { id } })
  if (!career) redirect('/admin/careers')
  return (
    <div>
      <div className="mb-8">
        <Link href="/admin/careers" className="text-primary-600 hover:text-primary-700 font-semibold mb-4 inline-block">← Geri</Link>
        <h1 className="text-3xl font-bold text-gray-900">Vakansiya Redaktəsi</h1>
      </div>
      <CareerForm career={career} />
    </div>
  )
}






