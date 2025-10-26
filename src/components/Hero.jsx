import Avatar from "./Avatar";
import Link from "next/link";
import { Twitter, Linkedin, Instagram, Github } from 'lucide-react';
import { getHomeDetails } from "@/api/api";

export default async function Hero() {
  const home = await getHomeDetails();

  return (
    <section className="container mx-auto text-center">
      <div className="mx-auto mt-5 inline-block rounded-full bg-white p-1 shadow-card">
        <Avatar />
      </div>
      <h1 className="mt-5 font-display text-4xl md:text-5xl tracking-tight text-brand">
      {home.displayName}
      </h1>
      <p className="mx-auto mt-3 text-justify px-4 py-0 max-w-2xl text-sm text-slate-600">
        {home.description}
      </p>
      <div className="mt-4 flex items-center justify-center gap-4 text-brand.subtle text-sm">
        <span>Follow me</span>
        <div className="flex gap-3">
          <Link href={home.instagramHandle} className="hover:text-brand.accent"><Instagram size={20} /></Link>
          <Link href={home.twitterHandle} className="hover:text-brand.accent"><Twitter size={20} /></Link>
          <Link href={home.linkedInHandle} className="hover:text-brand.accent"><Linkedin size={20} /></Link>
          <Link href={home.githubHandle} className="hover:text-brand.accent"><Github size={20} /></Link>
        </div>
      </div>
    </section>
  );
}
