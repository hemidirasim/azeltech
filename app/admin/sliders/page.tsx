import { redirect } from 'next/navigation'
import { getAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import DeleteButton from '@/components/admin/DeleteButton'

export default async function SlidersPage() {
  const admin = await getAdmin()
  if (!admin) redirect('/admin/login')

  const sliders = await prisma.slider.findMany({
    orderBy: { order: 'asc' },
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Slider İdarəetməsi</h1>
        <Link
          href="/admin/sliders/new"
          className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
        >
          + Yeni Slider
        </Link>
      </div>

      {sliders.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-gray-600 text-lg mb-4">Hazırda slider yoxdur.</p>
          <Link
            href="/admin/sliders/new"
            className="text-primary-600 hover:text-primary-700 font-semibold"
          >
            İlk slider-i yaradın →
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sıra
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Başlıq
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Şəkil
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Əməliyyatlar
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sliders.map((slider) => (
                <tr key={slider.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {slider.order}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {slider.titleAz || slider.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {slider.imageUrl ? (
                      <img
                        src={slider.imageUrl}
                        alt={slider.titleAz}
                        className="h-16 w-24 object-cover rounded"
                      />
                    ) : (
                      <span className="text-gray-400">Şəkil yoxdur</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        slider.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {slider.isActive ? 'Aktiv' : 'Deaktiv'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <Link
                      href={`/admin/sliders/${slider.id}/edit`}
                      className="text-primary-600 hover:text-primary-900"
                    >
                      Redaktə
                    </Link>
                    <DeleteButton
                      id={slider.id}
                      endpoint={`/api/admin/sliders/${slider.id}/delete`}
                      redirectPath="/admin/sliders"
                      confirmMessage="Bu slider-i silmək istədiyinizə əminsiniz?"
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



