import { z } from "zod";

export const esquemaCriarCliente = z.object({
  nomeCompleto: z.string().min(3, "Informe o nome completo do aluno"),
  email: z.string().email("Informe um e-mail válido"),
  telefone: z.string().optional(),
  dataNascimento: z.string().optional(),
  sexo: z.enum(["MASCULINO", "FEMININO"]),
  alturaCm: z.number().min(100, "Altura mínima 100cm").max(250, "Altura máxima 250cm").optional(),
  objetivoPrincipal: z.string().min(2, "Informe o objetivo principal").optional(),
});

export const esquemaAnamnese = z.object({
  parqProblemaCardiaco: z.boolean().default(false),
  parqDorPeitoAtividade: z.boolean().default(false),
  parqDorPeitoRepouso: z.boolean().default(false),
  parqTonturaDesmaio: z.boolean().default(false),
  parqProblemaOsseoArticular: z.boolean().default(false),
  parqMedicamentoPressao: z.boolean().default(false),
  parqOutraRazaoMedica: z.boolean().default(false),
  lesoesOuDores: z.string().optional(),
  historicoCirurgias: z.string().optional(),
  medicamentos: z.string().optional(),
  alergias: z.string().optional(),
  mediaHorasSono: z.number().min(1).max(16).optional(),
  qualidadeSono: z.string().optional(),
  nivelAtividadeTrabalho: z.enum(["SEDENTARIO", "LEVE", "MODERADO", "INTENSO"]).default("SEDENTARIO"),
  ingestaoAguaLitros: z.number().min(0.2).max(10).optional(),
  observacoes: z.string().optional(),
});
