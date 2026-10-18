export type SexoBiologico = "MASCULINO" | "FEMININO";

export interface EntradaPollock7 {
  sexo: SexoBiologico;
  idade: number;
  pesoKg: number;
  dobraPeitoralMm: number;
  dobraAxilarMediaMm: number;
  dobraTricepsMm: number;
  dobraSubescapularMm: number;
  dobraAbdominalMm: number;
  dobraSuprailiacaMm: number;
  dobraCoxaMm: number;
}

export interface EntradaPollock3 {
  sexo: SexoBiologico;
  idade: number;
  pesoKg: number;
  dobraPeitoralMm?: number;
  dobraAbdominalMm?: number;
  dobraTricepsMm?: number;
  dobraSuprailiacaMm?: number;
  dobraCoxaMm: number;
}

export interface ResultadoComposicaoCorporal {
  somaDobrasMm: number;
  densidadeCorporal: number;
  percentualGordura: number;
  massaGordaKg: number;
  massaMagraKg: number;
}

export interface ResumoAvaliacao {
  pesoKg: number;
  percentualGordura: number;
  massaMagraKg: number;
}

export interface VariacaoAvaliacao {
  variacaoPesoKg: number;
  variacaoPercentualGordura: number;
  variacaoMassaMagraKg: number;
}

export interface RespostasParq {
  parqProblemaCardiaco: boolean;
  parqDorPeitoAtividade: boolean;
  parqDorPeitoRepouso: boolean;
  parqTonturaDesmaio: boolean;
  parqProblemaOsseoArticular: boolean;
  parqMedicamentoPressao: boolean;
  parqOutraRazaoMedica: boolean;
}

function arredondar(valor: number, casas = 2): number {
  const fator = Math.pow(10, casas);
  return Math.round(valor * fator) / fator;
}

export function calcularImc(pesoKg: number, alturaCm: number): number {
  const alturaMetros = alturaCm / 100;
  if (alturaMetros <= 0) throw new Error("Altura inválida para cálculo de IMC");
  return arredondar(pesoKg / (alturaMetros * alturaMetros), 2);
}

export function calcularComposicaoCorporalSiri(
  pesoKg: number,
  densidadeCorporal: number
): { percentualGordura: number; massaGordaKg: number; massaMagraKg: number } {
  const bfBruto = 495 / densidadeCorporal - 450;
  const percentualGordura = arredondar(Math.max(2, Math.min(65, bfBruto)), 2);
  const massaGordaKg = arredondar(pesoKg * (percentualGordura / 100), 2);
  const massaMagraKg = arredondar(pesoKg - massaGordaKg, 2);

  return {
    percentualGordura,
    massaGordaKg,
    massaMagraKg,
  };
}

export function calcularPollock7Dobras(
  entrada: EntradaPollock7
): ResultadoComposicaoCorporal {
  const somaDobrasMm = arredondar(
    entrada.dobraPeitoralMm +
      entrada.dobraAxilarMediaMm +
      entrada.dobraTricepsMm +
      entrada.dobraSubescapularMm +
      entrada.dobraAbdominalMm +
      entrada.dobraSuprailiacaMm +
      entrada.dobraCoxaMm,
    2
  );

  const densidadeBruta =
    entrada.sexo === "MASCULINO"
      ? 1.112 -
        0.00043499 * somaDobrasMm +
        0.00000055 * somaDobrasMm * somaDobrasMm -
        0.00028826 * entrada.idade
      : 1.097 -
        0.00046971 * somaDobrasMm +
        0.00000056 * somaDobrasMm * somaDobrasMm -
        0.00012828 * entrada.idade;

  const densidadeCorporal = arredondar(densidadeBruta, 4);
  const siri = calcularComposicaoCorporalSiri(entrada.pesoKg, densidadeCorporal);

  return {
    somaDobrasMm,
    densidadeCorporal,
    ...siri,
  };
}

export function calcularPollock3Dobras(
  entrada: EntradaPollock3
): ResultadoComposicaoCorporal {
  const somaDobrasMm =
    entrada.sexo === "MASCULINO"
      ? arredondar(
          (entrada.dobraPeitoralMm ?? 0) +
            (entrada.dobraAbdominalMm ?? 0) +
            entrada.dobraCoxaMm,
          2
        )
      : arredondar(
          (entrada.dobraTricepsMm ?? 0) +
            (entrada.dobraSuprailiacaMm ?? 0) +
            entrada.dobraCoxaMm,
          2
        );

  const densidadeBruta =
    entrada.sexo === "MASCULINO"
      ? 1.10938 -
        0.0008267 * somaDobrasMm +
        0.0000016 * somaDobrasMm * somaDobrasMm -
        0.0002574 * entrada.idade
      : 1.0994921 -
        0.0009929 * somaDobrasMm +
        0.0000023 * somaDobrasMm * somaDobrasMm -
        0.0001392 * entrada.idade;

  const densidadeCorporal = arredondar(densidadeBruta, 4);
  const siri = calcularComposicaoCorporalSiri(entrada.pesoKg, densidadeCorporal);

  return {
    somaDobrasMm,
    densidadeCorporal,
    ...siri,
  };
}

export function calcularVariacaoAvaliacoes(
  atual: ResumoAvaliacao,
  anterior: ResumoAvaliacao
): VariacaoAvaliacao {
  return {
    variacaoPesoKg: arredondar(atual.pesoKg - anterior.pesoKg, 2),
    variacaoPercentualGordura: arredondar(
      atual.percentualGordura - anterior.percentualGordura,
      2
    ),
    variacaoMassaMagraKg: arredondar(
      atual.massaMagraKg - anterior.massaMagraKg,
      2
    ),
  };
}

export function verificarRestricaoParq(respostas: RespostasParq): boolean {
  return Boolean(
    respostas.parqProblemaCardiaco ||
      respostas.parqDorPeitoAtividade ||
      respostas.parqDorPeitoRepouso ||
      respostas.parqTonturaDesmaio ||
      respostas.parqProblemaOsseoArticular ||
      respostas.parqMedicamentoPressao ||
      respostas.parqOutraRazaoMedica
  );
}
