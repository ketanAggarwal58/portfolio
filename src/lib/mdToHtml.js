import { remark } from "remark";
import remarkGfm from "remark-gfm";
import html from "remark-html";

export async function mdToHtml(md) {
  const result = await remark().use(remarkGfm).use(html, { sanitize: false }).process(md || "");
  console.log("converted: ");
  return String(result);
}
