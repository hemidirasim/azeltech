import { redirect } from 'next/navigation'
import { getAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import CategoryForm from '@/components/admin/CategoryForm'
import Link from 'next/link'

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const admin = await getAdmin()
  if (!admin) redirect('/admin/login')

  const { id } = await params
  const category = await prisma.equipmentCategory.findUnique({ where: { id } })

  if (!category) redirect('/admin/categories')

  return (
    <div>
      <div className="mb-8">
        <Link href="/admin/categories" className="text-primary-600 hover:text-primary-700 font-semibold mb-4 inline-block">← Geri</Link>
        <h1 className="text-3xl font-bold text-gray-900">Kateqoriya Redaktəsi</h1>
      </div>
      <CategoryForm category={category} />
    </div>
  )
}




