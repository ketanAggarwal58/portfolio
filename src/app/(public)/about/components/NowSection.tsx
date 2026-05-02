"use client";

import Link from 'next/link';

const NOW_ITEMS = [
    {
        tag: 'day job',
        title: 'Software developer at a service-based org',
        body: 'Working on large-scale client projects, deepening expertise in distributed systems and enterprise Java.',
        accent: false,
    },
    {
        tag: 'side practice',
        title: 'Running cloud audits for Indian startups',
        body: 'Helping early-stage companies identify cost waste and security gaps across AWS, GCP, Azure, and DigitalOcean. Each audit is a fixed-scope, fixed-price engagement.',
        accent: true,
        cta: { label: 'See audit plans →', href: '/#audit' },
    },
    {
        tag: 'building',
        title: 'Investing in a personal GPU setup',
        body: 'The audit income is funding a dedicated inference and training rig. Goal: run experiments locally without cloud GPU costs eating every rupee.',
        accent: false,
    },
    {
        tag: 'writing',
        title: 'Documenting experiments on the blog',
        body: 'Sharing what works, what does not, and the infrastructure decisions behind both. Mostly DevOps and ML — occasionally CTO war stories.',
        accent: false,
        cta: { label: 'Read the blog →', href: '/blog' },
    },
];

export default function NowSection() {
    return (
        <section style={{ padding: '3rem 2rem 6rem', maxWidth: '860px', margin: '0 auto' }}>

            <div style={{ marginBottom: '2.5rem' }}>
                <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: 'var(--text-tertiary)',
                    letterSpacing: '0.1em',
                    marginBottom: '6px',
                }}>
         // right now
                </div>
                <h2 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '28px',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    color: 'var(--text-primary)',
                    marginBottom: '0.75rem',
                }}>
                    What I am focused on
                </h2>
                <p style={{
                    fontSize: '15px',
                    color: 'var(--text-secondary)',
                    maxWidth: '480px',
                    lineHeight: 1.7,
                }}>
                    A snapshot of where my time and attention actually go — updated when things change.
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {NOW_ITEMS.map((item) => (
                    <div key={item.tag} style={{
                        background: 'var(--bg-surface)',
                        border: item.accent ? '1px solid var(--accent)' : '0.5px solid var(--border)',
                        borderRadius: '12px',
                        padding: '1.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem',
                        transition: 'border-color 0.15s',
                    }}>
                        <span style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '10px',
                            color: item.accent ? 'var(--accent)' : 'var(--text-tertiary)',
                            letterSpacing: '0.08em',
                        }}>
                            {item.tag}
                        </span>

                        <h3 style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '16px',
                            fontWeight: 700,
                            color: 'var(--text-primary)',
                            letterSpacing: '-0.01em',
                            lineHeight: 1.3,
                        }}>
                            {item.title}
                        </h3>

                        <p style={{
                            fontSize: '13px',
                            color: 'var(--text-secondary)',
                            lineHeight: 1.7,
                            flex: 1,
                        }}>
                            {item.body}
                        </p>

                        {item.cta && (
                            <Link href={item.cta.href} style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '12px',
                                color: item.accent ? 'var(--accent)' : 'var(--text-secondary)',
                                marginTop: '0.5rem',
                                transition: 'color 0.15s',
                            }}
                                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                                onMouseLeave={e => (e.currentTarget.style.color = item.accent ? 'var(--accent)' : 'var(--text-secondary)')}
                            >
                                {item.cta.label}
                            </Link>
                        )}
                    </div>
                ))}
            </div>

            {/* closing CTA strip */}
            {/* <div style={{
                marginTop: '3rem',
                padding: '1.5rem 2rem',
                background: 'var(--bg-surface)',
                border: '0.5px solid var(--border)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
            }}>
                <div>
                    <div style={{
                        fontSize: '15px',
                        fontWeight: 500,
                        color: 'var(--text-primary)',
                        marginBottom: '4px',
                    }}>
                        Want to work together?
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                        Audits, contracts, or full-time — I am open to conversations.
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <Link href="/#audit" style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '12px',
                        padding: '9px 18px',
                        borderRadius: '6px',
                        background: 'var(--accent)',
                        color: 'var(--bg)',
                        transition: 'opacity 0.15s',
                    }}
                        onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                        onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                    >
                        get an audit ↗
                    </Link>
                    <Link href="/#recruit" style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '12px',
                        padding: '9px 18px',
                        borderRadius: '6px',
                        border: '0.5px solid var(--border-hover)',
                        color: 'var(--text-secondary)',
                        transition: 'color 0.15s, border-color 0.15s',
                    }}
                        onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'var(--text-primary)'; }}
                        onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border-hover)'; }}
                    >
                        hire me
                    </Link>
                </div>
            </div> */}

        </section>
    );
}