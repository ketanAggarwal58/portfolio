import { NextResponse } from "next/server";
import { contentManager } from "@/lib/content-manager";

export async function GET() {
  try {
    const posts = await contentManager.getAllPosts();
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const postData = await request.json();
    const savedPost = await contentManager.savePost(postData.slug, postData);
    return NextResponse.json(savedPost);
  } catch (error) {
    return NextResponse.json({ error: "Failed to save post" }, { status: 500 });
  }
}
