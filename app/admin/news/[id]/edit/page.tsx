import { redirect } from 'next/navigation'
import { getAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import NewsForm from '@/components/admin/NewsForm'
import Link from 'next/link'

export default async function EditNewsPage({ params }: { params: Promise<{ id: string }> }) {
  const admin = await getAdmin()
  if (!admin) redirect('/admin/login')
  const { id } = await params
  const news = await prisma.news.findUnique({ where: { id } })
  if (!news) redirect('/admin/news')
  return (
    <div>
      <div className="mb-8">
        <Link href="/admin/news" className="text-primary-600 hover:text-primary-700 font-semibold mb-4 inline-block">← Geri</Link>
        <h1 className="text-3xl font-bold text-gray-900">Xəbər Redaktəsi</h1>
      </div>
      <NewsForm news={news} />
    </div>
  )
}



