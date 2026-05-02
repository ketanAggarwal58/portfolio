"use client";

import Link from 'next/link';

const OBJECTIONS = [
    {
        q: 'We are too early for this.',
        a: 'The earlier you audit, the cheaper the fixes. Bad infrastructure habits compound. A ₹3,000 audit at 10 employees is significantly cheaper than architectural rework at 50.',
    },
    {
        q: 'Our developer handles the infra.',
        a: 'Your developer is also the person who built it under deadline pressure. A fresh pair of eyes with no context about "why it was done that way" finds different things.',
    },
    {
        q: 'We already use managed services, we should be fine.',
        a: 'Managed services reduce operational burden, not misconfiguration risk. RDS, ECS, and S3 all have well-known misconfig patterns that show up regularly in audits.',
    },
    {
        q: 'What if we do not act on the findings?',
        a: 'You get a prioritised report, not a mandate. Some findings are critical and cheap to fix. Others are long-term architectural considerations. You choose what to act on.',
    },
];

export default function ClosingCTA() {
    return (
        <section style={{ padding: '3rem 2rem 6rem', maxWidth: '860px', margin: '0 auto' }}>

            {/* Objection handling */}
            <div style={{ marginBottom: '3rem' }}>
                <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: 'var(--text-tertiary)',
                    letterSpacing: '0.1em',
                    marginBottom: '6px',
                }}>
          // common questions
                </div>
                <h2 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '28px',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    color: 'var(--text-primary)',
                    marginBottom: '1.5rem',
                }}>
                    The reasons people wait — and why they regret it
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)', borderRadius: '12px', overflow: 'hidden' }}>
                    {OBJECTIONS.map(({ q, a }) => (
                        <div key={q} style={{
                            background: 'var(--bg-surface)',
                            padding: '1.5rem 2rem',
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '2rem',
                            alignItems: 'start',
                        }}>
                            <div style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: '15px',
                                fontWeight: 700,
                                color: 'var(--text-primary)',
                                lineHeight: 1.4,
                            }}>
                                <span style={{
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '10px',
                                    color: 'var(--text-tertiary)',
                                    display: 'block',
                                    marginBottom: '4px',
                                }}>
                                    objection
                                </span>
                                "{q}"
                            </div>
                            <div>
                                <span style={{
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '10px',
                                    color: 'var(--accent)',
                                    display: 'block',
                                    marginBottom: '4px',
                                }}>
                                    reality
                                </span>
                                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                                    {a}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Final CTA */}
            <div style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--accent)',
                borderRadius: '12px',
                padding: '2.5rem',
                textAlign: 'center',
            }}>
                <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: 'var(--accent)',
                    letterSpacing: '0.1em',
                    marginBottom: '1rem',
                }}>
          // ready to find out what is actually in your infra?
                </div>
                <h2 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(24px, 4vw, 36px)',
                    fontWeight: 800,
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.15,
                    marginBottom: '1rem',
                }}>
                    Book an audit.<br />Know what you are paying for.
                </h2>
                <p style={{
                    fontSize: '15px',
                    color: 'var(--text-secondary)',
                    maxWidth: '420px',
                    margin: '0 auto 2rem',
                    lineHeight: 1.7,
                }}>
                    Fixed price. Fixed scope. 48-hour turnaround. No retainer, no ongoing commitment —
                    just a clear, actionable report you can act on immediately.
                </p>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link href="/#audit" style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '13px',
                        padding: '11px 26px',
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
                        see audit plans ↗
                    </Link>
                    <Link href="/blog" style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '13px',
                        padding: '11px 26px',
                        borderRadius: '6px',
                        border: '0.5px solid var(--border-hover)',
                        color: 'var(--text-secondary)',
                        transition: 'color 0.15s, border-color 0.15s',
                        display: 'inline-block',
                    }}
                        onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'var(--text-primary)'; }}
                        onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border-hover)'; }}
                    >
                        read the blog first
                    </Link>
                </div>
            </div>

        </section>
    );
}