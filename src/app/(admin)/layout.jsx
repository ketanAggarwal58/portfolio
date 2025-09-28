import Link from "next/link";
import "../globals.css";

export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="sticky top-0 z-40 border-b border-slate-200/60 bg-white/90 backdrop-blur"></header>
        <div className="min-h-screen bg-gray-50">
          <nav className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex items-center space-x-8">
                  <Link href="/admin" className="text-xl font-bold text-gray-900">
                    Admin Dashboard
                  </Link>
                  <div className="flex space-x-6">
                    <Link href="/admin/posts" className="text-gray-700 hover:text-blue-600">
                      Posts
                    </Link>
                    <Link href="/admin/categories" className="text-gray-700 hover:text-blue-600">
                      Categories
                    </Link>
                    <Link href="/admin/media" className="text-gray-700 hover:text-blue-600">
                      Media
                    </Link>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Link href="/" className="text-gray-700 hover:text-blue-600">
                    View Site
                  </Link>
                  <Link href="/admin/logout" className="text-red-600 hover:text-red-700">
                    Logout
                  </Link>
                </div>
              </div>
            </div>
          </nav>
          <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
        </body>
    </html>
  );
}
