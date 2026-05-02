'use client';
import { useMemo } from 'react';
import { useCalendar } from './CalendarStore';
import { addDays, isoDate, formatTime, sameDay, PRIORITY_COLORS } from '../lib/Calendar';

export default function AgendaView() {
    const { currentDate, visibleEvents, visibleTasks, getContext, dispatch } = useCalendar();
    const today = new Date();

    const days = useMemo(() => {
        return Array.from({ length: 30 }, (_, i) => addDays(currentDate, i));
    }, [currentDate]);

    const PRIORITY_LABEL: Record<string, string> = { P1: '!!!', P2: '!!', P3: '!' };

    return (
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem 2rem' }}>
            {days.map(day => {
                const dayStr = isoDate(day);
                const events = visibleEvents.filter(e => e.startAt.startsWith(dayStr));
                const tasks = visibleTasks.filter(t => (t.dueAt ?? t.scheduledAt ?? '').startsWith(dayStr));
                if (events.length === 0 && tasks.length === 0) return null;

                const isToday = sameDay(day, today);

                return (
                    <div key={dayStr} style={{ marginBottom: '2rem' }}>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '10px' }}>
                            <span style={{
                                fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 800,
                                color: isToday ? 'var(--accent)' : 'var(--text-primary)',
                                letterSpacing: '-0.02em',
                            }}>
                                {day.getDate()}
                            </span>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-tertiary)' }}>
                                {day.toLocaleDateString('en-IN', { weekday: 'long', month: 'long' })}
                                {isToday && <span style={{ color: 'var(--accent)', marginLeft: '8px' }}>today</span>}
                            </span>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', paddingLeft: '1rem', borderLeft: `2px solid ${isToday ? 'var(--accent)' : 'var(--border)'}` }}>
                            {events.map(ev => {
                                const ctx = getContext(ev.contextId);
                                return (
                                    <div key={ev.id} onClick={() => dispatch({ type: 'SELECT_EVENT', payload: ev.id })} style={{
                                        display: 'flex', alignItems: 'center', gap: '12px',
                                        padding: '10px 14px', borderRadius: '8px',
                                        background: 'var(--bg-surface)', border: '0.5px solid var(--border)',
                                        cursor: 'pointer', transition: 'border-color 0.12s',
                                    }}
                                        onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--border-hover)')}
                                        onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                                    >
                                        <div style={{ width: '4px', height: '36px', borderRadius: '2px', background: ev.colorOverride ?? ctx?.color ?? '#888', flexShrink: 0 }} />
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontFamily: 'var(--font-display)', fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>{ev.title}</div>
                                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '2px' }}>
                                                {ev.allDay ? 'all day' : `${formatTime(ev.startAt)} – ${formatTime(ev.endAt)}`}
                                                {ev.location && <span style={{ marginLeft: '8px' }}>· {ev.location}</span>}
                                            </div>
                                        </div>
                                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: ctx?.color ?? 'var(--text-tertiary)', padding: '2px 6px', border: `0.5px solid ${ctx?.color ?? 'var(--border)'}`, borderRadius: '4px' }}>
                                            {ctx?.name}
                                        </div>
                                    </div>
                                );
                            })}

                            {tasks.map(task => {
                                const ctx = getContext(task.contextId);
                                return (
                                    <div key={task.id} onClick={() => dispatch({ type: 'SELECT_TASK', payload: task.id })} style={{
                                        display: 'flex', alignItems: 'center', gap: '12px',
                                        padding: '10px 14px', borderRadius: '8px',
                                        background: 'var(--bg-surface)', border: '0.5px solid var(--border)',
                                        cursor: 'pointer', opacity: task.status === 'done' ? 0.5 : 1,
                                        transition: 'border-color 0.12s',
                                    }}
                                        onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--border-hover)')}
                                        onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                                    >
                                        <div style={{ width: '4px', height: '36px', borderRadius: '2px', background: PRIORITY_COLORS[task.priority], flexShrink: 0 }} />
                                        <div style={{ flex: 1 }}>
                                            <div style={{
                                                fontFamily: 'var(--font-display)', fontSize: '14px', fontWeight: 500,
                                                color: 'var(--text-primary)', letterSpacing: '-0.01em',
                                                textDecoration: task.status === 'done' ? 'line-through' : 'none',
                                            }}>
                                                {task.title}
                                            </div>
                                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '2px', display: 'flex', gap: '8px' }}>
                                                <span style={{ color: PRIORITY_COLORS[task.priority] }}>{PRIORITY_LABEL[task.priority]} {task.priority}</span>
                                                {task.timeBlockMins && <span>· {task.timeBlockMins}min block</span>}
                                                {task.subtasks && task.subtasks.length > 0 && <span>· {task.subtasks.filter(s => s.completed).length}/{task.subtasks.length} subtasks</span>}
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: ctx?.color ?? 'var(--text-tertiary)', padding: '2px 6px', border: `0.5px solid ${ctx?.color ?? 'var(--border)'}`, borderRadius: '4px' }}>
                                                {ctx?.name}
                                            </div>
                                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-tertiary)', padding: '2px 6px', border: '0.5px solid var(--border)', borderRadius: '4px' }}>
                                                {task.status.replace('_', ' ')}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}