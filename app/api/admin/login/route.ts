import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json(
        { error: 'İstifadəçi adı və şifrə tələb olunur' },
        { status: 400 }
      )
    }

    const admin = await prisma.admin.findUnique({
      where: { username },
    })

    if (!admin || !admin.isActive) {
      return NextResponse.json(
        { error: 'Yanlış istifadəçi adı və ya şifrə' },
        { status: 401 }
      )
    }

    const isValidPassword = await bcrypt.compare(password, admin.password)

    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Yanlış istifadəçi adı və ya şifrə' },
        { status: 401 }
      )
    }

    // Create session
    const cookieStore = await cookies()
    cookieStore.set('admin_session', admin.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return NextResponse.json({
      success: true,
      admin: {
        id: admin.id,
        username: admin.username,
        name: admin.name,
      },
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Server xətası' },
      { status: 500 }
    )
  }
}



