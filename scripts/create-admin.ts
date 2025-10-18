import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function createAdmin() {
  const adminEmail = 'Layepam19@gmail.com'
  const adminClerkId = 'admin_user' // This will be replaced by actual Clerk ID when you sign in

  try {
    // Check if admin user already exists
    const existingAdmin = await prisma.user.findFirst({
      where: {
        email: adminEmail
      }
    })

    if (existingAdmin) {
      console.log('Admin user already exists:', existingAdmin)
      
      // Update role to ADMIN if not already
      if (existingAdmin.role !== 'ADMIN') {
        const updatedUser = await prisma.user.update({
          where: { id: existingAdmin.id },
          data: { role: 'ADMIN' }
        })
        console.log('User updated to ADMIN:', updatedUser)
      }
    } else {
      // Create new admin user
      const adminUser = await prisma.user.create({
        data: {
          email: adminEmail,
          clerkId: adminClerkId,
          name: 'Saad Rehman',
          role: 'ADMIN'
        }
      })
      console.log('Admin user created:', adminUser)
    }
  } catch (error) {
    console.error('Error creating admin user:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createAdmin()
