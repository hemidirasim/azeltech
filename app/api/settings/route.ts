import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const settings = await prisma.siteSettings.findFirst({
      include: {
        contactInfo: {
          where: { isActive: true },
          orderBy: { order: 'asc' },
        },
      },
    })
    
    if (!settings) {
      return NextResponse.json({
        siteNameAz: 'Azeltech',
        sloganAz: 'Etibarlı texnika, peşəkar xidmət',
        contactInfo: [],
      })
    }
    
    return NextResponse.json(settings)
  } catch (error) {
    console.error('Settings fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    )
  }
}

