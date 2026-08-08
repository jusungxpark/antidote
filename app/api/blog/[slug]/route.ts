import { NextResponse } from "next/server";
import {
  getBlogPostBySlug,
  getSubstackPostApiUrl,
  sanitizeSubstackHtml,
} from "../../../components/blog-posts-data";

export const revalidate = 3600;

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { slug } = await context.params;
  const post = getBlogPostBySlug(slug);
  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  const apiUrl = getSubstackPostApiUrl(post);
  if (!apiUrl) {
    return NextResponse.json(
      { error: "Invalid Substack URL" },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(apiUrl, {
      headers: {
        Accept: "application/json",
        "User-Agent": "AntidoteBlog/1.0",
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Substack returned ${response.status}` },
        { status: 502 }
      );
    }

    const data = (await response.json()) as {
      title?: string;
      subtitle?: string;
      body_html?: string;
    };

    const html = sanitizeSubstackHtml(data.body_html ?? "");
    if (!html.trim()) {
      return NextResponse.json(
        { error: "Substack post had empty body" },
        { status: 502 }
      );
    }

    return NextResponse.json({
      slug: post.slug,
      title: data.title ?? post.title,
      subtitle: data.subtitle ?? post.dek,
      html,
      substackUrl: post.substackUrl,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch Substack post" },
      { status: 502 }
    );
  }
}
