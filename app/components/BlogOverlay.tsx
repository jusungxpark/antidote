"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  BLOG_PATH,
  BLOG_POSTS,
  blogPostPath,
  getBlogPostBySlug,
  type BlogPost,
} from "./blog-posts-data";

function BlogPostList({
  onSelect,
}: {
  onSelect: (post: BlogPost) => void;
}) {
  return (
    <div className="blog-overlay-panel">
      <header className="blog-overlay-header">
        <h2 className="blog-overlay-title">Blog</h2>
      </header>

      <ul className="blog-post-list">
        {BLOG_POSTS.map((post) => (
          <li key={post.slug}>
            <button
              type="button"
              className="blog-post-row"
              onClick={() => onSelect(post)}
            >
              {post.series ? (
                <span className="blog-post-row-series">{post.series}</span>
              ) : null}
              <span className="blog-post-row-title">{post.title}</span>
              <span className="blog-post-row-dek">{post.dek}</span>
              <span className="blog-post-row-meta">
                {post.dateLabel}
                <span aria-hidden="true"> · </span>
                {post.authors[0]}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function BlogPostReader({
  post,
  onBack,
}: {
  post: BlogPost;
  onBack: () => void;
}) {
  const [html, setHtml] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setHtml(null);
    setError(null);

    fetch(`/api/blog/${post.slug}`)
      .then(async (response) => {
        const data = (await response.json()) as {
          html?: string;
          error?: string;
        };
        if (!response.ok) {
          throw new Error(data.error ?? "Failed to load post");
        }
        if (!data.html) throw new Error("Empty post body");
        if (!cancelled) setHtml(data.html);
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load post");
        }
      });

    return () => {
      cancelled = true;
    };
  }, [post.slug]);

  return (
    <article className="blog-overlay-panel blog-overlay-panel--reader">
      <button type="button" className="blog-back" onClick={onBack}>
        <span className="blog-back-mark" aria-hidden="true">
          ↳
        </span>
        Blog
      </button>

      <header className="blog-reader-header">
        {post.series ? (
          <p className="blog-post-row-series">{post.series}</p>
        ) : null}
        <h1 className="blog-reader-title">{post.title}</h1>
        <p className="blog-reader-dek">{post.dek}</p>
        <p className="blog-reader-meta">
          {post.dateLabel}
          <span aria-hidden="true"> · </span>
          {post.authors[0]}
        </p>
      </header>

      {error ? (
        <p className="blog-reader-status">
          Couldn’t load the essay ({error}).{" "}
          <a href={post.substackUrl} target="_blank" rel="noopener noreferrer">
            Read on Substack
          </a>
        </p>
      ) : html ? (
        <div
          className="blog-reader-prose"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <p className="blog-reader-status">Loading essay…</p>
      )}

      <footer className="blog-reader-footer">
        <a
          href={post.substackUrl}
          className="blog-substack-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Originally published on Substack
          <span aria-hidden="true"> ↗</span>
        </a>
      </footer>
    </article>
  );
}

export function BlogOverlay({ slug }: { slug?: string | null }) {
  const router = useRouter();
  const post = slug ? getBlogPostBySlug(slug) : undefined;

  if (post) {
    return (
      <div className="blog-overlay">
        <BlogPostReader post={post} onBack={() => router.push(BLOG_PATH)} />
      </div>
    );
  }

  return (
    <div className="blog-overlay">
      <BlogPostList
        onSelect={(next) => router.push(blogPostPath(next.slug))}
      />
    </div>
  );
}
