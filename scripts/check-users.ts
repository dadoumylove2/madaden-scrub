import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const users = await prisma.user.findMany()
  
  console.log('Current users in database:')
  users.forEach(user => {
    console.log({
      id: user.id,
      email: user.email,
      clerkId: user.clerkId,
      role: user.role,
      name: user.name
    })
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
