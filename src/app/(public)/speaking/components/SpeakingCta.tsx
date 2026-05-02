'use client';
import { useState } from 'react';

const TOPICS = [
    {
        title: 'Cloud infrastructure for startups',
        body: 'AWS, GCP, Azure, and DigitalOcean — practical architecture decisions for teams that cannot afford to get it wrong twice.',
        icon: '◈',
    },
    {
        title: 'DevOps from scratch',
        body: 'CI/CD pipelines, Docker, zero-downtime deployments, and monitoring. Hands-on or lecture format — both work well.',
        icon: '◆',
    },
    {
        title: 'Data science without the hype',
        body: 'Real ML in production — model selection, inference optimisation, and the infrastructure decisions most tutorials skip.',
        icon: '△',
    },
    {
        title: 'From developer to CTO',
        body: 'What the jump from writing code to leading a technical team actually looks like — for students thinking about their career trajectory.',
        icon: '○',
    },
    {
        title: 'Building a startup from zero',
        body: 'The technical and non-technical reality of zero-to-one product development at a bootstrap startup. What works, what does not.',
        icon: '◇',
    },
];

export default function SpeakingCTA() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [org, setOrg] = useState('');
    const [topic, setTopic] = useState('');
    const [message, setMessage] = useState('');
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);

    async function handleSubmit() {
        if (!name || !email || !org) return;
        setLoading(true);
        try {
            await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, company: org, type: 'speaking', name, topic, message }),
            });
            setSent(true);
        } catch {
            setSent(true);
        } finally {
            setLoading(false);
        }
    }

    const input: React.CSSProperties = {
        fontFamily: 'var(--font-mono)', fontSize: '13px',
        padding: '9px 12px', borderRadius: '6px',
        background: 'var(--bg-elevated)', border: '0.5px solid var(--border)',
        color: 'var(--text-primary)', outline: 'none', width: '100%',
        transition: 'border-color 0.15s',
    };

    return (
        <section id="invite" style={{ padding: '3rem 2rem 6rem', maxWidth: '860px', margin: '0 auto' }}>

            {/* Topics I cover */}
            <div style={{ marginBottom: '3rem' }}>
                <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: '11px',
                    color: 'var(--text-tertiary)', letterSpacing: '0.1em', marginBottom: '6px',
                }}>
          // what I speak about
                </div>
                <h2 style={{
                    fontFamily: 'var(--font-display)', fontSize: '28px',
                    fontWeight: 700, letterSpacing: '-0.02em',
                    color: 'var(--text-primary)', marginBottom: '1.5rem',
                }}>
                    Topics
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)', borderRadius: '12px', overflow: 'hidden' }}>
                    {TOPICS.map((t, i) => (
                        <div key={i} style={{
                            background: 'var(--bg-surface)',
                            padding: '1.25rem 1.5rem',
                            display: 'grid',
                            gridTemplateColumns: '32px 1fr',
                            gap: '1rem',
                            alignItems: 'start',
                        }}>
                            <span style={{
                                fontFamily: 'var(--font-mono)', fontSize: '18px',
                                color: 'var(--accent)', paddingTop: '1px',
                            }}>
                                {t.icon}
                            </span>
                            <div>
                                <div style={{
                                    fontFamily: 'var(--font-display)', fontSize: '15px',
                                    fontWeight: 700, color: 'var(--text-primary)',
                                    letterSpacing: '-0.01em', marginBottom: '4px',
                                }}>
                                    {t.title}
                                </div>
                                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                                    {t.body}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Invite form */}
            <div style={{
                background: 'var(--bg-surface)',
                border: '0.5px solid var(--border)',
                borderRadius: '12px',
                padding: '2rem',
            }}>
                <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: '11px',
                    color: 'var(--text-tertiary)', letterSpacing: '0.1em', marginBottom: '6px',
                }}>
          // invite me to your event
                </div>
                <h2 style={{
                    fontFamily: 'var(--font-display)', fontSize: '24px',
                    fontWeight: 700, letterSpacing: '-0.02em',
                    color: 'var(--text-primary)', marginBottom: '0.5rem',
                }}>
                    Want me to speak at your college or event?
                </h2>
                <p style={{
                    fontSize: '14px', color: 'var(--text-secondary)',
                    lineHeight: 1.7, marginBottom: '1.5rem', maxWidth: '480px',
                }}>
                    I am open to guest lectures, workshops, mentorship sessions, and meetup talks.
                    Most sessions for students and community events are free. Drop me a message and
                    I will get back within 48 hours.
                </p>

                {sent ? (
                    <div style={{
                        fontFamily: 'var(--font-mono)', fontSize: '13px',
                        color: 'var(--green)', padding: '14px 16px',
                        background: 'var(--green-dim)', borderRadius: '8px',
                        border: '0.5px solid var(--green)',
                    }}>
                        → message received. I will be in touch within 48 hrs.
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            <input type="text" placeholder="your name" value={name} onChange={e => setName(e.target.value)} style={input}
                                onFocus={e => (e.target.style.borderColor = 'var(--border-hover)')}
                                onBlur={e => (e.target.style.borderColor = 'var(--border)')} />
                            <input type="email" placeholder="your email" value={email} onChange={e => setEmail(e.target.value)} style={input}
                                onFocus={e => (e.target.style.borderColor = 'var(--border-hover)')}
                                onBlur={e => (e.target.style.borderColor = 'var(--border)')} />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            <input type="text" placeholder="college / organisation / event" value={org} onChange={e => setOrg(e.target.value)} style={input}
                                onFocus={e => (e.target.style.borderColor = 'var(--border-hover)')}
                                onBlur={e => (e.target.style.borderColor = 'var(--border)')} />
                            <select value={topic} onChange={e => setTopic(e.target.value)} style={{ ...input }}>
                                <option value="">topic (optional)</option>
                                {TOPICS.map(t => <option key={t.title} value={t.title}>{t.title}</option>)}
                                <option value="other">something else</option>
                            </select>
                        </div>
                        <textarea placeholder="tell me about the event — format, expected audience, date..." value={message} onChange={e => setMessage(e.target.value)} rows={3} style={{ ...input, resize: 'vertical' }}
                            onFocus={e => (e.target.style.borderColor = 'var(--border-hover)')}
                            onBlur={e => (e.target.style.borderColor = 'var(--border)')} />
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <button onClick={handleSubmit} disabled={loading || !name || !email || !org} style={{
                                fontFamily: 'var(--font-mono)', fontSize: '13px',
                                padding: '10px 22px', borderRadius: '6px', border: 'none',
                                background: name && email && org ? 'var(--accent)' : 'var(--bg-elevated)',
                                color: name && email && org ? '#0a0a0a' : 'var(--text-tertiary)',
                                cursor: name && email && org ? 'pointer' : 'not-allowed',
                                fontWeight: 500, transition: 'opacity 0.15s',
                            }}
                                onMouseEnter={e => { if (name && email && org) e.currentTarget.style.opacity = '0.85'; }}
                                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                            >
                                {loading ? 'sending...' : 'send invite →'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}