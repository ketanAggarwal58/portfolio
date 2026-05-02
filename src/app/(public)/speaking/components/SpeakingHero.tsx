'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const STATS = [
    { value: '10+', label: 'public appearances' },
    { value: '500+', label: 'students reached' },
    { value: '5', label: 'types of engagement' },
];

export default function SpeakingHero() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);

    return (
        <section style={{ padding: '5rem 2rem 4rem', maxWidth: '860px', margin: '0 auto' }}>

            <div style={{
                fontFamily: 'var(--font-mono)', fontSize: '11px',
                color: 'var(--text-tertiary)', letterSpacing: '0.1em',
                marginBottom: '1.5rem',
                opacity: mounted ? 1 : 0,
                transition: 'opacity 0.4s ease 0.1s',
            }}>
        // Speaking & Mentorship
            </div>

            <h1 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(36px, 6vw, 62px)',
                fontWeight: 800, lineHeight: 1.05,
                letterSpacing: '-0.02em',
                color: 'var(--text-primary)',
                marginBottom: '1.5rem',
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(14px)',
                transition: 'opacity 0.4s ease 0.2s, transform 0.4s ease 0.2s',
            }}>
                Giving back to the<br />
                <span style={{ color: 'var(--accent)' }}>rooms that shaped me.</span>
            </h1>

            <p style={{
                fontSize: '17px', color: 'var(--text-secondary)',
                maxWidth: '540px', lineHeight: 1.8,
                marginBottom: '1.25rem',
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(12px)',
                transition: 'opacity 0.4s ease 0.3s, transform 0.4s ease 0.3s',
            }}>
                Everything I know about cloud infrastructure, building products, and navigating
                a tech career came from people who took the time to share what they had learned.
                I try to do the same — in classrooms, online, and at community events.
            </p>

            <p style={{
                fontSize: '17px', color: 'var(--text-secondary)',
                maxWidth: '540px', lineHeight: 1.8,
                marginBottom: '3rem',
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(12px)',
                transition: 'opacity 0.4s ease 0.38s, transform 0.4s ease 0.38s',
            }}>
                I speak on cloud engineering, DevOps practices, data science foundations,
                and what it actually looks like to go from idea to production as a small team.
                No slides full of buzzwords — real systems, real mistakes, real lessons.
            </p>

            {/* Stat strip */}
            <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1px', background: 'var(--border)',
                border: '0.5px solid var(--border)', borderRadius: '12px',
                overflow: 'hidden', marginBottom: '2.5rem',
                opacity: mounted ? 1 : 0,
                transition: 'opacity 0.4s ease 0.45s',
            }}>
                {STATS.map(({ value, label }) => (
                    <div key={label} style={{ background: 'var(--bg-surface)', padding: '1.5rem', textAlign: 'center' }}>
                        <div style={{
                            fontFamily: 'var(--font-display)', fontSize: '32px',
                            fontWeight: 800, color: 'var(--accent)',
                            letterSpacing: '-0.02em', marginBottom: '6px',
                        }}>
                            {value}
                        </div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-tertiary)' }}>
                            {label}
                        </div>
                    </div>
                ))}
            </div>

            <div style={{
                display: 'flex', gap: '12px', flexWrap: 'wrap',
                opacity: mounted ? 1 : 0,
                transition: 'opacity 0.4s ease 0.55s',
            }}>
                <a href="#appearances" style={{
                    fontFamily: 'var(--font-mono)', fontSize: '13px',
                    padding: '10px 22px', borderRadius: '6px',
                    background: 'var(--accent)', color: 'var(--bg)',
                    fontWeight: 500, display: 'inline-block',
                    transition: 'opacity 0.15s',
                }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                    onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                >
                    see all appearances →
                </a>
                <a href="#invite" style={{
                    fontFamily: 'var(--font-mono)', fontSize: '13px',
                    padding: '10px 22px', borderRadius: '6px',
                    border: '0.5px solid var(--border-hover)',
                    color: 'var(--text-secondary)', display: 'inline-block',
                    transition: 'color 0.15s, border-color 0.15s',
                }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'var(--text-primary)'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border-hover)'; }}
                >
                    invite me to speak
                </a>
            </div>
        </section>
    );
}