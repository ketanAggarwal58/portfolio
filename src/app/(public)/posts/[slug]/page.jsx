import { notFound } from "next/navigation";
import { getPostBySlug } from "@/api/api";
import DOMPurify from "isomorphic-dompurify";
import styles  from "./style.css";
import { mdToHtml } from "@/lib/mdToHtml";

export default async function PostPage({ params }) {
  let post;
  try {
    post = await getPostBySlug(params.slug);
  } catch {
    return notFound();
  }

  // function normalizeHtml(html = "") {
  //   return html
  //     .replace(/\sdata-[a-z0-9\-]+="[^"]*"/gi, "")
  //     .replace(/<div>\s*(?:&nbsp;|\s)*<\/div>/gi, "")
  //     .replace(/&nbsp;/gi, "<br />")
  //     .replace(/<p>\s*<\/p>/gi, "");
  // }

  // function promoteMarkdownLists(html = "") {
  //   if (/<ul[\s>]/i.test(html) || /<ol[\s>]/i.test(html)) return html;
  //   const lines = html.split(/\r?\n/);
  //   let out = [];
  //   let buffering = [];
  //   const flush = () => {
  //     if (buffering.length) {
  //       out.push("<ul>");
  //       buffering.forEach((t) => out.push(`<li>${t.replace(/^-+\s*/, "")}</li>`));
  //       out.push("</ul>");
  //       buffering = [];
  //     }
  //   };
  //   for (const line of lines) {
  //     if (/^\s*-\s+/.test(line)) buffering.push(line.trim());
  //     else { flush(); out.push(line); }
  //   }
  //   flush();
  //   return out.join("\n");
  // }

  // function enforceListStyles(html = "") {
  //   return html
  //     .replace(/<ul(?![^>]*style=)/gi, '<ul style="list-style: disc; padding-left: 1.25rem;"')
  //     .replace(/<ol(?![^>]*style=)/gi, '<ol style="list-style: decimal; padding-left: 1.25rem;"');
  // }

  // let html = post.body || "";
  // html = normalizeHtml(html);
  // html = promoteMarkdownLists(html);
  // html = enforceListStyles(html);

  // const clean = DOMPurify.sanitize(html, {
  //   USE_PROFILES: { html: true },
  //   ALLOWED_ATTR: ["href","target","rel","src","alt","title","style"],
  // });

  const html = post.contentHtml ?? await mdToHtml(post.body || "");
  const clean = DOMPurify.sanitize(html, { USE_PROFILES: { html: true } });

  return (
    <article className="container prose prose-slate mx-auto mt-10 max-w-8xl bg-white p-6 md:p-10 rounded-xl shadow-card">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <p className="text-sm text-slate-500 mb-5">
        {new Date(post.date).toLocaleDateString()} • {post.readTime} • {post.author}
      </p>
      {!!post.cover && <img src={post.cover} className="mb-6 rounded" alt={post.title} />}
      <section className="prose prose-slate max-w-none">
        <div dangerouslySetInnerHTML={{ __html: clean }} />
      </section>
    </article>
  );
}

