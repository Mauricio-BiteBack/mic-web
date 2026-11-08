import type { Metadata } from 'next'
import HomePageClient from './HomePageClient'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Manager International Channels S.A.C.',
  alternateName: 'MIC',
  url: 'https://www.mic.pe',
  logo: 'https://www.mic.pe/logo_3D.png',
  sameAs: [
    'https://www.facebook.com/mic.tv.peru',
    'https://www.instagram.com/mic.canales_/',
    'https://www.linkedin.com/company/mictv/',
    'https://www.youtube.com/channel/UCZY4SSx7K92gtaExLV4lADw',
    'https://www.tiktok.com/@mictvperu2022',
  ],
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Calle German Schreiber Nro. 210, Urb. Santa Ana',
    addressLocality: 'San Isidro',
    addressRegion: 'Lima',
    addressCountry: 'PE',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+51-991-688-980',
    contactType: 'customer service',
    email: 'info@mic.pe',
  },
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'MIC',
  url: 'https://www.mic.pe',
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <HomePageClient />
    </>
  )
}
