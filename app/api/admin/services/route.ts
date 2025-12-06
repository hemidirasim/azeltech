import { NextRequest, NextResponse } from 'next/server'
import { getAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  const admin = await getAdmin()
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const data = await request.json()
    const service = await prisma.service.create({
      data: {
        title: data.titleAz || '',
        titleAz: data.titleAz,
        description: data.descriptionAz || '',
        descriptionAz: data.descriptionAz,
        imageUrl: data.imageUrl || null,
        order: data.order || 0,
        isActive: data.isActive ?? true,
      },
    })
    return NextResponse.json(service)
  } catch (error) {
    console.error('Service creation error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create service' },
      { status: 500 }
    )
  }
}



