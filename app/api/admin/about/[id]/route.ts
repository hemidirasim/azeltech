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

    const about = await prisma.aboutSection.update({
      where: { id },
      data: {
        title: data.title || '',
        content: data.content || '',
        imageUrl: data.imageUrl || null,
      },
    })

    return NextResponse.json(about)
  } catch (error) {
    console.error('About update error:', error)
    return NextResponse.json(
      { error: 'Failed to update about section' },
      { status: 500 }
    )
  }
}
