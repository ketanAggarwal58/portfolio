import { notFound } from "next/navigation";
import { getPostBySlug } from "@/api/api";
import DOMPurify from "isomorphic-dompurify";

// export function generateStaticParams() {
//   return posts.map((p) => ({ slug: p.slug }));
// }

// export function generateMetadata({ params }) {
//   const post = posts.find((p) => p.slug === params.slug);
//   if (!post) return {};
//   return {
//     title: post.title,
//     description: post.excerpt,
//     openGraph: { title: post.title, description: post.excerpt },
//   };
// }

export default async function PostPage({ params }) {

  let post;
  try {
    post = await getPostBySlug(params.slug);
  } catch {
    return notFound();
  }

  const clean = DOMPurify.sanitize(post.body, { USE_PROFILES: { html: true } });

  // const post = posts.find((p) => p.slug === params.slug);
  // if (!post) return notFound();

  return (
    <article className="container prose prose-slate mx-auto mt-10 max-w-8xl bg-white p-6 md:p-10 rounded-xl shadow-card">
      <h1 className="text-2xl font-bold mb-5">{post.title}</h1>
      <p className="text-sm text-slate-500 mb-5">
        {new Date(post.date).toLocaleDateString()} • {post.readTime} • {post.author}
      </p>
      {!!post.cover && <img src={post.cover} className="mb-5" alt={post.title} />}
      <div dangerouslySetInnerHTML={{ __html: clean }} />
    </article>
  );
}
