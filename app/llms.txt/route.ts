import { getPillarPosts } from "@/lib/posts";
import { categories, siteConfig } from "@/lib/site";

// llms.txt: a plain-text index for AI assistants/crawlers (ChatGPT, Claude,
// Perplexity, etc.), following the emerging convention at llmstxt.org. It is
// not an official Google/Bing standard -- unlike robots.txt/sitemap.xml it
// has no enforcement, it's just a discoverability courtesy for AI crawlers
// that choose to read it.
export function GET() {
  const pillarLinks = getPillarPosts()
    .map((post) => `- [${post.title}](${siteConfig.url}/blog/${post.slug}): ${post.description}`)
    .join("\n");

  const categoryLinks = categories
    .map((category) => `- [${category.name}](${siteConfig.url}/categorias/${category.slug}): ${category.description}`)
    .join("\n");

  const body = `# ${siteConfig.name}

> ${siteConfig.description}

Blog cristiano en español con guías, oración y enseñanza bíblica para matrimonios que atraviesan crisis, distancia o quieren fortalecer su relación.

## Contenido pilar

${pillarLinks}

## Categorías

${categoryLinks}

## Otras páginas

- [Blog completo](${siteConfig.url}/blog)
- [Recursos recomendados](${siteConfig.url}/recursos)
- [Sobre nosotros](${siteConfig.url}/sobre-nosotros)
- [Política editorial](${siteConfig.url}/politica-editorial)
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
