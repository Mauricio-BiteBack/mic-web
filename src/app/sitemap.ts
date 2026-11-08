import type { MetadataRoute } from 'next'
import { CHANNELS } from '@/data/channels'

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://www.mic.pe'
const LASTMOD = '2026-11-08'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`,                           lastModified: LASTMOD, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE_URL}/catalogo`,                   lastModified: LASTMOD, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE_URL}/nosotros`,                   lastModified: LASTMOD, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/contacto`,                   lastModified: LASTMOD, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/servicios/canales-ip`,        lastModified: LASTMOD, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE_URL}/servicios/lineales`,          lastModified: LASTMOD, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/servicios/mic-carrier`,       lastModified: LASTMOD, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/consultoria-iptv-ott`,        lastModified: LASTMOD, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/noc-services-y-soporte`,      lastModified: LASTMOD, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/terminos`,                   lastModified: LASTMOD, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE_URL}/privacidad`,                 lastModified: LASTMOD, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE_URL}/libro-de-reclamaciones`,     lastModified: LASTMOD, changeFrequency: 'yearly',  priority: 0.3 },
  ]

  const channelPages: MetadataRoute.Sitemap = CHANNELS.map(ch => ({
    url: `${BASE_URL}/catalogo/${ch.id}`,
    lastModified: LASTMOD,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...channelPages]
}
