import { describe, it, expect } from "vitest";
import {
  calcularImc,
  calcularPollock7Dobras,
  calcularPollock3Dobras,
  calcularVariacaoAvaliacoes,
  verificarRestricaoParq,
} from "@/dominio/avaliacao/calculadora";

describe("Motor de Cálculos Fisiológicos (calculadora.ts)", () => {
  it("deve calcular o IMC corretamente em kg/m² com 2 casas decimais", () => {
    expect(calcularImc(78.5, 178)).toBe(24.78);
    expect(calcularImc(62.0, 165)).toBe(22.77);
  });

  it("deve calcular Pollock 7 dobras e Siri para homem de 28 anos (78.5kg, soma 79mm)", () => {
    const resultado = calcularPollock7Dobras({
      sexo: "MASCULINO",
      idade: 28,
      pesoKg: 78.5,
      dobraPeitoralMm: 8,
      dobraAxilarMediaMm: 9,
      dobraTricepsMm: 10,
      dobraSubescapularMm: 12,
      dobraAbdominalMm: 16,
      dobraSuprailiacaMm: 11,
      dobraCoxaMm: 13,
    });

    expect(resultado.somaDobrasMm).toBe(79);
    expect(resultado.densidadeCorporal).toBeCloseTo(1.073, 3);
    expect(resultado.percentualGordura).toBeCloseTo(11.32, 1);
    expect(resultado.massaGordaKg).toBeCloseTo(8.89, 1);
    expect(resultado.massaMagraKg).toBeCloseTo(69.61, 1);
  });

  it("deve calcular Pollock 3 dobras para mulher de 26 anos (60kg)", () => {
    const resultado = calcularPollock3Dobras({
      sexo: "FEMININO",
      idade: 26,
      pesoKg: 60,
      dobraTricepsMm: 14,
      dobraSuprailiacaMm: 12,
      dobraCoxaMm: 18,
    });

    expect(resultado.somaDobrasMm).toBe(44);
    expect(resultado.densidadeCorporal).toBeGreaterThan(1.04);
    expect(resultado.percentualGordura).toBeGreaterThan(15);
    expect(resultado.massaGordaKg + resultado.massaMagraKg).toBeCloseTo(60, 1);
  });

  it("deve calcular a variação (delta) entre duas avaliações físicas", () => {
    const variacao = calcularVariacaoAvaliacoes(
      { pesoKg: 78.5, percentualGordura: 14.2, massaMagraKg: 67.35 },
      { pesoKg: 80.3, percentualGordura: 16.3, massaMagraKg: 66.15 }
    );

    expect(variacao.variacaoPesoKg).toBe(-1.8);
    expect(variacao.variacaoPercentualGordura).toBe(-2.1);
    expect(variacao.variacaoMassaMagraKg).toBe(1.2);
  });

  it("deve detectar restrição médica se qualquer pergunta do PAR-Q for verdadeira", () => {
    expect(
      verificarRestricaoParq({
        parqProblemaCardiaco: false,
        parqDorPeitoAtividade: false,
        parqDorPeitoRepouso: false,
        parqTonturaDesmaio: false,
        parqProblemaOsseoArticular: false,
        parqMedicamentoPressao: false,
        parqOutraRazaoMedica: false,
      })
    ).toBe(false);

    expect(
      verificarRestricaoParq({
        parqProblemaCardiaco: false,
        parqDorPeitoAtividade: false,
        parqDorPeitoRepouso: false,
        parqTonturaDesmaio: false,
        parqProblemaOsseoArticular: true,
        parqMedicamentoPressao: false,
        parqOutraRazaoMedica: false,
      })
    ).toBe(true);
  });
});
