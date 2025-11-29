import { NextRequest, NextResponse } from 'next/server'
import { getAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getAdmin()
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    const data = await request.json()

    const slider = await prisma.slider.update({
      where: { id },
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
    console.error('Error updating slider:', error)
    return NextResponse.json(
      { error: 'Failed to update slider' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getAdmin()
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    await prisma.slider.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting slider:', error)
    return NextResponse.json(
      { error: 'Failed to delete slider' },
      { status: 500 }
    )
  }
}



