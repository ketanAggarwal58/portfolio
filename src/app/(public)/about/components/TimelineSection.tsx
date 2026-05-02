'use client';
import { useEffect, useRef, useState } from 'react';

type TimelineEvent = {
    year: string;
    role: string;
    org: string;
    type: 'startup' | 'job' | 'milestone';
    body: string;
};

const TIMELINE: TimelineEvent[] = [
    {
        year: '2018',
        role: 'Started building',
        org: 'self-taught',
        type: 'milestone',
        body:
            'Started with web development as a side interest during college. Built small projects, broke things repeatedly, and got obsessed with understanding how systems actually work under the hood.',
    },
    {
        year: '2020',
        role: 'Co-founder & CTO',
        org: 'Early-stage bootstrap startup',
        type: 'startup',
        body:
            'Joined as the founding technical member of a bootstrap startup — effectively a one-person engineering team for the first year. Designed and shipped the entire product: frontend, backend, infrastructure, and CI/CD pipeline. Wore every hat. Learned that the gap between "works on my machine" and "works in production" is where most of the real engineering happens.',
    },
    {
        year: '2022',
        role: 'Grew the team, stayed technical',
        org: 'Same startup',
        type: 'startup',
        body:
            'As the product found traction, started hiring. Transitioned into a proper CTO role — architecture decisions, code reviews, technical roadmap, and mentoring junior engineers — while still writing production code every day. The experience of growing a technical team from zero taught me more about software quality than any book.',
    },
    {
        year: '2023',
        role: 'Software developer',
        org: 'Service-based tech organisation',
        type: 'job',
        body:
            'Made a deliberate move into a professional services environment to work with larger clients and more complex systems at scale. Currently building here while running the audit side practice and investing spare cycles into personal infrastructure experiments.',
    },
];

const TYPE_COLOR: Record<TimelineEvent['type'], string> = {
    startup: 'var(--accent)',
    job: '#7F77DD',
    milestone: 'var(--text-tertiary)',
};

export default function TimelineSection() {
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
          // career journey
                </div>
                <h2 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '28px',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    color: 'var(--text-primary)',
                }}>
                    The timeline
                </h2>
            </div>

            <div style={{ position: 'relative', paddingLeft: '2rem' }}>

                {/* Vertical line */}
                <div style={{
                    position: 'absolute',
                    left: '7px',
                    top: '8px',
                    bottom: '8px',
                    width: '1px',
                    background: 'var(--border)',
                }} />

                {TIMELINE.map((event, i) => (
                    <div key={i} style={{
                        position: 'relative',
                        marginBottom: i < TIMELINE.length - 1 ? '2.5rem' : 0,
                        opacity: visible ? 1 : 0,
                        transform: visible ? 'translateX(0)' : 'translateX(-12px)',
                        transition: `opacity 0.5s ease ${i * 0.15}s, transform 0.5s ease ${i * 0.15}s`,
                    }}>

                        {/* Dot */}
                        <div style={{
                            position: 'absolute',
                            left: '-2rem',
                            top: '6px',
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            background: TYPE_COLOR[event.type],
                            border: '2px solid var(--bg)',
                            zIndex: 1,
                        }} />

                        <div style={{
                            background: 'var(--bg-surface)',
                            border: '0.5px solid var(--border)',
                            borderRadius: '12px',
                            padding: '1.5rem',
                            transition: 'border-color 0.15s',
                        }}
                            onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--border-hover)')}
                            onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                                <span style={{
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '11px',
                                    color: TYPE_COLOR[event.type],
                                    letterSpacing: '0.06em',
                                }}>
                                    {event.year}
                                </span>
                                <span style={{
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '10px',
                                    color: 'var(--text-tertiary)',
                                    padding: '2px 8px',
                                    borderRadius: '4px',
                                    border: '0.5px solid var(--border)',
                                }}>
                                    {event.org}
                                </span>
                            </div>

                            <h3 style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: '17px',
                                fontWeight: 700,
                                color: 'var(--text-primary)',
                                letterSpacing: '-0.01em',
                                marginBottom: '0.75rem',
                            }}>
                                {event.role}
                            </h3>

                            <p style={{
                                fontSize: '14px',
                                color: 'var(--text-secondary)',
                                lineHeight: 1.75,
                            }}>
                                {event.body}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}