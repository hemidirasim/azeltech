import { redirect } from 'next/navigation'
import { getAdmin } from '@/lib/auth'
import Sidebar from '@/components/admin/Sidebar'
import LogoutButton from '@/components/admin/LogoutButton'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const admin = await getAdmin()

  // If no admin, allow children to render (login page will handle its own redirect)
  if (!admin) {
    return <>{children}</>
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex justify-between items-center px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-800">İdarəetmə Paneli</h2>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">{admin.name || admin.username}</span>
              <LogoutButton />
            </div>
          </div>
        </header>
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
