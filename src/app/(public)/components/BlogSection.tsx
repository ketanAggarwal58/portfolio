"use client";

import Link from 'next/link';

export type BlogPost = {
    slug: string;
    title: string;
    tag: string;
    readTime: string;
    date: string;
    excerpt: string;
};

const PLACEHOLDER_POSTS: BlogPost[] = [
    {
        slug: 'cut-ec2-bill-60-percent',
        title: 'How I cut my EC2 bill by 60% without changing instance size',
        tag: 'devops',
        readTime: '5 min',
        date: 'Mar 2025',
        excerpt: 'Most AWS bills are inflated by a handful of dumb defaults. Here is exactly what I changed.',
    },
    {
        slug: 'ml-pipeline-cheap-server',
        title: 'Building a lightweight ML pipeline on a ₹500/month server',
        tag: 'data science',
        readTime: '8 min',
        date: 'Feb 2025',
        excerpt: 'You do not need a GPU to run useful ML in production. This is how I did it.',
    },
    {
        slug: 'lessons-cto-bootstrap',
        title: 'What I learned being CTO at a bootstrapped startup before 25',
        tag: 'startup',
        readTime: '6 min',
        date: 'Jan 2025',
        excerpt: 'The technical decisions were the easy part. Here is everything else.',
    },
    {
        slug: 'docker-compose-ec2-zero-downtime',
        title: 'Docker Compose on EC2 — a practical zero-downtime deploy setup',
        tag: 'devops',
        readTime: '4 min',
        date: 'Dec 2024',
        excerpt: 'No k8s, no ECS. Just Compose, Nginx, and a deploy script that works every time.',
    },
];

export default function BlogSection({ posts = PLACEHOLDER_POSTS }: { posts?: BlogPost[] }) {
    return (
        <section id="blog" style={{ padding: '4rem 2rem', maxWidth: '860px', margin: '0 auto' }}>

            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '2rem' }}>
                <div>
                    <div style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        color: 'var(--text-tertiary)',
                        letterSpacing: '0.1em',
                        marginBottom: '6px',
                    }}>
            // recent writing
                    </div>
                    <h2 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '28px',
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                        letterSpacing: '-0.02em',
                    }}>
                        From the blog
                    </h2>
                </div>
                <Link href="/blog" style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    color: 'var(--text-secondary)',
                    borderBottom: '0.5px solid var(--border-hover)',
                    paddingBottom: '2px',
                    transition: 'color 0.15s',
                }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
                >
                    all posts →
                </Link>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
                gap: '1px',
                background: 'var(--border)',
                border: '0.5px solid var(--border)',
                borderRadius: '12px',
                overflow: 'hidden',
            }}>
                {posts.map((post) => (
                    <Link key={post.slug} href={`/blog/${post.slug}`} style={{
                        display: 'block',
                        padding: '1.5rem',
                        background: 'var(--bg-surface)',
                        transition: 'background 0.15s',
                    }}
                        onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-elevated)')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'var(--bg-surface)')}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                            <span style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '10px',
                                color: 'var(--accent)',
                                letterSpacing: '0.06em',
                                textTransform: 'lowercase',
                            }}>
                                {post.tag}
                            </span>
                            <span style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '10px',
                                color: 'var(--text-tertiary)',
                            }}>
                                {post.readTime} read · {post.date}
                            </span>
                        </div>
                        <h3 style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '15px',
                            fontWeight: 600,
                            color: 'var(--text-primary)',
                            lineHeight: 1.4,
                            marginBottom: '0.5rem',
                            letterSpacing: '-0.01em',
                        }}>
                            {post.title}
                        </h3>
                        <p style={{
                            fontSize: '13px',
                            color: 'var(--text-secondary)',
                            lineHeight: 1.6,
                        }}>
                            {post.excerpt}
                        </p>
                    </Link>
                ))}
            </div>
        </section>
    );
}