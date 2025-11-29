import { NextRequest, NextResponse } from 'next/server'
import { getAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getAdmin()
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { id } = await params
    const data = await request.json()
    const equipment = await prisma.equipmentPark.update({
      where: { id },
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
    console.error('Equipment update error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update equipment' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getAdmin()
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { id } = await params
    await prisma.equipmentPark.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete equipment' }, { status: 500 })
  }
}



