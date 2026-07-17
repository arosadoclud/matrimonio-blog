import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MdxContent } from "../MdxContent";

describe("MdxContent", () => {
  it("renders a blockquote block as a safety notice", () => {
    const source = [
      "Un párrafo normal antes.",
      "> Si hay violencia o peligro, busca ayuda profesional de inmediato.",
      "Un párrafo normal después.",
    ].join("\n\n");

    render(<MdxContent source={source} />);

    expect(screen.getByText("Tu seguridad es lo primero")).toBeInTheDocument();
    expect(screen.getByRole("note", { name: "Advertencia de seguridad" })).toHaveTextContent(
      "Si hay violencia o peligro, busca ayuda profesional de inmediato."
    );
  });

  it("does not wrap regular paragraphs in the safety notice", () => {
    render(<MdxContent source="Este es un párrafo normal sin advertencia." />);

    expect(screen.queryByText("Tu seguridad es lo primero")).not.toBeInTheDocument();
  });

  it("renders a link nested inside bold text as a real link, not literal brackets", () => {
    render(
      <MdxContent source="Antes del enlace. **[Descarga la guía →](/restaurar-matrimonio-guia-gratis)** Después." />
    );

    const link = screen.getByRole("link", { name: "Descarga la guía →" });
    expect(link).toHaveAttribute("href", "/restaurar-matrimonio-guia-gratis");
    expect(screen.queryByText(/\[Descarga la guía/)).not.toBeInTheDocument();
  });

  it("renders a numbered list as a real <ol>, not a run-on paragraph", () => {
    const source = ["## Pasos", ["1. Primer paso", "2. Segundo paso", "3. Tercer paso"].join("\n")].join(
      "\n\n"
    );

    render(<MdxContent source={source} />);

    const list = screen.getByRole("list");
    expect(list.tagName).toBe("OL");
    expect(screen.getByText("Primer paso")).toBeInTheDocument();
    expect(screen.getByText("Segundo paso")).toBeInTheDocument();
    expect(screen.getByText("Tercer paso")).toBeInTheDocument();
    // Regression guard: the old fallback joined every line into one <p>,
    // so "2." and "3." showed up as stray inline text before the item text.
    expect(screen.queryByText(/^2\./)).not.toBeInTheDocument();
  });

  it("renders headings, lists and paragraphs as before", () => {
    const source = ["## Un título", "- Primer punto", "- Segundo punto"].join("\n\n");

    render(<MdxContent source={source} />);

    expect(screen.getByRole("heading", { level: 2, name: "Un título" })).toBeInTheDocument();
    expect(screen.getByText("Primer punto")).toBeInTheDocument();
    expect(screen.getByText("Segundo punto")).toBeInTheDocument();
  });
});
