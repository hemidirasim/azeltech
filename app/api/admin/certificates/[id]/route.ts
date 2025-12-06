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
    const certificate = await prisma.certificate.update({
      where: { id },
      data: {
        title: data.titleAz || '',
        titleAz: data.titleAz,
        description: data.descriptionAz || '',
        descriptionAz: data.descriptionAz,
        imageUrl: data.imageUrl || null,
        issuer: data.issuerAz || null,
        issuerAz: data.issuerAz || null,
        issueDate: data.issueDate ? new Date(data.issueDate) : null,
        expiryDate: data.expiryDate ? new Date(data.expiryDate) : null,
        order: data.order || 0,
        isActive: data.isActive ?? true,
      },
    })
    return NextResponse.json(certificate)
  } catch (error) {
    console.error('Certificate update error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update certificate' },
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
    await prisma.certificate.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete certificate' }, { status: 500 })
  }
}

