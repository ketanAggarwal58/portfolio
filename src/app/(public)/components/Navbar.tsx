'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <nav style={{
            position: 'sticky',
            top: 0,
            zIndex: 50,
            padding: '0 2rem',
            height: '56px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: scrolled ? 'var(--bg)' : 'transparent',
            borderBottom: scrolled ? '0.5px solid var(--border)' : '0.5px solid transparent',
            transition: 'background 0.3s, border-color 0.3s',
        }}>
            <Link href="/" style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                fontWeight: 500,
                color: 'var(--text-primary)',
                letterSpacing: '0.02em',
            }}>
                Ketan.dev
            </Link>

            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                {[
                    // { label: 'Why Audit?', href: '/why-audit' },
                    { label: 'About', href: '/about' },
                    { label: 'Blog', href: '/blogs' },
                    // { label: 'Recruit', href: '#recruit' },
                    { label: 'Public Speaking', href: '/speaking' },
                ].map(({ label, href }) => (
                    <Link key={label} href={href} style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '12px',
                        color: 'var(--text-secondary)',
                        transition: 'color 0.15s',
                    }}
                        onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
                    >
                        {label}
                    </Link>
                ))}

                {/* <Link href="#audit" style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    padding: '6px 14px',
                    borderRadius: '6px',
                    background: 'var(--accent-dim)',
                    border: '0.5px solid var(--accent)',
                    color: 'var(--accent)',
                    transition: 'background 0.15s',
                }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'var(--accent)', (e.currentTarget.style.color = '#0a0a0a'))}
                    onMouseLeave={e => (e.currentTarget.style.background = 'var(--accent-dim)', (e.currentTarget.style.color = 'var(--accent)'))}
                >
                    get audit ↗
                </Link> */}
            </div>
        </nav>
    );
}