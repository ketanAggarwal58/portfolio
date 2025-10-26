"use client";
import { useEffect, useState } from "react";

export default function Media() {
  const [files, setFiles] = useState([]);
  const [library, setLibrary] = useState([]);
  const [uploading, setUploading] = useState(false);

  const loadLibrary = async () => {
    const r = await fetch("/api/admin/media");
    const { items } = await r.json();
    setLibrary(items);
  };

  useEffect(() => { loadLibrary(); }, []);

  const onFileChange = (e) => setFiles(Array.from(e.target.files || []));

  const upload = async () => {
    if (!files.length) return;
    setUploading(true);
    try {
      const form = new FormData();
      files.forEach((f) => form.append("files", f)); // multi-upload
      const r = await fetch("/api/admin/media", { method: "POST", body: form });
      if (!r.ok) throw new Error(await r.text());
      await loadLibrary();
      setFiles([]);
      alert("Uploaded");
    } catch (e) {
      alert(`Upload failed: ${e.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <section className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Media Library</h1>

      <div className="bg-white p-4 rounded border space-y-3">
        <div className="flex items-center gap-3">
          <input type="file" multiple accept="image/*,video/*" onChange={onFileChange} />
          <button
            onClick={upload}
            disabled={uploading || files.length === 0}
            className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>
        {files.length > 0 && (
          <p className="text-sm text-slate-600">{files.length} file(s) selected</p>
        )}
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-3">Library</h2>
        <div className="grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
          {library.map((item) => (
            <div key={item.id} className="border rounded overflow-hidden bg-white">
              <div className="aspect-video bg-slate-50 flex items-center justify-center">
                {item.type.startsWith("image/") ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.url} alt={item.filename} className="object-cover w-full h-full" />
                ) : item.type.startsWith("video/") ? (
                  <video src={item.url} controls className="object-cover w-full h-full" />
                ) : (
                  <span className="text-sm text-slate-500 p-2">Unsupported</span>
                )}
              </div>
              <div className="p-2">
                <p className="text-xs truncate" title={item.filename}>{item.filename}</p>
                <button
                  className="mt-2 text-xs text-blue-600"
                  onClick={() => navigator.clipboard.writeText(item.url)}
                >
                  Copy URL
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
