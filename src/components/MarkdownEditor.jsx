"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import MDEditor from "@uiw/react-md-editor";

// Client-only import
// const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export default function MarkdownEditor({
  value,
  onChange,
  height = 420,
  placeholder = "Write your post content in Markdown…",
  onInsertImage, // optional: callback that returns a URL to insert
}) {
  const [md, setMd] = useState(value || "");

  useEffect(() => {
    // sync external value changes (e.g., load draft)
    setMd(value || "");
  }, [value]);

  const handleChange = (v) => {
    const next = v ?? "";
    setMd(next);
    onChange?.(next);
  };

  const extraCommands = useMemo(() => {
    if (!onInsertImage) return [];
    return [
      {
        name: "media",
        keyCommand: "media",
        buttonProps: { "aria-label": "Insert image from library", title: "Insert image" },
        icon: <span>🖼️</span>,
        execute: async (state, api) => {
          try {
            const url = await onInsertImage();
            if (!url) return;
            const snippet = `![alt text](${url})`;
            api.replaceSelection(snippet);
          } catch {}
        },
      },
    ];
  }, [onInsertImage]);

  return (
    <div data-color-mode="light" className="space-y-2">
      <MDEditor
        value={md}
        onChange={handleChange}
        height={height}
        preview="edit" // "edit" | "live" | "preview"
        visibleDragbar={false}
        textareaProps={{ placeholder }}
        extraCommands={extraCommands}
      />
      <div className="prose prose-slate max-w-none bg-white border rounded-md p-4">
        <MDEditor.Markdown source={md || "Start typing Markdown to see a preview…"} />
      </div>
    </div>
  );
}
