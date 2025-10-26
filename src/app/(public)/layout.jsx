import "../globals.css";
import Link from "next/link";

export const metadata = {
  title: "Ketan Aggarwal",
  description: "A software engineer and curious learner on a journey of constant reinvention. I write to share my thoughts, experiments, and lessons from both work and life—hoping to spark ideas that last beyond the moment.",
};

export default function PublicLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="sticky w-full px-5 py-0 top-0 z-40 border-b border-slate-200/60 bg-white/90 backdrop-blur">
          <nav className="container flex h-14 items-center justify-between mx-auto">
            <Link href="/" className="text-2xl font-bold tracking-tight">
              <img className="mx-auto" src="./logo.svg" width={80} alt="Logo" />
            </Link>
            <ul className="flex items-center gap-6 text-sm text-brand.subtle">
              <li><Link href="/" className="hover:text-brand.accent">Home</Link></li>
              <li><Link href="/category" className="hover:text-brand.accent">Category</Link></li>
              <li><Link href="/about" className="hover:text-brand.accent">About</Link></li>
              <li><Link href="/contact" className="hover:text-brand.accent">Contact</Link></li>
            </ul>
          </nav>
        </header>

        <main>{children}</main>

        <footer className="mt-16 h-10 border-t bg-white">
          <div className="container mx-auto text-center text-sm text-brand.subtle">
            © {new Date().getFullYear()} Ketan Aggarwal. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
