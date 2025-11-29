import { NextRequest, NextResponse } from 'next/server'
import { getAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getAdmin()
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const { id } = await params
    const data = await request.json()
    const career = await prisma.career.update({
      where: { id },
      data: {
        title: data.titleAz || '',
        titleAz: data.titleAz,
        description: data.descriptionAz || '',
        descriptionAz: data.descriptionAz,
        requirements: data.requirementsAz || '',
        requirementsAz: data.requirementsAz,
        location: data.locationAz || '',
        locationAz: data.locationAz,
        type: data.typeAz || '',
        typeAz: data.typeAz,
        isActive: data.isActive ?? true,
      },
    })
    return NextResponse.json(career)
  } catch (error) {
    console.error('Career update error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update career' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getAdmin()
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const { id } = await params
    await prisma.career.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete career' }, { status: 500 })
  }
}



