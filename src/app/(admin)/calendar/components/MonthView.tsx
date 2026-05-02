'use client';
import { useMemo } from 'react';
import { useCalendar } from './CalendarStore';
import { addDays, startOfMonth, endOfMonth, startOfWeek, sameDay, isoDate, PRIORITY_COLORS } from '../lib/Calendar';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function MonthView() {
    const { currentDate, visibleEvents, visibleTasks, getContext, dispatch } = useCalendar();

    const weeks = useMemo(() => {
        const start = startOfWeek(startOfMonth(currentDate));
        const end = endOfMonth(currentDate);
        const days: Date[] = [];
        let d = new Date(start);
        while (d <= end || days.length % 7 !== 0) {
            days.push(new Date(d));
            d = addDays(d, 1);
            if (days.length > 42) break;
        }
        const result: Date[][] = [];
        for (let i = 0; i < days.length; i += 7) result.push(days.slice(i, i + 7));
        return result;
    }, [currentDate]);

    const today = new Date();

    return (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            {/* Day headers */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', borderBottom: '0.5px solid var(--border)' }}>
                {DAYS.map(d => (
                    <div key={d} style={{ padding: '8px', textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-tertiary)' }}>
                        {d}
                    </div>
                ))}
            </div>

            {/* Grid */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
                {weeks.map((week, wi) => (
                    <div key={wi} style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', flex: 1, minHeight: '100px', borderBottom: '0.5px solid var(--border)' }}>
                        {week.map((day, di) => {
                            const isToday = sameDay(day, today);
                            const isThisMonth = day.getMonth() === currentDate.getMonth();
                            const dayStr = isoDate(day);
                            const dayEvents = visibleEvents.filter(e => e.startAt.startsWith(dayStr));
                            const dayTasks = visibleTasks.filter(t => (t.dueAt ?? t.scheduledAt ?? '').startsWith(dayStr));

                            return (
                                <div key={di} onClick={() => { dispatch({ type: 'SET_DATE', payload: day }); dispatch({ type: 'SET_VIEW', payload: 'day' }); }}
                                    style={{
                                        borderRight: di < 6 ? '0.5px solid var(--border)' : 'none',
                                        padding: '6px', cursor: 'pointer', minHeight: '100px',
                                        background: isToday ? 'var(--accent-dim)' : 'transparent',
                                        opacity: isThisMonth ? 1 : 0.35,
                                        transition: 'background 0.12s',
                                    }}
                                    onMouseEnter={e => { if (!isToday) e.currentTarget.style.background = 'var(--bg-elevated)'; }}
                                    onMouseLeave={e => { if (!isToday) e.currentTarget.style.background = 'transparent'; }}
                                >
                                    <div style={{
                                        fontFamily: 'var(--font-mono)', fontSize: '12px',
                                        color: isToday ? 'var(--accent)' : 'var(--text-secondary)',
                                        fontWeight: isToday ? 700 : 400,
                                        marginBottom: '4px',
                                    }}>
                                        {day.getDate()}
                                    </div>

                                    {/* Events */}
                                    {dayEvents.slice(0, 2).map(ev => {
                                        const ctx = getContext(ev.contextId);
                                        return (
                                            <div key={ev.id} onClick={e => { e.stopPropagation(); dispatch({ type: 'SELECT_EVENT', payload: ev.id }); }} style={{
                                                fontSize: '11px', fontFamily: 'var(--font-mono)',
                                                padding: '1px 5px', borderRadius: '3px',
                                                background: (ev.colorOverride ?? ctx?.color ?? '#888') + '28',
                                                borderLeft: `2px solid ${ev.colorOverride ?? ctx?.color ?? '#888'}`,
                                                color: 'var(--text-primary)',
                                                marginBottom: '2px',
                                                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                                                cursor: 'pointer',
                                            }}>
                                                {ev.title}
                                            </div>
                                        );
                                    })}

                                    {/* Tasks */}
                                    {dayTasks.slice(0, 2).map(task => {
                                        const ctx = getContext(task.contextId);
                                        return (
                                            <div key={task.id} onClick={e => { e.stopPropagation(); dispatch({ type: 'SELECT_TASK', payload: task.id }); }} style={{
                                                fontSize: '11px', fontFamily: 'var(--font-mono)',
                                                padding: '1px 5px', borderRadius: '3px',
                                                background: 'var(--bg-elevated)',
                                                borderLeft: `2px solid ${PRIORITY_COLORS[task.priority]}`,
                                                color: task.status === 'done' ? 'var(--text-tertiary)' : 'var(--text-secondary)',
                                                textDecoration: task.status === 'done' ? 'line-through' : 'none',
                                                marginBottom: '2px',
                                                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                                                cursor: 'pointer',
                                            }}>
                                                {task.title}
                                            </div>
                                        );
                                    })}

                                    {(dayEvents.length + dayTasks.length) > 4 && (
                                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-tertiary)' }}>
                                            +{dayEvents.length + dayTasks.length - 4} more
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
}