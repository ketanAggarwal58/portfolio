"use client";

import { useState } from "react";
import ArticleEditor from "@/components/ArticleEditor";

export default function NewArticlePage() {
  const [form, setForm] = useState({
    slug: "",
    title: "",
    excerpt: "",
    category: "",
    cover: "",
    readTime: 3,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const onSave = async (html) => {
    setSaving(true);
    setError("");
    try {
      const payload = {
        slug: form.slug.trim(),
        title: form.title.trim(),
        excerpt: form.excerpt.trim(),
        category: form.category || "General",
        cover: form.cover || "",
        readTime: Number(form.readTime) || 3,
        html, // sanitized from editor
      };

      const res = await fetch("/api/admin/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const t = await res.text();
        throw new Error(t || "Failed to save");
      }
      alert("Article saved!");
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const onChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <h1 className="text-2xl font-bold">New Article</h1>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Slug</label>
            <input name="slug" value={form.slug} onChange={onChange} className="w-full border rounded p-2" placeholder="my-article-slug" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input name="title" value={form.title} onChange={onChange} className="w-full border rounded p-2" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Excerpt</label>
            <textarea name="excerpt" rows={3} value={form.excerpt} onChange={onChange} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <input name="category" value={form.category} onChange={onChange} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Cover URL</label>
            <input name="cover" value={form.cover} onChange={onChange} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Read time (min)</label>
            <input type="number" min="1" name="readTime" value={form.readTime} onChange={onChange} className="w-full border rounded p-2" />
          </div>
        </div>
        {error && <p className="text-red-600 text-sm">{error}</p>}
      </div>

      <ArticleEditor onSave={onSave} />

      <div className="flex justify-end">
        <button disabled={saving} onClick={() => document.querySelector("button:contains('Save Article')")?.click()}
                className="px-5 py-2 rounded bg-blue-600 text-white">
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}
