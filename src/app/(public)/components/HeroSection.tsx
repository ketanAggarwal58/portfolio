'use client';

import { useEffect, useState } from 'react';

const ROLES = ['Full Stack Engineer', 'Devops Architect', 'Data Scientist', 'Technical Lead'];

export default function HeroSection() {
    const [roleIndex, setRoleIndex] = useState(0);
    const [displayed, setDisplayed] = useState('');
    const [deleting, setDeleting] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => { setMounted(true); }, []);

    useEffect(() => {
        if (!mounted) return;
        const target = ROLES[roleIndex];
        let timeout: ReturnType<typeof setTimeout>;

        if (!deleting && displayed.length < target.length) {
            timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 60);
        } else if (!deleting && displayed.length === target.length) {
            timeout = setTimeout(() => setDeleting(true), 2000);
        } else if (deleting && displayed.length > 0) {
            timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
        } else if (deleting && displayed.length === 0) {
            setDeleting(false);
            setRoleIndex((roleIndex + 1) % ROLES.length);
        }
        return () => clearTimeout(timeout);
    }, [displayed, deleting, roleIndex, mounted]);

    return (
        <section style={{ padding: '5rem 2rem 4rem', maxWidth: '860px', margin: '0 auto' }}>

            <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--text-tertiary)',
                letterSpacing: '0.1em',
                marginBottom: '1.5rem',
                animation: 'fadeUp 0.5s ease 0.1s both',
            }}>
        // Based in India · Available for Work
            </div>

            <h1 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(42px, 7vw, 72px)',
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                color: 'var(--text-primary)',
                marginBottom: '1rem',
                animation: 'fadeUp 0.5s ease 0.2s both',
            }}>
                Ketan<br />Aggarwal
            </h1>

            <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(14px, 2vw, 18px)',
                color: 'var(--accent)',
                marginBottom: '1.5rem',
                minHeight: '28px',
                animation: 'fadeUp 0.5s ease 0.3s both',
            }}>
                {displayed}
                <span style={{
                    display: 'inline-block',
                    width: '2px',
                    height: '1em',
                    background: 'var(--accent)',
                    marginLeft: '2px',
                    verticalAlign: 'text-bottom',
                    animation: 'blink 1s step-end infinite',
                }} />
            </div>

            <p style={{
                fontSize: '16px',
                color: 'var(--text-secondary)',
                maxWidth: '480px',
                lineHeight: 1.7,
                marginBottom: '2rem',
                animation: 'fadeUp 0.5s ease 0.4s both',
            }}>
                6 years building systems end-to-end — from zero-to-one startups to
                enterprise clients. I write about cloud, ML experiments, and the things
                I wish I knew earlier.
            </p>

            {/* <div style={{
                display: 'flex',
                gap: '12px',
                flexWrap: 'wrap',
                animation: 'fadeUp 0.5s ease 0.5s both',
            }}>
                <a href="#audit" style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '13px',
                    padding: '10px 22px',
                    borderRadius: '6px',
                    background: 'var(--accent)',
                    color: 'var(--bg)',
                    fontWeight: 500,
                    transition: 'opacity 0.15s',
                    display: 'inline-block',
                }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                    onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                >
                    get a cloud audit ↗
                </a>
                <a href="#blog" style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '13px',
                    padding: '10px 22px',
                    borderRadius: '6px',
                    border: '0.5px solid var(--border-hover)',
                    color: 'var(--text-secondary)',
                    transition: 'color 0.15s, border-color 0.15s',
                    display: 'inline-block',
                }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'var(--text-primary)'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border-hover)'; }}
                >
                    read the blog
                </a>
            </div> */}

            <div style={{
                marginTop: '3rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                background: 'var(--bg-surface)',
                border: '0.5px solid var(--border)',
                borderRadius: '10px',
                padding: '1.25rem 1.5rem',
                lineHeight: 2,
                animation: 'fadeUp 0.5s ease 0.6s both',
            }}>
                <div>
                    <span style={{ color: 'var(--text-tertiary)' }}>~/ketanaggarwal.dev $</span>{' '}
                    <span style={{ color: 'var(--text-primary)' }}>whoami --verbose</span>
                </div>
                <div style={{ color: 'var(--text-secondary)' }}>→ 6 yrs experience · 3 yrs professional</div>
                <div style={{ color: 'var(--text-secondary)' }}>→ founding CTO <span style={{ color: 'var(--accent)' }}>@</span> early-stage bootstrap startup</div>
                <div style={{ color: 'var(--text-secondary)' }}>→ full stack <span style={{ color: 'var(--accent)' }}>+</span> devops <span style={{ color: 'var(--accent)' }}>+</span> data science</div>
                <div style={{ color: 'var(--text-secondary)' }}>→ currently: auditing clouds, building in public</div>
                <div style={{ marginTop: '4px' }}>
                    <span style={{ color: 'var(--text-tertiary)' }}>$</span>{' '}
                    <span style={{ color: 'var(--text-primary)' }}>cat stacks.txt</span>
                </div>
                <div style={{ color: 'var(--accent)' }}>
                    AWS · GCP · Azure · DO/Hetzner · Next.js · Spring Boot · PostgreSQL · Docker · Python · ML
                </div>
            </div>
        </section>
    );
}