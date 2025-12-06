import { redirect } from 'next/navigation'
import { getAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import MachineryForm from '@/components/admin/MachineryForm'
import Link from 'next/link'

export default async function EditMachineryPage({ params }: { params: Promise<{ id: string }> }) {
  const admin = await getAdmin()
  if (!admin) redirect('/admin/login')
  const { id } = await params
  const machinery = await prisma.machinery.findUnique({ where: { id } })
  if (!machinery) redirect('/admin/machinery')
  return (
    <div>
      <div className="mb-8">
        <Link href="/admin/machinery" className="text-primary-600 hover:text-primary-700 font-semibold mb-4 inline-block">← Geri</Link>
        <h1 className="text-3xl font-bold text-gray-900">Maşın Redaktəsi</h1>
      </div>
      <MachineryForm machinery={machinery} />
    </div>
  )
}






