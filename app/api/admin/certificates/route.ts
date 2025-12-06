import { NextRequest, NextResponse } from 'next/server'
import { getAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  const admin = await getAdmin()
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const data = await request.json()
    const certificate = await prisma.certificate.create({
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
    console.error('Certificate creation error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create certificate' },
      { status: 500 }
    )
  }
}

