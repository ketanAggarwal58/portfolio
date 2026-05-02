'use client';
import { useMemo, useRef } from 'react';
import { useCalendar } from './CalendarStore';
import { startOfWeek, addDays, sameDay, isoDate, formatTime, PRIORITY_COLORS } from '../lib/Calendar';

const HOURS = Array.from({ length: 24 }, (_, i) => i);
const CELL_H = 100;

export default function WeekView() {
    const { currentDate, visibleEvents, visibleTasks, getContext, dispatch } = useCalendar();
    const gridRef = useRef<HTMLDivElement>(null);

    const weekDays = useMemo(() => {
        const mon = startOfWeek(currentDate);
        return Array.from({ length: 7 }, (_, i) => addDays(mon, i));
    }, [currentDate]);

    const today = new Date();

    function eventTop(iso: string): number {
        const d = new Date(iso);
        return (d.getHours() + d.getMinutes() / 60) * CELL_H;
    }
    function eventHeight(startIso: string, endIso: string): number {
        const diff = (new Date(endIso).getTime() - new Date(startIso).getTime()) / 3600000;
        return Math.max(diff * CELL_H, 22);
    }

    return (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

            {/* Day header row */}
            <div style={{ display: 'grid', gridTemplateColumns: '48px repeat(7, 1fr)', borderBottom: '0.5px solid var(--border)', flexShrink: 0 }}>
                <div />
                {weekDays.map((day, i) => {
                    const isToday = sameDay(day, today);
                    return (
                        <div key={i} onClick={() => { dispatch({ type: 'SET_DATE', payload: day }); dispatch({ type: 'SET_VIEW', payload: 'day' }); }}
                            style={{ padding: '8px 4px', textAlign: 'center', cursor: 'pointer', borderLeft: '0.5px solid var(--border)' }}>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-tertiary)' }}>
                                {day.toLocaleDateString('en-IN', { weekday: 'short' })}
                            </div>
                            <div style={{
                                fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700,
                                color: isToday ? 'var(--accent)' : 'var(--text-primary)',
                                letterSpacing: '-0.02em',
                            }}>
                                {day.getDate()}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* All-day row */}
            <div style={{ display: 'grid', gridTemplateColumns: '48px repeat(7, 1fr)', borderBottom: '0.5px solid var(--border)', flexShrink: 0, minHeight: '28px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-tertiary)', padding: '6px 4px', textAlign: 'right' }}>all day</div>
                {weekDays.map((day, i) => {
                    const allDay = visibleEvents.filter(e => e.allDay && e.startAt.startsWith(isoDate(day)));
                    return (
                        <div key={i} style={{ borderLeft: '0.5px solid var(--border)', padding: '2px 3px', display: 'flex', flexWrap: 'wrap', gap: '2px' }}>
                            {allDay.map(ev => {
                                const ctx = getContext(ev.contextId);
                                return (
                                    <div key={ev.id} onClick={() => dispatch({ type: 'SELECT_EVENT', payload: ev.id })} style={{
                                        fontFamily: 'var(--font-mono)', fontSize: '10px',
                                        padding: '1px 5px', borderRadius: '3px',
                                        background: (ctx?.color ?? '#888') + '30',
                                        color: 'var(--text-primary)', cursor: 'pointer',
                                        borderLeft: `2px solid ${ctx?.color ?? '#888'}`,
                                    }}>
                                        {ev.title}
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>

            {/* Time grid */}
            <div ref={gridRef} style={{ flex: 1, overflowY: 'auto', position: 'relative' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '48px repeat(7, 1fr)', position: 'relative' }}>

                    {/* Hour rows */}
                    {HOURS.map(h => (
                        <div key={h} style={{ display: 'contents' }}>
                            <div style={{ height: `${CELL_H}px`, borderBottom: '0.5px solid var(--border)', padding: '4px 6px 0 0', textAlign: 'right' }}>
                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-tertiary)' }}>
                                    {h === 0 ? '' : `${String(h).padStart(2, '0')}:00`}
                                </span>
                            </div>
                            {weekDays.map((_, di) => (
                                <div key={di} style={{
                                    height: `${CELL_H}px`,
                                    borderBottom: '0.5px solid var(--border)',
                                    borderLeft: '0.5px solid var(--border)',
                                    cursor: 'pointer',
                                }}
                                    onClick={() => {
                                        const d = new Date(weekDays[di]);
                                        d.setHours(h, 0, 0, 0);
                                        dispatch({ type: 'OPEN_QUICK_ADD', payload: d.toISOString() });
                                    }}
                                    onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-elevated)')}
                                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                                />
                            ))}
                        </div>
                    ))}

                    {/* Events overlay */}
                    {weekDays.map((day, colIdx) => {
                        const dayStr = isoDate(day);
                        const dayEvents = visibleEvents.filter(e => !e.allDay && e.startAt.startsWith(dayStr));
                        const dayTasks = visibleTasks.filter(t => t.scheduledAt?.startsWith(dayStr) && t.timeBlockMins);

                        return (
                            <div key={colIdx} style={{ gridColumn: colIdx + 2, gridRow: '1 / -1', position: 'relative', pointerEvents: 'none' }}>
                                {dayEvents.map(ev => {
                                    const ctx = getContext(ev.contextId);
                                    return (
                                        <div key={ev.id} onClick={() => dispatch({ type: 'SELECT_EVENT', payload: ev.id })} style={{
                                            position: 'absolute',
                                            top: `${eventTop(ev.startAt)}px`,
                                            height: `${eventHeight(ev.startAt, ev.endAt)}px`,
                                            left: '2px', right: '2px',
                                            background: (ev.colorOverride ?? ctx?.color ?? '#888') + '22',
                                            borderLeft: `3px solid ${ev.colorOverride ?? ctx?.color ?? '#888'}`,
                                            borderRadius: '0 4px 4px 0',
                                            padding: '2px 5px',
                                            overflow: 'hidden',
                                            cursor: 'pointer',
                                            pointerEvents: 'all',
                                            zIndex: 2,
                                        }}>
                                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-primary)', fontWeight: 500, lineHeight: 1.3 }}>{ev.title}</div>
                                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-tertiary)' }}>{formatTime(ev.startAt)}</div>
                                        </div>
                                    );
                                })}

                                {/* Time-blocked tasks */}
                                {dayTasks.map(task => {
                                    const top = task.scheduledAt ? eventTop(task.scheduledAt) : 0;
                                    const height = Math.max((task.timeBlockMins ?? 30) / 60 * CELL_H, 22);
                                    return (
                                        <div key={task.id} onClick={() => dispatch({ type: 'SELECT_TASK', payload: task.id })} style={{
                                            position: 'absolute',
                                            top: `${top}px`, height: `${height}px`,
                                            left: '2px', right: '2px',
                                            background: 'var(--bg-elevated)',
                                            borderLeft: `3px solid ${PRIORITY_COLORS[task.priority]}`,
                                            borderRadius: '0 4px 4px 0',
                                            padding: '2px 5px',
                                            overflow: 'hidden', cursor: 'pointer',
                                            pointerEvents: 'all', zIndex: 2,
                                            borderStyle: 'dashed',
                                        }}>
                                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-secondary)', lineHeight: 1.3 }}>{task.title}</div>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}

                    {/* Current time indicator */}
                    {(() => {
                        const now = new Date();
                        const colIdx = weekDays.findIndex(d => sameDay(d, now));
                        if (colIdx < 0) return null;
                        const top = (now.getHours() + now.getMinutes() / 60) * CELL_H;
                        return (
                            <div style={{
                                position: 'absolute',
                                top: `${top}px`,
                                left: `${10 + colIdx * (100 / 7)}%`,
                                width: `${100 / 7}%`,
                                height: '2px',
                                background: 'var(--accent)',
                                zIndex: 10,
                                pointerEvents: 'none',
                            }} />
                        );
                    })()}
                </div>
            </div>
        </div>
    );
}