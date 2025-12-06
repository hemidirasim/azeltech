import { NextRequest, NextResponse } from 'next/server'
import { getAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  const admin = await getAdmin()
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const data = await request.json()
    const partner = await prisma.partner.create({
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
    console.error('Partner creation error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create partner' },
      { status: 500 }
    )
  }
}

