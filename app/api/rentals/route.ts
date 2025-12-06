import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      firstName,
      lastName,
      email,
      phone,
      company,
      address,
      startDate,
      endDate,
      notes,
      machineryId,
      totalPrice,
    } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !startDate || !endDate || !machineryId) {
      return NextResponse.json(
        { error: 'Bütün məcburi sahələr doldurulmalıdır' },
        { status: 400 }
      )
    }

    // Check if machinery exists and is available
    const machinery = await prisma.machinery.findUnique({
      where: { id: machineryId },
    })

    if (!machinery) {
      return NextResponse.json(
        { error: 'Maşın tapılmadı' },
        { status: 404 }
      )
    }

    if (!machinery.isAvailable) {
      return NextResponse.json(
        { error: 'Bu maşın hazırda mövcud deyil' },
        { status: 400 }
      )
    }

    // Find or create customer
    let customer = await prisma.customer.findUnique({
      where: { email },
    })

    if (!customer) {
      customer = await prisma.customer.create({
        data: {
          firstName,
          lastName,
          email,
          phone,
          company,
          address,
        },
      })
    } else {
      // Update customer info if provided
      customer = await prisma.customer.update({
        where: { id: customer.id },
        data: {
          firstName,
          lastName,
          phone,
          company: company || customer.company,
          address: address || customer.address,
        },
      })
    }

    // Create rental
    const rental = await prisma.rental.create({
      data: {
        machineryId,
        customerId: customer.id,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        totalPrice: parseFloat(totalPrice),
        status: 'pending',
        notes,
      },
    })

    return NextResponse.json(
      {
        message: 'İcarə sorğusu uğurla yaradıldı',
        rental: {
          id: rental.id,
          status: rental.status,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating rental:', error)
    return NextResponse.json(
      { error: 'İcarə sorğusu yaradılarkən xəta baş verdi' },
      { status: 500 }
    )
  }
}






