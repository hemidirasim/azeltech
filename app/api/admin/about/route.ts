import { NextRequest, NextResponse } from 'next/server'
import { getAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  const admin = await getAdmin()
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  
  try {
    const data = await request.json()
    
    // Delete existing about section if exists
    await prisma.aboutSection.deleteMany({})
    
    const about = await prisma.aboutSection.create({
      data: {
        title: data.title || '',
        content: data.content || '',
        imageUrl: data.imageUrl || null,
      },
    })
    
    return NextResponse.json(about)
  } catch (error) {
    console.error('About creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create about section' },
      { status: 500 }
    )
  }
}
