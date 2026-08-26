import { MetadataRoute } from 'next'

import { CASES } from '@content'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://alkontv.github.io'

  const baseUrl = siteUrl.endsWith('/') ? siteUrl : `${siteUrl}/`

  const pages: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${baseUrl}3d`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}resume`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ]

  return pages.concat(
    CASES.map((c) => ({
      url: `${baseUrl}cases/${c.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  )
}
