import { NextRequest, NextResponse } from 'next/server'
import { getAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getAdmin()
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { id } = await params
    const data = await request.json()
    
    // Update settings
    const settings = await prisma.siteSettings.update({
      where: { id },
      data: {
        siteName: data.siteNameAz || '',
        siteNameAz: data.siteNameAz,
        slogan: data.sloganAz || '',
        sloganAz: data.sloganAz,
        logoUrl: data.logoUrl,
        faviconUrl: data.faviconUrl,
        email: data.email,
        facebook: data.facebook,
        instagram: data.instagram,
        linkedin: data.linkedin,
        twitter: data.twitter,
        youtube: data.youtube,
        whatsapp: data.whatsapp,
        mapUrl: data.mapUrl,
      },
    })

    // Update contact info
    if (data.contactInfo && Array.isArray(data.contactInfo)) {
      // Delete existing contact info
      await prisma.contactInfo.deleteMany({
        where: { settingsId: id },
      })

      // Create new contact info
      await prisma.contactInfo.createMany({
        data: data.contactInfo.map((ci: any) => ({
          type: ci.type,
          label: ci.labelAz || '',
          labelAz: ci.labelAz || '',
          value: ci.valueAz || '',
          valueAz: ci.valueAz || '',
          order: ci.order || 0,
          isActive: ci.isActive ?? true,
          settingsId: id,
        })),
      })
    }
    
    const updatedSettings = await prisma.siteSettings.findUnique({
      where: { id },
      include: {
        contactInfo: {
          orderBy: { order: 'asc' },
        },
      },
    })
    
    return NextResponse.json(updatedSettings)
  } catch (error) {
    console.error('Settings update error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update settings' },
      { status: 500 }
    )
  }
}

