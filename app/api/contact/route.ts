import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message } = body

    // Validate required fields
    if (!name || !email || !phone || !subject || !message) {
      return NextResponse.json(
        { error: 'Bütün sahələr doldurulmalıdır' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Düzgün email ünvanı daxil edin' },
        { status: 400 }
      )
    }

    // Create contact message
    const contactMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        phone,
        subject,
        message,
      },
    })

    return NextResponse.json(
      { 
        success: true, 
        message: 'Mesajınız uğurla göndərildi!',
        id: contactMessage.id 
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Contact form submission error:', error)
    return NextResponse.json(
      { error: 'Mesaj göndərilərkən xəta baş verdi' },
      { status: 500 }
    )
  }
}

