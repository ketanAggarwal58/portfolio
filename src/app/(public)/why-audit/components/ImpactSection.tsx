'use client';
import { useEffect, useRef, useState } from 'react';

const IMPACTS = [
    {
        number: '01',
        heading: 'Direct cost savings that pay for the audit immediately',
        body: 'The average Starter audit (₹3,000) identifies cost savings of ₹3,000–15,000 per month. That is a payback period measured in days, not quarters. For most startups, the first audit pays for itself within the first billing cycle.',
    },
    {
        number: '02',
        heading: 'Security fixes before they become breach headlines',
        body: 'A security incident at a startup is rarely survivable — not because of the technical damage, but because of the trust damage. Identifying and closing open ports, rotating stale credentials, and enforcing MFA are not expensive changes. Fixing them after a breach is.',
    },
    {
        number: '03',
        heading: 'A cleaner architecture that your team can actually maintain',
        body: 'Audit findings are not just about what is wrong today. They reveal the architectural debt accumulating quietly — the kind that doubles your incident response time at 2am and slows down every new engineer you hire. Addressing them compounds positively over time.',
    },
    {
        number: '04',
        heading: 'Credibility with investors and enterprise clients',
        body: 'Due diligence is a standard part of any fundraise or enterprise sales process. "We conduct quarterly infrastructure audits and here is our last report" is a sentence that closes rooms. It signals operational maturity in a way that most early-stage teams cannot demonstrate.',
    },
];

export default function ImpactSection() {
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
          // the business case
                </div>
                <h2 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '28px',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    color: 'var(--text-primary)',
                    marginBottom: '0.75rem',
                }}>
                    What a good audit actually does for your business
                </h2>
                <p style={{ fontSize: '15px', color: 'var(--text-secondary)', maxWidth: '500px', lineHeight: 1.7 }}>
                    Beyond the checklist — the second-order effects that compound over time.
                </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)', borderRadius: '12px', overflow: 'hidden' }}>
                {IMPACTS.map((item, i) => (
                    <div key={item.number} style={{
                        display: 'grid',
                        gridTemplateColumns: '48px 1fr',
                        gap: '1.5rem',
                        padding: '1.75rem 2rem',
                        background: 'var(--bg-surface)',
                        alignItems: 'start',
                        opacity: visible ? 1 : 0,
                        transform: visible ? 'translateX(0)' : 'translateX(-10px)',
                        transition: `opacity 0.45s ease ${i * 0.1}s, transform 0.45s ease ${i * 0.1}s`,
                    }}>
                        <span style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '13px',
                            color: 'var(--accent)',
                            paddingTop: '2px',
                            flexShrink: 0,
                        }}>
                            {item.number}
                        </span>
                        <div>
                            <h3 style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: '17px',
                                fontWeight: 700,
                                color: 'var(--text-primary)',
                                letterSpacing: '-0.01em',
                                lineHeight: 1.3,
                                marginBottom: '0.6rem',
                            }}>
                                {item.heading}
                            </h3>
                            <p style={{
                                fontSize: '14px',
                                color: 'var(--text-secondary)',
                                lineHeight: 1.75,
                            }}>
                                {item.body}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

        </section>
    );
}