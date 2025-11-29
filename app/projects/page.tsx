import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { format } from 'date-fns'

async function getProjects() {
  try {
    const projects = await prisma.project.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    })
    return projects
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

function formatPeriod(startDate: Date | null, endDate: Date | null, status: string | null) {
  if (!startDate) return '-'
  
  const start = format(new Date(startDate), 'yyyy')
  if (status === 'ongoing') {
    return `${start} – davam edir`
  }
  if (endDate) {
    const end = format(new Date(endDate), 'yyyy')
    return `${start}–${end}`
  }
  return start
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">Layihələrimiz</h1>
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-6">
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>"Azel Texnika" MMC</strong> 2021-ci ildən etibarən ölkə üzrə müxtəlif miqyaslı tikinti, 
              infrastruktur və ərazi hazırlığı layihələrində subpodratçı kimi uğurla fəaliyyət göstərir.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Aşağıda şirkətimizin iştirak etdiyi əsas layihələrin bir hissəsi təqdim olunur:
            </p>
          </div>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Hazırda layihə məlumatı yoxdur.</p>
          </div>
        ) : (
          <>
            {/* Table View for Desktop */}
            <div className="hidden md:block bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-primary-600">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                        №
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                        Layihə
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                        Podratçı şirkət
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                        Dövr
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {projects.map((project, index) => {
                      const statusBadge = project.status === 'completed' 
                        ? { label: 'Tamamlanıb', className: 'bg-green-100 text-green-800' }
                        : project.status === 'ongoing'
                        ? { label: 'Davam edir', className: 'bg-blue-100 text-blue-800' }
                        : { label: 'Planlaşdırılıb', className: 'bg-yellow-100 text-yellow-800' }
                      
                      return (
                        <tr key={project.id} className="hover:bg-gray-50 transition">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                            {index + 1}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {project.titleAz}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {project.contractorAz || project.contractor || '-'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {formatPeriod(project.startDate, project.endDate, project.status)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {project.status && (
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusBadge.className}`}>
                                {statusBadge.label}
                              </span>
                            )}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Card View for Mobile */}
            <div className="md:hidden space-y-4">
              {projects.map((project, index) => {
                const statusBadge = project.status === 'completed' 
                  ? { label: 'Tamamlanıb', className: 'bg-green-100 text-green-800' }
                  : project.status === 'ongoing'
                  ? { label: 'Davam edir', className: 'bg-blue-100 text-blue-800' }
                  : { label: 'Planlaşdırılıb', className: 'bg-yellow-100 text-yellow-800' }
                
                return (
                  <div
                    key={project.id}
                    className="bg-white rounded-lg shadow-md p-6"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-lg font-bold text-primary-600">№{index + 1}</span>
                      {project.status && (
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusBadge.className}`}>
                          {statusBadge.label}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {project.titleAz}
                    </h3>
                    {project.contractorAz && (
                      <div className="mb-2">
                        <span className="text-sm font-semibold text-gray-700">Podratçı şirkət: </span>
                        <span className="text-sm text-gray-600">{project.contractorAz}</span>
                      </div>
                    )}
                    <div className="text-sm text-gray-600">
                      <span className="font-semibold">Dövr: </span>
                      {formatPeriod(project.startDate, project.endDate, project.status)}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Summary Section */}
            <div className="mt-12 bg-white rounded-lg shadow-md p-6 md:p-8">
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>"Azel Texnika" MMC</strong> yuxarıda göstərilən layihələrdə torpaq qazma, 
                ərazi düzləndirmə, yol əsasının hazırlanması və digər texniki xidmətlərin icrasını həyata keçirmişdir.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Bizim məqsədimiz — hər bir layihədə vaxtında, təhlükəsiz və yüksək keyfiyyətlə icranı təmin etməkdir.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Davam edən və tamamlanmış işlərimiz şirkətimizin peşəkarlığını, texniki potensialını və 
                etibarlı tərəfdaş imicini əks etdirir.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
