'use client';
import { useEffect, useRef, useState } from 'react';

type Testimonial = {
    quote: string;
    name: string;
    role: string;
    institution: string;
    appearance: string;
};

// Replace with real quotes from students/attendees
const TESTIMONIALS: Testimonial[] = [
    {
        quote: "Ketan's session was the first time someone explained cloud costs in a way that made complete sense to me as a student. He showed us real dashboards, real numbers, real mistakes. It was not a talk — it was a masterclass.",
        name: 'Priya Sharma',
        role: 'Final year, B.Tech CS',
        institution: 'Delhi Technological University',
        appearance: 'From zero to production — Sep 2024',
    },
    {
        quote: "The CI/CD workshop was exactly what I needed. I had been putting off learning DevOps for months because everything online felt overwhelming. Three hours with Ketan and I had a working pipeline on my own project. That is rare.",
        name: 'Arjun Mehta',
        role: 'Software developer',
        institution: 'GDG Delhi Workshop',
        appearance: 'Hands-on DevOps Workshop — Apr 2024',
    },
    {
        quote: "What I appreciated most was the honesty. He talked about what went wrong at his startup, not just what went right. That is the kind of mentorship that actually changes how you think about your career.",
        name: 'Sneha Gupta',
        role: 'Pre-final year, MCA',
        institution: 'NSUT',
        appearance: 'Building your first product — Aug 2023',
    },
    {
        quote: "The LinkedIn Live session on ML without a GPU was a game changer. I had been told I needed expensive hardware to do anything serious in ML. Ketan proved that wrong in 90 minutes with working examples.",
        name: 'Rahul Verma',
        role: 'Data science enthusiast',
        institution: 'Online attendee',
        appearance: 'Data science without a GPU — Feb 2024',
    },
];

export default function TestimonialsSection() {
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

    return (
        <section ref={ref} style={{ padding: '3rem 2rem 4rem', maxWidth: '860px', margin: '0 auto' }}>

            <div style={{ marginBottom: '2.5rem' }}>
                <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: '11px',
                    color: 'var(--text-tertiary)', letterSpacing: '0.1em', marginBottom: '6px',
                }}>
          // what people say
                </div>
                <h2 style={{
                    fontFamily: 'var(--font-display)', fontSize: '28px',
                    fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)',
                }}>
                    From students and attendees
                </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {TESTIMONIALS.map((t, i) => (
                    <div key={i} style={{
                        background: 'var(--bg-surface)',
                        border: '0.5px solid var(--border)',
                        borderRadius: '12px',
                        padding: '1.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        opacity: visible ? 1 : 0,
                        transform: visible ? 'translateY(0)' : 'translateY(14px)',
                        transition: `opacity 0.45s ease ${i * 0.1}s, transform 0.45s ease ${i * 0.1}s`,
                    }}>

                        {/* Quote mark */}
                        <div style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '48px', lineHeight: 1,
                            color: 'var(--accent)', fontWeight: 800,
                            marginBottom: '-12px',
                        }}>
                            "
                        </div>

                        <p style={{
                            fontSize: '14px', color: 'var(--text-secondary)',
                            lineHeight: 1.75, fontStyle: 'italic', flex: 1,
                        }}>
                            {t.quote}
                        </p>

                        <div style={{ borderTop: '0.5px solid var(--border)', paddingTop: '0.75rem' }}>
                            <div style={{
                                fontFamily: 'var(--font-display)', fontSize: '14px',
                                fontWeight: 600, color: 'var(--text-primary)',
                                marginBottom: '2px',
                            }}>
                                {t.name}
                            </div>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-tertiary)', lineHeight: 1.5 }}>
                                {t.role} · {t.institution}
                            </div>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--accent)', marginTop: '4px' }}>
                                {t.appearance}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}