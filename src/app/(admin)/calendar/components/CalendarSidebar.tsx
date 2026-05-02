'use client';
import { useCalendar } from './CalendarStore';
import type { ViewMode } from './CalendarStore';
import { addDays, formatMonthYear, startOfWeek } from '../lib/Calendar';

const VIEWS: { key: ViewMode; label: string }[] = [
    { key: 'month', label: 'month' },
    { key: 'week', label: 'week' },
    { key: 'day', label: 'day' },
    { key: 'agenda', label: 'agenda' },
];

export default function CalendarSidebar() {
    const { contexts, viewMode, currentDate, focusContextId, dispatch } = useCalendar();

    function nav(dir: number) {
        const d = new Date(currentDate);
        if (viewMode === 'month') d.setMonth(d.getMonth() + dir);
        if (viewMode === 'week') d.setDate(d.getDate() + dir * 7);
        if (viewMode === 'day') d.setDate(d.getDate() + dir);
        if (viewMode === 'agenda') d.setDate(d.getDate() + dir * 14);
        dispatch({ type: 'SET_DATE', payload: d });
    }

    return (
        <aside style={{
            width: '220px', flexShrink: 0,
            background: 'var(--bg-surface)',
            borderRight: '0.5px solid var(--border)',
            display: 'flex', flexDirection: 'column',
            height: '100vh', overflowY: 'auto',
            padding: '1.25rem 0',
        }}>

            {/* Header */}
            <div style={{ padding: '0 1.25rem 1.25rem', borderBottom: '0.5px solid var(--border)' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '2px' }}>
                    ketan.dev
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-tertiary)' }}>
          // Calendar
                </div>
            </div>

            {/* Quick add */}
            <div style={{ padding: '1rem 1.25rem', borderBottom: '0.5px solid var(--border)' }}>
                <button onClick={() => dispatch({ type: 'OPEN_QUICK_ADD', payload: null })} style={{
                    width: '100%', fontFamily: 'var(--font-mono)', fontSize: '12px',
                    padding: '8px', borderRadius: '6px',
                    background: 'var(--accent)', color: 'var(--bg)',
                    border: 'none', cursor: 'pointer', fontWeight: 500,
                    transition: 'opacity 0.15s',
                }}>
                    + Quick Add
                </button>
            </div>

            {/* Navigation */}
            <div style={{ padding: '1rem 1.25rem', borderBottom: '0.5px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <button onClick={() => nav(-1)} style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '2px 6px' }}>‹</button>
                    <button onClick={() => dispatch({ type: 'SET_DATE', payload: new Date() })} style={{
                        fontFamily: 'var(--font-mono)', fontSize: '11px', background: 'none',
                        border: '0.5px solid var(--border)', color: 'var(--text-secondary)',
                        cursor: 'pointer', padding: '3px 8px', borderRadius: '4px',
                    }}>
                        Today
                    </button>
                    <button onClick={() => nav(1)} style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '2px 6px' }}>›</button>
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', textAlign: 'center', letterSpacing: '-0.01em' }}>
                    {formatMonthYear(currentDate)}
                </div>
            </div>

            {/* View switcher */}
            <div style={{ padding: '1rem 1.25rem', borderBottom: '0.5px solid var(--border)' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-tertiary)', marginBottom: '8px', letterSpacing: '0.06em' }}>view</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    {VIEWS.map(({ key, label }) => (
                        <button key={key} onClick={() => dispatch({ type: 'SET_VIEW', payload: key })} style={{
                            textAlign: 'left', fontFamily: 'var(--font-mono)', fontSize: '12px',
                            padding: '6px 10px', borderRadius: '5px', border: 'none',
                            background: viewMode === key ? 'var(--accent-dim)' : 'transparent',
                            color: viewMode === key ? 'var(--accent)' : 'var(--text-secondary)',
                            cursor: 'pointer', transition: 'all 0.12s',
                            textTransform: 'capitalize'
                        }}
                            onMouseEnter={e => { if (viewMode !== key) e.currentTarget.style.background = 'var(--bg-elevated)'; }}
                            onMouseLeave={e => { if (viewMode !== key) e.currentTarget.style.background = 'transparent'; }}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Contexts */}
            <div style={{ padding: '1rem 1.25rem', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-tertiary)', letterSpacing: '0.06em' }}>contexts</div>
                    {focusContextId !== null && (
                        <button onClick={() => dispatch({ type: 'SET_FOCUS', payload: null })} style={{
                            fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--accent)',
                            background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                        }}>
                            clear focus
                        </button>
                    )}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    {contexts.map(ctx => (
                        <div key={ctx.id} style={{
                            display: 'flex', alignItems: 'center', gap: '8px',
                            padding: '6px 8px', borderRadius: '6px',
                            opacity: ctx.visible ? 1 : 0.4,
                            background: focusContextId === ctx.id ? 'var(--bg-elevated)' : 'transparent',
                            transition: 'all 0.12s',
                            textTransform: 'capitalize'
                        }}>
                            {/* colour dot / visibility toggle */}
                            <button onClick={() => dispatch({ type: 'TOGGLE_CONTEXT', payload: ctx.id })} style={{
                                width: '12px', height: '12px', borderRadius: '50%',
                                background: ctx.visible ? ctx.color : 'transparent',
                                border: `1.5px solid ${ctx.color}`,
                                cursor: 'pointer', flexShrink: 0, padding: 0,
                                transition: 'all 0.15s',
                            }} title="toggle visibility" />
                            {/* name */}
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-secondary)', flex: 1 }}>
                                {ctx.icon} {ctx.name}
                            </span>
                            {/* focus */}
                            <button onClick={() => dispatch({ type: 'SET_FOCUS', payload: focusContextId === ctx.id ? null : ctx.id })} style={{
                                fontFamily: 'var(--font-mono)', fontSize: '9px',
                                color: focusContextId === ctx.id ? 'var(--accent)' : 'var(--text-tertiary)',
                                background: 'none', border: 'none', cursor: 'pointer', padding: '0 2px',
                                opacity: focusContextId === ctx.id ? 1 : 0,
                                transition: 'opacity 0.15s',
                            }}
                                onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                                onMouseLeave={e => { if (focusContextId !== ctx.id) e.currentTarget.style.opacity = '0'; }}
                                title="focus mode">
                                ◎
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Focus mode indicator */}
            {focusContextId !== null && (() => {
                const ctx = contexts.find(c => c.id === focusContextId);
                return ctx ? (
                    <div style={{
                        margin: '0 1.25rem 1rem',
                        padding: '8px 12px', borderRadius: '6px',
                        background: 'var(--accent-dim)',
                        border: `0.5px solid ${ctx.color}`,
                    }}>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-tertiary)', marginBottom: '2px' }}>focus mode</div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: ctx.color }}>{ctx.icon} {ctx.name}</div>
                    </div>
                ) : null;
            })()}
        </aside>
    );
}