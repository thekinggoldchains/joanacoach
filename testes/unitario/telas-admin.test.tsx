import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PaginaPainelAdmin from "@/app/admin/painel/page";
import PaginaClientesAdmin from "@/app/admin/clientes/page";
import PaginaPerfilClienteAdmin from "@/app/admin/clientes/[id]/page";

describe("Telas Administrativas da Personal (Joana Antunes Coaching)", () => {
  it("deve renderizar o Dashboard (/admin/painel) com cartões de KPI e lista rápida de clientes", async () => {
    render(<PaginaPainelAdmin />);

    expect(screen.getByText(/Clientes Ativos/i)).toBeDefined();
    expect(screen.getByText(/Anamneses Pendentes/i)).toBeDefined();
    expect(screen.getByText(/Avaliações Realizadas/i)).toBeDefined();
    expect(screen.getByText(/Alertas PAR-Q/i)).toBeDefined();

    await waitFor(() => {
      expect(screen.getAllByText(/João Silva/i).length).toBeGreaterThan(0);
    });
  });

  it("deve renderizar a Lista de Clientes (/admin/clientes) com busca em tempo real e geração de convite", async () => {
    render(<PaginaClientesAdmin />);

    await waitFor(() => {
      expect(screen.getByText("João Silva")).toBeDefined();
      expect(screen.getByText("78,5 kg")).toBeDefined();
    });

    const campoBusca = screen.getByPlaceholderText("Pesquisar cliente...");
    fireEvent.change(campoBusca, { target: { value: "Sara" } });

    await waitFor(() => {
      expect(screen.getByText("Sara Martins")).toBeDefined();
      expect(screen.queryByText("João Silva")).toBeNull();
    });

    fireEvent.change(campoBusca, { target: { value: "" } });

    const botaoNovoCliente = screen.getByRole("button", { name: /Novo Cliente/i });
    fireEvent.click(botaoNovoCliente);

    const inputNome = screen.getByLabelText(/Nome Completo/i);
    const inputEmail = screen.getByLabelText(/E-mail/i);
    fireEvent.change(inputNome, { target: { value: "Beatriz Costa" } });
    fireEvent.change(inputEmail, { target: { value: "beatriz@email.com" } });

    const botaoGerarConvite = screen.getByRole("button", { name: /Gerar Link de Convite/i });
    fireEvent.click(botaoGerarConvite);

    await waitFor(() => {
      expect(screen.getByText(/\/convite\/tok_/i)).toBeDefined();
    });
  });

  it("deve renderizar o Perfil 360º (/admin/clientes/[id]) com dados de João Silva, abas e Calculadora Pollock 7 em tempo real", async () => {
    render(<PaginaPerfilClienteAdmin clienteIdInicial="cli_joao" />);

    await waitFor(() => {
      expect(screen.getByText("João Silva")).toBeDefined();
    });

    // Alerta médico PAR-Q (ícone vetorial enterprise, sem emoji)
    const alertaParq = screen.getByRole("alert");
    expect(alertaParq.textContent).toMatch(/Atenção Médica \(PAR-Q Positivo\)/i);
    expect(/\p{Extended_Pictographic}/u.test(alertaParq.textContent || "")).toBe(false);
    expect(alertaParq.querySelector("svg")).not.toBeNull();

    // Aba Resumo (padrão)
    expect(screen.getAllByText(/28 anos/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/1,78 m/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/78,5 kg/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Ganhar Massa Muscular/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Condromalácia leve \(Joelho D\)/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/-1,8 kg/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/\+1,2 kg/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/-2,1 %/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/14,2%/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/67,35/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText("104").length).toBeGreaterThan(0);
    expect(screen.getAllByText("81").length).toBeGreaterThan(0);

    // Trocar para a aba Avaliações e testar Calculadora Pollock 7 em tempo real
    const abaAvaliacoes = screen.getByRole("button", { name: "Avaliações" });
    fireEvent.click(abaAvaliacoes);

    expect(screen.getByText(/Soma das Dobras/i)).toBeDefined();
    expect(screen.getByText(/Densidade Corporal/i)).toBeDefined();
    expect(screen.getByText(/% Gordura Corporal \(BF\)/i)).toBeDefined();
    expect(screen.getByText(/Massa Magra/i)).toBeDefined();
    expect(screen.getByText(/IMC Atual/i)).toBeDefined();

    // Verificar soma inicial (79 mm) e alterar dobra abdominal de 16 para 26 (+10mm -> 89mm)
    expect(screen.getByText(/79 mm/i)).toBeDefined();
    const campoAbdominal = screen.getByLabelText(/Abdominal/i);
    fireEvent.change(campoAbdominal, { target: { value: "26" } });

    await waitFor(() => {
      expect(screen.getByText(/89 mm/i)).toBeDefined();
    });

    // Trocar para a aba Anamnese
    const abaAnamnese = screen.getByRole("button", { name: "Anamnese" });
    fireEvent.click(abaAnamnese);
    expect(screen.getByText(/Evitar agachamento profundo/i)).toBeDefined();

    // Trocar para a aba Progresso e filtrar ângulos
    const abaProgresso = screen.getByRole("button", { name: "Progresso" });
    fireEvent.click(abaProgresso);
    expect(screen.getByRole("button", { name: "Frente" })).toBeDefined();
    expect(screen.getByRole("button", { name: "Costas" })).toBeDefined();
    expect(screen.getByRole("button", { name: "Perfil" })).toBeDefined();
  });
});
