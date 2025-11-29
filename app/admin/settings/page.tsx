import { redirect } from 'next/navigation'
import { getAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import SettingsForm from '@/components/admin/SettingsForm'

export default async function SettingsPage() {
  const admin = await getAdmin()
  if (!admin) redirect('/admin/login')

  // Get or create settings (only one record)
  let settings = await prisma.siteSettings.findFirst({
    include: {
      contactInfo: {
        orderBy: { order: 'asc' },
      },
    },
  })
  
  if (!settings) {
    settings = await prisma.siteSettings.create({
      data: {
        siteName: 'Azeltech',
        siteNameAz: 'Azeltech',
        slogan: 'Etibarlı texnika, peşəkar xidmət',
        sloganAz: 'Etibarlı texnika, peşəkar xidmət',
      },
      include: {
        contactInfo: true,
      },
    })
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Sayt Parametrləri</h1>
      <SettingsForm settings={settings} />
    </div>
  )
}

