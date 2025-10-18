import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { USPBar } from "@/components/usp-bar"
import { BrandStory } from "@/components/brand-story"
import { FeaturedProduct } from "@/components/featured-product"
import { MaterialsFit } from "@/components/materials-fit"
import { FeaturesSection } from "@/components/features-section"
import { InnovationSection } from "@/components/innovation-section"
import { StatsSection } from "@/components/stats-section"
import { Testimonials } from "@/components/testimonials"
import { CTASection } from "@/components/cta-section"
import { NewsletterForm } from "@/components/newsletter-form"
import { UndershirtSleeveSection } from "@/components/undershirt-sleeve-section"
import { generateSEO, generateOrganizationSchema } from "@/lib/seo"

export const metadata = generateSEO({
  title: "Madaden - Engineered Scrubs. Thoughtful Comfort.",
  description:
    "Premium nursing scrubs with attached undershirt. Clean lines, secure coverage, and all-day performance for healthcare professionals.",
  url: "https://madaden.com",
})

export default function HomePage() {
  const organizationSchema = generateOrganizationSchema()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <UndershirtSleeveSection />
        <USPBar />
        <BrandStory />
        <FeaturedProduct />
        <MaterialsFit />
        <FeaturesSection />
        <InnovationSection />
        <StatsSection />
        <Testimonials />
        <CTASection />
        <NewsletterForm />
      </main>
      <Footer />
    </>
  )
}
