'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../../lib/auth';

export default function AdminLoginPage() {
    const { login, token, loading } = useAuth();
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [busy, setBusy] = useState(false);

    useEffect(() => {
        if (!loading && token) router.replace('/admin/dashboard');
    }, [token, loading, router]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setBusy(true);
        setError('');
        const err = await login(username, password);
        if (err) { setError(err); setBusy(false); }
        else router.replace('/admin/dashboard');
    }

    const input: React.CSSProperties = {
        width: '100%',
        fontFamily: 'var(--font-mono)',
        fontSize: '14px',
        padding: '11px 14px',
        borderRadius: '8px',
        background: 'var(--bg-elevated)',
        border: '0.5px solid var(--border)',
        color: 'var(--text-primary)',
        outline: 'none',
        transition: 'border-color 0.15s',
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
        }}>
            <div style={{ width: '100%', maxWidth: '380px' }}>

                <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                    <div style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '13px',
                        fontWeight: 500,
                        color: 'var(--text-primary)',
                        marginBottom: '6px',
                    }}>
                        ketan.dev
                    </div>
                    <div style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        color: 'var(--text-tertiary)',
                        letterSpacing: '0.08em',
                    }}>
            // Admin
                    </div>
                </div>

                <form onSubmit={handleSubmit} style={{
                    background: 'var(--bg-surface)',
                    border: '0.5px solid var(--border)',
                    borderRadius: '12px',
                    padding: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px',
                }}>
                    <div>
                        <label style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '11px',
                            color: 'var(--text-tertiary)',
                            display: 'block',
                            marginBottom: '6px',
                        }}>
                            username
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            autoComplete="username"
                            required
                            style={input}
                            onFocus={e => (e.target.style.borderColor = 'var(--border-hover)')}
                            onBlur={e => (e.target.style.borderColor = 'var(--border)')}
                        />
                    </div>

                    <div>
                        <label style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '11px',
                            color: 'var(--text-tertiary)',
                            display: 'block',
                            marginBottom: '6px',
                        }}>
                            password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            autoComplete="current-password"
                            required
                            style={input}
                            onFocus={e => (e.target.style.borderColor = 'var(--border-hover)')}
                            onBlur={e => (e.target.style.borderColor = 'var(--border)')}
                        />
                    </div>

                    {error && (
                        <div style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '12px',
                            color: 'var(--color-text-danger, #e24b4a)',
                            padding: '8px 12px',
                            borderRadius: '6px',
                            background: 'var(--color-background-danger, rgba(226,75,74,0.08))',
                            border: '0.5px solid var(--color-border-danger, rgba(226,75,74,0.3))',
                        }}>
                            → {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={busy}
                        style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '13px',
                            padding: '11px',
                            borderRadius: '8px',
                            background: busy ? 'var(--bg-elevated)' : 'var(--accent)',
                            color: busy ? 'var(--text-tertiary)' : 'var(--bg)',
                            border: 'none',
                            cursor: busy ? 'not-allowed' : 'pointer',
                            fontWeight: 500,
                            transition: 'all 0.15s',
                            marginTop: '4px',
                        }}
                    >
                        {busy ? 'signing in...' : 'sign in →'}
                    </button>
                </form>
            </div>
        </div>
    );
}