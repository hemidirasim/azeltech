import { redirect } from 'next/navigation'
import { getAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import DeleteButton from '@/components/admin/DeleteButton'

export default async function CategoriesPage() {
  const admin = await getAdmin()
  if (!admin) redirect('/admin/login')

  const categories = await prisma.equipmentCategory.findMany({
    orderBy: { order: 'asc' },
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Texnika Kateqoriyaları</h1>
        <Link
          href="/admin/categories/new"
          className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
        >
          + Yeni Kateqoriya
        </Link>
      </div>

      {categories.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-gray-600 text-lg mb-4">Hazırda kateqoriya yoxdur.</p>
          <Link
            href="/admin/categories/new"
            className="text-primary-600 hover:text-primary-700 font-semibold"
          >
            İlk kateqoriyanı yaradın →
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Şəkil</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sıra</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ad</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Əməliyyatlar</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {categories.map((category) => (
                <tr key={category.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {category.imageUrl ? (
                      <img
                        src={category.imageUrl.startsWith('/') ? category.imageUrl : `/uploads/${category.imageUrl}`}
                        alt={category.nameAz}
                        className="w-16 h-16 object-cover rounded"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                        <span className="text-gray-400 text-xs">Şəkil yox</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{category.order}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{category.nameAz}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${category.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {category.isActive ? 'Aktiv' : 'Deaktiv'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <Link href={`/admin/categories/${category.id}/edit`} className="text-primary-600 hover:text-primary-900">Redaktə</Link>
                    <DeleteButton
                      id={category.id}
                      endpoint={`/api/admin/categories/${category.id}/delete`}
                      redirectPath="/admin/categories"
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




