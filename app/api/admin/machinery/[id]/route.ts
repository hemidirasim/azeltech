import { NextRequest, NextResponse } from 'next/server'
import { getAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getAdmin()
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const { id } = await params
    const data = await request.json()
    const machinery = await prisma.machinery.update({
      where: { id },
      data: {
        name: data.name,
        nameAz: data.nameAz,
        description: data.description,
        descriptionAz: data.descriptionAz,
        category: data.category,
        categoryAz: data.categoryAz,
        pricePerDay: parseFloat(data.pricePerDay),
        imageUrl: data.imageUrl,
        specifications: data.specifications || {},
        isAvailable: data.isAvailable ?? true,
      },
    })
    return NextResponse.json(machinery)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update machinery' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getAdmin()
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const { id } = await params
    await prisma.machinery.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete machinery' }, { status: 500 })
  }
}



