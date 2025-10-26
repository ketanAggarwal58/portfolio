import { posts } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import { getAllPosts } from "@/api/api";

export default async function CategoryPage() {
  
  let posts;
  posts = await getAllPosts({ limit: 10 });
  let categories = [];
  const seen = new Set();
  posts.map((p, index) => {
    if (p?.category && !seen.has(p.category)) {
      seen.add(p.category);
      categories.push({ id: index, category: p.category });
    }
  });

  return (
    <section className="container mt-10 mx-auto">
      <h1 className="text-3xl mx-auto p-3 font-bold">Categories</h1>
      <div className="mt-6 flex flex-wrap gap-2">
        {categories.map((c) => (
          <span key={c.id} className="rounded-full bg-slate-100 ml-3 px-3 py-1 text-sm">{c.category}</span>
        ))}
      </div>
      <div className="mt-8 p-3 grid gap-6 md:grid-cols-2">
        {posts.map((p) => (
          <PostCard key={p.slug} post={p} />
        ))}
      </div>
    </section>
  );
}
