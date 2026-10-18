import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

describe("Fundação do Design System SCSS (Joana Antunes Coaching)", () => {
  it("deve possuir os arquivos _variaveis.scss, _mixins.scss e globais.scss com as cores e regras de contraste obrigatórias", () => {
    const caminhoVariaveis = path.resolve(process.cwd(), "src/estilos/_variaveis.scss");
    const caminhoMixins = path.resolve(process.cwd(), "src/estilos/_mixins.scss");
    const caminhoGlobais = path.resolve(process.cwd(), "src/estilos/globais.scss");

    expect(fs.existsSync(caminhoVariaveis)).toBe(true);
    expect(fs.existsSync(caminhoMixins)).toBe(true);
    expect(fs.existsSync(caminhoGlobais)).toBe(true);

    const conteudoVariaveis = fs.readFileSync(caminhoVariaveis, "utf-8");
    expect(conteudoVariaveis).toContain("$cor-fundo-escuro: #141414;");
    expect(conteudoVariaveis).toContain("$cor-fundo-claro: #F8F7F4;");
    expect(conteudoVariaveis).toContain("$cor-dourado-primario: #C5A059;");
    expect(conteudoVariaveis).toContain("$cor-texto-primario: #1A1A1A;");
  });
});
