import { redirect } from 'next/navigation'
import { getAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import DeleteButton from '@/components/admin/DeleteButton'

export default async function ServicesPage() {
  const admin = await getAdmin()
  if (!admin) redirect('/admin/login')

  const services = await prisma.service.findMany({
    orderBy: { order: 'asc' },
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Xidmətlər İdarəetməsi</h1>
        <Link
          href="/admin/services/new"
          className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
        >
          + Yeni Xidmət
        </Link>
      </div>

      {services.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-gray-600 text-lg mb-4">Hazırda xidmət yoxdur.</p>
          <Link
            href="/admin/services/new"
            className="text-primary-600 hover:text-primary-700 font-semibold"
          >
            İlk xidməti yaradın →
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sıra</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Başlıq</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Şəkil</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Əməliyyatlar</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {services.map((service) => (
                <tr key={service.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{service.order}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{service.titleAz || service.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {service.imageUrl ? (
                      <img src={service.imageUrl} alt={service.titleAz} className="h-16 w-24 object-cover rounded" />
                    ) : (
                      <span className="text-gray-400">Şəkil yoxdur</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${service.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {service.isActive ? 'Aktiv' : 'Deaktiv'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <Link href={`/admin/services/${service.id}/edit`} className="text-primary-600 hover:text-primary-900">Redaktə</Link>
                    <DeleteButton
                      id={service.id}
                      endpoint={`/api/admin/services/${service.id}/delete`}
                      redirectPath="/admin/services"
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



