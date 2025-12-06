import { NextRequest, NextResponse } from 'next/server'
import { getAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getAdmin()
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { id } = await params
    const data = await request.json()
    const partner = await prisma.partner.update({
      where: { id },
      data: {
        name: data.nameAz || '',
        nameAz: data.nameAz,
        description: data.descriptionAz || null,
        descriptionAz: data.descriptionAz || null,
        logoUrl: data.logoUrl || null,
        website: data.website || null,
        category: data.categoryAz || null,
        categoryAz: data.categoryAz || null,
        order: data.order || 0,
        isActive: data.isActive ?? true,
      },
    })
    return NextResponse.json(partner)
  } catch (error) {
    console.error('Partner update error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update partner' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getAdmin()
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { id } = await params
    await prisma.partner.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete partner' }, { status: 500 })
  }
}

