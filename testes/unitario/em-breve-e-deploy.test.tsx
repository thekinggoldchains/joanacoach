import React from "react";
import fs from "node:fs";
import path from "node:path";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import PaginaTreinosAdmin from "@/app/admin/treinos/page";
import PaginaCheckinsAdmin from "@/app/admin/checkins/page";
import PaginaAgendaAdmin from "@/app/admin/agenda/page";
import PaginaTreinosAluno from "@/app/app/treinos/page";
import PaginaCheckinAluno from "@/app/app/checkin/page";

const REGEX_EMOJI = /\p{Extended_Pictographic}/u;

describe("Telas de Próximas Etapas (V1 Cliente) & Empacotamento EasyPanel", () => {
  it("deve renderizar as páginas de prévia dos módulos futuros no Admin e no App do Aluno sem emojis", () => {
    const { container } = render(
      <div>
        <PaginaTreinosAdmin />
        <PaginaCheckinsAdmin />
        <PaginaAgendaAdmin />
        <PaginaTreinosAluno />
        <PaginaCheckinAluno />
      </div>
    );

    expect(screen.getByText(/Biblioteca & Prescrição de Treinos/i)).toBeDefined();
    expect(screen.getByText(/Check-ins Semanais & Feedback/i)).toBeDefined();
    expect(screen.getByText(/Agenda de Avaliações & Sessões/i)).toBeDefined();
    expect(screen.getByText(/Meus Planos de Treino/i)).toBeDefined();
    expect(screen.getByText(/Check-in Semanal/i)).toBeDefined();
    expect(container.querySelectorAll("svg").length).toBeGreaterThanOrEqual(5);
    expect(REGEX_EMOJI.test(container.textContent || "")).toBe(false);
  });

  it("deve possuir Dockerfile otimizado para EasyPanel (standalone, HOSTNAME 0.0.0.0 e porta 3000)", () => {
    const raiz = process.cwd();
    const caminhoDockerfile = path.join(raiz, "Dockerfile");
    const caminhoNextConfig = path.join(raiz, "next.config.ts");

    expect(fs.existsSync(caminhoDockerfile)).toBe(true);
    const conteudoDocker = fs.readFileSync(caminhoDockerfile, "utf-8");
    expect(conteudoDocker).toContain('HOSTNAME="0.0.0.0"');
    expect(conteudoDocker).toContain("PORT=3000");
    expect(conteudoDocker).toContain("server.js");

    const conteudoNext = fs.readFileSync(caminhoNextConfig, "utf-8");
    expect(conteudoNext).toContain('output: "standalone"');
  });
});
