import { redirect } from 'next/navigation'
import { getAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import DeleteButton from '@/components/admin/DeleteButton'

export default async function CertificatesPage() {
  const admin = await getAdmin()
  if (!admin) redirect('/admin/login')

  const certificates = await prisma.certificate.findMany({
    orderBy: { order: 'asc' },
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Sertifikatlar İdarəetməsi</h1>
        <Link
          href="/admin/certificates/new"
          className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
        >
          + Yeni Sertifikat
        </Link>
      </div>

      {certificates.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-gray-600 text-lg mb-4">Hazırda sertifikat yoxdur.</p>
          <Link
            href="/admin/certificates/new"
            className="text-primary-600 hover:text-primary-700 font-semibold"
          >
            İlk sertifikatı yaradın →
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Şəkil</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Başlıq</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Verici</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sıra</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Əməliyyatlar</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {certificates.map((cert) => (
                <tr key={cert.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {cert.imageUrl ? (
                      <img
                        src={cert.imageUrl.startsWith('/') ? cert.imageUrl : `/uploads/${cert.imageUrl}`}
                        alt={cert.titleAz}
                        className="w-16 h-16 object-cover rounded"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                        <span className="text-gray-400 text-xs">Şəkil yox</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{cert.titleAz}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{cert.issuerAz || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{cert.order}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      cert.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {cert.isActive ? 'Aktiv' : 'Deaktiv'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <Link
                      href={`/admin/certificates/${cert.id}/edit`}
                      className="text-primary-600 hover:text-primary-900"
                    >
                      Redaktə
                    </Link>
                    <DeleteButton
                      id={cert.id}
                      endpoint={`/api/admin/certificates/${cert.id}/delete`}
                      redirectPath="/admin/certificates"
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

