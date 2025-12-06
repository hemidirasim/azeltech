import { cookies } from 'next/headers'
import { prisma } from './prisma'

export async function getAdmin() {
  try {
    const cookieStore = await cookies()
    const sessionId = cookieStore.get('admin_session')?.value

    if (!sessionId) {
      return null
    }

    const admin = await prisma.admin.findUnique({
      where: { id: sessionId },
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
        isActive: true,
      },
    })

    if (!admin || !admin.isActive) {
      return null
    }

    return admin
  } catch (error) {
    console.error('Auth error:', error)
    return null
  }
}






