"use client";

export default function Footer() {
    return (
        <footer style={{
            padding: '2rem',
            borderTop: '0.5px solid var(--border)',
            maxWidth: '860px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
        }}>
            <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                color: 'var(--text-tertiary)',
            }}>
                © {new Date().getFullYear()} ketanaggarwal.dev
            </span>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
                {[
                    { label: 'Github', href: 'https://github.com/ketanaggarwal' },
                    { label: 'LinkedIn', href: 'https://linkedin.com/in/ketanaggarwal58' },
                    { label: 'Twitter', href: 'https://twitter.com/ketanaggarwal' },
                ].map(({ label, href }) => (
                    <a key={label} href={href} target="_blank" rel="noreferrer" style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '12px',
                        color: 'var(--text-tertiary)',
                        transition: 'color 0.15s',
                    }}
                        onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-tertiary)')}
                    >
                        {label}
                    </a>
                ))}
            </div>
        </footer>
    );
}