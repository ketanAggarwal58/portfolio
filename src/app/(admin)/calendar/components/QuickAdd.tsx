'use client';
import { useState, useEffect, useRef } from 'react';
import { useCalendar } from './CalendarStore';
import { useAuth } from '@/lib/auth';
import { calApi, PRIORITY_COLORS } from '../lib/Calendar';
import type { Priority } from '../lib/Calendar';

export default function QuickAdd() {
    const { quickAddOpen, quickAddDate, contexts, dispatch, reload } = useCalendar();
    const { token } = useAuth();

    const [title, setTitle] = useState('');
    const [type, setType] = useState<'event' | 'task'>('event');
    const [contextId, setCtxId] = useState(contexts[0]?.id ?? 1);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [priority, setPriority] = useState<Priority>('P2');
    const [saving, setSaving] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (quickAddOpen) {
            const d = quickAddDate ? new Date(quickAddDate) : new Date();
            setDate(d.toISOString().slice(0, 10));
            setTime(`${String(d.getHours()).padStart(2, '0')}:00`);
            setEndTime(`${String(d.getHours() + 1).padStart(2, '0')}:00`);
            setTitle('');
            setTimeout(() => inputRef.current?.focus(), 50);
        }
    }, [quickAddOpen, quickAddDate]);

    useEffect(() => {
        function onKey(e: KeyboardEvent) {
            if (e.key === 'Escape') dispatch({ type: 'CLOSE_QUICK_ADD' });
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                dispatch({ type: 'OPEN_QUICK_ADD', payload: null });
            }
        }
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [dispatch]);

    async function handleSave() {
        if (!title.trim() || !token) return;
        setSaving(true);
        try {
            if (type === 'event') {
                const startAt = new Date(`${date}T${time}`).toISOString();
                const endAt = new Date(`${date}T${endTime}`).toISOString();
                const ev = await calApi.saveEvent(token, { title, contextId, startAt, endAt, allDay: false });
                dispatch({ type: 'UPSERT_EVENT', payload: ev });
            } else {
                const dueAt = new Date(`${date}T${time}`).toISOString();
                const task = await calApi.saveTask(token, { title, contextId, priority, status: 'todo', dueAt });
                dispatch({ type: 'UPSERT_TASK', payload: task });
            }
            dispatch({ type: 'CLOSE_QUICK_ADD' });
        } catch {
            // optimistic fallback
            dispatch({ type: 'CLOSE_QUICK_ADD' });
            reload();
        } finally {
            setSaving(false);
        }
    }

    if (!quickAddOpen) return null;

    const input: React.CSSProperties = {
        fontFamily: 'var(--font-mono)', fontSize: '13px',
        padding: '8px 12px', borderRadius: '6px',
        background: 'var(--bg-elevated)', border: '0.5px solid var(--border)',
        color: 'var(--text-primary)', outline: 'none', width: '100%',
    };

    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 200,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
            paddingTop: '10vh',
        }} onClick={() => dispatch({ type: 'CLOSE_QUICK_ADD' })}>
            <div onClick={e => e.stopPropagation()} style={{
                width: '480px', background: 'var(--bg-surface)',
                border: '0.5px solid var(--border)', borderRadius: '14px',
                padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '14px',
            }}>

                {/* Type toggle */}
                <div style={{ display: 'flex', gap: '4px', background: 'var(--bg-elevated)', borderRadius: '8px', padding: '3px' }}>
                    {(['event', 'task'] as const).map(t => (
                        <button key={t} onClick={() => setType(t)} style={{
                            flex: 1, fontFamily: 'var(--font-mono)', fontSize: '12px',
                            padding: '6px', borderRadius: '6px', border: 'none', cursor: 'pointer',
                            background: type === t ? 'var(--bg-surface)' : 'transparent',
                            color: type === t ? 'var(--text-primary)' : 'var(--text-tertiary)',
                            transition: 'all 0.12s',
                        }}>{t}</button>
                    ))}
                </div>

                {/* Title */}
                <input ref={inputRef} type="text" placeholder={type === 'event' ? 'event title...' : 'task title...'}
                    value={title} onChange={e => setTitle(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSave()}
                    style={{ ...input, fontSize: '16px', padding: '10px 14px' }}
                />

                {/* Context */}
                <select value={contextId} onChange={e => setCtxId(Number(e.target.value))} style={input}>
                    {contexts.map(c => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}
                </select>

                {/* Date + time */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                    <input type="date" value={date} onChange={e => setDate(e.target.value)} style={input} />
                    <input type="time" value={time} onChange={e => setTime(e.target.value)} style={input} />
                    {type === 'event' && <input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} style={input} />}
                    {type === 'task' && (
                        <div style={{ display: 'flex', gap: '4px' }}>
                            {(['P1', 'P2', 'P3'] as Priority[]).map(p => (
                                <button key={p} onClick={() => setPriority(p)} style={{
                                    flex: 1, fontFamily: 'var(--font-mono)', fontSize: '11px',
                                    padding: '8px 4px', borderRadius: '6px', border: `0.5px solid ${priority === p ? PRIORITY_COLORS[p] : 'var(--border)'}`,
                                    background: priority === p ? PRIORITY_COLORS[p] + '20' : 'transparent',
                                    color: priority === p ? PRIORITY_COLORS[p] : 'var(--text-tertiary)',
                                    cursor: 'pointer', transition: 'all 0.12s',
                                }}>{p}</button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                    <button onClick={() => dispatch({ type: 'CLOSE_QUICK_ADD' })} style={{
                        fontFamily: 'var(--font-mono)', fontSize: '12px',
                        padding: '8px 16px', borderRadius: '6px',
                        border: '0.5px solid var(--border)', background: 'transparent',
                        color: 'var(--text-secondary)', cursor: 'pointer',
                    }}>cancel</button>
                    <button onClick={handleSave} disabled={saving || !title.trim()} style={{
                        fontFamily: 'var(--font-mono)', fontSize: '12px',
                        padding: '8px 16px', borderRadius: '6px', border: 'none',
                        background: title.trim() ? 'var(--accent)' : 'var(--bg-elevated)',
                        color: title.trim() ? 'var(--bg)' : 'var(--text-tertiary)',
                        cursor: title.trim() ? 'pointer' : 'not-allowed', fontWeight: 500,
                    }}>
                        {saving ? 'saving...' : `add ${type} →`}
                    </button>
                </div>

                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-tertiary)', textAlign: 'center' }}>
                    esc to close · enter to save · ⌘K to open from anywhere
                </div>
            </div>
        </div>
    );
}