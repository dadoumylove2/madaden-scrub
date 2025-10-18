import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "./db";

export async function getCurrentUser() {
  const { userId } = await auth();
  if (!userId) return null;

  // First, try to find user by clerkId
  let dbUser = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  // If user doesn't exist, create them
  if (!dbUser) {
    // Get user details from Clerk
    const user = await currentUser();
    if (!user) return null;

    const email = user.emailAddresses[0]?.emailAddress || '';
    const name = `${user.firstName || ''} ${user.lastName || ''}`.trim();
    
    // Check if this is the admin user
    const isAdmin = email === 'Layepam19@gmail.com';
    
    // Create a new user record
    dbUser = await prisma.user.create({
      data: {
        clerkId: userId,
        email: email,
        name: name,
        role: isAdmin ? 'ADMIN' : 'USER',
      },
    });
  }

  return dbUser;
}

export async function isAdmin() {
  const user = await getCurrentUser();
  if (!user) return false;
  
  // Check if the user's email matches admin email
  if (user.email === 'Layepam19@gmail.com') {
    // Update the user's role to ADMIN if it's not already
    if (user.role !== 'ADMIN') {
      await prisma.user.update({
        where: { id: user.id },
        data: { role: 'ADMIN' }
      });
    }
    return true;
  }
  
  return user.role === "ADMIN";
}

export async function requireAdmin() {
  const user = await getCurrentUser();
  if (user?.role !== "ADMIN") {
    throw new Error("Admin access required");
  }
  return user;
}
