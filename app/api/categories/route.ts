import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const machinery = await prisma.machinery.findMany({
      where: { isAvailable: true },
      select: { category: true, categoryAz: true },
      distinct: ['category'],
      orderBy: { categoryAz: 'asc' },
    })
    
    const categories = machinery.map(m => ({
      category: m.category,
      categoryAz: m.categoryAz,
    }))
    
    return NextResponse.json(categories)
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      { error: 'Kateqoriyalar gətirilərkən xəta baş verdi' },
      { status: 500 }
    )
  }
}



