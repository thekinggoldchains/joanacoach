import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BarraLateral } from "@/componentes/admin/BarraLateral";
import { BarraNavegacaoInferior } from "@/componentes/aluno/BarraNavegacaoInferior";
import PaginaEntrar from "@/app/entrar/page";

describe("Componentes de Navegação e Login (Joana Antunes Coaching)", () => {
  it("deve renderizar a BarraLateral da Personal com o monograma JA e links principais", () => {
    render(<BarraLateral rotaAtiva="/admin/clientes" totalClientesAtivos={24} />);
    expect(screen.getByText("JA")).toBeDefined();
    expect(screen.getByText(/Joana Antunes/i)).toBeDefined();
    expect(screen.getByText("Clientes")).toBeDefined();
    expect(screen.getByText("Avaliações")).toBeDefined();
    expect(screen.getByText("24")).toBeDefined();
  });

  it("deve renderizar a BarraNavegacaoInferior do Aluno com os 5 ícones mobile", () => {
    render(<BarraNavegacaoInferior rotaAtiva="/app/inicio" />);
    expect(screen.getByText("Início")).toBeDefined();
    expect(screen.getByText("Treinos")).toBeDefined();
    expect(screen.getByText("Evolução")).toBeDefined();
    expect(screen.getByText("Check-in")).toBeDefined();
    expect(screen.getByText("Mais")).toBeDefined();
  });

  it("deve renderizar a tela de login (/entrar) com campos e botões de acesso", () => {
    render(<PaginaEntrar />);
    expect(screen.getByText(/Iniciar Sessão/i)).toBeDefined();
    expect(screen.getByText(/Entrar/i)).toBeDefined();
  });
});
