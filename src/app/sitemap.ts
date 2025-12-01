import { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const supabase = createClient()

    // Fetch all universities for dynamic routes
    const { data: universities } = await supabase
        .from('universities')
        .select('slug, created_at')

    const universityEntries: MetadataRoute.Sitemap = (universities || []).map((uni) => ({
        url: `https://zerttehub.kz/universities/${uni.slug}`,
        lastModified: new Date(uni.created_at),
        changeFrequency: 'weekly',
        priority: 0.8,
    }))

    return [
        {
            url: 'https://zerttehub.kz',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: 'https://zerttehub.kz/about',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: 'https://zerttehub.kz/contacts',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: 'https://zerttehub.kz/get-plan',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: 'https://zerttehub.kz/universities',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
        ...universityEntries,
    ]
}
