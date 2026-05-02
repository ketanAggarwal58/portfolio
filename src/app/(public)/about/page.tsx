import type { Metadata } from 'next';
import AboutHero from './components/AboutHero';
import PhilosophySection from './components/PhilosophySection';
import TimelineSection from './components/TimelineSection';
import NowSection from './components/NowSection';

export const metadata: Metadata = {
    title: 'About — Ketan Aggarwal',
    description:
        'The story behind the engineer. How I went from founding CTO at a bootstrap startup to building systems, auditing clouds, and chasing GPU dreams.',
    openGraph: {
        title: 'About Ketan Aggarwal',
        description: 'Engineer, builder, ex-CTO. The story behind the work.',
        url: 'https://ketanaggarwal.dev/about',
    },
    alternates: { canonical: 'https://ketanaggarwal.dev/about' },
};

export default function AboutPage() {
    return (
        <>
            <main>
                <AboutHero />
                <PhilosophySection />
                <TimelineSection />
                <NowSection />
            </main>
        </>
    );
}