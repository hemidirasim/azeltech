import { redirect } from 'next/navigation'
import { getAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import DeleteButton from '@/components/admin/DeleteButton'

export default async function NewsPage() {
  const admin = await getAdmin()
  if (!admin) redirect('/admin/login')
  const news = await prisma.news.findMany({ orderBy: { publishedAt: 'desc' } })
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Xəbərlər İdarəetməsi</h1>
        <Link href="/admin/news/new" className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition">+ Yeni Xəbər</Link>
      </div>
      {news.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-gray-600 text-lg mb-4">Hazırda xəbər yoxdur.</p>
          <Link href="/admin/news/new" className="text-primary-600 hover:text-primary-700 font-semibold">İlk xəbəri yaradın →</Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Başlıq</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tarix</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Əməliyyatlar</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {news.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 text-sm text-gray-900">{item.titleAz || item.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.publishedAt ? new Date(item.publishedAt).toLocaleDateString('az-AZ') : '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${item.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {item.isActive ? 'Aktiv' : 'Deaktiv'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <Link href={`/admin/news/${item.id}/edit`} className="text-primary-600 hover:text-primary-900">Redaktə</Link>
                    <DeleteButton
                      id={item.id}
                      endpoint={`/api/admin/news/${item.id}/delete`}
                      redirectPath="/admin/news"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}



