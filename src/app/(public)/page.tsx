import type { Metadata } from 'next';

import HeroSection from '@/app/(public)/components/HeroSection';
import SkillsSection from '@/app/(public)/components/SkillsSection';
import AuditSection from '@/app/(public)/components/AuditSection';
import BlogSection from '@/app/(public)/components/BlogSection';
import RecruiterSection from '@/app/(public)/components/RecruiterSection';


export const metadata: Metadata = {
  title: 'Ketan Aggarwal — Full Stack · DevOps · Data Science',
  description:
    'Engineer, builder, and ex-CTO. I write about cloud infrastructure, ML experiments, and systems thinking. Available for cloud audits and new opportunities.',
  openGraph: {
    title: 'Ketan Aggarwal',
    description: 'Full stack, DevOps, and Data Science engineer based in India.',
    url: 'https://ketanaggarwal.dev',
    siteName: 'ketanaggarwal.dev',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Ketan Aggarwal',
    description: 'Full stack, DevOps, and Data Science engineer based in India.',
  },
  alternates: {
    canonical: 'https://ketanaggarwal.dev',
  },
};

export default function HomePage() {
  return (
    <>
      <main>
        <HeroSection />
        <SkillsSection />
        {/* <AuditSection /> */}
        <BlogSection />
        <RecruiterSection />
      </main>

    </>
  );
}