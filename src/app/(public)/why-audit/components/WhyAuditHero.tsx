'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const STATS = [
    { value: '30–60%', label: 'avg. cloud waste in early-stage startups' },
    { value: '₹0', label: 'cost to identify the problem with an audit' },
    { value: '48 hrs', label: 'to get a full report back' },
];

export default function WhyAuditHero() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);

    return (
        <section style={{ padding: '5rem 2rem 4rem', maxWidth: '860px', margin: '0 auto' }}>

            <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--text-tertiary)',
                letterSpacing: '0.1em',
                marginBottom: '1.5rem',
                opacity: mounted ? 1 : 0,
                transition: 'opacity 0.4s ease 0.1s',
            }}>
        // Why Audit Your Infrastructure ...?
            </div>

            <h1 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(36px, 6vw, 62px)',
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                color: 'var(--text-primary)',
                marginBottom: '1.5rem',
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(14px)',
                transition: 'opacity 0.4s ease 0.2s, transform 0.4s ease 0.2s',
            }}>
                Your cloud bill is lying to you.<br />
                <span style={{ color: 'var(--accent)' }}>Most startups find out too late.</span>
            </h1>

            <p style={{
                fontSize: '17px',
                color: 'var(--text-secondary)',
                maxWidth: '560px',
                lineHeight: 1.8,
                marginBottom: '3rem',
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(12px)',
                transition: 'opacity 0.4s ease 0.35s, transform 0.4s ease 0.35s',
            }}>
                When a startup moves fast, infrastructure decisions get made under pressure —
                default instance sizes, no auto-scaling, open security groups, forgotten test
                environments still running. Every one of those decisions compounds quietly in
                your monthly bill. An infrastructure audit finds them, prices them, and tells
                you exactly what to do about them.
            </p>

            {/* Stat strip */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1px',
                background: 'var(--border)',
                border: '0.5px solid var(--border)',
                borderRadius: '12px',
                overflow: 'hidden',
                marginBottom: '2.5rem',
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(12px)',
                transition: 'opacity 0.4s ease 0.45s, transform 0.4s ease 0.45s',
            }}>
                {STATS.map(({ value, label }) => (
                    <div key={label} style={{
                        background: 'var(--bg-surface)',
                        padding: '1.5rem',
                        textAlign: 'center',
                    }}>
                        <div style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '30px',
                            fontWeight: 800,
                            color: 'var(--accent)',
                            letterSpacing: '-0.02em',
                            marginBottom: '6px',
                        }}>
                            {value}
                        </div>
                        <div style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '11px',
                            color: 'var(--text-tertiary)',
                            lineHeight: 1.5,
                        }}>
                            {label}
                        </div>
                    </div>
                ))}
            </div>

            <div style={{
                display: 'flex',
                gap: '12px',
                flexWrap: 'wrap',
                opacity: mounted ? 1 : 0,
                transition: 'opacity 0.4s ease 0.55s',
            }}>
                <Link href="/#audit" style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '13px',
                    padding: '10px 22px',
                    borderRadius: '6px',
                    background: 'var(--accent)',
                    color: 'var(--bg)',
                    fontWeight: 500,
                    transition: 'opacity 0.15s',
                    display: 'inline-block',
                }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                    onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                >
                    book an audit ↗
                </Link>
                <Link href="#what-we-find" style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '13px',
                    padding: '10px 22px',
                    borderRadius: '6px',
                    border: '0.5px solid var(--border-hover)',
                    color: 'var(--text-secondary)',
                    transition: 'color 0.15s, border-color 0.15s',
                    display: 'inline-block',
                }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'var(--text-primary)'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border-hover)'; }}
                >
                    what we actually find →
                </Link>
            </div>

        </section>
    );
}