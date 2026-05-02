'use client';
import { useEffect, useRef, useState } from 'react';

const PRINCIPLES = [
    {
        number: '01',
        heading: 'Build for the constraint, not the ideal.',
        body:
            'A t3.micro with a smart architecture beats a k8s cluster that nobody maintains. I have lived both sides of that equation. The constraint forces clarity — it tells you what actually matters.',
    },
    {
        number: '02',
        heading: 'Own the full stack, respect the depth.',
        body:
            'I can write the React component, the Spring Boot endpoint, the Dockerfile, and the Terraform module. But knowing where each layer ends and the next begins is what separates a generalist from someone who just dabbles everywhere.',
    },
    {
        number: '03',
        heading: 'Experiment publicly, fail fast, document honestly.',
        body:
            'Most of my best work came from an experiment that half-worked. I write about both — the wins and the wrong turns — because the wrong turns are usually more instructive.',
    },
];

export default function PhilosophySection() {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.15 }
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
          // how I think
                </div>
                <h2 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '28px',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    color: 'var(--text-primary)',
                }}>
                    Philosophy
                </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)', borderRadius: '12px', overflow: 'hidden' }}>
                {PRINCIPLES.map((p, i) => (
                    <div key={p.number} style={{
                        background: 'var(--bg-surface)',
                        padding: '2rem',
                        display: 'grid',
                        gridTemplateColumns: '56px 1fr',
                        gap: '1.5rem',
                        alignItems: 'start',
                        opacity: visible ? 1 : 0,
                        transform: visible ? 'translateY(0)' : 'translateY(16px)',
                        transition: `opacity 0.5s ease ${i * 0.12}s, transform 0.5s ease ${i * 0.12}s`,
                    }}>
                        <span style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '13px',
                            color: 'var(--accent)',
                            paddingTop: '3px',
                        }}>
                            {p.number}
                        </span>
                        <div>
                            <h3 style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: '18px',
                                fontWeight: 700,
                                color: 'var(--text-primary)',
                                letterSpacing: '-0.01em',
                                marginBottom: '0.75rem',
                                lineHeight: 1.3,
                            }}>
                                {p.heading}
                            </h3>
                            <p style={{
                                fontSize: '15px',
                                color: 'var(--text-secondary)',
                                lineHeight: 1.75,
                            }}>
                                {p.body}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}