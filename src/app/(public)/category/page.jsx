import { posts } from "@/lib/posts";
import PostCard from "@/components/PostCard";

export default function CategoryPage() {
  const categories = Array.from(new Set(posts.map((p) => p.category)));
  return (
    <section className="container mt-10 ml-20">
      <h1 className="text-3xl font-bold">Categories</h1>
      <div className="mt-6 flex flex-wrap gap-2">
        {categories.map((c) => (
          <span key={c} className="rounded-full bg-slate-100 px-3 py-1 text-sm">{c}</span>
        ))}
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {posts.map((p) => (
          <PostCard key={p.slug} post={p} />
        ))}
      </div>
    </section>
  );
}
