import { redirect } from 'next/navigation'
import { getAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import DeleteButton from '@/components/admin/DeleteButton'

export default async function ProjectsPage() {
  const admin = await getAdmin()
  if (!admin) redirect('/admin/login')

  const projects = await prisma.project.findMany({
    orderBy: { order: 'asc' },
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Layihələr İdarəetməsi</h1>
        <Link href="/admin/projects/new" className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition">+ Yeni Layihə</Link>
      </div>

      {projects.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-gray-600 text-lg mb-4">Hazırda layihə yoxdur.</p>
          <Link href="/admin/projects/new" className="text-primary-600 hover:text-primary-700 font-semibold">İlk layihəni yaradın →</Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sıra</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Başlıq</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Podratçı</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Əməliyyatlar</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {projects.map((project) => (
                <tr key={project.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{project.order}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{project.titleAz || project.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{project.contractorAz || project.contractor || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      project.status === 'completed' ? 'bg-green-100 text-green-800' :
                      project.status === 'ongoing' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {project.status === 'completed' ? 'Tamamlanıb' : project.status === 'ongoing' ? 'Davam edir' : 'Planlaşdırılıb'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <Link href={`/admin/projects/${project.id}/edit`} className="text-primary-600 hover:text-primary-900">Redaktə</Link>
                    <DeleteButton
                      id={project.id}
                      endpoint={`/api/admin/projects/${project.id}/delete`}
                      redirectPath="/admin/projects"
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



