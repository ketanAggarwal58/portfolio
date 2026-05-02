'use client';
import { useEffect, useRef, useState, useCallback } from 'react';

export type PostDraft = {
    title: string;
    excerpt: string;
    content: string;
    tag: string;
    readTime: number;
    featured: boolean;
    published: boolean;
    coverImage: string;
};

type Props = {
    initial?: Partial<PostDraft>;
    onSave: (draft: PostDraft, publish: boolean) => Promise<void>;
    saving: boolean;
    tags: string[];
};

const TOOLBAR_ACTIONS = [
    { cmd: 'bold', label: 'B', style: { fontWeight: 700 } },
    { cmd: 'italic', label: 'I', style: { fontStyle: 'italic' } },
    { cmd: 'underline', label: 'U', style: { textDecoration: 'underline' } },
    { cmd: 'strikeThrough', label: 'S', style: { textDecoration: 'line-through' } },
];

function estimateReadTime(text: string): number {
    return Math.max(1, Math.round(text.trim().split(/\s+/).length / 200));
}

export default function MediumEditor({ initial, onSave, saving, tags }: Props) {
    const [title, setTitle] = useState(initial?.title ?? '');
    const [excerpt, setExcerpt] = useState(initial?.excerpt ?? '');
    const [tag, setTag] = useState(initial?.tag ?? (tags[0] ?? ''));
    const [featured, setFeatured] = useState(initial?.featured ?? false);
    const [published, setPublished] = useState(initial?.published ?? false);
    const [coverImage, setCoverImage] = useState(initial?.coverImage ?? '');
    const [toolbar, setToolbar] = useState<{ x: number; y: number } | null>(null);
    const [newTag, setNewTag] = useState('');
    const [allTags, setAllTags] = useState(tags);
    const [wordCount, setWordCount] = useState(0);

    const editorRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLTextAreaElement>(null);
    const fileRef = useRef<HTMLInputElement>(null);

    // Auto-resize title textarea
    useEffect(() => {
        const el = titleRef.current;
        if (!el) return;
        el.style.height = 'auto';
        el.style.height = el.scrollHeight + 'px';
    }, [title]);

    // Floating toolbar on selection
    const handleSelectionChange = useCallback(() => {
        const sel = window.getSelection();
        if (!sel || sel.isCollapsed || !editorRef.current?.contains(sel.anchorNode)) {
            setToolbar(null);
            return;
        }
        const range = sel.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        const editorRect = editorRef.current!.getBoundingClientRect();
        setToolbar({
            x: rect.left - editorRect.left + rect.width / 2,
            y: rect.top - editorRect.top - 48,
        });
    }, []);

    useEffect(() => {
        document.addEventListener('selectionchange', handleSelectionChange);
        return () => document.removeEventListener('selectionchange', handleSelectionChange);
    }, [handleSelectionChange]);

    function execFormat(cmd: string) {
        document.execCommand(cmd, false);
        editorRef.current?.focus();
    }

    function handleEditorInput() {
        const text = editorRef.current?.innerText ?? '';
        setWordCount(text.trim().split(/\s+/).filter(Boolean).length);
    }

    // Markdown shortcuts: ## heading, > blockquote, ``` code
    function handleEditorKeyDown(e: React.KeyboardEvent) {
        if (e.key !== 'Enter') return;
        const sel = window.getSelection();
        if (!sel || !sel.anchorNode) return;
        const node = sel.anchorNode.nodeType === 3 ? sel.anchorNode : sel.anchorNode.firstChild;
        const text = (node as Text)?.textContent ?? '';

        if (text.startsWith('## ')) {
            e.preventDefault();
            document.execCommand('selectAll', false); // select the line text hack — simplified
            const content = text.replace(/^## /, '');
            const h2 = document.createElement('h2');
            h2.textContent = content;
            h2.style.cssText = 'font-size:24px;font-weight:700;margin:1.5rem 0 0.5rem;color:var(--text-primary)';
            const range = sel.getRangeAt(0);
            range.selectNodeContents(sel.anchorNode!.parentElement!);
            range.deleteContents();
            range.insertNode(h2);
            const br = document.createElement('p');
            br.innerHTML = '<br>';
            h2.after(br);
            const newRange = document.createRange();
            newRange.setStart(br, 0);
            sel.removeAllRanges();
            sel.addRange(newRange);
        }

        if (text.startsWith('> ')) {
            e.preventDefault();
            const content = text.replace(/^> /, '');
            const bq = document.createElement('blockquote');
            bq.textContent = content;
            bq.style.cssText = 'border-left:3px solid var(--accent);margin:1rem 0;padding:0.5rem 1.25rem;color:var(--text-secondary);font-style:italic';
            const range = sel.getRangeAt(0);
            range.selectNodeContents(sel.anchorNode!.parentElement!);
            range.deleteContents();
            range.insertNode(bq);
            const p = document.createElement('p');
            p.innerHTML = '<br>';
            bq.after(p);
            const newRange = document.createRange();
            newRange.setStart(p, 0);
            sel.removeAllRanges();
            sel.addRange(newRange);
        }
    }

    async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = ev => setCoverImage(ev.target?.result as string);
        reader.readAsDataURL(file);
        // In production: upload to S3/R2 and set the returned URL
    }

    function getContent() {
        return editorRef.current?.innerHTML ?? '';
    }

    async function handleSave(publish: boolean) {
        const content = getContent();
        await onSave({
            title, excerpt, content, tag,
            readTime: estimateReadTime(editorRef.current?.innerText ?? ''),
            featured, published: publish,
            coverImage,
        }, publish);
        setPublished(publish);
    }

    const inputStyle: React.CSSProperties = {
        fontFamily: 'var(--font-mono)',
        fontSize: '13px',
        padding: '8px 12px',
        borderRadius: '6px',
        background: 'var(--bg-elevated)',
        border: '0.5px solid var(--border)',
        color: 'var(--text-primary)',
        outline: 'none',
    };

    const toggleStyle = (active: boolean): React.CSSProperties => ({
        fontFamily: 'var(--font-mono)',
        fontSize: '11px',
        padding: '5px 12px',
        borderRadius: '5px',
        border: `0.5px solid ${active ? 'var(--accent)' : 'var(--border)'}`,
        background: active ? 'var(--accent-dim)' : 'transparent',
        color: active ? 'var(--accent)' : 'var(--text-secondary)',
        cursor: 'pointer',
        transition: 'all 0.15s',
    });

    return (
        <div style={{ display: 'flex', gap: 0, minHeight: '100vh' }}>

            {/* Editor pane */}
            <div style={{ flex: 1, padding: '3rem 4rem', maxWidth: '720px', margin: '0 auto' }}>

                {/* Cover image */}
                <div style={{ marginBottom: '2rem' }}>
                    {coverImage ? (
                        <div style={{ position: 'relative', borderRadius: '10px', overflow: 'hidden', marginBottom: '1rem' }}>
                            <img src={coverImage} alt="cover" style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block' }} />
                            <button onClick={() => setCoverImage('')} style={{
                                position: 'absolute', top: '10px', right: '10px',
                                fontFamily: 'var(--font-mono)', fontSize: '11px',
                                padding: '4px 10px', borderRadius: '5px',
                                background: 'var(--bg)', border: '0.5px solid var(--border)',
                                color: 'var(--text-secondary)', cursor: 'pointer',
                            }}>
                                remove
                            </button>
                        </div>
                    ) : (
                        <button onClick={() => fileRef.current?.click()} style={{
                            fontFamily: 'var(--font-mono)', fontSize: '12px',
                            padding: '8px 16px', borderRadius: '6px',
                            border: '0.5px dashed var(--border)', color: 'var(--text-tertiary)',
                            background: 'transparent', cursor: 'pointer', transition: 'border-color 0.15s, color 0.15s',
                        }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-hover)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-tertiary)'; }}
                        >
                            + add cover image
                        </button>
                    )}
                    <input ref={fileRef} type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                </div>

                {/* Title */}
                <textarea
                    ref={titleRef}
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Title"
                    rows={1}
                    style={{
                        width: '100%',
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(28px, 4vw, 40px)',
                        fontWeight: 800,
                        letterSpacing: '-0.02em',
                        color: 'var(--text-primary)',
                        background: 'transparent',
                        border: 'none',
                        outline: 'none',
                        resize: 'none',
                        overflow: 'hidden',
                        lineHeight: 1.15,
                        marginBottom: '0.75rem',
                        display: 'block',
                    }}
                />

                {/* Excerpt */}
                <textarea
                    value={excerpt}
                    onChange={e => setExcerpt(e.target.value)}
                    placeholder="Write a short excerpt (shown in blog listing)..."
                    rows={2}
                    style={{
                        width: '100%',
                        fontFamily: 'var(--font-display)',
                        fontSize: '18px',
                        color: 'var(--text-secondary)',
                        background: 'transparent',
                        border: 'none',
                        outline: 'none',
                        resize: 'none',
                        lineHeight: 1.5,
                        marginBottom: '2rem',
                        borderBottom: '0.5px solid var(--border)',
                        paddingBottom: '1.5rem',
                        display: 'block',
                    }}
                />

                {/* Floating toolbar */}
                {toolbar && (
                    <div style={{
                        position: 'absolute',
                        left: toolbar.x,
                        top: toolbar.y,
                        transform: 'translateX(-50%)',
                        display: 'flex',
                        gap: '2px',
                        background: 'var(--bg-surface)',
                        border: '0.5px solid var(--border)',
                        borderRadius: '8px',
                        padding: '4px',
                        zIndex: 100,
                        boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                    }}>
                        {TOOLBAR_ACTIONS.map(({ cmd, label, style }) => (
                            <button key={cmd} onMouseDown={e => { e.preventDefault(); execFormat(cmd); }} style={{
                                fontFamily: 'var(--font-mono)', fontSize: '13px',
                                width: '30px', height: '30px', borderRadius: '5px',
                                border: 'none', background: 'transparent',
                                color: 'var(--text-primary)', cursor: 'pointer',
                                ...style,
                                transition: 'background 0.1s',
                            }}
                                onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-elevated)')}
                                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                            >
                                {label}
                            </button>
                        ))}
                        <div style={{ width: '0.5px', background: 'var(--border)', margin: '4px 2px' }} />
                        <button onMouseDown={e => { e.preventDefault(); execFormat('insertUnorderedList'); }} style={{
                            fontFamily: 'var(--font-mono)', fontSize: '13px',
                            width: '30px', height: '30px', borderRadius: '5px',
                            border: 'none', background: 'transparent',
                            color: 'var(--text-primary)', cursor: 'pointer',
                        }}>≡</button>
                    </div>
                )}

                {/* Rich text body */}
                <div
                    ref={editorRef}
                    contentEditable
                    suppressContentEditableWarning
                    onInput={handleEditorInput}
                    onKeyDown={handleEditorKeyDown}
                    data-placeholder="Start writing... (select text to format, type ## for heading, > for quote)"
                    style={{
                        minHeight: '400px',
                        outline: 'none',
                        fontSize: '17px',
                        lineHeight: 1.8,
                        color: 'var(--text-primary)',
                        caretColor: 'var(--accent)',
                        position: 'relative',
                    }}
                />

                <style>{`
          [contenteditable]:empty:before {
            content: attr(data-placeholder);
            color: var(--text-tertiary);
            font-size: 17px;
            pointer-events: none;
          }
          [contenteditable] h2 { font-family: var(--font-display); font-size: 24px; font-weight: 700; margin: 1.5rem 0 0.5rem; }
          [contenteditable] blockquote { border-left: 3px solid var(--accent); margin: 1.5rem 0; padding: 0.5rem 1.25rem; color: var(--text-secondary); font-style: italic; }
          [contenteditable] a { color: var(--accent); text-decoration: underline; }
          [contenteditable] code { font-family: var(--font-mono); font-size: 13px; background: var(--bg-elevated); padding: 2px 6px; border-radius: 4px; }
          [contenteditable] ul { padding-left: 1.5rem; margin: 0.75rem 0; }
          [contenteditable] li { margin-bottom: 4px; }
        `}</style>

                {/* Word count */}
                <div style={{ marginTop: '2rem', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-tertiary)' }}>
                    {wordCount} words · ~{estimateReadTime(editorRef.current?.innerText ?? '')} min read
                </div>
            </div>

            {/* Settings sidebar */}
            <aside style={{
                width: '260px',
                flexShrink: 0,
                borderLeft: '0.5px solid var(--border)',
                padding: '2rem 1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                background: 'var(--bg-surface)',
                position: 'sticky',
                top: 0,
                height: '100vh',
                overflowY: 'auto',
            }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-tertiary)', letterSpacing: '0.08em' }}>
          // post settings
                </div>

                {/* Publish actions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <button onClick={() => handleSave(true)} disabled={saving} style={{
                        fontFamily: 'var(--font-mono)', fontSize: '12px',
                        padding: '10px', borderRadius: '6px',
                        background: saving ? 'var(--bg-elevated)' : 'var(--accent)',
                        color: saving ? 'var(--text-tertiary)' : '#0a0a0a',
                        border: 'none', cursor: saving ? 'not-allowed' : 'pointer',
                        fontWeight: 500, transition: 'opacity 0.15s',
                    }}>
                        {saving ? 'saving...' : published ? 'update post' : 'publish →'}
                    </button>
                    <button onClick={() => handleSave(false)} disabled={saving} style={{
                        fontFamily: 'var(--font-mono)', fontSize: '12px',
                        padding: '10px', borderRadius: '6px',
                        background: 'transparent', border: '0.5px solid var(--border)',
                        color: 'var(--text-secondary)', cursor: 'pointer', transition: 'border-color 0.15s',
                    }}>
                        save draft
                    </button>
                </div>

                {/* Tag */}
                <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-tertiary)', marginBottom: '8px' }}>tag</div>
                    <select value={tag} onChange={e => setTag(e.target.value)} style={{ ...inputStyle, width: '100%' }}>
                        {allTags.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                    <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
                        <input
                            type="text"
                            placeholder="new tag..."
                            value={newTag}
                            onChange={e => setNewTag(e.target.value)}
                            onKeyDown={e => {
                                if (e.key === 'Enter' && newTag.trim()) {
                                    const t = newTag.trim().toLowerCase();
                                    setAllTags(prev => prev.includes(t) ? prev : [...prev, t]);
                                    setTag(t);
                                    setNewTag('');
                                }
                            }}
                            style={{ ...inputStyle, flex: 1, fontSize: '12px', padding: '6px 10px' }}
                        />
                        <button onClick={() => {
                            if (!newTag.trim()) return;
                            const t = newTag.trim().toLowerCase();
                            setAllTags(prev => prev.includes(t) ? prev : [...prev, t]);
                            setTag(t);
                            setNewTag('');
                        }} style={{ ...inputStyle, padding: '6px 10px', cursor: 'pointer' }}>
                            +
                        </button>
                    </div>
                </div>

                {/* Toggles */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-secondary)' }}>featured</span>
                        <button onClick={() => setFeatured(f => !f)} style={toggleStyle(featured)}>
                            {featured ? 'yes' : 'no'}
                        </button>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-secondary)' }}>status</span>
                        <span style={{
                            fontFamily: 'var(--font-mono)', fontSize: '11px',
                            padding: '3px 8px', borderRadius: '4px',
                            background: published ? 'var(--green-dim)' : 'var(--bg-elevated)',
                            color: published ? 'var(--green)' : 'var(--text-tertiary)',
                            border: `0.5px solid ${published ? 'var(--green)' : 'var(--border)'}`,
                        }}>
                            {published ? 'published' : 'draft'}
                        </span>
                    </div>
                </div>

                {/* Keyboard shortcuts */}
                <div style={{ borderTop: '0.5px solid var(--border)', paddingTop: '1rem' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-tertiary)', marginBottom: '8px' }}>shortcuts</div>
                    {[
                        ['## ', 'heading'],
                        ['> ', 'blockquote'],
                        ['Ctrl+B', 'bold'],
                        ['Ctrl+I', 'italic'],
                    ].map(([key, desc]) => (
                        <div key={key} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                            <code style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--accent)', background: 'var(--bg-elevated)', padding: '1px 5px', borderRadius: '3px' }}>{key}</code>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-tertiary)' }}>{desc}</span>
                        </div>
                    ))}
                </div>
            </aside>
        </div>
    );
}