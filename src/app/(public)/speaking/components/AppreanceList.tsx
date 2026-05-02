'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

export type AppearanceType =
    | 'university'
    | 'college-mentorship'
    | 'meetup'
    | 'webinar'
    | 'workshop';

export type Appearance = {
    id: number;
    type: AppearanceType;
    title: string;
    institution: string;
    date: string;
    audienceSize: number;
    description: string;
    photo?: string;
    tags: string[];
};

const TYPE_LABELS: Record<AppearanceType, string> = {
    'university': 'university lecture',
    'college-mentorship': 'college mentorship',
    'meetup': 'tech meetup',
    'webinar': 'online / webinar',
    'workshop': 'workshop',
};

const TYPE_COLORS: Record<AppearanceType, string> = {
    'university': 'var(--accent)',
    'college-mentorship': '#7F77DD',
    'meetup': '#1D9E75',
    'webinar': '#378ADD',
    'workshop': '#D85A30',
};

// Placeholder data — replace with your real appearances
const APPEARANCES: Appearance[] = [
    {
        id: 1,
        type: 'university',
        title: 'From zero to production: building cloud-native apps on a budget',
        institution: 'Delhi Technological University',
        date: '2024-09-15',
        audienceSize: 120,
        description: 'A guest lecture for final-year CS students on practical cloud architecture — covering how to design, deploy, and operate a production system without enterprise budgets. Covered AWS, Docker, and real incident stories from startup life.',
        photo: '/images/speaking/dtu-2024.jpg',
        tags: ['AWS', 'Docker', 'cloud', 'startup'],
    },
    {
        id: 2,
        type: 'college-mentorship',
        title: 'Career paths in tech: from developer to CTO',
        institution: 'Guru Gobind Singh Indraprastha University',
        date: '2024-07-10',
        audienceSize: 60,
        description: 'A mentorship session with pre-final-year students on navigating a tech career — covering how to pick your first role, how to grow fast, and what the path from individual contributor to technical leadership actually looks like.',
        photo: '/images/speaking/ggsipu-2024.jpg',
        tags: ['career', 'leadership', 'startup', 'mentorship'],
    },
    {
        id: 3,
        type: 'workshop',
        title: 'Hands-on DevOps: CI/CD from scratch in 3 hours',
        institution: 'GDG Delhi',
        date: '2024-04-20',
        audienceSize: 45,
        description: 'A practical workshop where participants built a full CI/CD pipeline from scratch — GitHub Actions, Docker, EC2 deployment, and zero-downtime rolling restarts. Everyone left with a working pipeline on their own project.',
        photo: '/images/speaking/gdg-workshop-2024.jpg',
        tags: ['DevOps', 'CI/CD', 'Docker', 'GitHub Actions'],
    },
    {
        id: 4,
        type: 'webinar',
        title: 'Data science without a GPU: ML in production on cheap hardware',
        institution: 'Online — LinkedIn Live',
        date: '2024-02-08',
        audienceSize: 310,
        description: 'A live session on running useful ML workloads without expensive GPU infrastructure. Covered model quantisation, batched inference, and the architecture decisions that let you serve ML predictions on a ₹500/month server.',
        photo: '/images/speaking/linkedin-live-2024.jpg',
        tags: ['ML', 'data science', 'inference', 'optimisation'],
    },
    {
        id: 5,
        type: 'meetup',
        title: 'The real cost of your AWS bill — and how to cut it',
        institution: 'AWS Community Day India',
        date: '2023-11-18',
        audienceSize: 90,
        description: 'A talk at the AWS Community Day sharing specific cost optimisation patterns from real startup audits — over-provisioned instances, forgotten environments, and the five-minute fixes that collectively save thousands per month.',
        photo: '/images/speaking/aws-community-day-2023.jpg',
        tags: ['AWS', 'cost optimisation', 'cloud audit'],
    },
    {
        id: 6,
        type: 'college-mentorship',
        title: 'Building your first product: what college projects don\'t teach you',
        institution: 'NSUT — Netaji Subhas University of Technology',
        date: '2023-08-25',
        audienceSize: 80,
        description: 'An honest session on the gap between academic projects and production software — focusing on database design, API security, deployment basics, and how to think about user feedback when you actually have users.',
        photo: '/images/speaking/nsut-2023.jpg',
        tags: ['product', 'engineering', 'startup', 'students'],
    },
];

const ALL_TYPES = Object.keys(TYPE_LABELS) as AppearanceType[];

function AppearanceCard({ appearance, index }: { appearance: Appearance; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.1 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    const color = TYPE_COLORS[appearance.type];

    return (
        <div ref={ref} style={{
            background: 'var(--bg-surface)',
            border: '0.5px solid var(--border)',
            borderRadius: '12px',
            overflow: 'hidden',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(16px)',
            transition: `opacity 0.4s ease ${index * 0.07}s, transform 0.4s ease ${index * 0.07}s, border-color 0.15s`,
        }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--border-hover)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
        >
            {/* Photo */}
            {appearance.photo && (
                <div style={{ position: 'relative', height: '180px', background: 'var(--bg-elevated)', overflow: 'hidden' }}>
                    <Image
                        src={appearance.photo}
                        alt={appearance.title}
                        fill
                        sizes="(max-width: 860px) 100vw, 420px"
                        style={{ objectFit: 'cover' }}
                    />
                    {/* Overlay with type badge */}
                    <div style={{
                        position: 'absolute', top: '12px', left: '12px',
                        fontFamily: 'var(--font-mono)', fontSize: '10px',
                        padding: '3px 8px', borderRadius: '4px',
                        background: 'var(--bg)',
                        color: color,
                        border: `0.5px solid ${color}`,
                    }}>
                        {TYPE_LABELS[appearance.type]}
                    </div>
                </div>
            )}

            {/* No photo fallback — coloured top bar */}
            {!appearance.photo && (
                <div style={{ height: '4px', background: color }} />
            )}

            <div style={{ padding: '1.25rem' }}>
                {/* Header */}
                {!appearance.photo && (
                    <div style={{
                        fontFamily: 'var(--font-mono)', fontSize: '10px',
                        color, letterSpacing: '0.06em', marginBottom: '8px',
                    }}>
                        {TYPE_LABELS[appearance.type]}
                    </div>
                )}

                <h3 style={{
                    fontFamily: 'var(--font-display)', fontSize: '16px',
                    fontWeight: 700, color: 'var(--text-primary)',
                    letterSpacing: '-0.01em', lineHeight: 1.35,
                    marginBottom: '0.5rem',
                }}>
                    {appearance.title}
                </h3>

                {/* Meta row */}
                <div style={{
                    display: 'flex', gap: '12px', flexWrap: 'wrap',
                    marginBottom: '0.75rem',
                }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-tertiary)' }}>
                        {appearance.institution}
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-tertiary)' }}>
                        {new Date(appearance.date).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                    </span>
                    <span style={{
                        fontFamily: 'var(--font-mono)', fontSize: '11px',
                        color: 'var(--text-secondary)',
                        padding: '1px 6px', borderRadius: '4px',
                        background: 'var(--bg-elevated)',
                        border: '0.5px solid var(--border)',
                    }}>
                        {appearance.audienceSize.toLocaleString('en-IN')} attendees
                    </span>
                </div>

                <p style={{
                    fontSize: '13px', color: 'var(--text-secondary)',
                    lineHeight: 1.7, marginBottom: '1rem',
                }}>
                    {appearance.description}
                </p>

                {/* Tags */}
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {appearance.tags.map(tag => (
                        <span key={tag} style={{
                            fontFamily: 'var(--font-mono)', fontSize: '10px',
                            padding: '2px 8px', borderRadius: '4px',
                            border: '0.5px solid var(--border)',
                            color: 'var(--text-tertiary)',
                        }}>
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function AppearancesList() {
    const [activeType, setActiveType] = useState<AppearanceType | null>(null);

    const filtered = activeType
        ? APPEARANCES.filter(a => a.type === activeType)
        : APPEARANCES;

    return (
        <section id="appearances" style={{ padding: '3rem 2rem 4rem', maxWidth: '860px', margin: '0 auto' }}>

            <div style={{ marginBottom: '2rem' }}>
                <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: '11px',
                    color: 'var(--text-tertiary)', letterSpacing: '0.1em', marginBottom: '6px',
                }}>
          // all appearances
                </div>
                <h2 style={{
                    fontFamily: 'var(--font-display)', fontSize: '28px',
                    fontWeight: 700, letterSpacing: '-0.02em',
                    color: 'var(--text-primary)',
                }}>
                    Where I have spoken
                </h2>
            </div>

            {/* Type filter */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '2rem' }}>
                <button onClick={() => setActiveType(null)} style={{
                    fontFamily: 'var(--font-mono)', fontSize: '11px',
                    padding: '6px 14px', borderRadius: '5px', cursor: 'pointer',
                    border: `0.5px solid ${activeType === null ? 'var(--text-primary)' : 'var(--border)'}`,
                    background: activeType === null ? 'var(--text-primary)' : 'transparent',
                    color: activeType === null ? 'var(--bg)' : 'var(--text-secondary)',
                    transition: 'all 0.15s',
                }}>
                    all
                </button>
                {ALL_TYPES.map(type => (
                    <button key={type} onClick={() => setActiveType(activeType === type ? null : type)} style={{
                        fontFamily: 'var(--font-mono)', fontSize: '11px',
                        padding: '6px 14px', borderRadius: '5px', cursor: 'pointer',
                        border: `0.5px solid ${activeType === type ? TYPE_COLORS[type] : 'var(--border)'}`,
                        background: 'transparent',
                        color: activeType === type ? TYPE_COLORS[type] : 'var(--text-secondary)',
                        transition: 'all 0.15s',
                    }}>
                        {TYPE_LABELS[type]}
                    </button>
                ))}
            </div>

            {/* Post count */}
            <div style={{
                fontFamily: 'var(--font-mono)', fontSize: '11px',
                color: 'var(--text-tertiary)', marginBottom: '1.5rem',
            }}>
                {filtered.length} {filtered.length === 1 ? 'appearance' : 'appearances'}
                {activeType ? ` · ${TYPE_LABELS[activeType]}` : ''}
            </div>

            {/* Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
                gap: '16px',
            }}>
                {filtered.map((a, i) => (
                    <AppearanceCard key={a.id} appearance={a} index={i} />
                ))}
            </div>
        </section>
    );
}