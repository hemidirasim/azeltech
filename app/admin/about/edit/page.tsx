import { redirect } from 'next/navigation'
import { getAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import AboutForm from '@/components/admin/AboutForm'
import Link from 'next/link'

export default async function EditAboutPage() {
  const admin = await getAdmin()
  if (!admin) redirect('/admin/login')
  
  const about = await prisma.aboutSection.findFirst({
    orderBy: { createdAt: 'desc' },
  })

  if (!about) {
    redirect('/admin/about/new')
  }

  return (
    <div>
      <div className="mb-8">
        <Link href="/admin/about" className="text-primary-600 hover:text-primary-700 font-semibold mb-4 inline-block">← Geri</Link>
        <h1 className="text-3xl font-bold text-gray-900">Haqqımızda Redaktəsi</h1>
      </div>
      <AboutForm about={about} />
    </div>
  )
}

