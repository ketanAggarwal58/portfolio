'use client';
import { useState, useEffect } from 'react';
import { useCalendar } from './CalendarStore';
import { useAuth } from '@/lib/auth';
import { calApi, PRIORITY_COLORS, formatTime } from '../lib/Calendar';
import type { Priority, TaskStatus, Subtask } from '../lib/Calendar';

function PanelShell({ title, color, onClose, children }: {
    title: string; color: string; onClose: () => void; children: React.ReactNode;
}) {
    return (
        <div style={{
            width: '320px', flexShrink: 0,
            background: 'var(--bg-surface)', borderLeft: '0.5px solid var(--border)',
            display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden',
        }}>
            <div style={{
                padding: '1rem 1.25rem', borderBottom: '0.5px solid var(--border)',
                display: 'flex', alignItems: 'center', gap: '10px',
            }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: color, flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 700, flex: 1, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
                    {title}
                </span>
                <button onClick={onClose} style={{ fontFamily: 'var(--font-mono)', fontSize: '16px', background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer', lineHeight: 1 }}>×</button>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem' }}>
                {children}
            </div>
        </div>
    );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '8px 0', borderBottom: '0.5px solid var(--border)' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-tertiary)' }}>{label}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-secondary)', textAlign: 'right', maxWidth: '60%' }}>{value}</span>
        </div>
    );
}

export function EventPanel() {
    const { selectedEventId, events, getContext, dispatch } = useCalendar();
    const { token } = useAuth();
    const ev = events.find(e => e.id === selectedEventId);
    if (!ev) return null;

    const ctx = getContext(ev.contextId);
    const color = ev.colorOverride ?? ctx?.color ?? '#888';

    async function handleDelete() {
        if (!token || !confirm('Delete this event?')) return;
        await calApi.deleteEvent(token, ev!.id).catch(() => { });
        dispatch({ type: 'DELETE_EVENT', payload: ev!.id });
    }

    return (
        <PanelShell title={ev.title} color={color} onClose={() => dispatch({ type: 'SELECT_EVENT', payload: null })}>
            <Row label="context" value={<span style={{ color: ctx?.color }}>{ctx?.icon} {ctx?.name}</span>} />
            <Row label="when" value={ev.allDay ? 'all day' : `${formatTime(ev.startAt)} – ${formatTime(ev.endAt)}`} />
            <Row label="date" value={new Date(ev.startAt).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })} />
            {ev.location && <Row label="where" value={ev.location} />}
            {ev.recurrenceRule && <Row label="repeats" value={ev.recurrenceRule} />}
            {ev.notes && (
                <div style={{ marginTop: '1rem' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-tertiary)', marginBottom: '6px' }}>notes</div>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{ev.notes}</p>
                </div>
            )}
            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '8px' }}>
                <button onClick={handleDelete} style={{
                    fontFamily: 'var(--font-mono)', fontSize: '11px',
                    padding: '6px 12px', borderRadius: '5px',
                    border: '0.5px solid rgba(226,75,74,0.4)',
                    color: '#e24b4a', background: 'transparent', cursor: 'pointer',
                }}>delete</button>
            </div>
        </PanelShell>
    );
}

export function TaskPanel() {
    const { selectedTaskId, tasks, getContext, dispatch } = useCalendar();
    const { token } = useAuth();
    const task = tasks.find(t => t.id === selectedTaskId);

    const [subtaskInput, setSubtaskInput] = useState('');
    const [subtasks, setSubtasks] = useState<Subtask[]>([]);

    useEffect(() => {
        if (task?.subtasks) setSubtasks(task.subtasks);
    }, [task?.id]);

    if (!task) return null;

    const ctx = getContext(task.contextId);
    const color = PRIORITY_COLORS[task.priority];

    async function toggleStatus() {
        if (!token) return;
        const next: TaskStatus = task!.status === 'done' ? 'todo' : 'done';
        const updated = await calApi.saveTask(token, { ...task!, status: next });
        dispatch({ type: 'UPSERT_TASK', payload: updated });
    }

    async function addSubtask() {
        if (!token || !subtaskInput.trim()) return;
        const sub = await calApi.saveSubtask(token, {
            taskId: task!.id, title: subtaskInput.trim(),
            completed: false, sortOrder: subtasks.length,
        });
        setSubtasks(prev => [...prev, sub]);
        setSubtaskInput('');
    }

    async function toggleSubtask(sub: Subtask) {
        if (!token) return;
        const updated = await calApi.saveSubtask(token, { ...sub, completed: !sub.completed });
        setSubtasks(prev => prev.map(s => s.id === sub.id ? updated : s));
    }

    async function handleDelete() {
        if (!token || !confirm('Delete this task?')) return;
        await calApi.deleteTask(token, task!.id).catch(() => { });
        dispatch({ type: 'DELETE_TASK', payload: task!.id });
    }

    return (
        <PanelShell title={task.title} color={color} onClose={() => dispatch({ type: 'SELECT_TASK', payload: null })}>

            <Row label="context" value={<span style={{ color: ctx?.color }}>{ctx?.icon} {ctx?.name}</span>} />
            <Row label="priority" value={<span style={{ color }}>{task.priority}</span>} />
            <Row label="status" value={task.status.replace('_', ' ')} />
            {task.dueAt && <Row label="due" value={new Date(task.dueAt).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })} />}
            {task.timeBlockMins && <Row label="time block" value={`${task.timeBlockMins} min`} />}
            {task.recurrenceRule && <Row label="repeats" value={task.recurrenceRule} />}

            {/* Subtasks */}
            <div style={{ marginTop: '1rem' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-tertiary)', marginBottom: '8px' }}>
                    subtasks ({subtasks.filter(s => s.completed).length}/{subtasks.length})
                </div>
                {subtasks.map(sub => (
                    <div key={sub.id} onClick={() => toggleSubtask(sub)} style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        padding: '6px 0', cursor: 'pointer',
                        borderBottom: '0.5px solid var(--border)',
                    }}>
                        <div style={{
                            width: '14px', height: '14px', borderRadius: '3px', flexShrink: 0,
                            border: `1.5px solid ${sub.completed ? 'var(--green)' : 'var(--border)'}`,
                            background: sub.completed ? 'var(--green)' : 'transparent',
                            transition: 'all 0.12s',
                        }} />
                        <span style={{
                            fontFamily: 'var(--font-mono)', fontSize: '12px',
                            color: sub.completed ? 'var(--text-tertiary)' : 'var(--text-secondary)',
                            textDecoration: sub.completed ? 'line-through' : 'none',
                        }}>
                            {sub.title}
                        </span>
                    </div>
                ))}
                <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
                    <input type="text" placeholder="add subtask..." value={subtaskInput}
                        onChange={e => setSubtaskInput(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && addSubtask()}
                        style={{
                            flex: 1, fontFamily: 'var(--font-mono)', fontSize: '12px',
                            padding: '6px 10px', borderRadius: '5px',
                            background: 'var(--bg-elevated)', border: '0.5px solid var(--border)',
                            color: 'var(--text-primary)', outline: 'none',
                        }}
                    />
                    <button onClick={addSubtask} style={{
                        fontFamily: 'var(--font-mono)', fontSize: '12px',
                        padding: '6px 10px', borderRadius: '5px',
                        background: 'var(--bg-elevated)', border: '0.5px solid var(--border)',
                        color: 'var(--text-secondary)', cursor: 'pointer',
                    }}>+</button>
                </div>
            </div>

            {task.notes && (
                <div style={{ marginTop: '1rem' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-tertiary)', marginBottom: '6px' }}>notes</div>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{task.notes}</p>
                </div>
            )}

            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '8px' }}>
                <button onClick={toggleStatus} style={{
                    fontFamily: 'var(--font-mono)', fontSize: '11px',
                    padding: '6px 12px', borderRadius: '5px',
                    border: '0.5px solid var(--border)',
                    color: task.status === 'done' ? 'var(--text-secondary)' : 'var(--green)',
                    background: 'transparent', cursor: 'pointer', flex: 1,
                }}>
                    {task.status === 'done' ? 'reopen' : 'mark done'}
                </button>
                <button onClick={handleDelete} style={{
                    fontFamily: 'var(--font-mono)', fontSize: '11px',
                    padding: '6px 12px', borderRadius: '5px',
                    border: '0.5px solid rgba(226,75,74,0.4)',
                    color: '#e24b4a', background: 'transparent', cursor: 'pointer',
                }}>delete</button>
            </div>
        </PanelShell>
    );
}