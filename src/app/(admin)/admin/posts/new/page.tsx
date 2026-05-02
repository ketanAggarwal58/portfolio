'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminShell from '../../components/AdminShell';
import MediumEditor, { PostDraft } from '../../components/MediumEditor';
import { useAuth, authHeaders, CMS_URL } from '../../../../../lib/auth';

const DEFAULT_TAGS = ['devops', 'data science', 'startup', 'backend', 'frontend', 'databases'];

export default function NewPostPage() {
    const { token } = useAuth();
    const router = useRouter();
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    async function handleSave(draft: PostDraft, publish: boolean) {
        if (!token) return;
        setSaving(true);
        setError('');
        try {
            const res = await fetch(`${CMS_URL}/api/admin/posts`, {
                method: 'POST',
                headers: authHeaders(token),
                body: JSON.stringify({ ...draft, published: publish }),
            });
            if (!res.ok) throw new Error('Save failed');
            const { id } = await res.json();
            router.push(`/admin/posts/${id}`);
        } catch {
            setError('Could not save post — check your connection');
        } finally {
            setSaving(false);
        }
    }

    return (
        <AdminShell>
            {error && (
                <div style={{
                    position: 'sticky', top: 0, zIndex: 50,
                    fontFamily: 'var(--font-mono)', fontSize: '12px',
                    padding: '10px 2rem',
                    background: 'rgba(226,75,74,0.1)',
                    borderBottom: '0.5px solid rgba(226,75,74,0.3)',
                    color: '#e24b4a',
                }}>
                    → {error}
                </div>
            )}
            <MediumEditor
                onSave={handleSave}
                saving={saving}
                tags={DEFAULT_TAGS}
            />
        </AdminShell>
    );
}