'use client';
import { useEffect, useRef, useState } from 'react';

const PAIN_POINTS = [
    {
        tag: 'cost',
        title: 'Over-provisioned instances running 24/7',
        body: 'A t3.large running at 4% CPU utilisation is one of the most common findings. It was the right size during a load test six months ago. Nobody changed it. It has been costing 4× what it needs to ever since.',
        impact: 'Avg. saving: ₹2,000–8,000/month',
    },
    {
        tag: 'cost',
        title: 'Forgotten environments still burning money',
        body: 'Staging, UAT, demo instances spun up for a client presentation and never terminated. Test databases with 500GB of old data. Unattached EBS volumes from deleted EC2s. These are invisible until you look.',
        impact: 'Avg. saving: ₹1,500–5,000/month',
    },
    {
        tag: 'security',
        title: 'Security groups open to 0.0.0.0/0',
        body: 'The fastest way to unblock a developer in a deadline crunch is "allow all inbound". It works. It also means your database port is publicly accessible to the entire internet. This is the finding that keeps auditors up at night.',
        impact: 'Risk: critical data exposure',
    },
    {
        tag: 'security',
        title: 'No secrets rotation, hardcoded credentials',
        body: 'API keys in environment variables that have not rotated in 18 months. Database passwords in a .env file committed to a private repo. IAM users with admin access and no MFA. These are not hypothetical — they show up in almost every first audit.',
        impact: 'Risk: full account compromise',
    },
    {
        tag: 'architecture',
        title: 'No monitoring, no alerting, no visibility',
        body: 'You find out your service is down when a user tweets at you. There is no CloudWatch alarm, no uptime monitor, no error rate dashboard. You are flying blind and do not know it until something breaks in production at 2am.',
        impact: 'Risk: undetected outages',
    },
    {
        tag: 'architecture',
        title: 'No backup strategy, no tested recovery',
        body: 'RDS automatic backups are enabled by default — but the retention is 1 day, and nobody has ever run a restore test. If your database corrupts tonight, how long does recovery take? Most startups do not know the answer until it happens.',
        impact: 'Risk: permanent data loss',
    },
];

const TAG_COLORS: Record<string, string> = {
    cost: 'var(--accent)',
    security: '#f97316',
    architecture: '#7F77DD',
};

export default function PainPoints() {
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
        <section id="what-we-find" ref={ref} style={{ padding: '3rem 2rem 4rem', maxWidth: '860px', margin: '0 auto' }}>

            <div style={{ marginBottom: '2.5rem' }}>
                <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: 'var(--text-tertiary)',
                    letterSpacing: '0.1em',
                    marginBottom: '6px',
                }}>
          // what we actually find
                </div>
                <h2 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '28px',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    color: 'var(--text-primary)',
                    marginBottom: '0.75rem',
                }}>
                    The six problems that show up in almost every startup audit
                </h2>
                <p style={{ fontSize: '15px', color: 'var(--text-secondary)', maxWidth: '500px', lineHeight: 1.7 }}>
                    These are not edge cases. They are the default outcome of a team that moved
                    fast and never had time to look back.
                </p>
            </div>

            {/* Legend */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                {Object.entries(TAG_COLORS).map(([tag, color]) => (
                    <div key={tag} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: color }} />
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-tertiary)' }}>
                            {tag}
                        </span>
                    </div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'var(--border)', borderRadius: '12px', overflow: 'hidden' }}>
                {PAIN_POINTS.map((point, i) => (
                    <div key={i} style={{
                        background: 'var(--bg-surface)',
                        padding: '1.5rem',
                        opacity: visible ? 1 : 0,
                        transform: visible ? 'translateY(0)' : 'translateY(12px)',
                        transition: `opacity 0.4s ease ${i * 0.08}s, transform 0.4s ease ${i * 0.08}s`,
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                            <span style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '10px',
                                color: TAG_COLORS[point.tag],
                                letterSpacing: '0.06em',
                            }}>
                                {point.tag}
                            </span>
                            <span style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '10px',
                                padding: '2px 8px',
                                borderRadius: '4px',
                                background: 'var(--bg-elevated)',
                                color: 'var(--text-tertiary)',
                                border: '0.5px solid var(--border)',
                            }}>
                                {point.impact}
                            </span>
                        </div>
                        <h3 style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '15px',
                            fontWeight: 700,
                            color: 'var(--text-primary)',
                            letterSpacing: '-0.01em',
                            lineHeight: 1.35,
                            marginBottom: '0.75rem',
                        }}>
                            {point.title}
                        </h3>
                        <p style={{
                            fontSize: '13px',
                            color: 'var(--text-secondary)',
                            lineHeight: 1.7,
                        }}>
                            {point.body}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}