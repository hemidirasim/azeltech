import { NextRequest, NextResponse } from 'next/server'
import { getAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const admin = await getAdmin()
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const sliders = await prisma.slider.findMany({
    orderBy: { order: 'asc' },
  })

  return NextResponse.json(sliders)
}

export async function POST(request: NextRequest) {
  const admin = await getAdmin()
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const data = await request.json()
    const slider = await prisma.slider.create({
      data: {
        title: data.titleAz || '',
        titleAz: data.titleAz,
        subtitle: data.subtitleAz || '',
        subtitleAz: data.subtitleAz,
        imageUrl: data.imageUrl,
        buttonText: data.buttonTextAz || '',
        buttonTextAz: data.buttonTextAz,
        buttonLink: data.buttonLink,
        order: data.order || 0,
        isActive: data.isActive ?? true,
      },
    })

    return NextResponse.json(slider)
  } catch (error) {
    console.error('Error creating slider:', error)
    return NextResponse.json(
      { error: 'Failed to create slider' },
      { status: 500 }
    )
  }
}



