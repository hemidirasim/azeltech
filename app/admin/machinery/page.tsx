import { redirect } from 'next/navigation'
import { getAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import DeleteButton from '@/components/admin/DeleteButton'

export default async function MachineryPage() {
  const admin = await getAdmin()
  if (!admin) redirect('/admin/login')
  const machinery = await prisma.machinery.findMany({ orderBy: { createdAt: 'desc' } })
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Maşınlar İdarəetməsi</h1>
        <Link href="/admin/machinery/new" className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition">+ Yeni Maşın</Link>
      </div>
      {machinery.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-gray-600 text-lg mb-4">Hazırda maşın yoxdur.</p>
          <Link href="/admin/machinery/new" className="text-primary-600 hover:text-primary-700 font-semibold">İlk maşını yaradın →</Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ad</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kateqoriya</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Qiymət</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Əməliyyatlar</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {machinery.map((m) => (
                <tr key={m.id}>
                  <td className="px-6 py-4 text-sm text-gray-900">{m.nameAz || m.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{m.categoryAz || m.category}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{m.pricePerDay} AZN/gün</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${m.isAvailable ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {m.isAvailable ? 'Mövcud' : 'Mövcud deyil'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <Link href={`/admin/machinery/${m.id}/edit`} className="text-primary-600 hover:text-primary-900">Redaktə</Link>
                    <DeleteButton
                      id={m.id}
                      endpoint={`/api/admin/machinery/${m.id}/delete`}
                      redirectPath="/admin/machinery"
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



