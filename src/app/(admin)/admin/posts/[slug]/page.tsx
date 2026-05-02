'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import AdminShell from '../../components/AdminShell';
import MediumEditor, { PostDraft } from '../../components/MediumEditor';
import { useAuth, authHeaders, CMS_URL } from '../../../../../lib/auth';

const DEFAULT_TAGS = ['devops', 'data science', 'startup', 'backend', 'frontend', 'databases'];

export default function EditPostPage() {
    const { token } = useAuth();
    const { id } = useParams<{ id: string }>();
    const router = useRouter();

    const [initial, setInitial] = useState<Partial<PostDraft> | null>(null);
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!token || !id) return;
        fetch(`${CMS_URL}/api/admin/posts/${id}`, { headers: authHeaders(token) })
            .then(r => r.json())
            .then(data => setInitial(data))
            .catch(() => setError('Could not load post'))
            .finally(() => setLoading(false));
    }, [token, id]);

    async function handleSave(draft: PostDraft, publish: boolean) {
        if (!token) return;
        setSaving(true);
        setError('');
        try {
            const res = await fetch(`${CMS_URL}/api/admin/posts/${id}`, {
                method: 'PUT',
                headers: authHeaders(token),
                body: JSON.stringify({ ...draft, published: publish }),
            });
            if (!res.ok) throw new Error('Save failed');
        } catch {
            setError('Could not save — check your connection');
        } finally {
            setSaving(false);
        }
    }

    async function handleDelete() {
        if (!token || !confirm('Delete this post permanently?')) return;
        await fetch(`${CMS_URL}/api/admin/posts/${id}`, {
            method: 'DELETE',
            headers: authHeaders(token),
        });
        router.push('/admin/posts');
    }

    return (
        <AdminShell>
            {/* Top bar with delete */}
            <div style={{
                position: 'sticky', top: 0, zIndex: 40,
                display: 'flex', justifyContent: 'flex-end',
                padding: '10px 1.5rem',
                borderBottom: '0.5px solid var(--border)',
                background: 'var(--bg)',
            }}>
                <button onClick={handleDelete} style={{
                    fontFamily: 'var(--font-mono)', fontSize: '11px',
                    padding: '5px 12px', borderRadius: '5px',
                    border: '0.5px solid rgba(226,75,74,0.4)',
                    color: '#e24b4a', background: 'transparent',
                    cursor: 'pointer', transition: 'background 0.15s',
                }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(226,75,74,0.08)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                    delete post
                </button>
            </div>

            {error && (
                <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: '12px',
                    padding: '10px 2rem',
                    background: 'rgba(226,75,74,0.1)',
                    borderBottom: '0.5px solid rgba(226,75,74,0.3)',
                    color: '#e24b4a',
                }}>
                    → {error}
                </div>
            )}

            {loading ? (
                <div style={{ padding: '4rem', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-tertiary)' }}>
                    loading post...
                </div>
            ) : initial ? (
                <MediumEditor
                    initial={initial}
                    onSave={handleSave}
                    saving={saving}
                    tags={DEFAULT_TAGS}
                />
            ) : null}
        </AdminShell>
    );
}