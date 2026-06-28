import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleLayout } from "@/components/ArticleLayout";
import { JsonLd } from "@/components/JsonLd";
import { getAllPosts, getFaqs, getPostBySlug, getRelatedPosts } from "@/lib/posts";
import { siteConfig, slugify } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {};
  }

  const title = `${post.title} | ${siteConfig.name}`;
  const url = `${siteConfig.url}/blog/${post.slug}`;

  return {
    title,
    description: post.description,
    keywords: post.keywords,
    robots:
      post.wordCount >= 300
        ? undefined
        : {
            index: false,
            follow: true
          },
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title,
      description: post.description,
      url,
      publishedTime: post.date,
      authors: [post.author],
      images: [{ url: post.image }]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: post.description,
      images: [post.image]
    }
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post);
  const faqs = getFaqs(post.content);
  const articleUrl = `${siteConfig.url}/blog/${post.slug}`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.image,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: post.author
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name
    },
    mainEntityOfPage: articleUrl
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: siteConfig.url
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${siteConfig.url}/blog`
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.category,
        item: `${siteConfig.url}/categorias/${slugify(post.category)}`
      },
      {
        "@type": "ListItem",
        position: 4,
        name: post.title,
        item: articleUrl
      }
    ]
  };
  const faqSchema =
    faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer
            }
          }))
        }
      : null;

  return (
    <>
      <JsonLd data={faqSchema ? [articleSchema, breadcrumbSchema, faqSchema] : [articleSchema, breadcrumbSchema]} />
      <ArticleLayout post={post} relatedPosts={relatedPosts} />
    </>
  );
}
