'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '../../../../lib/auth';

const NAV = [
    { label: 'dashboard', href: '/admin/dashboard', icon: '▦' },
    { label: 'posts', href: '/admin/posts', icon: '≡' },
    { label: 'new post', href: '/admin/posts/new', icon: '+' },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
    const { token, loading, logout } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!loading && !token) router.replace('/admin/login');
    }, [token, loading, router]);

    if (loading || !token) return null;

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>

            {/* Sidebar */}
            <aside style={{
                width: '200px',
                flexShrink: 0,
                background: 'var(--bg-surface)',
                borderRight: '0.5px solid var(--border)',
                display: 'flex',
                flexDirection: 'column',
                padding: '1.5rem 0',
            }}>
                <div style={{ padding: '0 1.25rem 1.5rem', borderBottom: '0.5px solid var(--border)' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)' }}>
                        ketan.dev
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-tertiary)', marginTop: '2px' }}>
            // admin panel
                    </div>
                </div>

                <nav style={{ flex: 1, padding: '1rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    {NAV.map(({ label, href, icon }) => {
                        const active = pathname === href || (href !== '/admin/dashboard' && pathname.startsWith(href));
                        return (
                            <Link key={href} href={href} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                padding: '8px 12px',
                                borderRadius: '6px',
                                background: active ? 'var(--accent-dim)' : 'transparent',
                                border: active ? '0.5px solid var(--accent)' : '0.5px solid transparent',
                                fontFamily: 'var(--font-mono)',
                                fontSize: '12px',
                                color: active ? 'var(--accent)' : 'var(--text-secondary)',
                                transition: 'all 0.15s',
                                textDecoration: 'none',
                            }}
                                onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'var(--bg-elevated)'; }}
                                onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
                            >
                                <span style={{ fontSize: '14px', opacity: 0.7 }}>{icon}</span>
                                {label}
                            </Link>
                        );
                    })}
                </nav>

                <div style={{ padding: '1rem 0.75rem', borderTop: '0.5px solid var(--border)' }}>
                    <Link href="/" target="_blank" style={{
                        display: 'flex', alignItems: 'center', gap: '10px',
                        padding: '8px 12px', borderRadius: '6px',
                        fontFamily: 'var(--font-mono)', fontSize: '12px',
                        color: 'var(--text-tertiary)', textDecoration: 'none',
                        transition: 'color 0.15s',
                    }}
                        onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-tertiary)')}
                    >
                        <span style={{ fontSize: '14px' }}>↗</span> view site
                    </Link>
                    <button onClick={logout} style={{
                        display: 'flex', alignItems: 'center', gap: '10px',
                        padding: '8px 12px', borderRadius: '6px', width: '100%',
                        fontFamily: 'var(--font-mono)', fontSize: '12px',
                        color: 'var(--text-tertiary)', background: 'none',
                        border: 'none', cursor: 'pointer', transition: 'color 0.15s',
                        marginTop: '2px',
                    }}
                        onMouseEnter={e => (e.currentTarget.style.color = '#e24b4a')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-tertiary)')}
                    >
                        <span style={{ fontSize: '14px' }}>×</span> sign out
                    </button>
                </div>
            </aside>

            {/* Main content */}
            <main style={{ flex: 1, overflow: 'auto', background: 'var(--bg)' }}>
                {children}
            </main>
        </div>
    );
}