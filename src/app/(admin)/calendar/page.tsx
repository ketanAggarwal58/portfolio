import type { Metadata } from 'next';
import { AuthProvider } from '@/lib/auth';
import { CalendarProvider } from './components/CalendarStore';
import CalendarShell from './components/CalendarShell';

export const metadata: Metadata = {
    title: 'Calendar — Ketan Aggarwal',
    robots: { index: false, follow: false },
};

export default function CalendarPage() {
    return (
        <AuthProvider>
            <CalendarProvider>
                <CalendarShell />
            </CalendarProvider>
        </AuthProvider>
    );
}