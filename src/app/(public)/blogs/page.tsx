import type { Metadata } from 'next';

import BlogClient from './components/BlogClient';
import { PLACEHOLDER_POSTS } from './Blog';

export const metadata: Metadata = {
    title: 'Blog — Ketan Aggarwal',
    description:
        'Writing about DevOps, cloud infrastructure, data science, and the lessons from building startups. No fluff, just things I have actually done.',

    openGraph: {
        title: 'Blog — Ketan Aggarwal',
        description: 'DevOps, cloud, ML, and startup engineering — written by someone who has done it.',
        url: 'https://ketanaggarwal.dev/blog',
    },
    alternates: { canonical: 'https://ketanaggarwal.dev/blog' },
};

export default async function BlogPage() {
    let posts = PLACEHOLDER_POSTS;
    let tags: string[] = [];

    try {
        const { fetchPosts } = await import('./Blog');
        const data = await fetchPosts();
        posts = data.posts;
        tags = data.tags;
    } catch {
        // CMS unavailable — fall through to placeholder data
        tags = [...new Set(PLACEHOLDER_POSTS.map(p => p.tag))];
    }

    return (
        <>

            <main>
                <BlogClient initialPosts={posts} allTags={tags} />
            </main>

        </>
    );
}