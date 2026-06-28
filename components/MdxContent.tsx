import Link from "next/link";
import { slugify } from "@/lib/site";

function renderInline(text: string) {
  const nodes: React.ReactNode[] = [];
  const pattern = /(\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    if (match[2]) {
      nodes.push(<strong key={match.index}>{match[2]}</strong>);
    } else if (match[3] && match[4]) {
      const href = match[4];
      nodes.push(
        href.startsWith("/") ? (
          <Link key={match.index} href={href}>
            {match[3]}
          </Link>
        ) : (
          <a key={match.index} href={href}>
            {match[3]}
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
