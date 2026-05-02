'use client';

const TIERS = [
    {
        name: 'Starter audit',
        price: '₹3,000',
        turnaround: '48 hrs',
        clouds: ['AWS', 'DO', 'Hetzner'],
        items: [
            'Cost optimisation report',
            'Security group review',
            'Unused resource scan',
            'Written recommendations PDF',
        ],
        cta: 'Book starter',
        highlight: false,
    },
    {
        name: 'Pro audit',
        price: '₹6,000',
        turnaround: '72 hrs',
        clouds: ['AWS', 'GCP', 'Azure', 'DO'],
        items: [
            'Everything in starter',
            'Architecture review',
            'CI/CD pipeline analysis',
            'Monitoring & alerting gaps',
            '30-min walkthrough call',
        ],
        cta: 'Book pro',
        highlight: true,
    },
    {
        name: 'Deep dive',
        price: '₹10,000',
        turnaround: '5 days',
        clouds: ['Any stack'],
        items: [
            'Everything in pro',
            'Full infra diagram',
            'Prioritised action plan',
            'Follow-up Q&A (async)',
            'Re-audit check at 30 days',
        ],
        cta: 'Book deep dive',
        highlight: false,
    },
];

export default function AuditSection() {
    return (
        <section id="audit" style={{ padding: '4rem 2rem', maxWidth: '860px', margin: '0 auto' }}>

            <div style={{ marginBottom: '2.5rem' }}>
                <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: 'var(--text-tertiary)',
                    letterSpacing: '0.1em',
                    marginBottom: '6px',
                }}>
          // Cloud Audit Service
                </div>
                <h2 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '28px',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.02em',
                    marginBottom: '0.75rem',
                }}>
                    Is your cloud setup costing you more than it should?
                </h2>
                <p style={{ fontSize: '15px', color: 'var(--text-secondary)', maxWidth: '520px', lineHeight: 1.7 }}>
                    I have audited infrastructure for startups across AWS, GCP, Azure, and DigitalOcean.
                    Most have 30–60% of avoidable spend on day one.
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '2rem' }}>
                {TIERS.map((tier) => (
                    <div key={tier.name} style={{
                        background: tier.highlight ? 'var(--bg-elevated)' : 'var(--bg-surface)',
                        border: tier.highlight ? '1px solid var(--accent)' : '0.5px solid var(--border)',
                        borderRadius: '12px',
                        padding: '1.5rem',
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        {tier.highlight && (
                            <div style={{
                                position: 'absolute',
                                top: '-11px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                fontFamily: 'var(--font-mono)',
                                fontSize: '10px',
                                background: 'var(--accent)',
                                color: 'var(--bg)',
                                padding: '3px 10px',
                                borderRadius: '4px',
                                fontWeight: 500,
                                whiteSpace: 'nowrap',
                            }}>
                                Most Popular
                            </div>
                        )}

                        <div style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '11px',
                            color: tier.highlight ? 'var(--accent)' : 'var(--text-tertiary)',
                            marginBottom: '0.5rem',
                        }}>
                            {tier.name}
                        </div>

                        <div style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '30px',
                            fontWeight: 800,
                            color: 'var(--text-primary)',
                            letterSpacing: '-0.02em',
                            marginBottom: '0.25rem',
                        }}>
                            {tier.price}
                        </div>

                        <div style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '11px',
                            color: 'var(--text-tertiary)',
                            marginBottom: '1.25rem',
                        }}>
                            {tier.turnaround} · {tier.clouds.join(', ')}
                        </div>

                        <ul style={{ listStyle: 'none', marginBottom: '1.5rem', flex: 1 }}>
                            {tier.items.map((item) => (
                                <li key={item} style={{
                                    fontSize: '13px',
                                    color: 'var(--text-secondary)',
                                    marginBottom: '8px',
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: '8px',
                                    lineHeight: 1.5,
                                }}>
                                    <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '1px' }}>→</span>
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <a href="https://razorpay.com" target="_blank" rel="noreferrer" style={{
                            display: 'block',
                            textAlign: 'center',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '12px',
                            padding: '9px',
                            borderRadius: '6px',
                            background: tier.highlight ? 'var(--accent)' : 'transparent',
                            border: tier.highlight ? 'none' : '0.5px solid var(--border-hover)',
                            color: tier.highlight ? 'var(--bg)' : 'var(--text-secondary)',
                            transition: 'opacity 0.15s',
                        }}
                            onMouseEnter={e => (e.currentTarget.style.opacity = '0.8')}
                            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                        >
                            {tier.cta} ↗
                        </a>
                    </div>
                ))}
            </div>

            <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                color: 'var(--text-tertiary)',
                textAlign: 'center',
            }}>
                Payment via Razorpay · Invoice provided · 100% async, no calls required
            </div>
        </section>
    );
}