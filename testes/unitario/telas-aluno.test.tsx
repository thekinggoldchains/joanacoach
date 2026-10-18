import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import PaginaConviteAluno from "@/app/convite/[token]/page";
import PaginaInicioAluno from "@/app/app/inicio/page";
import PaginaEvolucaoAluno from "@/app/app/evolucao/page";
import PaginaPerfilAluno from "@/app/app/perfil/page";

describe("Fluxo Mobile PWA do Aluno (/convite/[token] e /app/*)", () => {
  it("deve renderizar a página de ativação de convite com o questionário PAR-Q e Anamnese", () => {
    render(<PaginaConviteAluno tokenInicial="tok_sara_demo" />);
    expect(screen.getByText(/Sara Martins/i)).toBeDefined();
    expect(screen.getByText(/Questionário PAR-Q/i)).toBeDefined();
    expect(screen.getByText(/Problema cardíaco diagnosticado/i)).toBeDefined();
    expect(screen.getByText(/Concluir Cadastro e Entrar no App/i)).toBeDefined();
  });

  it("deve renderizar a tela inicial do Aluno (/app/inicio) com saudação e resumo", () => {
    render(<PaginaInicioAluno />);
    expect(screen.getByText(/João/i)).toBeDefined();
    expect(screen.getByText(/Próximo Treino/i)).toBeDefined();
  });

  it("deve renderizar a tela Minha Evolução (/app/evolucao) com gráfico de peso, histórico Pollock e fotos", () => {
    render(<PaginaEvolucaoAluno />);
    expect(screen.getByText(/Minha Evolução/i)).toBeDefined();
    expect(screen.getByText(/78,5 kg/i)).toBeDefined();
    expect(screen.getByText(/14,2%/i)).toBeDefined();
    expect(screen.getByText(/Histórico de Avaliações/i)).toBeDefined();
    expect(screen.getByText(/Fotos de Progresso/i)).toBeDefined();
  });

  it("deve renderizar a tela de Perfil do Aluno (/app/perfil) com dados e anamnese", () => {
    render(<PaginaPerfilAluno />);
    expect(screen.getByText(/João Silva/i)).toBeDefined();
    expect(screen.getByText(/Ganhar Massa Muscular/i)).toBeDefined();
  });
});
