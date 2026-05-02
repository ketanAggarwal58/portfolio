'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function AboutHero() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);

    return (
        <section style={{ padding: '5rem 2rem 3rem', maxWidth: '860px', margin: '0 auto' }}>

            <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--text-tertiary)',
                letterSpacing: '0.1em',
                marginBottom: '1.5rem',
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(10px)',
                transition: 'opacity 0.4s ease 0.1s, transform 0.4s ease 0.1s',
            }}>
        // About me
            </div>

            {/* Name + avatar row */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.25rem',
                marginBottom: '1.5rem',
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(12px)',
                transition: 'opacity 0.4s ease 0.2s, transform 0.4s ease 0.2s',
            }}>
                {/* Circular avatar */}
                <div style={{
                    width: '72px',
                    height: '72px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: '2px solid var(--border-hover)',
                    flexShrink: 0,
                    background: 'var(--bg-surface)',
                    position: 'relative',
                }}>
                    <Image
                        src="/images/ketan.jpg"
                        alt="Ketan Aggarwal"
                        fill
                        sizes="72px"
                        style={{ objectFit: 'cover' }}
                        priority
                    />
                </div>

                <div>
                    <div style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '22px',
                        fontWeight: 800,
                        color: 'var(--text-primary)',
                        letterSpacing: '-0.02em',
                        lineHeight: 1.2,
                    }}>
                        Ketan Aggarwal
                    </div>
                    <div style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '12px',
                        color: 'var(--text-tertiary)',
                        marginTop: '4px',
                    }}>
                        Full Stack · DevOps · Data Science · India
                    </div>
                </div>
            </div>

            <h1 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(38px, 6vw, 64px)',
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                color: 'var(--text-primary)',
                marginBottom: '2rem',
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(12px)',
                transition: 'opacity 0.4s ease 0.3s, transform 0.4s ease 0.3s',
            }}>
                I build things,<br />
                break them,<br />
                <span style={{ color: 'var(--accent)' }}>then understand why.</span>
            </h1>

            <div style={{
                maxWidth: '560px',
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(12px)',
                transition: 'opacity 0.4s ease 0.35s, transform 0.4s ease 0.35s',
            }}>
                <p style={{
                    fontSize: '17px',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.8,
                    marginBottom: '1.25rem',
                }}>
                    I am Ketan — a full stack engineer, DevOps practitioner, and data scientist
                    based in India. Before I had a job title, I was a co-founder trying to make
                    something from nothing with very limited resources and even more limited sleep.
                </p>
                <p style={{
                    fontSize: '17px',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.8,
                }}>
                    That experience shaped everything about how I think about software — every
                    decision has a cost, every abstraction needs a reason, and the best architecture
                    is the one that ships and survives contact with reality.
                </p>
            </div>

        </section>
    );
}