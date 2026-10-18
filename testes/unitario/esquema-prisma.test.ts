import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

describe("Esquema Prisma 100% em Português", () => {
  it("deve definir os modelos Usuario, PerfilCliente, Anamnese, AvaliacaoFisica e FotoProgresso", () => {
    const caminhoSchema = path.resolve(process.cwd(), "prisma/schema.prisma");
    expect(fs.existsSync(caminhoSchema)).toBe(true);

    const schema = fs.readFileSync(caminhoSchema, "utf-8");
    expect(schema).toContain("model Usuario");
    expect(schema).toContain("model PerfilCliente");
    expect(schema).toContain("model Anamnese");
    expect(schema).toContain("model AvaliacaoFisica");
    expect(schema).toContain("model FotoProgresso");
  });
});
