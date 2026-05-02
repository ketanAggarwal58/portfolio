'use client';

import { useState } from 'react';

export default function RecruiterSection() {
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);

    async function handleSubmit() {
        if (!email || !company) return;
        setLoading(true);
        try {
            await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, company, type: 'recruiter' }),
            });
            setSent(true);
        } catch {
            setSent(true);
        } finally {
            setLoading(false);
        }
    }

    return (
        <section id="recruit" style={{ padding: '4rem 2rem', maxWidth: '860px', margin: '0 auto' }}>

            <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--text-tertiary)',
                letterSpacing: '0.1em',
                marginBottom: '6px',
            }}>
        // for recruiters
            </div>
            <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '28px',
                fontWeight: 700,
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
                marginBottom: '2rem',
            }}>
                Hiring?
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>

                <a href="/resume.pdf" download style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '1.25rem',
                    background: 'var(--bg-surface)',
                    border: '0.5px solid var(--border)',
                    borderRadius: '12px',
                    transition: 'border-color 0.15s',
                    cursor: 'pointer',
                }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--border-hover)')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                >
                    <div style={{
                        width: '40px', height: '40px', borderRadius: '8px',
                        background: 'var(--bg-elevated)',
                        border: '0.5px solid var(--border)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                    }}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <rect x="2" y="1" width="10" height="14" rx="1.5" stroke="var(--text-secondary)" strokeWidth="1" />
                            <line x1="5" y1="5" x2="9" y2="5" stroke="var(--text-secondary)" strokeWidth="1" strokeLinecap="round" />
                            <line x1="5" y1="8" x2="9" y2="8" stroke="var(--text-secondary)" strokeWidth="1" strokeLinecap="round" />
                            <line x1="5" y1="11" x2="7" y2="11" stroke="var(--text-secondary)" strokeWidth="1" strokeLinecap="round" />
                        </svg>
                    </div>
                    <div>
                        <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '2px' }}>
                            Download resume
                        </div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-tertiary)' }}>
                            PDF · updated Mar 2025
                        </div>
                    </div>
                </a>

                <a href="https://linkedin.com/in/ketanaggarwal" target="_blank" rel="noreferrer" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '1.25rem',
                    background: 'var(--bg-surface)',
                    border: '0.5px solid var(--border)',
                    borderRadius: '12px',
                    transition: 'border-color 0.15s',
                    cursor: 'pointer',
                }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--border-hover)')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                >
                    <div style={{
                        width: '40px', height: '40px', borderRadius: '8px',
                        background: 'var(--bg-elevated)',
                        border: '0.5px solid var(--border)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                    }}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <rect x="1" y="1" width="14" height="14" rx="2" stroke="var(--text-secondary)" strokeWidth="1" />
                            <line x1="4" y1="6.5" x2="4" y2="12" stroke="var(--text-secondary)" strokeWidth="1" strokeLinecap="round" />
                            <circle cx="4" cy="4.5" r="0.8" fill="var(--text-secondary)" />
                            <path d="M7 12V9c0-1.5 5-1.5 5 0v3" stroke="var(--text-secondary)" strokeWidth="1" strokeLinecap="round" />
                            <line x1="7" y1="6.5" x2="7" y2="12" stroke="var(--text-secondary)" strokeWidth="1" strokeLinecap="round" />
                        </svg>
                    </div>
                    <div>
                        <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '2px' }}>
                            View LinkedIn
                        </div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-tertiary)' }}>
                            linkedin.com/in/ketanaggarwal
                        </div>
                    </div>
                </a>
            </div>

            <div style={{
                background: 'var(--bg-surface)',
                border: '0.5px solid var(--border)',
                borderRadius: '12px',
                padding: '1.5rem',
                marginBottom: '12px',
            }}>
                <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: 'var(--text-tertiary)',
                    marginBottom: '1rem',
                }}>
          // quick profile
                </div>
                {[
                    { label: 'availability', value: null, badge: 'open to opportunities', green: true },
                    { label: 'total experience', value: '6 years', badge: null, green: false },
                    { label: 'professional exp.', value: '3 years', badge: null, green: false },
                    { label: 'last role', value: 'CTO · bootstrap startup', badge: null, green: false },
                    { label: 'location', value: 'India · remote preferred', badge: null, green: false },
                    { label: 'open to', value: 'full stack · devops · data science', badge: null, green: false },
                ].map(({ label, value, badge, green }, i, arr) => (
                    <div key={label} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '10px 0',
                        borderBottom: i < arr.length - 1 ? '0.5px solid var(--border)' : 'none',
                    }}>
                        <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{label}</span>
                        {badge ? (
                            <span style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '11px',
                                padding: '3px 8px',
                                borderRadius: '4px',
                                background: green ? 'var(--green-dim)' : 'var(--bg-elevated)',
                                color: green ? 'var(--green)' : 'var(--text-secondary)',
                                border: `0.5px solid ${green ? 'var(--green)' : 'var(--border)'}`,
                            }}>
                                {badge}
                            </span>
                        ) : (
                            <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)' }}>{value}</span>
                        )}
                    </div>
                ))}
            </div>

            <div style={{
                background: 'var(--bg-surface)',
                border: '0.5px solid var(--border)',
                borderRadius: '12px',
                padding: '1.5rem',
            }}>
                <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '4px' }}>
                    Reach out directly
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                    I reply within 24 hrs.
                </div>
                {sent ? (
                    <div style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '13px',
                        color: 'var(--green)',
                        padding: '10px',
                        background: 'var(--green-dim)',
                        borderRadius: '6px',
                        border: '0.5px solid var(--green)',
                    }}>
                        → message received. I will be in touch.
                    </div>
                ) : (
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        <input
                            type="email"
                            placeholder="your email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            style={{
                                flex: 1,
                                minWidth: '160px',
                                fontFamily: 'var(--font-mono)',
                                fontSize: '13px',
                                padding: '9px 12px',
                                borderRadius: '6px',
                                background: 'var(--bg-elevated)',
                                border: '0.5px solid var(--border)',
                                color: 'var(--text-primary)',
                                outline: 'none',
                            }}
                        />
                        <input
                            type="text"
                            placeholder="company / role"
                            value={company}
                            onChange={e => setCompany(e.target.value)}
                            style={{
                                flex: 1,
                                minWidth: '160px',
                                fontFamily: 'var(--font-mono)',
                                fontSize: '13px',
                                padding: '9px 12px',
                                borderRadius: '6px',
                                background: 'var(--bg-elevated)',
                                border: '0.5px solid var(--border)',
                                color: 'var(--text-primary)',
                                outline: 'none',
                            }}
                        />
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '13px',
                                padding: '9px 18px',
                                borderRadius: '6px',
                                background: 'var(--text-primary)',
                                color: 'var(--bg)',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                opacity: loading ? 0.6 : 1,
                                transition: 'opacity 0.15s',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            {loading ? 'sending...' : 'send ↗'}
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}