import Link from "next/link";
import { Chip } from "./Chip";

export default function FeaturedPost({ post }) {
  return (
    <section className="container px-4 mx-auto mt-6">
      <div className="rounded-xl bg-white p-3 shadow-card md:p-5">
        <div className="overflow-hidden rounded-lg">
          <img src={post.cover} alt={post.title} className="max-h-[520px] w-full object-cover" />
        </div>
        <div className="px-1 py-5 md:px-2">
          <div className="flex items-center gap-3 text-xs text-brand.subtle">
            <time dateTime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>
          <h2 className="mt-2 text-2xl md:text-3xl font-bold tracking-tight">
            <Link href={`/posts/${post.slug}`} className="hover:text-brand.accent">
              {post.title}
            </Link>
          </h2>
          <p className="mt-2 text-sm text-slate-600">{post.excerpt}</p>
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-brand.subtle">{post.author}</div>
            <Chip>{post.category}</Chip>
          </div>
        </div>
      </div>
    </section>
  );
}
