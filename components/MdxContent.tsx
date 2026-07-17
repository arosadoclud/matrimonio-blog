import Link from "next/link";
import { slugify } from "@/lib/site";
import { SafetyNotice } from "@/components/SafetyNotice";

function renderInline(text: string) {
  const nodes: React.ReactNode[] = [];
  // Bold must be tried before single-asterisk italic so "**x**" matches as
  // bold instead of leaving stray "*" characters from a partial italic match.
  const pattern = /(\*\*([^*]+)\*\*|\*([^*]+)\*|\[([^\]]+)\]\(([^)]+)\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    if (match[2]) {
      // Recurse instead of pushing match[2] as a raw string: bold text that
      // itself contains a link (e.g. "**[texto](/ruta)**") would otherwise
      // render the literal "[texto](/ruta)" characters instead of a real
      // <Link>, since the bold branch of the regex swallows everything
      // up to the next "**" regardless of what's inside it.
      nodes.push(<strong key={match.index}>{renderInline(match[2])}</strong>);
    } else if (match[3]) {
      nodes.push(<em key={match.index}>{renderInline(match[3])}</em>);
    } else if (match[4] && match[5]) {
      const href = match[5];
      nodes.push(
        href.startsWith("/") ? (
          <Link key={match.index} href={href}>
            {match[4]}
          </Link>
        ) : (
          <a key={match.index} href={href}>
            {match[4]}
          </a>
        )
      );
    }

    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

export function MdxContent({ source }: { source: string }) {
  const blocks = source.trim().split(/\n{2,}/);

  return (
    <>
      {blocks.map((block, index) => {
        const lines = block.split(/\r?\n/);
        const firstLine = lines[0];

        if (firstLine.startsWith("## ")) {
          const text = firstLine.replace(/^##\s+/, "");
          return (
            <h2 key={index} id={slugify(text)}>
              {renderInline(text)}
            </h2>
          );
        }

        if (firstLine.startsWith("### ")) {
          const text = firstLine.replace(/^###\s+/, "");
          return <h3 key={index}>{renderInline(text)}</h3>;
        }

        // Bloque de advertencia de seguridad (contenido sensible sobre violencia/riesgo):
        // se marca en el .mdx como cita ("> ") y se renderiza con un componente
        // visual distintivo en vez de un párrafo normal. Ver docs/seo-audit.md, sección 6.
        if (lines.every((line) => line.startsWith("> "))) {
          return (
            <SafetyNotice key={index}>
              {renderInline(lines.map((line) => line.replace(/^>\s?/, "")).join(" "))}
            </SafetyNotice>
          );
        }

        if (lines.every((line) => line.startsWith("- "))) {
          return (
            <ul key={index}>
              {lines.map((line) => (
                <li key={line}>{renderInline(line.replace(/^-\s+/, ""))}</li>
              ))}
            </ul>
          );
        }

        return <p key={index}>{renderInline(lines.join(" "))}</p>;
      })}
    </>
  );
}
