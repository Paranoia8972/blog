import RSS from 'rss';
import { posts } from "#site/content";
import { siteConfig, SiteConfig } from '#config';
import { Metadata } from 'next';

export async function GET() {
    const feed = new RSS({
        title: siteConfig.name,
        description: siteConfig.description,
        site_url: siteConfig.url,
        feed_url: siteConfig.url + '/feed.xml',
        copyright: `${new Date().getFullYear()} ${siteConfig.name}`,
        language: 'en',
        pubDate: new Date(),
    });
    posts.filter(post => post.published).map((post) => {
        feed.item({
            title: post.title,
            guid: post.slug,
            url: siteConfig.url + '/' + post.slug,
            date: post.date,
            description: post.description,
            author: siteConfig.author,
            categories: post.tags,
        });
    });

    return new Response(feed.xml({ indent: true }), {
        headers: {
            'Content-Type': 'application/atom+xml; charset=utf-8',
        },
    });
}