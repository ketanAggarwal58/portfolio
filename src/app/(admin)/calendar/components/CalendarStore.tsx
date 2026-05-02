'use client';
import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import {
    Context, CalEvent, Task,
    calApi, DEFAULT_CONTEXTS,
    isoDate, startOfMonth, endOfMonth, addDays,
} from '../lib/Calendar';
import { useAuth } from '@/lib/auth';

export type ViewMode = 'month' | 'week' | 'day' | 'agenda';

type State = {
    contexts: Context[];
    events: CalEvent[];
    tasks: Task[];
    focusContextId: number | null;
    viewMode: ViewMode;
    currentDate: Date;
    loading: boolean;
    selectedEventId: number | null;
    selectedTaskId: number | null;
    quickAddOpen: boolean;
    quickAddDate: string | null;
};

type Action =
    | { type: 'SET_CONTEXTS'; payload: Context[] }
    | { type: 'SET_EVENTS'; payload: CalEvent[] }
    | { type: 'SET_TASKS'; payload: Task[] }
    | { type: 'UPSERT_EVENT'; payload: CalEvent }
    | { type: 'DELETE_EVENT'; payload: number }
    | { type: 'UPSERT_TASK'; payload: Task }
    | { type: 'DELETE_TASK'; payload: number }
    | { type: 'TOGGLE_CONTEXT'; payload: number }
    | { type: 'SET_FOCUS'; payload: number | null }
    | { type: 'SET_VIEW'; payload: ViewMode }
    | { type: 'SET_DATE'; payload: Date }
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'SELECT_EVENT'; payload: number | null }
    | { type: 'SELECT_TASK'; payload: number | null }
    | { type: 'OPEN_QUICK_ADD'; payload: string | null }
    | { type: 'CLOSE_QUICK_ADD' }
    | { type: 'UPSERT_CONTEXT'; payload: Context }
    | { type: 'DELETE_CONTEXT'; payload: number };

function reducer(s: State, a: Action): State {
    switch (a.type) {
        case 'SET_CONTEXTS': return { ...s, contexts: a.payload };
        case 'SET_EVENTS': return { ...s, events: a.payload };
        case 'SET_TASKS': return { ...s, tasks: a.payload };
        case 'UPSERT_EVENT': return { ...s, events: s.events.some(e => e.id === a.payload.id) ? s.events.map(e => e.id === a.payload.id ? a.payload : e) : [...s.events, a.payload] };
        case 'DELETE_EVENT': return { ...s, events: s.events.filter(e => e.id !== a.payload), selectedEventId: null };
        case 'UPSERT_TASK': return { ...s, tasks: s.tasks.some(t => t.id === a.payload.id) ? s.tasks.map(t => t.id === a.payload.id ? a.payload : t) : [...s.tasks, a.payload] };
        case 'DELETE_TASK': return { ...s, tasks: s.tasks.filter(t => t.id !== a.payload), selectedTaskId: null };
        case 'TOGGLE_CONTEXT': return { ...s, contexts: s.contexts.map(c => c.id === a.payload ? { ...c, visible: !c.visible } : c) };
        case 'SET_FOCUS': return { ...s, focusContextId: a.payload };
        case 'SET_VIEW': return { ...s, viewMode: a.payload };
        case 'SET_DATE': return { ...s, currentDate: a.payload };
        case 'SET_LOADING': return { ...s, loading: a.payload };
        case 'SELECT_EVENT': return { ...s, selectedEventId: a.payload, selectedTaskId: null };
        case 'SELECT_TASK': return { ...s, selectedTaskId: a.payload, selectedEventId: null };
        case 'OPEN_QUICK_ADD': return { ...s, quickAddOpen: true, quickAddDate: a.payload };
        case 'CLOSE_QUICK_ADD': return { ...s, quickAddOpen: false, quickAddDate: null };
        case 'UPSERT_CONTEXT': return { ...s, contexts: s.contexts.some(c => c.id === a.payload.id) ? s.contexts.map(c => c.id === a.payload.id ? a.payload : c) : [...s.contexts, a.payload] };
        case 'DELETE_CONTEXT': return { ...s, contexts: s.contexts.filter(c => c.id !== a.payload) };
        default: return s;
    }
}

const init: State = {
    contexts: DEFAULT_CONTEXTS, events: [], tasks: [],
    focusContextId: null, viewMode: 'week',
    currentDate: new Date(), loading: false,
    selectedEventId: null, selectedTaskId: null,
    quickAddOpen: false, quickAddDate: null,
};

type StoreCtx = State & {
    dispatch: React.Dispatch<Action>;
    visibleContextIds: Set<number>;
    visibleEvents: CalEvent[];
    visibleTasks: Task[];
    getContext: (id: number) => Context | undefined;
    reload: () => void;
};

const CalCtx = createContext<StoreCtx | null>(null);

export function CalendarProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(reducer, init);
    const { token } = useAuth();

    async function load() {
        if (!token) return;
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            const [contexts, events, tasks] = await Promise.all([
                calApi.getContexts(token).catch(() => DEFAULT_CONTEXTS),
                calApi.getEvents(token,
                    isoDate(startOfMonth(addDays(state.currentDate, -7))),
                    isoDate(endOfMonth(addDays(state.currentDate, 7)))
                ).catch(() => []),
                calApi.getTasks(token).catch(() => []),
            ]);
            dispatch({ type: 'SET_CONTEXTS', payload: contexts });
            dispatch({ type: 'SET_EVENTS', payload: events });
            dispatch({ type: 'SET_TASKS', payload: tasks });
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    }

    useEffect(() => { load(); }, [token]);

    const visibleContextIds = new Set(
        state.contexts
            .filter(c => c.visible && (state.focusContextId === null || c.id === state.focusContextId))
            .map(c => c.id)
    );

    return (
        <CalCtx.Provider value={{
            ...state, dispatch,
            visibleContextIds,
            visibleEvents: state.events.filter(e => visibleContextIds.has(e.contextId)),
            visibleTasks: state.tasks.filter(t => visibleContextIds.has(t.contextId)),
            getContext: (id) => state.contexts.find(c => c.id === id),
            reload: load,
        }}>
            {children}
        </CalCtx.Provider>
    );
}

export function useCalendar() {
    const ctx = useContext(CalCtx);
    if (!ctx) throw new Error('useCalendar must be inside CalendarProvider');
    return ctx;
}