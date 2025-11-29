'use client'

import { usePathname } from 'next/navigation'
import Navbar from './Navbar'

export default function AdminWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdminPage = pathname?.startsWith('/admin')

  if (isAdminPage) {
    return <>{children}</>
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
    </>
  )
}

