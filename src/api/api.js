const BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

// Backend model -> UI model mapper
function mapPost(p) {
  return {
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    cover: p.cover || "/images/featured.jpg", // fallback if empty
    featured: p.featured,
    date: p.publishedOn,    
    body: p.body,                  // ISO string
    readTime: `${p.readTime.toString().padStart(2, "0")} min read`,
    author: p.author,
    category: p.category,
    id: p.id,
  };
}

function mapHome(home) {
  return {
    displayName: home.displayName,
    description: home.description,
    twitterHandle: home.twitterHandle,
    instagramHandle: home.instagramHandle,
    linkedInHandle: home.linkedInHandle,
    githubHandle: home.githubHandle
  }
}

export async function getAllPosts() {
  const url = `${BASE}/blogs/all`

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch posts: ${res.status}`);
  const data = await res.json();
  // The API may return an array or a paginated object; normalize to array
  const list = Array.isArray(data) ? data : data.items || [];
  return list.map(mapPost);
}

export async function getHomeDetails() {
  const url = `${BASE}/home/`

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch posts: ${res.status}`);
  const data = await res.json();
  // The API may return an array or a paginated object; normalize to array
  return data;
}

export async function getPostBySlug(slug) {
  const res = await fetch(`${BASE}/blogs/${slug}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Post not found`);
  const p = await res.json();
  return mapPost(p);
}
