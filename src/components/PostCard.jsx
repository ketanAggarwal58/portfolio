import Link from "next/link";
import { Chip } from "./Chip";

export default function PostCard({ post }) {
  return (
    <article className="overflow-hidden rounded-xl bg-white shadow-card transition hover:-translate-y-0.5">
      <Link href={`/posts/${post.slug}`} className="block">
        <img src={post.cover} alt={post.title} className="h-56 w-full object-cover" />
      </Link>
      <div className="space-y-3 p-5">
        <div className="flex items-center gap-3 text-xs text-brand.subtle">
          <time dateTime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>
        <h3 className="text-xl font-semibold tracking-tight">
          <Link href={`/posts/${post.slug}`} className="hover:text-brand.accent">
            {post.title}
          </Link>
        </h3>
        <p className="line-clamp-2 text-sm text-slate-600">{post.excerpt}</p>
        <div className="flex items-center justify-between pt-1">
          <div className="text-sm text-brand.subtle">{post.author}</div>
          <Chip>{post.category}</Chip>
        </div>
      </div>
    </article>
  );
}
