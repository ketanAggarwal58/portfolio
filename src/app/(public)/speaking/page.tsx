import type { Metadata } from 'next';
import SpeakingHero from './components/SpeakingHero';
import AppearancesList from './components/AppreanceList';
import TestimonialsSection from './components/TestimonialSection';
import SpeakingCTA from './components/SpeakingCta';

export const metadata: Metadata = {
    title: 'Speaking & Mentorship — Ketan Aggarwal',
    description:
        'Guest lectures, college mentorship sessions, tech meetups, and workshops. Ketan Aggarwal speaks on cloud engineering, DevOps, data science, and building startups from zero.',
    openGraph: {
        title: 'Speaking & Mentorship — Ketan Aggarwal',
        description: 'University lectures, workshops, and mentorship sessions on cloud, DevOps, and startup engineering.',
        url: 'https://ketanaggarwal.dev/speaking',
    },
    alternates: { canonical: 'https://ketanaggarwal.dev/speaking' },
    keywords: [
        'guest lecture India',
        'tech speaker India',
        'cloud engineering workshop',
        'DevOps mentor',
        'startup speaker college',
    ],
};

export default function SpeakingPage() {
    return (
        <>
            <main>
                <SpeakingHero />
                <AppearancesList />
                <TestimonialsSection />
                <SpeakingCTA />
            </main>
        </>
    );
}