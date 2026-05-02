'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import AdminShell from '../components/AdminShell';
import { useAuth, authHeaders, CMS_URL } from '../../../../lib/auth';
import { BlogPost, formatDate, formatViews } from '../../../(public)/blogs/Blog';

type Stats = { total: number; published: number; drafts: number; totalViews: number };

export default function DashboardPage() {
    const { token } = useAuth();
    const [stats, setStats] = useState<Stats | null>(null);
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!token) return;
        Promise.all([
            fetch(`${CMS_URL}/api/admin/stats`, { headers: authHeaders(token) }).then(r => r.json()),
            fetch(`${CMS_URL}/api/admin/posts?limit=8`, { headers: authHeaders(token) }).then(r => r.json()),
        ]).then(([s, p]) => {
            setStats(s);
            setPosts(p.posts ?? []);
        }).catch(() => {
            // fallback for dev
            setStats({ total: 8, published: 6, drafts: 2, totalViews: 12990 });
            setPosts([]);
        }).finally(() => setLoading(false));
    }, [token]);

    const STAT_CARDS = stats ? [
        { label: 'total posts', value: stats.total },
        { label: 'published', value: stats.published },
        { label: 'drafts', value: stats.drafts },
        { label: 'total views', value: formatViews(stats.totalViews) },
    ] : [];

    return (
        <AdminShell>
            <div style={{ padding: '2.5rem', maxWidth: '900px' }}>

                <div style={{ marginBottom: '2rem' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-tertiary)', letterSpacing: '0.1em', marginBottom: '4px' }}>
            // overview
                    </div>
                    <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
                        Dashboard
                    </h1>
                </div>

                {/* Stat cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '2.5rem' }}>
                    {loading ? Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} style={{ height: '80px', background: 'var(--bg-surface)', borderRadius: '8px', border: '0.5px solid var(--border)' }} />
                    )) : STAT_CARDS.map(({ label, value }) => (
                        <div key={label} style={{ background: 'var(--bg-surface)', border: '0.5px solid var(--border)', borderRadius: '8px', padding: '1rem' }}>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-tertiary)', marginBottom: '6px' }}>{label}</div>
                            <div style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>{value}</div>
                        </div>
                    ))}
                </div>

                {/* Recent posts */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-secondary)' }}>recent posts</div>
                    <Link href="/admin/posts/new" style={{
                        fontFamily: 'var(--font-mono)', fontSize: '12px',
                        padding: '6px 14px', borderRadius: '6px',
                        background: 'var(--accent)', color: '#0a0a0a',
                        textDecoration: 'none', fontWeight: 500,
                    }}>
                        + new post
                    </Link>
                </div>

                <div style={{ background: 'var(--bg-surface)', border: '0.5px solid var(--border)', borderRadius: '10px', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                        <thead>
                            <tr style={{ borderBottom: '0.5px solid var(--border)' }}>
                                {['title', 'tag', 'status', 'views', 'date', ''].map(h => (
                                    <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-tertiary)', fontWeight: 400 }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {posts.length === 0 ? (
                                <tr><td colSpan={6} style={{ padding: '2rem', textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-tertiary)' }}>no posts yet — create your first one</td></tr>
                            ) : posts.map(post => (
                                <tr key={post.id} style={{ borderBottom: '0.5px solid var(--border)' }}
                                    onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-elevated)')}
                                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                                >
                                    <td style={{ padding: '12px 14px', color: 'var(--text-primary)', fontWeight: 500, maxWidth: '280px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{post.title}</td>
                                    <td style={{ padding: '12px 14px' }}>
                                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--accent)', padding: '2px 6px', border: '0.5px solid var(--accent)', borderRadius: '4px' }}>{post.tag}</span>
                                    </td>
                                    <td style={{ padding: '12px 14px' }}>
                                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', padding: '2px 8px', borderRadius: '4px', background: post.featured ? 'var(--green-dim)' : 'var(--bg-elevated)', color: post.featured ? 'var(--green)' : 'var(--text-tertiary)', border: `0.5px solid ${post.featured ? 'var(--green)' : 'var(--border)'}` }}>
                                            {post.featured ? 'featured' : 'published'}
                                        </span>
                                    </td>
                                    <td style={{ padding: '12px 14px', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-tertiary)' }}>{formatViews(post.viewCount)}</td>
                                    <td style={{ padding: '12px 14px', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-tertiary)' }}>{formatDate(post.publishedAt)}</td>
                                    <td style={{ padding: '12px 14px' }}>
                                        <Link href={`/admin/posts/${post.id}`} style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-secondary)', textDecoration: 'none' }}
                                            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                                            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
                                        >edit →</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </AdminShell>
    );
}