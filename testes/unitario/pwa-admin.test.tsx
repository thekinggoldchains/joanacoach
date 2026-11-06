import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import manifestoPwa from "@/app/manifest";
import LayoutAdmin from "@/app/admin/layout";
import { BarraInferiorAdmin } from "@/componentes/admin/BarraInferiorAdmin";

const REGEX_EMOJI = /\p{Extended_Pictographic}/u;

describe("Suporte PWA Completo — Painel da Personal (Telemóvel + Desktop)", () => {
  it("deve gerar o Web App Manifest (manifest.ts) com modo standalone, tema #141414 e atalhos para Personal e Aluno", () => {
    const manifesto = manifestoPwa();

    expect(manifesto.name).toMatch(/Joana Antunes Coaching/i);
    expect(manifesto.display).toBe("standalone");
    expect(manifesto.background_color).toBe("#141414");
    expect(manifesto.theme_color).toBe("#141414");
    expect(manifesto.icons?.length).toBeGreaterThanOrEqual(2);
    expect(manifesto.shortcuts?.some((s) => s.url === "/admin/painel")).toBe(true);
    expect(manifesto.shortcuts?.some((s) => s.url === "/app/inicio")).toBe(true);
  });

  it("deve renderizar a BarraInferiorAdmin para uso no telemóvel com ícones SVG enterprise, zero emojis e gaveta de menu", () => {
    const { container } = render(
      <BarraInferiorAdmin rotaAtiva="/admin/painel" totalClientesAtivos={24} />
    );

    expect(screen.getByText("Painel")).toBeDefined();
    expect(screen.getByText("Clientes")).toBeDefined();
    expect(screen.getByText("Avaliar")).toBeDefined();
    expect(screen.getByText("Treinos")).toBeDefined();
    expect(screen.getByText("Menu")).toBeDefined();
    expect(container.querySelectorAll("svg").length).toBeGreaterThanOrEqual(5);
    expect(REGEX_EMOJI.test(container.textContent || "")).toBe(false);

    // Abrir gaveta mobile ao tocar em Menu
    fireEvent.click(screen.getByRole("button", { name: /Menu/i }));
    expect(screen.getByText(/Check-ins/i)).toBeDefined();
    expect(screen.getByText(/Agenda/i)).toBeDefined();
    expect(screen.getByText(/Terminar Sessão/i)).toBeDefined();
  });

  it("deve renderizar o LayoutAdmin combinando estrutura Desktop e navegação PWA Mobile sem emojis", () => {
    const { container } = render(
      <LayoutAdmin>
        <div>Conteúdo de Teste Admin</div>
      </LayoutAdmin>
    );

    expect(screen.getByText("Conteúdo de Teste Admin")).toBeDefined();
    expect(screen.getByLabelText("Menu Principal da Personal")).toBeDefined();
    expect(screen.getByLabelText("Navegação Mobile da Personal")).toBeDefined();
    expect(REGEX_EMOJI.test(container.textContent || "")).toBe(false);
  });
});
