import Hero from "@/components/Hero";
import FeaturedPost from "@/components/FeaturedPost";
import PostCard from "@/components/PostCard";
import { posts } from "@/lib/posts";

export default function HomePage() {
  const [featured, ...rest] = posts;

  return (
    <>
      <Hero />

      <section className="container mt-10 ml-20">
        <h2 className="text-2xl font-bold">Featured post</h2>
      </section>

      <FeaturedPost post={featured} />

      <section className="container mt-8 ml-20 grid gap-6 md:grid-cols-2">
        {rest.map((p) => (
          <PostCard key={p.slug} post={p} />
        ))}
      </section>
    </>
  );
}
