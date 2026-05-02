'use client';
import { useEffect, useRef, useState } from 'react';

const SKILLS = [
    { name: 'AWS / Cloud infrastructure', pct: 92 },
    { name: 'Docker & DevOps pipelines', pct: 90 },
    { name: 'Next.js / React', pct: 88 },
    { name: 'Spring Boot / Java', pct: 85 },
    { name: 'PostgreSQL', pct: 83 },
    { name: 'Data science / ML', pct: 78 },
];

function SkillBar({ name, pct, animate }: { name: string; pct: number; animate: boolean }) {
    return (
        <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)' }}>
                    {name}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-tertiary)' }}>
                    {pct}%
                </span>
            </div>
            <div style={{ height: '2px', background: 'var(--border)', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{
                    height: '100%',
                    width: animate ? `${pct}%` : '0%',
                    background: 'var(--text-primary)',
                    borderRadius: '2px',
                    transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)',
                }} />
            </div>
        </div>
    );
}

export default function SkillsSection() {
    const ref = useRef<HTMLDivElement>(null);
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setAnimate(true); },
            { threshold: 0.2 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section id="about" style={{ padding: '4rem 2rem', maxWidth: '860px', margin: '0 auto' }} ref={ref}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>

                <div>
                    <div style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        color: 'var(--text-tertiary)',
                        letterSpacing: '0.1em',
                        marginBottom: '6px',
                    }}>
            // Skills
                    </div>
                    <h2 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '28px',
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                        letterSpacing: '-0.02em',
                        marginBottom: '2rem',
                    }}>
                        What I work with
                    </h2>
                    {SKILLS.map((s) => (
                        <SkillBar key={s.name} {...s} animate={animate} />
                    ))}
                </div>

                <div>
                    <div style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        color: 'var(--text-tertiary)',
                        letterSpacing: '0.1em',
                        marginBottom: '6px',
                    }}>
            // Numbers
                    </div>
                    <h2 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '28px',
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                        letterSpacing: '-0.02em',
                        marginBottom: '2rem',
                    }}>
                        At a glance
                    </h2>

                    {[
                        { value: '6', label: 'years total experience' },
                        { value: '3', label: 'years professional' },
                        { value: '1', label: 'startup co-founded as CTO' },
                        { value: '4', label: 'cloud platforms audited' },
                    ].map(({ value, label }) => (
                        <div key={label} style={{
                            display: 'flex',
                            alignItems: 'baseline',
                            gap: '12px',
                            marginBottom: '1.25rem',
                            paddingBottom: '1.25rem',
                            borderBottom: '0.5px solid var(--border)',
                        }}>
                            <span style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: '36px',
                                fontWeight: 800,
                                color: 'var(--text-primary)',
                                letterSpacing: '-0.03em',
                                lineHeight: 1,
                            }}>
                                {value}
                            </span>
                            <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}