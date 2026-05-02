import type { Metadata } from 'next';

import WhyAuditHero from './components/WhyAuditHero';
import PainPoints from './components/PainPoints';
import ImpactSection from './components/ImpactSection';
import QuarterlySection from './components/QuarterlySection';
import ClosingCTA from './components/ClosingCTA';

export const metadata: Metadata = {
    title: 'Why audit your cloud infrastructure? — Ketan Aggarwal',
    description:
        'Most Indian startups are overpaying their cloud bill by 30–60% and do not know it. Here is why a quarterly infrastructure audit is the highest-ROI thing you can do for your engineering budget.',
    openGraph: {
        title: 'Why audit your cloud infrastructure?',
        description: 'Most startups overpay their cloud bill by 30–60%. Here is why a quarterly audit fixes that — and more.',
        url: 'https://ketanaggarwal.dev/why-audit',
    },
    alternates: { canonical: 'https://ketanaggarwal.dev/why-audit' },
    keywords: [
        'cloud audit India',
        'AWS cost optimisation India',
        'infrastructure audit startup',
        'DevOps consultant India',
        'cloud cost reduction',
        'GCP audit India',
    ],
};

export default function WhyAuditPage() {
    return (
        <>
            <main>
                <WhyAuditHero />
                <PainPoints />
                <ImpactSection />
                <QuarterlySection />
                <ClosingCTA />
            </main>
        </>
    );
}