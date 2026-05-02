export type ContextColor =
  | '#e8ff5a' | '#7F77DD' | '#1D9E75' | '#D85A30'
  | '#378ADD' | '#D4537E' | '#639922' | '#BA7517';

export type Context = {
  id: number;
  name: string;
  color: string;
  icon: string;
  visible: boolean;
  sortOrder: number;
};

export type Priority = 'P1' | 'P2' | 'P3';
export type TaskStatus = 'todo' | 'in_progress' | 'done';

export type CalEvent = {
  id: number;
  contextId: number;
  title: string;
  startAt: string;
  endAt: string;
  allDay: boolean;
  location?: string;
  notes?: string;
  recurrenceRule?: string;
  colorOverride?: string;
  sharedWith?: number[];
};

export type Subtask = {
  id: number;
  taskId: number;
  title: string;
  completed: boolean;
  sortOrder: number;
};

export type Task = {
  id: number;
  contextId: number;
  title: string;
  dueAt?: string;
  scheduledAt?: string;
  priority: Priority;
  status: TaskStatus;
  parentTaskId?: number;
  timeBlockMins?: number;
  recurrenceRule?: string;
  notes?: string;
  subtasks?: Subtask[];
};

const CMS = process.env.NEXT_PUBLIC_CMS_URL ?? 'http://localhost:8080';
function h(token: string) {
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };
}

export const calApi = {
  getContexts: (token: string) =>
    fetch(`${CMS}/api/calendar/contexts`, { headers: h(token) }).then(r => r.json()) as Promise<Context[]>,
  saveContext: (token: string, ctx: Partial<Context> & { id?: number }) =>
    fetch(`${CMS}/api/calendar/contexts${ctx.id ? `/${ctx.id}` : ''}`, {
      method: ctx.id ? 'PUT' : 'POST', headers: h(token), body: JSON.stringify(ctx),
    }).then(r => r.json()),
  deleteContext: (token: string, id: number) =>
    fetch(`${CMS}/api/calendar/contexts/${id}`, { method: 'DELETE', headers: h(token) }),
  getEvents: (token: string, from: string, to: string) =>
    fetch(`${CMS}/api/calendar/events?from=${from}&to=${to}`, { headers: h(token) }).then(r => r.json()) as Promise<CalEvent[]>,
  saveEvent: (token: string, ev: Partial<CalEvent> & { id?: number }) =>
    fetch(`${CMS}/api/calendar/events${ev.id ? `/${ev.id}` : ''}`, {
      method: ev.id ? 'PUT' : 'POST', headers: h(token), body: JSON.stringify(ev),
    }).then(r => r.json()),
  deleteEvent: (token: string, id: number) =>
    fetch(`${CMS}/api/calendar/events/${id}`, { method: 'DELETE', headers: h(token) }),
  getTasks: (token: string, from?: string, to?: string) => {
    const q = from && to ? `?from=${from}&to=${to}` : '';
    return fetch(`${CMS}/api/calendar/tasks${q}`, { headers: h(token) }).then(r => r.json()) as Promise<Task[]>;
  },
  saveTask: (token: string, task: Partial<Task> & { id?: number }) =>
    fetch(`${CMS}/api/calendar/tasks${task.id ? `/${task.id}` : ''}`, {
      method: task.id ? 'PUT' : 'POST', headers: h(token), body: JSON.stringify(task),
    }).then(r => r.json()),
  deleteTask: (token: string, id: number) =>
    fetch(`${CMS}/api/calendar/tasks/${id}`, { method: 'DELETE', headers: h(token) }),
  saveSubtask: (token: string, sub: Partial<Subtask> & { id?: number }) =>
    fetch(`${CMS}/api/calendar/subtasks${sub.id ? `/${sub.id}` : ''}`, {
      method: sub.id ? 'PUT' : 'POST', headers: h(token), body: JSON.stringify(sub),
    }).then(r => r.json()),
};

export function isoDate(d: Date) { return d.toISOString().slice(0, 10); }
export function addDays(d: Date, n: number): Date { const r = new Date(d); r.setDate(r.getDate() + n); return r; }
export function startOfWeek(d: Date): Date {
  const day = new Date(d);
  const diff = day.getDay() === 0 ? -6 : 1 - day.getDay();
  day.setDate(day.getDate() + diff);
  day.setHours(0, 0, 0, 0);
  return day;
}
export function startOfMonth(d: Date): Date { return new Date(d.getFullYear(), d.getMonth(), 1); }
export function endOfMonth(d: Date): Date { return new Date(d.getFullYear(), d.getMonth() + 1, 0); }
export function sameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
export function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
}
export function formatMonthYear(d: Date): string {
  return d.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
}
export const PRIORITY_COLORS: Record<Priority, string> = { P1: '#e24b4a', P2: '#EF9F27', P3: '#1D9E75' };

export const DEFAULT_CONTEXTS: Context[] = [
  { id: 1, name: 'Office',       color: '#378ADD', icon: '◈', visible: true, sortOrder: 0 },
  { id: 2, name: 'Side project', color: '#e8ff5a', icon: '◆', visible: true, sortOrder: 1 },
  { id: 3, name: 'Personal',     color: '#7F77DD', icon: '○', visible: true, sortOrder: 2 },
  { id: 4, name: 'Health',       color: '#1D9E75', icon: '◇', visible: true, sortOrder: 3 },
  { id: 5, name: 'Learning',     color: '#D85A30', icon: '△', visible: true, sortOrder: 4 },
];