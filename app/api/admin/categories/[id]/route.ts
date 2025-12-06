import { NextRequest, NextResponse } from 'next/server'
import { getAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getAdmin()
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { id } = await params
    const data = await request.json()
    const category = await prisma.equipmentCategory.update({
      where: { id },
      data: {
        name: data.nameAz || '',
        nameAz: data.nameAz,
        description: data.descriptionAz || '',
        descriptionAz: data.descriptionAz,
        imageUrl: data.imageUrl || null,
        order: data.order || 0,
        isActive: data.isActive ?? true,
      },
    })
    return NextResponse.json(category)
  } catch (error) {
    console.error('Category update error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update category' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getAdmin()
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { id } = await params
    await prisma.equipmentCategory.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 })
  }
}




