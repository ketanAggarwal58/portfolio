'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import AdminShell from '../components/AdminShell';
import { useAuth, authHeaders, CMS_URL } from '../../../../lib/auth';
import { BlogPost, formatDate, formatViews, PLACEHOLDER_POSTS } from '../../../(public)/blogs/Blog';

export default function PostsPage() {
    const { token } = useAuth();
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');

    useEffect(() => {
        if (!token) return;
        fetch(`${CMS_URL}/api/admin/posts`, { headers: authHeaders(token) })
            .then(r => r.json())
            .then(data => setPosts(data.posts ?? []))
            .catch(() => setPosts(PLACEHOLDER_POSTS))
            .finally(() => setLoading(false));
    }, [token]);

    async function handleDelete(id: number) {
        if (!token || !confirm('Delete this post?')) return;
        await fetch(`${CMS_URL}/api/admin/posts/${id}`, { method: 'DELETE', headers: authHeaders(token) });
        setPosts(prev => prev.filter(p => p.id !== id));
    }

    const filtered = posts.filter(p => {
        if (filter === 'published') return p.featured || true; // adjust to your published field
        if (filter === 'draft') return false;
        return true;
    });

    return (
        <AdminShell>
            <div style={{ padding: '2.5rem', maxWidth: '960px' }}>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
                    <div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-tertiary)', letterSpacing: '0.1em', marginBottom: '4px' }}>
              // all posts
                        </div>
                        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
                            Posts
                        </h1>
                    </div>
                    <Link href="/admin/posts/new" style={{
                        fontFamily: 'var(--font-mono)', fontSize: '12px',
                        padding: '8px 18px', borderRadius: '6px',
                        background: 'var(--accent)', color: '#0a0a0a',
                        textDecoration: 'none', fontWeight: 500,
                    }}>
                        + new post
                    </Link>
                </div>

                {/* Filter tabs */}
                <div style={{ display: 'flex', gap: '4px', marginBottom: '1.5rem', background: 'var(--bg-surface)', border: '0.5px solid var(--border)', borderRadius: '8px', padding: '4px', width: 'fit-content' }}>
                    {(['all', 'published', 'draft'] as const).map(f => (
                        <button key={f} onClick={() => setFilter(f)} style={{
                            fontFamily: 'var(--font-mono)', fontSize: '11px',
                            padding: '5px 14px', borderRadius: '5px',
                            border: 'none', cursor: 'pointer',
                            background: filter === f ? 'var(--bg-elevated)' : 'transparent',
                            color: filter === f ? 'var(--text-primary)' : 'var(--text-tertiary)',
                            transition: 'all 0.15s',
                        }}>
                            {f}
                        </button>
                    ))}
                </div>

                <div style={{ background: 'var(--bg-surface)', border: '0.5px solid var(--border)', borderRadius: '10px', overflow: 'hidden' }}>
                    {loading ? (
                        <div style={{ padding: '3rem', textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-tertiary)' }}>
                            loading...
                        </div>
                    ) : (
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                            <thead>
                                <tr style={{ borderBottom: '0.5px solid var(--border)' }}>
                                    {['title', 'tag', 'featured', 'views', 'date', 'actions'].map(h => (
                                        <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-tertiary)', fontWeight: 400 }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.length === 0 ? (
                                    <tr><td colSpan={6} style={{ padding: '3rem', textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-tertiary)' }}>no posts yet</td></tr>
                                ) : filtered.map(post => (
                                    <tr key={post.id}
                                        onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-elevated)')}
                                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                                        style={{ borderBottom: '0.5px solid var(--border)', transition: 'background 0.1s' }}
                                    >
                                        <td style={{ padding: '13px 16px', color: 'var(--text-primary)', fontWeight: 500, maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {post.title}
                                        </td>
                                        <td style={{ padding: '13px 16px' }}>
                                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--accent)', padding: '2px 7px', border: '0.5px solid var(--accent)', borderRadius: '4px' }}>
                                                {post.tag}
                                            </span>
                                        </td>
                                        <td style={{ padding: '13px 16px' }}>
                                            {post.featured && (
                                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', padding: '2px 7px', borderRadius: '4px', background: 'var(--accent-dim)', color: 'var(--accent)', border: '0.5px solid var(--accent)' }}>
                                                    ★ featured
                                                </span>
                                            )}
                                        </td>
                                        <td style={{ padding: '13px 16px', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-tertiary)' }}>
                                            {formatViews(post.viewCount)}
                                        </td>
                                        <td style={{ padding: '13px 16px', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-tertiary)', whiteSpace: 'nowrap' }}>
                                            {formatDate(post.publishedAt)}
                                        </td>
                                        <td style={{ padding: '13px 16px' }}>
                                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                                <Link href={`/admin/posts/${post.id}`} style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.15s' }}
                                                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                                                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
                                                >
                                                    edit
                                                </Link>
                                                <span style={{ color: 'var(--border)', fontSize: '10px' }}>|</span>
                                                <button onClick={() => handleDelete(post.id)} style={{
                                                    fontFamily: 'var(--font-mono)', fontSize: '11px',
                                                    color: 'var(--text-tertiary)', background: 'none',
                                                    border: 'none', cursor: 'pointer', padding: 0,
                                                    transition: 'color 0.15s',
                                                }}
                                                    onMouseEnter={e => (e.currentTarget.style.color = '#e24b4a')}
                                                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-tertiary)')}
                                                >
                                                    delete
                                                </button>
                                                <span style={{ color: 'var(--border)', fontSize: '10px' }}>|</span>
                                                <Link href={`/blog/${post.slug}`} target="_blank" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-tertiary)', textDecoration: 'none', transition: 'color 0.15s' }}
                                                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
                                                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-tertiary)')}
                                                >
                                                    view ↗
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </AdminShell>
    );
}