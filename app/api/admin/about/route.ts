import { NextRequest, NextResponse } from 'next/server'
import { getAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  const admin = await getAdmin()
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const data = await request.json()
    const section = await prisma.aboutSection.create({
      data: {
        title: data.titleAz || '',
        titleAz: data.titleAz,
        content: data.contentAz || '',
        contentAz: data.contentAz,
        sectionType: data.sectionType,
        order: data.order || 0,
        isActive: data.isActive ?? true,
      },
    })
    return NextResponse.json(section)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create section' }, { status: 500 })
  }
}



