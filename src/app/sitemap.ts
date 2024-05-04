import { MetadataRoute } from 'next'

import { posts } from '#site/content'
import { siteConfig } from '#config'
import { getAllTags, sortTagsByCount } from '@/lib/utils'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const sitemapPost: MetadataRoute.Sitemap = posts
        .filter(posts => posts.published)
        .map((post) => {
            return {
                url: `${siteConfig.url}/post/${post.slugAsParams}`,
                priority: 1.0,
                changeFrequency: 'weekly',
                lastModified: post.date
            }
        });
    const tags = getAllTags(posts)
    const sortedTags = sortTagsByCount(tags)

    const sitemapPostTags: MetadataRoute.Sitemap = sortedTags.map((tag) => {
        return {
            url: `${siteConfig.url}/tags/${tag}`,
            priority: 1.0,
            changeFrequency: 'weekly'
        }
    })

    return [
        {
            url: `${siteConfig.url}`,
            priority: 1.0,
            changeFrequency: 'weekly',
            lastModified: new Date()
        },
        {
            url: `${siteConfig.url}/tags`,
            priority: 1.0,
            changeFrequency: 'weekly',
            lastModified: new Date()
        },
        {
            url: `${siteConfig.url}/posts`,
            priority: 1.0,
            changeFrequency: 'weekly',
            lastModified: new Date()
        },
        {
            url: `${siteConfig.url}/sitemap.xml`,
            priority: 1.0,
            changeFrequency: 'weekly',
            lastModified: new Date()
        },
        {
            url: `${siteConfig.url}/feed.xml`,
            priority: 1.0,
            changeFrequency: 'weekly',
            lastModified: new Date()
        },
        ...sitemapPost,
        ...sitemapPostTags
    ]
}