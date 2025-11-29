import { NextRequest, NextResponse } from 'next/server'
import { getAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  const admin = await getAdmin()
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const data = await request.json()
    const career = await prisma.career.create({
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
    console.error('Career creation error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create career' },
      { status: 500 }
    )
  }
}



