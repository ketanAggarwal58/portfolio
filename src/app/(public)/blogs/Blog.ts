export type BlogPost = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  tag: string;
  readTime: number;
  viewCount: number;
  publishedAt: string;
  featured: boolean;
};

export type BlogListResponse = {
  posts: BlogPost[];
  total: number;
  tags: string[];
};

const CMS_URL = process.env.SPRING_BOOT_URL ?? 'http://localhost:8080';

export async function fetchPosts(params?: {
  tag?: string;
  q?: string;
}): Promise<BlogListResponse> {
  const url = new URL(`${CMS_URL}/api/posts`);
  if (params?.tag) url.searchParams.set('tag', params.tag);
  if (params?.q)   url.searchParams.set('q', params.q);

  const res = await fetch(url.toString(), {
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
}

export async function fetchPostBySlug(slug: string): Promise<BlogPost & { content: string }> {
  const res = await fetch(`${CMS_URL}/api/posts/${slug}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error('Post not found');
  return res.json();
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function formatViews(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

// Placeholder data for development before CMS is live
export const PLACEHOLDER_POSTS: BlogPost[] = [
  { id: 1, slug: 'cut-ec2-bill-60-percent',       title: 'How I cut my EC2 bill by 60% without changing instance size',        excerpt: 'Most AWS bills are inflated by a handful of dumb defaults. Here is exactly what I changed and why it worked.',                                              tag: 'devops',       readTime: 5,  viewCount: 2140, publishedAt: '2025-03-10T00:00:00Z', featured: true  },
  { id: 2, slug: 'ml-pipeline-cheap-server',       title: 'Building a lightweight ML pipeline on a ₹500/month server',           excerpt: 'You do not need a GPU to run useful ML in production. Quantisation, batching, and a bit of patience go a long way.',                                  tag: 'data science', readTime: 8,  viewCount: 1870, publishedAt: '2025-02-18T00:00:00Z', featured: false },
  { id: 3, slug: 'lessons-cto-bootstrap',          title: 'What I learned being CTO at a bootstrapped startup before 25',        excerpt: 'The technical decisions were the easy part. Hiring, prioritisation, and saying no to good ideas were not.',                                           tag: 'startup',      readTime: 6,  viewCount: 3210, publishedAt: '2025-01-22T00:00:00Z', featured: false },
  { id: 4, slug: 'docker-compose-ec2-zero-downtime', title: 'Docker Compose on EC2 — a practical zero-downtime deploy setup',   excerpt: 'No k8s, no ECS. Just Compose, Nginx, and a deploy script that actually works every time.',                                                          tag: 'devops',       readTime: 4,  viewCount: 1540, publishedAt: '2024-12-05T00:00:00Z', featured: false },
  { id: 5, slug: 'postgres-indexing-primer',       title: 'The PostgreSQL indexing decisions I wish I had made earlier',         excerpt: 'Slow queries are almost always an indexing problem in disguise. Here is how I think about it now.',                                                  tag: 'databases',    readTime: 7,  viewCount: 980,  publishedAt: '2024-11-14T00:00:00Z', featured: false },
  { id: 6, slug: 'spring-boot-security-checklist', title: 'A practical Spring Boot security checklist for production APIs',      excerpt: 'The default Spring Boot setup is not production-ready. Here is the checklist I use before every go-live.',                                         tag: 'backend',      readTime: 9,  viewCount: 1260, publishedAt: '2024-10-30T00:00:00Z', featured: false },
  { id: 7, slug: 'nginx-reverse-proxy-patterns',   title: 'Nginx reverse proxy patterns I keep using on every project',          excerpt: 'Rate limiting, upstream health checks, and SSL termination — the three Nginx configs that solved real problems.',                                   tag: 'devops',       readTime: 5,  viewCount: 870,  publishedAt: '2024-09-18T00:00:00Z', featured: false },
  { id: 8, slug: 'nextjs-ssg-vs-ssr',              title: 'When to use SSG vs SSR in Next.js — a decision framework',            excerpt: 'The wrong rendering strategy costs you either performance or freshness. Here is how I choose.',                                                    tag: 'frontend',     readTime: 6,  viewCount: 1120, publishedAt: '2024-08-07T00:00:00Z', featured: false },
];