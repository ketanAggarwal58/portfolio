'use client';

import { useEffect, useRef, useState } from 'react';

const QUARTERS = [
    {
        label: 'Q1 audit',
        theme: 'Baseline',
        color: 'var(--accent)',
        items: [
            'Establish baseline — costs, security posture, architecture state',
            'Identify and fix the highest-impact quick wins',
            'Set benchmarks to track over time',
        ],
    },
    {
        label: 'Q2 audit',
        theme: 'Optimise',
        color: '#7F77DD',
        items: [
            'Review Q1 fixes — are savings materialising?',
            'Audit new infrastructure added since Q1',
            'Tighten IAM, rotate credentials, review access logs',
        ],
    },
    {
        label: 'Q3 audit',
        theme: 'Harden',
        color: '#60a5fa',
        items: [
            'Deep security review — pen test readiness check',
            'Disaster recovery and backup restore test',
            'Cost forecast for next 6 months based on growth trajectory',
        ],
    },
    {
        label: 'Q4 audit',
        theme: 'Scale',
        color: '#4ade80',
        items: [
            'Architecture review for next year\'s roadmap',
            'Produce annual infra health report (useful for investors)',
            'Plan and budget for upcoming infrastructure changes',
        ],
    },
];

export default function QuarterlySection() {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.1 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={ref} style={{ padding: '3rem 2rem 4rem', maxWidth: '860px', margin: '0 auto' }}>

            <div style={{ marginBottom: '2.5rem' }}>
                <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: 'var(--text-tertiary)',
                    letterSpacing: '0.1em',
                    marginBottom: '6px',
                }}>
          // recommended cadence
                </div>
                <h2 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '28px',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    color: 'var(--text-primary)',
                    marginBottom: '0.75rem',
                }}>
                    Why quarterly?
                </h2>
                <p style={{ fontSize: '15px', color: 'var(--text-secondary)', maxWidth: '520px', lineHeight: 1.7 }}>
                    A one-time audit is a snapshot. A quarterly audit is a practice. Infrastructure
                    drifts — new services get added, teams grow, costs creep. A quarterly cadence
                    catches drift before it becomes debt, and builds a paper trail that tells the
                    story of a maturing engineering organisation.
                </p>
            </div>

            {/* Quote callout */}
            <div style={{
                padding: '1.25rem 1.5rem',
                borderLeft: '3px solid var(--accent)',
                background: 'var(--bg-surface)',
                borderRadius: '0 8px 8px 0',
                marginBottom: '2.5rem',
            }}>
                <p style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '16px',
                    fontWeight: 500,
                    color: 'var(--text-primary)',
                    lineHeight: 1.6,
                    marginBottom: '8px',
                }}>
                    "Most startups I audit have never had anyone look at their infrastructure with
                    fresh eyes. The first audit is always the most valuable — not because the
                    problems are unique, but because nobody knew they existed."
                </p>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-tertiary)' }}>
                    — Ketan Aggarwal, from experience
                </div>
            </div>

            {/* Quarter grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '1px',
                background: 'var(--border)',
                border: '0.5px solid var(--border)',
                borderRadius: '12px',
                overflow: 'hidden',
            }}>
                {QUARTERS.map((q, i) => (
                    <div key={q.label} style={{
                        background: 'var(--bg-surface)',
                        padding: '1.25rem',
                        opacity: visible ? 1 : 0,
                        transform: visible ? 'translateY(0)' : 'translateY(16px)',
                        transition: `opacity 0.4s ease ${i * 0.1}s, transform 0.4s ease ${i * 0.1}s`,
                    }}>
                        <div style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '10px',
                            color: q.color,
                            letterSpacing: '0.06em',
                            marginBottom: '6px',
                        }}>
                            {q.label}
                        </div>
                        <div style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '18px',
                            fontWeight: 800,
                            color: 'var(--text-primary)',
                            letterSpacing: '-0.02em',
                            marginBottom: '1rem',
                            paddingBottom: '0.75rem',
                            borderBottom: `1px solid ${q.color}`,
                        }}>
                            {q.theme}
                        </div>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {q.items.map((item, j) => (
                                <li key={j} style={{
                                    fontSize: '12px',
                                    color: 'var(--text-secondary)',
                                    lineHeight: 1.6,
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: '6px',
                                }}>
                                    <span style={{ color: q.color, flexShrink: 0, marginTop: '1px', fontSize: '10px' }}>→</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div style={{
                marginTop: '1rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--text-tertiary)',
                textAlign: 'center',
            }}>
                Each quarterly audit builds on the last · Returning clients get 15% off
            </div>

        </section>
    );
}