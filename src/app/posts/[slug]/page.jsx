import { notFound } from "next/navigation";
import { posts } from "@/lib/posts";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt },
  };
}

export default function PostPage({ params }) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return notFound();

  return (
    <article className="container prose prose-slate mx-auto mt-10 max-w-3xl bg-white p-6 md:p-10 rounded-xl shadow-card">
      <h1>{post.title}</h1>
      <p className="text-sm text-slate-500">
        {new Date(post.date).toLocaleDateString()} • {post.readTime} • {post.author}
      </p>
      <img src={post.cover} alt={post.title} />
      <p>
        This is where the post body will go. Replace this with content from your CMS or markdown.
      </p>
    </article>
  );
}
