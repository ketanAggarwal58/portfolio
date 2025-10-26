import Hero from "@/components/Hero";
import FeaturedPost from "@/components/FeaturedPost";
import PostCard from "@/components/PostCard";
import { getAllPosts } from "@/api/api";

export default async function HomePage() {
  const posts = await getAllPosts({ limit: 10 });

  if (!posts.length) {
    return (
      <>
        <Hero />
        <section className="container mt-10">
          <h2 className="text-2xl font-bold">Featured post</h2>
          <p className="mt-4 text-slate-600">No posts yet.</p>
        </section>
      </>
    );
  }

  const [...rest] = posts;
  const featured = posts.find(p => p.featured === true) || null;

  return (
    <>
      <Hero />
      <section className="container px-4 mx-auto mt-10">
        <h2 className="text-2xl font-bold">Featured post</h2>
      </section>
      <FeaturedPost post={featured} />
      {rest.length > 0 && (
        <section className="container mx-auto mt-8 px-4 grid gap-6 md:grid-cols-2">
          {rest.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </section>
      )}
    </>
  );
}
