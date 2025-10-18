import type { Metadata } from "next"

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  type?: "website" | "article" | "product"
}

export function generateSEO({
  title = "Madaden - Engineered Scrubs. Thoughtful Comfort.",
  description = "Premium nursing scrubs with attached undershirt. Clean lines, secure coverage, and all-day performance for healthcare professionals.",
  keywords = "nursing scrubs, medical scrubs, healthcare apparel, antimicrobial scrubs, stretch scrubs, premium scrubs",
  image = "/images/logo.png",
  url = "https://madaden.com",
  type = "website",
}: SEOProps = {}): Metadata {
  return {
    title,
    description,
    keywords,
    metadataBase: new URL("https://madaden.com"),
    authors: [{ name: "Madaden" }],
    creator: "Madaden",
    publisher: "Madaden",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type,
      locale: "en_US",
      url,
      title,
      description,
      siteName: "Madaden",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@madaden",
    },
    alternates: {
      canonical: url,
    },
  }
}

export function generateProductSchema(product: {
  name: string
  description: string
  price: number
  image: string
  brand?: string
  category?: string
  availability?: string
  rating?: number
  reviewCount?: number
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    brand: {
      "@type": "Brand",
      name: product.brand || "Madaden",
    },
    category: product.category || "Medical Scrubs",
    image: product.image,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "USD",
      availability: `https://schema.org/${product.availability || "InStock"}`,
      seller: {
        "@type": "Organization",
        name: "Madaden",
      },
    },
    aggregateRating: product.rating
      ? {
          "@type": "AggregateRating",
          ratingValue: product.rating,
          reviewCount: product.reviewCount || 0,
          bestRating: 5,
          worstRating: 1,
        }
      : undefined,
  }
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Madaden",
    description: "Premium healthcare apparel designed for comfort, performance, and style.",
    url: "https://madaden.com",
    logo: "https://madaden.com/images/logo.png",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "1-800-MADADEN",
      contactType: "Customer Service",
      email: "info@madaden.com",
      availableLanguage: "English",
    },
    sameAs: ["https://instagram.com/madaden", "https://facebook.com/madaden", "https://linkedin.com/company/madaden"],
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Healthcare Blvd, Suite 100",
      addressLocality: "Medical City",
      addressRegion: "MC",
      postalCode: "12345",
      addressCountry: "US",
    },
  }
}
