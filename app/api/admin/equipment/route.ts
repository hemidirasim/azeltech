import { NextRequest, NextResponse } from 'next/server'
import { getAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  const admin = await getAdmin()
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const data = await request.json()
    const equipment = await prisma.equipmentPark.create({
      data: {
        title: data.titleAz || '',
        titleAz: data.titleAz,
        description: data.descriptionAz || '',
        descriptionAz: data.descriptionAz,
        categoryId: data.categoryId || null,
        imageUrl: data.imageUrl,
        specifications: data.specifications || {},
        order: data.order || 0,
        isActive: data.isActive ?? true,
      },
    })
    return NextResponse.json(equipment)
  } catch (error) {
    console.error('Equipment creation error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create equipment' },
      { status: 500 }
    )
  }
}



