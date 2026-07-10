import { describe, expect, it } from "vitest";
import { existsSync } from "fs";
import path from "path";

const PDF_PATH = path.join(
  process.cwd(),
  "public",
  "guias",
  "7-dias-de-oracion-restauracion-matrimonial.pdf"
);

describe("lead magnet PDF asset", () => {
  it("exists at public/guias/7-dias-de-oracion-restauracion-matrimonial.pdf", () => {
    const exists = existsSync(PDF_PATH);
    expect(
      exists,
      `Falta el PDF final del lead magnet en ${PDF_PATH}. ` +
        "Exporta la guía desde Figma y colócala en esa ruta antes de desplegar: " +
        "sin este archivo, /api/newsletter fallará en tiempo de ejecución al intentar leerlo."
    ).toBe(true);
  });
});
