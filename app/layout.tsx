import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import AdminWrapper from '@/components/AdminWrapper'
import FooterWrapper from '@/components/FooterWrapper'
import { prisma } from '@/lib/prisma'

const inter = Inter({ subsets: ['latin', 'latin-ext'] })

export async function generateMetadata(): Promise<Metadata> {
  let settings = null
  try {
    settings = await prisma.siteSettings.findFirst()
  } catch (error) {
    console.error('Error fetching settings for metadata:', error)
  }
  
  return {
    title: settings?.siteNameAz || 'Azeltech - Ağır İş Maşınlarının İcarəsi',
    description: settings?.sloganAz || 'Ağır iş maşınlarının peşəkar icarə xidməti',
    icons: settings?.faviconUrl ? {
      icon: settings.faviconUrl,
      shortcut: settings.faviconUrl,
      apple: settings.faviconUrl,
    } : undefined,
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let settings = null
  try {
    settings = await prisma.siteSettings.findFirst()
  } catch (error) {
    console.error('Error fetching settings:', error)
  }
  
  return (
    <html lang="az" suppressHydrationWarning>
      <body className={inter.className}>
        <AdminWrapper>{children}</AdminWrapper>
        <FooterWrapper />
      </body>
    </html>
  )
}



