import { NextRequest, NextResponse } from 'next/server'
import { getAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getAdmin()
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { id } = await params
    await prisma.partner.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Partner delete error:', error)
    return NextResponse.json(
      { error: 'Failed to delete partner' },
      { status: 500 }
    )
  }
}

