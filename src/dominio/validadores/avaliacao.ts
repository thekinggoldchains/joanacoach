import { z } from "zod";

const campoDobraOpcional = z
  .number()
  .min(1, "Dobra mínima de 1mm")
  .max(80, "Dobra máxima de 80mm")
  .optional();

const campoPerimetriaOpcional = z
  .number()
  .min(10, "Medida mínima de 10cm")
  .max(200, "Medida máxima de 200cm")
  .optional();

export const esquemaAvaliacaoFisica = z.object({
  clienteId: z.string().min(1, "Cliente obrigatório"),
  pesoKg: z.number().min(20, "Peso mínimo 20kg").max(300, "Peso máximo 300kg"),
  alturaCm: z.number().min(100, "Altura mínima 100cm").max(250, "Altura máxima 250cm"),
  idade: z.number().min(10).max(110).default(28),
  sexo: z.enum(["MASCULINO", "FEMININO"]).default("MASCULINO"),
  protocolo: z.enum(["POLLOCK_7", "POLLOCK_3", "BIOIMPEDANCIA", "MANUAL"]).default("POLLOCK_7"),

  dobraPeitoralMm: campoDobraOpcional,
  dobraAxilarMediaMm: campoDobraOpcional,
  dobraTricepsMm: campoDobraOpcional,
  dobraSubescapularMm: campoDobraOpcional,
  dobraAbdominalMm: campoDobraOpcional,
  dobraSuprailiacaMm: campoDobraOpcional,
  dobraCoxaMm: campoDobraOpcional,

  percentualGorduraManual: z.number().min(2).max(65).optional(),

  pescocoCm: campoPerimetriaOpcional,
  ombrosCm: campoPerimetriaOpcional,
  toraxCm: campoPerimetriaOpcional,
  cinturaCm: campoPerimetriaOpcional,
  abdomenCm: campoPerimetriaOpcional,
  quadrilCm: campoPerimetriaOpcional,
  bracoRelaxadoDireitoCm: campoPerimetriaOpcional,
  bracoRelaxadoEsquerdoCm: campoPerimetriaOpcional,
  bracoContraidoDireitoCm: campoPerimetriaOpcional,
  bracoContraidoEsquerdoCm: campoPerimetriaOpcional,
  antebracoDireitoCm: campoPerimetriaOpcional,
  antebracoEsquerdoCm: campoPerimetriaOpcional,
  coxaDireitaCm: campoPerimetriaOpcional,
  coxaEsquerdaCm: campoPerimetriaOpcional,
  panturrilhaDireitaCm: campoPerimetriaOpcional,
  panturrilhaEsquerdaCm: campoPerimetriaOpcional,
  observacoes: z.string().optional(),
});
