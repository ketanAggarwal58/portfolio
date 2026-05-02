'use client';
import { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import { BlogPost, formatDate, formatViews } from '../Blog';

const TAG_COLORS: Record<string, string> = {
    devops: 'var(--accent)',
    'data science': '#7F77DD',
    startup: '#4ade80',
    databases: '#60a5fa',
    backend: '#f97316',
    frontend: '#e879f9',
};

function tagColor(tag: string) {
    return TAG_COLORS[tag] ?? 'var(--text-tertiary)';
}

function FeaturedPost({ post }: { post: BlogPost }) {
    return (
        <Link href={`/blogs/${post.slug}`} style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2rem',
            padding: '2rem',
            background: 'var(--bg-surface)',
            border: '0.5px solid var(--border)',
            borderRadius: '12px',
            marginBottom: '1px',
            transition: 'border-color 0.15s',
            textDecoration: 'none',
        }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--border-hover)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
        >
            <div>
                <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    color: 'var(--accent)',
                    letterSpacing: '0.08em',
                    marginBottom: '1rem',
                }}>
                    ★ featured
                </div>
                <h2 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(20px, 3vw, 28px)',
                    fontWeight: 800,
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.2,
                    marginBottom: '1rem',
                }}>
                    {post.title}
                </h2>
                <p style={{
                    fontSize: '14px',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.75,
                }}>
                    {post.excerpt}
                </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: '8px' }}>
                <div style={{ borderTop: '0.5px solid var(--border)', paddingTop: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                        <span style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '11px',
                            padding: '3px 8px',
                            borderRadius: '4px',
                            border: `0.5px solid ${tagColor(post.tag)}`,
                            color: tagColor(post.tag),
                        }}>
                            {post.tag}
                        </span>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-tertiary)' }}>
                                {post.readTime} min read
                            </span>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-tertiary)' }}>
                                {formatViews(post.viewCount)} views
                            </span>
                        </div>
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '8px' }}>
                        {formatDate(post.publishedAt)}
                    </div>
                </div>
            </div>
        </Link>
    );
}

function EditorialRow({ post, index }: { post: BlogPost; index: number }) {
    const ref = useRef<HTMLAnchorElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.1 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <Link ref={ref} href={`/blog/${post.slug}`} style={{
            display: 'grid',
            gridTemplateColumns: '80px 1fr auto',
            gap: '1.5rem',
            alignItems: 'start',
            padding: '1.25rem 0',
            borderBottom: '0.5px solid var(--border)',
            textDecoration: 'none',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(8px)',
            transition: `opacity 0.4s ease ${index * 0.05}s, transform 0.4s ease ${index * 0.05}s`,
        }}
            onMouseEnter={e => { (e.currentTarget.querySelector('.row-title') as HTMLElement).style.color = 'var(--accent)'; }}
            onMouseLeave={e => { (e.currentTarget.querySelector('.row-title') as HTMLElement).style.color = 'var(--text-primary)'; }}
        >
            {/* Date column */}
            <div style={{ paddingTop: '3px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-tertiary)', lineHeight: 1.5 }}>
                    {formatDate(post.publishedAt).split(' ').map((part, i) => (
                        <div key={i}>{part}</div>
                    ))}
                </div>
            </div>

            {/* Title + excerpt */}
            <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap', textTransform: 'capitalize' }}>
                    <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '10px',
                        color: tagColor(post.tag),
                        letterSpacing: '0.06em',
                    }}>
                        {post.tag}
                    </span>
                </div>
                <h3 className="row-title" style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '16px',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.01em',
                    lineHeight: 1.35,
                    marginBottom: '6px',
                    transition: 'color 0.15s',
                }}>
                    {post.title}
                </h3>
                <p style={{
                    fontSize: '13px',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.65,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                }}>
                    {post.excerpt}
                </p>
            </div>

            {/* Meta column */}
            <div style={{ textAlign: 'right', paddingTop: '3px', flexShrink: 0 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-tertiary)', marginBottom: '4px' }}>
                    {post.readTime} min
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-tertiary)' }}>
                    {formatViews(post.viewCount)} views
                </div>
            </div>
        </Link>
    );
}

export default function BlogClient({
    initialPosts,
    allTags,
}: {
    initialPosts: BlogPost[];
    allTags: string[];
}) {
    const [query, setQuery] = useState('');
    const [activeTag, setActiveTag] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState(initialPosts);
    const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

    async function refetch(q: string, tag: string | null) {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (q) params.set('q', q);
            if (tag) params.set('tag', tag);
            const res = await fetch(`/api/blog?${params}`);
            if (res.ok) {
                const data = await res.json();
                setPosts(data.posts);
            }
        } catch {
            // network error — keep current posts
        } finally {
            setLoading(false);
        }
    }

    function handleSearch(val: string) {
        setQuery(val);
        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => refetch(val, activeTag), 350);
    }

    function handleTag(tag: string | null) {
        setActiveTag(tag);
        refetch(query, tag);
    }

    const featured = useMemo(() => posts.find(p => p.featured), [posts]);
    const rest = useMemo(() => posts.filter(p => !p.featured || activeTag || query), [posts, featured, activeTag, query]);

    const displayList = activeTag || query ? posts : rest;

    return (
        <div style={{ maxWidth: '860px', margin: '0 auto', padding: '4rem 2rem 6rem' }}>

            {/* Header */}
            <div style={{ marginBottom: '2.5rem' }}>
                <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: 'var(--text-tertiary)',
                    letterSpacing: '0.1em',
                    marginBottom: '6px',
                }}>
          // Writing
                </div>
                <h1 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(32px, 5vw, 52px)',
                    fontWeight: 800,
                    letterSpacing: '-0.02em',
                    color: 'var(--text-primary)',
                    lineHeight: 1.1,
                    marginBottom: '0.75rem',
                }}>
                    The blog
                </h1>
                <p style={{ fontSize: '15px', color: 'var(--text-secondary)', maxWidth: '460px', lineHeight: 1.7 }}>
                    Practical writing on cloud infrastructure, data science, and lessons from building things.
                    No fluff — only things I have actually shipped or broken.
                </p>
            </div>

            {/* Search + filter bar */}
            <div style={{
                display: 'flex',
                gap: '10px',
                marginBottom: '2.5rem',
                alignItems: 'center',
                flexWrap: 'wrap',
            }}>
                <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
                    <svg style={{
                        position: 'absolute', left: '12px', top: '50%',
                        transform: 'translateY(-50%)',
                        width: '14px', height: '14px', pointerEvents: 'none',
                    }} viewBox="0 0 16 16" fill="none">
                        <circle cx="6.5" cy="6.5" r="4.5" stroke="var(--text-tertiary)" strokeWidth="1" />
                        <line x1="10" y1="10" x2="14" y2="14" stroke="var(--text-tertiary)" strokeWidth="1" strokeLinecap="round" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search posts..."
                        value={query}
                        onChange={e => handleSearch(e.target.value)}
                        style={{
                            width: '100%',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '13px',
                            padding: '9px 12px 9px 34px',
                            borderRadius: '6px',
                            background: 'var(--bg-surface)',
                            border: '0.5px solid var(--border)',
                            color: 'var(--text-primary)',
                            outline: 'none',
                            transition: 'border-color 0.15s',
                        }}
                        onFocus={e => (e.target.style.borderColor = 'var(--border-hover)')}
                        onBlur={e => (e.target.style.borderColor = 'var(--border)')}
                    />
                </div>

                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    <button
                        onClick={() => handleTag(null)}
                        style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '11px',
                            padding: '6px 12px',
                            borderRadius: '5px',
                            border: `0.5px solid ${activeTag === null ? 'var(--text-primary)' : 'var(--border)'}`,
                            background: activeTag === null ? 'var(--text-primary)' : 'transparent',
                            color: activeTag === null ? 'var(--bg)' : 'var(--text-secondary)',
                            cursor: 'pointer',
                            transition: 'all 0.15s',
                            textTransform: 'capitalize'
                        }}
                    >
                        all
                    </button>
                    {allTags.map(tag => (
                        <button
                            key={tag}
                            onClick={() => handleTag(tag === activeTag ? null : tag)}
                            style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '11px',
                                padding: '6px 12px',
                                borderRadius: '5px',
                                border: `0.5px solid ${activeTag === tag ? tagColor(tag) : 'var(--border)'}`,
                                background: activeTag === tag ? 'transparent' : 'transparent',
                                color: activeTag === tag ? tagColor(tag) : 'var(--text-secondary)',
                                cursor: 'pointer',
                                transition: 'all 0.15s',
                                textTransform: 'capitalize'
                            }}
                        >
                            {tag}
                        </button>
                    ))}
                </div>

                {loading && (
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-tertiary)' }}>
                        loading...
                    </span>
                )}
            </div>

            {/* Featured post — only shown when no filter/search active */}
            {!activeTag && !query && featured && (
                <div style={{ marginBottom: '2rem' }}>
                    <FeaturedPost post={featured} />
                </div>
            )}

            {/* Post count */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: '0.75rem',
                borderBottom: '0.5px solid var(--border)',
                marginBottom: '0',
            }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-tertiary)' }}>
                    {displayList.length} {displayList.length === 1 ? 'post' : 'posts'}
                    {activeTag ? ` in ${activeTag}` : ''}
                    {query ? ` matching "${query}"` : ''}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-tertiary)' }}>
                    newest first
                </span>
            </div>

            {/* Editorial list */}
            {displayList.length > 0 ? (
                displayList.map((post, i) => (
                    <EditorialRow key={post.id} post={post} index={i} />
                ))
            ) : (
                <div style={{
                    padding: '4rem 0',
                    textAlign: 'center',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '13px',
                    color: 'var(--text-tertiary)',
                }}>
                    no posts found — try a different search or tag
                </div>
            )}
        </div>
    );
}