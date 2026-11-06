import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BarraLateral } from "@/componentes/admin/BarraLateral";
import { BarraNavegacaoInferior } from "@/componentes/aluno/BarraNavegacaoInferior";
import { IconePainel, IconeAlertaClinico } from "@/componentes/comum/Icones";
import PaginaEntrar from "@/app/entrar/page";

const REGEX_EMOJI = /\p{Extended_Pictographic}/u;

describe("Componentes de Navegação, Ícones Enterprise e Login (Joana Antunes Coaching)", () => {
  it("deve renderizar ícones vetoriais SVG enterprise com traço uniforme e sem emojis", () => {
    const { container } = render(
      <div>
        <IconePainel tamanho={20} />
        <IconeAlertaClinico tamanho={18} />
      </div>
    );
    const svgs = container.querySelectorAll("svg");
    expect(svgs.length).toBe(2);
    expect(svgs[0].getAttribute("viewBox")).toBe("0 0 24 24");
    expect(svgs[0].getAttribute("stroke")).toBe("currentColor");
  });

  it("deve renderizar a BarraLateral da Personal com ícones SVG enterprise, sem emojis, monograma JA e links principais", () => {
    const { container } = render(
      <BarraLateral rotaAtiva="/admin/clientes" totalClientesAtivos={24} />
    );
    expect(screen.getByText("JA")).toBeDefined();
    expect(screen.getByText(/Joana Antunes/i)).toBeDefined();
    expect(screen.getByText("Clientes")).toBeDefined();
    expect(screen.getByText("Avaliações")).toBeDefined();
    expect(screen.getByText("24")).toBeDefined();
    expect(container.querySelectorAll("svg").length).toBeGreaterThanOrEqual(7);
    expect(REGEX_EMOJI.test(container.textContent || "")).toBe(false);
  });

  it("deve renderizar a BarraNavegacaoInferior do Aluno com 5 ícones SVG enterprise e zero emojis", () => {
    const { container } = render(<BarraNavegacaoInferior rotaAtiva="/app/inicio" />);
    expect(screen.getByText("Início")).toBeDefined();
    expect(screen.getByText("Treinos")).toBeDefined();
    expect(screen.getByText("Evolução")).toBeDefined();
    expect(screen.getByText("Check-in")).toBeDefined();
    expect(screen.getByText("Mais")).toBeDefined();
    expect(container.querySelectorAll("svg").length).toBe(5);
    expect(REGEX_EMOJI.test(container.textContent || "")).toBe(false);
  });

  it("deve renderizar a tela de login (/entrar) com campos e botões de acesso sem emojis", () => {
    const { container } = render(<PaginaEntrar />);
    expect(screen.getByText(/Iniciar Sessão/i)).toBeDefined();
    expect(screen.getByText(/Entrar/i)).toBeDefined();
    expect(REGEX_EMOJI.test(container.textContent || "")).toBe(false);
  });
});
