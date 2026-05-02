'use client';
import { useCalendar } from './CalendarStore';
import CalendarSidebar from './CalendarSidebar';
import MonthView from './MonthView';
import WeekView from './WeekView';
import AgendaView from './AgendaView';
import { EventPanel, TaskPanel } from './DetailPanels';
import QuickAdd from './QuickAdd';

export default function CalendarShell() {
    const { viewMode, selectedEventId, selectedTaskId } = useCalendar();

    return (
        <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: 'var(--bg)' }}>
            <CalendarSidebar />

            <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                    {viewMode === 'month' && <MonthView />}
                    {viewMode === 'week' && <WeekView />}
                    {viewMode === 'day' && <WeekView />}
                    {viewMode === 'agenda' && <AgendaView />}
                </div>

                {selectedEventId !== null && <EventPanel />}
                {selectedTaskId !== null && <TaskPanel />}
            </div>

            <QuickAdd />
        </div>
    );
}