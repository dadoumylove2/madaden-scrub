import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Clear existing products
  await prisma.product.deleteMany()

  // Add sample products
  const products = [
    {
      name: "Madaden Featured Scrub Set",
      slug: "madaden-featured-scrub",
      description: "Premium scrubs with attached undershirt for secure coverage and all-day comfort",
      price: 89.99,
      image: "/teal-nursing-scrub-top-front-view--medical-apparel.png",
      category: "Scrub Sets",
      inStock: true,
    },
    {
      name: "Professional Nursing Scrubs",
      slug: "professional-nursing-scrubs",
      description: "High-quality nursing scrubs designed for comfort during long shifts",
      price: 79.99,
      image: "/teal-nursing-scrub-pants-side-view--medical-appare.png",
      category: "Scrub Sets",
      inStock: true,
    },
    {
      name: "Antimicrobial Scrub Top",
      slug: "antimicrobial-scrub-top",
      description: "Antimicrobial finish keeps scrubs fresh throughout your shift",
      price: 45.99,
      image: "/teal-nursing-scrub-fabric-close-up--antimicrobial-.png",
      category: "Scrub Tops",
      inStock: true,
    },
    {
      name: "Comfort Fit Scrub Pants",
      slug: "comfort-fit-scrub-pants",
      description: "4-way stretch fabric moves with you for maximum comfort",
      price: 39.99,
      image: "/teal-nursing-scrub-pocket-detail--secure-storage-s.png",
      category: "Scrub Pants",
      inStock: true,
    },
  ]

  for (const product of products) {
    await prisma.product.create({
      data: product,
    })
  }

  console.log('Products seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
