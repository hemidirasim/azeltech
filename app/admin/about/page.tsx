import { redirect } from 'next/navigation'
import { getAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function AboutPage() {
  const admin = await getAdmin()
  if (!admin) redirect('/admin/login')
  
  const about = await prisma.aboutSection.findFirst({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Haqqımızda İdarəetməsi</h1>
        {about ? (
          <Link 
            href="/admin/about/edit" 
            className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
          >
            Redaktə et
          </Link>
        ) : (
          <Link 
            href="/admin/about/new" 
            className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
          >
            + Yeni Məzmun
          </Link>
        )}
      </div>

      {about ? (
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Başlıq</label>
              <p className="text-lg font-semibold text-gray-900">{about.title || '-'}</p>
            </div>
            {about.imageUrl && (
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2">Şəkil</label>
                <img 
                  src={about.imageUrl.startsWith('/') ? about.imageUrl : `/uploads/${about.imageUrl}`}
                  alt={about.title || 'Haqqımızda'}
                  className="max-w-md h-auto rounded-lg"
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Məzmun</label>
              <p className="text-gray-700 whitespace-pre-wrap">{about.content || '-'}</p>
            </div>
            <div className="pt-4">
              <Link 
                href="/admin/about/edit"
                className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
              >
                Redaktə et
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-gray-600 text-lg mb-4">Hazırda məzmun yoxdur.</p>
          <Link 
            href="/admin/about/new" 
            className="text-primary-600 hover:text-primary-700 font-semibold"
          >
            İlk məzmunu yaradın →
          </Link>
        </div>
      )}
    </div>
  )
}
