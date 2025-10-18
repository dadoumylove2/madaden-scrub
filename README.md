# Madaden Healthcare Apparel Website

A modern, production-ready marketing and pre-commerce website for Madaden, a premium healthcare apparel brand specializing in nursing scrubs with attached undershirts.

## Features

- **Modern Design**: Clean, clinical yet fashion-forward aesthetic with teal branding
- **Responsive**: Fully responsive design optimized for all devices (320px - 1440px+)
- **Accessibility**: WCAG AA compliant with proper focus states, ARIA labels, and keyboard navigation
- **Performance**: Optimized with Next.js 14, lazy loading, and efficient code splitting
- **SEO Ready**: Complete metadata, JSON-LD schema, and sitemap support
- **Theme Support**: Light/dark mode with smooth transitions
- **Integration Ready**: Built for easy Shopify and Klaviyo integration

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with CSS variables
- **Components**: shadcn/ui
- **Animations**: Framer Motion with reduced motion support
- **Icons**: Lucide React
- **Fonts**: Inter (body), Poppins (headings)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd madaden-website
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

\`\`\`
├── app/                    # Next.js App Router pages
│   ├── (marketing)/       # Marketing pages group
│   ├── products/          # Product catalog and details
│   ├── contact/           # Contact page
│   ├── privacy/           # Privacy policy
│   ├── terms/             # Terms of service
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── navbar.tsx        # Navigation component
│   ├── footer.tsx        # Footer component
│   └── ...               # Marketing components
├── lib/                  # Utility functions
│   ├── seo.ts           # SEO utilities
│   └── utils.ts         # General utilities
└── public/              # Static assets
    └── images/          # Product and brand images
\`\`\`

## Customization

### Brand Colors

The primary teal color is extracted from the logo. To customize:

1. Update CSS variables in `app/globals.css`:
\`\`\`css
:root {
  --color-primary: #4ECDC4; /* Your brand color */
  --color-primary-600: #3BA99F; /* Darker shade */
  --color-primary-400: #6FD4CC; /* Lighter shade */
}
\`\`\`

### Content Management

Content is currently hardcoded but structured for easy CMS integration:

- **Product Data**: Located in `app/products/[slug]/page.tsx`
- **Copy**: Centralized in component files for easy extraction
- **Images**: Stored in `public/images/` with descriptive names

### Adding Products

1. Add product images to `public/images/`
2. Update the products object in `app/products/[slug]/page.tsx`
3. Add the product to the catalog in `app/products/page.tsx`

### Integration Hooks

The website includes integration hooks for future e-commerce setup:

- **Newsletter**: `onSubscribe(email, name)` in `NewsletterForm`
- **Contact**: `onSubmit(formData)` in `ContactForm`
- **Product**: `onAddToCart(variant, qty)` in product pages

## SEO & Performance

### Metadata

Each page includes optimized metadata using the `generateSEO` utility:

\`\`\`typescript
export const metadata = generateSEO({
  title: "Page Title - Madaden",
  description: "Page description",
  url: "https://madaden.com/page",
})
\`\`\`

### JSON-LD Schema

Structured data is included for:
- Organization information
- Product details
- Breadcrumbs

### Performance Optimizations

- Image optimization with `next/image`
- Code splitting at route level
- Lazy loading for below-the-fold content
- Efficient CSS with Tailwind
- Reduced motion support

## Accessibility

- WCAG AA contrast ratios maintained
- Keyboard navigation support
- Screen reader optimized
- Focus management
- Skip links for main content
- Semantic HTML structure

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Other Platforms

The website is a standard Next.js application and can be deployed to:
- Netlify
- AWS Amplify
- Railway
- Any Node.js hosting provider

## Environment Variables

For production deployment, set:

\`\`\`env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
\`\`\`

## Future Enhancements

### Phase 2 - E-commerce Integration

- Shopify Storefront API integration
- Klaviyo email marketing
- Payment processing
- Inventory management
- Order tracking

### Phase 3 - Advanced Features

- User accounts and profiles
- Wishlist functionality
- Product reviews and ratings
- Size recommendation engine
- Live chat support

## Support

For questions or support:
- Email: info@madaden.com
- Documentation: This README
- Issues: GitHub Issues (if applicable)

## License

© 2024 Madaden. All rights reserved.
