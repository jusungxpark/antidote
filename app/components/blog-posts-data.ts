export type BlogPost = {
  slug: string;
  series?: string;
  title: string;
  dek: string;
  date: string;
  dateLabel: string;
  authors: string[];
  /** Canonical Substack post URL (publication subdomain). */
  substackUrl: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "b2b-services-become-ai-pilled",
    series: "Acquired Intelligence",
    title: "B2B services become AI-pilled.",
    dek: "Why the future of B2B services is AI-native, why context is so important, and what that all means for who wins the next decade?",
    date: "2026-08-25",
    dateLabel: "Aug 25, 2026",
    authors: ["Akash Raigangar", "Karo de Jonge", "Jusung Park"],
    substackUrl:
      "https://antidotetransform.substack.com/p/b2b-services-become-ai-pilled",
  },
  {
    slug: "the-harness-is-the-product",
    title: "The Harness is the Product",
    dek: "Fable is incredible, but it's not going to save your company by itself.",
    date: "2026-08-11",
    dateLabel: "Aug 11, 2026",
    authors: ["Jusung Park"],
    substackUrl:
      "https://antidotetransform.substack.com/p/the-harness-is-the-product",
  },
  {
    slug: "follow-the-value",
    series: "Acquired Intelligence",
    title: "Follow the value.",
    dek: "Where value actually accrues and who does the work, when intelligence gets cheap.",
    date: "2026-08-05",
    dateLabel: "Aug 5, 2026",
    authors: ["Akash Raigangar", "Karo de Jonge", "Jusung Park"],
    substackUrl: "https://antidotetransform.substack.com/p/follow-the-value",
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

/** Substack JSON API for a post — returns body_html with images and marks. */
export function getSubstackPostApiUrl(post: BlogPost): string | null {
  const match = post.substackUrl.match(/^(https?:\/\/[^/]+)\/p\/([^/?#]+)/);
  if (!match) return null;
  return `${match[1]}/api/v1/posts/${match[2]}`;
}

/**
 * Strip scripts / Substack chrome widgets while keeping essay markup
 * (paragraphs, lists, figures, blockquotes, links, emphasis).
 */
export function sanitizeSubstackHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<div class="subscription-widget-wrap[\s\S]*?<\/form><\/div><\/div><\/div>/gi, "")
    .replace(/<div class="subscription-widget-wrap-editor[\s\S]*?<\/div><\/div>/gi, "")
    .replace(/<div class="image-link-expand"[\s\S]*?<\/div><\/div>/gi, "")
    .replace(/\s(onclick|onerror|onload)=["'][^"']*["']/gi, "")
    .replace(/\sdata-component-name=["'][^"']*["']/gi, "");
}
