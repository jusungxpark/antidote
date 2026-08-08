"use client";

import { useState } from "react";
import {
  BLOG_POSTS,
  type BlogPost,
} from "./blog-posts-data";

type BlogBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string };

function parseBlogBody(body: string): BlogBlock[] {
  return body
    .split(/\n\n+/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk) => {
      if (chunk.startsWith("### ")) {
        return { type: "h3" as const, text: chunk.slice(4).trim() };
      }
      if (chunk.startsWith("## ")) {
        return { type: "h2" as const, text: chunk.slice(3).trim() };
      }
      return { type: "p" as const, text: chunk };
    });
}

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
              <span className="blog-post-row-series">{post.series}</span>
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
  const blocks = parseBlogBody(post.body);

  return (
    <article className="blog-overlay-panel blog-overlay-panel--reader">
      <button type="button" className="blog-back" onClick={onBack}>
        <span className="blog-back-mark" aria-hidden="true">
          ↳
        </span>
        Blog
      </button>

      <header className="blog-reader-header">
        <p className="blog-post-row-series">{post.series}</p>
        <h1 className="blog-reader-title">{post.title}</h1>
        <p className="blog-reader-dek">{post.dek}</p>
        <p className="blog-reader-meta">
          {post.dateLabel}
          <span aria-hidden="true"> · </span>
          {post.authors[0]}
        </p>
      </header>

      <div className="blog-reader-body">
        {blocks.map((block, index) => {
          if (block.type === "h2") {
            return (
              <h2 key={`${block.type}-${index}`} className="blog-reader-h2">
                {block.text}
              </h2>
            );
          }
          if (block.type === "h3") {
            return (
              <h3 key={`${block.type}-${index}`} className="blog-reader-h3">
                {block.text}
              </h3>
            );
          }
          return (
            <p key={`${block.type}-${index}`} className="blog-reader-p">
              {block.text}
            </p>
          );
        })}
      </div>

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

export function BlogOverlay() {
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  return (
    <div className="blog-overlay">
      {activePost ? (
        <BlogPostReader post={activePost} onBack={() => setActivePost(null)} />
      ) : (
        <BlogPostList onSelect={setActivePost} />
      )}
    </div>
  );
}
