import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const username = process.argv[2] || 'admin'
  const password = process.argv[3] || 'admin123'
  const email = process.argv[4] || 'admin@azeltech.az'
  const name = process.argv[5] || 'Admin'

  const hashedPassword = await bcrypt.hash(password, 10)

  const admin = await prisma.admin.upsert({
    where: { username },
    update: {
      password: hashedPassword,
      email,
      name,
    },
    create: {
      username,
      password: hashedPassword,
      email,
      name,
      isActive: true,
    },
  })

  console.log('Admin yaradıldı:')
  console.log('Username:', admin.username)
  console.log('Email:', admin.email)
  console.log('Password:', password)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })






