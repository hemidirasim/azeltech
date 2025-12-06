import { redirect } from 'next/navigation'
import { getAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import DeleteButton from '@/components/admin/DeleteButton'

export default async function PartnersPage() {
  const admin = await getAdmin()
  if (!admin) redirect('/admin/login')

  const partners = await prisma.partner.findMany({
    orderBy: { order: 'asc' },
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Tərəfdaşlar İdarəetməsi</h1>
        <Link
          href="/admin/partners/new"
          className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
        >
          + Yeni Tərəfdaş
        </Link>
      </div>

      {partners.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-gray-600 text-lg mb-4">Hazırda tərəfdaş yoxdur.</p>
          <Link
            href="/admin/partners/new"
            className="text-primary-600 hover:text-primary-700 font-semibold"
          >
            İlk tərəfdaşı yaradın →
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Logo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ad</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kateqoriya</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vebsayt</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sıra</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Əməliyyatlar</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {partners.map((partner) => (
                <tr key={partner.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {partner.logoUrl ? (
                      <img
                        src={partner.logoUrl.startsWith('/') ? partner.logoUrl : `/uploads/${partner.logoUrl}`}
                        alt={partner.nameAz || partner.name}
                        className="w-16 h-16 object-contain rounded"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                        <span className="text-gray-400 text-xs">Logo yox</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{partner.nameAz || partner.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{partner.categoryAz || '-'}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {partner.website ? (
                      <a
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-700"
                      >
                        Link
                      </a>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{partner.order}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      partner.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {partner.isActive ? 'Aktiv' : 'Deaktiv'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <Link
                      href={`/admin/partners/${partner.id}/edit`}
                      className="text-primary-600 hover:text-primary-900"
                    >
                      Redaktə
                    </Link>
                    <DeleteButton
                      id={partner.id}
                      endpoint={`/api/admin/partners/${partner.id}/delete`}
                      redirectPath="/admin/partners"
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

