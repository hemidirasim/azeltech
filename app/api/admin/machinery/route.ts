import { NextRequest, NextResponse } from 'next/server'
import { getAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  const admin = await getAdmin()
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const data = await request.json()
    const machinery = await prisma.machinery.create({
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
    return NextResponse.json({ error: 'Failed to create machinery' }, { status: 500 })
  }
}



