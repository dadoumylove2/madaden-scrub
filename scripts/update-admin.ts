import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const adminEmail = 'Layepam19@gmail.com'
  
  // Find the user with this email and update their role to ADMIN
  const user = await prisma.user.findFirst({
    where: { email: adminEmail }
  })

  if (user) {
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { role: 'ADMIN' }
    })
    console.log('User updated to ADMIN:', updatedUser)
  } else {
    console.log('No user found with email:', adminEmail)
    
    // List all users to see what we have
    const allUsers = await prisma.user.findMany()
    console.log('All users in database:')
    allUsers.forEach(user => {
      console.log({
        id: user.id,
        email: user.email,
        clerkId: user.clerkId,
        role: user.role,
        name: user.name
      })
    })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
