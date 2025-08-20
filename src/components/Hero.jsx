import Avatar from "./Avatar";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="container mt-10 ml-20 text-center">
      <div className="mx-auto inline-block rounded-full bg-white p-1 shadow-card">
        <Avatar />
      </div>
      <h1 className="mt-5 font-display text-4xl md:text-5xl tracking-tight text-brand">
        KETAN AGGARWAL
      </h1>
      <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600">
        A software engineer and curious learner on a journey of constant reinvention. I write to share my thoughts, experiments, and lessons from both work and life—hoping to spark ideas that last beyond the moment.
      </p>
      <div className="mt-4 flex items-center justify-center gap-4 text-brand.subtle text-sm">
        <span>Follow me</span>
        <div className="flex gap-3">
          <Link href="#" className="hover:text-brand.accent">Fb</Link>
          <Link href="#" className="hover:text-brand.accent">Tw</Link>
          <Link href="#" className="hover:text-brand.accent">In</Link>
          <Link href="#" className="hover:text-brand.accent">V</Link>
        </div>
      </div>
    </section>
  );
}
