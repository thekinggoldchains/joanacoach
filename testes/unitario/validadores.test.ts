import { describe, it, expect } from "vitest";
import { esquemaAvaliacaoFisica } from "@/dominio/validadores/avaliacao";
import { esquemaCriarCliente, esquemaAnamnese } from "@/dominio/validadores/cliente";

describe("Validadores Fisiológicos e de Cadastro (Zod)", () => {
  it("deve rejeitar peso ou dobras cutâneas fora dos limites fisiológicos humanos", () => {
    const invalido = esquemaAvaliacaoFisica.safeParse({
      clienteId: "cli_1",
      pesoKg: 5,
      alturaCm: 178,
      protocolo: "POLLOCK_7",
      dobraAbdominalMm: 120,
    });
    expect(invalido.success).toBe(false);
  });

  it("deve validar corretamente o pré-cadastro de um novo cliente", () => {
    const valido = esquemaCriarCliente.safeParse({
      nomeCompleto: "João Silva",
      email: "joao@email.com",
      telefone: "960000000",
      sexo: "MASCULINO",
      alturaCm: 178,
      objetivoPrincipal: "Ganhar Massa Muscular",
    });
    expect(valido.success).toBe(true);
  });

  it("deve validar corretamente uma ficha de anamnese com valores padrão", () => {
    const valido = esquemaAnamnese.safeParse({
      lesoesOuDores: "Dor leve no ombro direito",
      mediaHorasSono: 7.5,
      ingestaoAguaLitros: 2.5,
    });
    expect(valido.success).toBe(true);
    if (valido.success) {
      expect(valido.data.parqProblemaCardiaco).toBe(false);
      expect(valido.data.nivelAtividadeTrabalho).toBe("SEDENTARIO");
    }
  });
});

