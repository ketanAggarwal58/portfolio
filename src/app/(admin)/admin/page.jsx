import Link from "next/link";
import { getAllPosts } from "@/api/api";

export default async function AdminDashboard() {
  const posts = await getAllPosts();
  const publishedPosts = posts.filter(p => p.status !== "DRAFT");
  const draftPosts = posts.filter(p => p.status === "DRAFT");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <Link 
          href="/admin/posts/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          New Post
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900">Total Posts</h3>
          <p className="text-3xl font-bold text-blue-600">{posts.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900">Published</h3>
          <p className="text-3xl font-bold text-green-600">{publishedPosts.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900">Drafts</h3>
          <p className="text-3xl font-bold text-yellow-600">{draftPosts.length}</p>
        </div>
      </div>

      {/* Recent Posts */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Recent Posts</h2>
        </div>
        <div className="divide-y">
          {posts.slice(0, 5).map((post) => (
            <div key={post.slug} className="px-6 py-4 flex justify-between items-center">
              <div>
                <h3 className="font-medium text-gray-900">{post.title}</h3>
                <p className="text-sm text-gray-500">
                  {new Date(post.date).toLocaleDateString()} • {post.category}
                </p>
              </div>
              <div className="flex space-x-2">
                <Link 
                  href={`/admin/posts/edit/${post.slug}`}
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  Edit
                </Link>
                <Link 
                  href={`/posts/${post.slug}`}
                  className="text-gray-600 hover:text-gray-700 text-sm"
                >
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
