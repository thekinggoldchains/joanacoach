import {
  calcularImc,
  calcularPollock3Dobras,
  calcularPollock7Dobras,
  calcularVariacaoAvaliacoes,
  SexoBiologico,
  VariacaoAvaliacao,
  verificarRestricaoParq,
} from "@/dominio/avaliacao/calculadora";
import { esquemaAvaliacaoFisica } from "@/dominio/validadores/avaliacao";
import { esquemaAnamnese, esquemaCriarCliente } from "@/dominio/validadores/cliente";
import {
  exigirPapelAdmin,
  gerarHashSenha,
  SessaoUsuario,
} from "@/servicos/autenticacao";

export type StatusCliente = "CONVIDADO" | "ATIVO" | "INATIVO";
export type NivelAtividade = "SEDENTARIO" | "LEVE" | "MODERADO" | "INTENSO";
export type ProtocoloAvaliacao = "POLLOCK_7" | "POLLOCK_3" | "BIOIMPEDANCIA" | "MANUAL";
export type AnguloFoto = "FRENTE" | "COSTAS" | "PERFIL";

export interface RegistroAnamnese {
  id: string;
  clienteId: string;
  parqProblemaCardiaco: boolean;
  parqDorPeitoAtividade: boolean;
  parqDorPeitoRepouso: boolean;
  parqTonturaDesmaio: boolean;
  parqProblemaOsseoArticular: boolean;
  parqMedicamentoPressao: boolean;
  parqOutraRazaoMedica: boolean;
  possuiRestricaoMedica: boolean;
  lesoesOuDores?: string;
  historicoCirurgias?: string;
  medicamentos?: string;
  alergias?: string;
  mediaHorasSono?: number;
  qualidadeSono?: string;
  nivelAtividadeTrabalho: NivelAtividade;
  ingestaoAguaLitros?: number;
  observacoes?: string;
  preenchidaEm: string;
}

export interface RegistroAvaliacaoFisica {
  id: string;
  clienteId: string;
  avaliadoEm: string;
  rotuloData?: string;
  pesoKg: number;
  alturaCm: number;
  idade: number;
  sexo: SexoBiologico;
  imc: number;
  protocolo: ProtocoloAvaliacao;
  dobraPeitoralMm?: number;
  dobraAxilarMediaMm?: number;
  dobraTricepsMm?: number;
  dobraSubescapularMm?: number;
  dobraAbdominalMm?: number;
  dobraSuprailiacaMm?: number;
  dobraCoxaMm?: number;
  somaDobrasMm?: number;
  densidadeCorporal?: number;
  percentualGordura: number;
  massaGordaKg: number;
  massaMagraKg: number;
  pescocoCm?: number;
  ombrosCm?: number;
  toraxCm?: number;
  cinturaCm?: number;
  abdomenCm?: number;
  quadrilCm?: number;
  bracoRelaxadoDireitoCm?: number;
  bracoRelaxadoEsquerdoCm?: number;
  bracoContraidoDireitoCm?: number;
  bracoContraidoEsquerdoCm?: number;
  antebracoDireitoCm?: number;
  antebracoEsquerdoCm?: number;
  coxaDireitaCm?: number;
  coxaEsquerdaCm?: number;
  panturrilhaDireitaCm?: number;
  panturrilhaEsquerdaCm?: number;
  observacoes?: string;
}

export interface RegistroFotoProgresso {
  id: string;
  clienteId: string;
  avaliacaoId?: string;
  angulo: AnguloFoto;
  etapa: "INICIO" | "ATUAL";
  urlImagem: string;
  registradaEm: string;
  pesoKg?: number;
}

export interface RegistroCliente {
  id: string;
  treinadorId: string;
  usuarioId: string | null;
  senhaHash?: string;
  nomeCompleto: string;
  email: string;
  telefone?: string;
  dataNascimento?: string;
  idade: number;
  sexo: SexoBiologico;
  alturaCm: number;
  objetivoPrincipal: string;
  status: StatusCliente;
  tokenConvite: string | null;
  conviteExpiraEm: string | null;
  criadoEm: string;
  anamnese: RegistroAnamnese | null;
  avaliacoes: RegistroAvaliacaoFisica[];
  fotosProgresso: RegistroFotoProgresso[];
}

export interface PerfilCompletoCliente extends RegistroCliente {
  ultimaAvaliacao: RegistroAvaliacaoFisica | null;
  variacaoRecente: VariacaoAvaliacao | null;
  variacaoDesdeInicio: VariacaoAvaliacao | null;
}

export interface RepositorioClientes {
  clientes: Map<string, RegistroCliente>;
}

function criarDadosIniciaisDemo(): Map<string, RegistroCliente> {
  const mapa = new Map<string, RegistroCliente>();

  const avaliacoesJoao: RegistroAvaliacaoFisica[] = [
    {
      id: "aval_joao_1",
      clienteId: "cli_joao",
      avaliadoEm: "2025-10-15T10:00:00.000Z",
      rotuloData: "15 Out 2025",
      pesoKg: 82.7,
      alturaCm: 178,
      idade: 28,
      sexo: "MASCULINO",
      imc: 26.1,
      protocolo: "POLLOCK_7",
      somaDobrasMm: 112,
      densidadeCorporal: 1.0582,
      percentualGordura: 18.8,
      massaGordaKg: 15.55,
      massaMagraKg: 65.15,
      toraxCm: 101,
      cinturaCm: 86,
      bracoContraidoDireitoCm: 37.5,
      coxaDireitaCm: 56,
    },
    {
      id: "aval_joao_2",
      clienteId: "cli_joao",
      avaliadoEm: "2025-11-15T10:00:00.000Z",
      rotuloData: "15 Nov 2025",
      pesoKg: 82.1,
      alturaCm: 178,
      idade: 28,
      sexo: "MASCULINO",
      imc: 25.91,
      protocolo: "POLLOCK_7",
      somaDobrasMm: 105,
      densidadeCorporal: 1.0604,
      percentualGordura: 18.0,
      massaGordaKg: 14.78,
      massaMagraKg: 65.5,
      toraxCm: 101.5,
      cinturaCm: 85,
      bracoContraidoDireitoCm: 38.0,
      coxaDireitaCm: 56.5,
    },
    {
      id: "aval_joao_3",
      clienteId: "cli_joao",
      avaliadoEm: "2025-12-15T10:00:00.000Z",
      rotuloData: "15 Dez 2025",
      pesoKg: 81.4,
      alturaCm: 178,
      idade: 28,
      sexo: "MASCULINO",
      imc: 25.69,
      protocolo: "POLLOCK_7",
      somaDobrasMm: 99,
      densidadeCorporal: 1.062,
      percentualGordura: 17.4,
      massaGordaKg: 14.16,
      massaMagraKg: 65.8,
      toraxCm: 102,
      cinturaCm: 84,
      bracoContraidoDireitoCm: 38.4,
      coxaDireitaCm: 57,
    },
    {
      id: "aval_joao_4",
      clienteId: "cli_joao",
      avaliadoEm: "2026-01-15T10:00:00.000Z",
      rotuloData: "15 Jan 2026",
      pesoKg: 80.9,
      alturaCm: 178,
      idade: 28,
      sexo: "MASCULINO",
      imc: 25.53,
      protocolo: "POLLOCK_7",
      somaDobrasMm: 95,
      densidadeCorporal: 1.0635,
      percentualGordura: 16.9,
      massaGordaKg: 13.67,
      massaMagraKg: 66.0,
      toraxCm: 102.5,
      cinturaCm: 83,
      bracoContraidoDireitoCm: 38.8,
      coxaDireitaCm: 57.2,
    },
    {
      id: "aval_joao_5",
      clienteId: "cli_joao",
      avaliadoEm: "2026-02-15T10:00:00.000Z",
      rotuloData: "15 Fev 2026",
      pesoKg: 80.3,
      alturaCm: 178,
      idade: 28,
      sexo: "MASCULINO",
      imc: 25.34,
      protocolo: "POLLOCK_7",
      dobraPeitoralMm: 10,
      dobraAxilarMediaMm: 11,
      dobraTricepsMm: 11,
      dobraSubescapularMm: 14,
      dobraAbdominalMm: 19,
      dobraSuprailiacaMm: 13,
      dobraCoxaMm: 15,
      somaDobrasMm: 93,
      densidadeCorporal: 1.0642,
      percentualGordura: 16.3,
      massaGordaKg: 13.09,
      massaMagraKg: 66.15,
      toraxCm: 103,
      cinturaCm: 82.5,
      bracoContraidoDireitoCm: 39.0,
      coxaDireitaCm: 57.5,
    },
    {
      id: "aval_joao_6",
      clienteId: "cli_joao",
      avaliadoEm: "2026-03-15T10:00:00.000Z",
      rotuloData: "15 Mar 2026",
      pesoKg: 78.5,
      alturaCm: 178,
      idade: 28,
      sexo: "MASCULINO",
      imc: 24.78,
      protocolo: "POLLOCK_7",
      dobraPeitoralMm: 8,
      dobraAxilarMediaMm: 9,
      dobraTricepsMm: 10,
      dobraSubescapularMm: 12,
      dobraAbdominalMm: 16,
      dobraSuprailiacaMm: 11,
      dobraCoxaMm: 13,
      somaDobrasMm: 79,
      densidadeCorporal: 1.0695,
      percentualGordura: 14.2,
      massaGordaKg: 11.15,
      massaMagraKg: 67.35,
      pescocoCm: 39,
      ombrosCm: 118,
      toraxCm: 104,
      cinturaCm: 81,
      abdomenCm: 83,
      quadrilCm: 96,
      bracoRelaxadoDireitoCm: 36.5,
      bracoRelaxadoEsquerdoCm: 36.2,
      bracoContraidoDireitoCm: 39.5,
      bracoContraidoEsquerdoCm: 39.2,
      antebracoDireitoCm: 29.5,
      antebracoEsquerdoCm: 29.2,
      coxaDireitaCm: 58,
      coxaEsquerdaCm: 57.5,
      panturrilhaDireitaCm: 39,
      panturrilhaEsquerdaCm: 38.8,
      observacoes: "Excelente redução de dobra abdominal e ganho de massa magra.",
    },
  ];

  mapa.set("cli_joao", {
    id: "cli_joao",
    treinadorId: "treinadora_joana",
    usuarioId: "usuario_joao",
    nomeCompleto: "João Silva",
    email: "joao@email.com",
    telefone: "+351 962 000 004",
    dataNascimento: "1998-04-12",
    idade: 28,
    sexo: "MASCULINO",
    alturaCm: 178,
    objetivoPrincipal: "Ganhar Massa Muscular",
    status: "ATIVO",
    tokenConvite: null,
    conviteExpiraEm: null,
    criadoEm: "2025-10-10T09:00:00.000Z",
    anamnese: {
      id: "anam_joao",
      clienteId: "cli_joao",
      parqProblemaCardiaco: false,
      parqDorPeitoAtividade: false,
      parqDorPeitoRepouso: false,
      parqTonturaDesmaio: false,
      parqProblemaOsseoArticular: true,
      parqMedicamentoPressao: false,
      parqOutraRazaoMedica: false,
      possuiRestricaoMedica: true,
      lesoesOuDores: "Condromalácia leve (Joelho D)",
      historicoCirurgias: "Nenhuma cirurgia prévia",
      medicamentos: "Nenhum uso contínuo",
      alergias: "Nenhuma alergia conhecida",
      mediaHorasSono: 7.5,
      qualidadeSono: "Boa, acorda descansado",
      nivelAtividadeTrabalho: "SEDENTARIO",
      ingestaoAguaLitros: 2.8,
      observacoes: "Evitar agachamento profundo sem aquecimento prévio de mobilidade.",
      preenchidaEm: "2025-10-12T14:30:00.000Z",
    },
    avaliacoes: avaliacoesJoao,
    fotosProgresso: [
      {
        id: "foto_joao_frente_ini",
        clienteId: "cli_joao",
        angulo: "FRENTE",
        etapa: "INICIO",
        urlImagem: "/fotos-demo/joao-frente-inicio.svg",
        registradaEm: "15 Out 2025",
        pesoKg: 82.7,
      },
      {
        id: "foto_joao_frente_atu",
        clienteId: "cli_joao",
        angulo: "FRENTE",
        etapa: "ATUAL",
        urlImagem: "/fotos-demo/joao-frente-atual.svg",
        registradaEm: "15 Mar 2026",
        pesoKg: 78.5,
      },
      {
        id: "foto_joao_costas_ini",
        clienteId: "cli_joao",
        angulo: "COSTAS",
        etapa: "INICIO",
        urlImagem: "/fotos-demo/joao-costas-inicio.svg",
        registradaEm: "15 Out 2025",
        pesoKg: 82.7,
      },
      {
        id: "foto_joao_costas_atu",
        clienteId: "cli_joao",
        angulo: "COSTAS",
        etapa: "ATUAL",
        urlImagem: "/fotos-demo/joao-costas-atual.svg",
        registradaEm: "15 Mar 2026",
        pesoKg: 78.5,
      },
      {
        id: "foto_joao_perfil_ini",
        clienteId: "cli_joao",
        angulo: "PERFIL",
        etapa: "INICIO",
        urlImagem: "/fotos-demo/joao-perfil-inicio.svg",
        registradaEm: "15 Out 2025",
        pesoKg: 82.7,
      },
      {
        id: "foto_joao_perfil_atu",
        clienteId: "cli_joao",
        angulo: "PERFIL",
        etapa: "ATUAL",
        urlImagem: "/fotos-demo/joao-perfil-atual.svg",
        registradaEm: "15 Mar 2026",
        pesoKg: 78.5,
      },
    ],
  });

  mapa.set("cli_miguel", {
    id: "cli_miguel",
    treinadorId: "treinadora_joana",
    usuarioId: "usuario_miguel",
    nomeCompleto: "Miguel Santos",
    email: "miguel.santos@email.com",
    telefone: "+351 914 220 118",
    dataNascimento: "1994-08-21",
    idade: 32,
    sexo: "MASCULINO",
    alturaCm: 182,
    objetivoPrincipal: "Recomposição Corporal",
    status: "ATIVO",
    tokenConvite: null,
    conviteExpiraEm: null,
    criadoEm: "2025-11-02T11:00:00.000Z",
    anamnese: {
      id: "anam_miguel",
      clienteId: "cli_miguel",
      parqProblemaCardiaco: false,
      parqDorPeitoAtividade: false,
      parqDorPeitoRepouso: false,
      parqTonturaDesmaio: false,
      parqProblemaOsseoArticular: false,
      parqMedicamentoPressao: false,
      parqOutraRazaoMedica: false,
      possuiRestricaoMedica: false,
      lesoesOuDores: "Nenhuma lesão relatada",
      mediaHorasSono: 7,
      nivelAtividadeTrabalho: "MODERADO",
      ingestaoAguaLitros: 2.5,
      preenchidaEm: "2025-11-03T10:00:00.000Z",
    },
    avaliacoes: [
      {
        id: "aval_miguel_1",
        clienteId: "cli_miguel",
        avaliadoEm: "2026-03-01T10:00:00.000Z",
        rotuloData: "01 Mar 2026",
        pesoKg: 85.7,
        alturaCm: 182,
        idade: 32,
        sexo: "MASCULINO",
        imc: 25.87,
        protocolo: "POLLOCK_7",
        somaDobrasMm: 88,
        densidadeCorporal: 1.064,
        percentualGordura: 15.8,
        massaGordaKg: 13.54,
        massaMagraKg: 72.16,
      },
    ],
    fotosProgresso: [],
  });

  mapa.set("cli_sara", {
    id: "cli_sara",
    treinadorId: "treinadora_joana",
    usuarioId: null,
    nomeCompleto: "Sara Martins",
    email: "sara.martins@email.com",
    telefone: "+351 938 551 902",
    dataNascimento: "2000-01-19",
    idade: 26,
    sexo: "FEMININO",
    alturaCm: 166,
    objetivoPrincipal: "Definição & Condicionamento",
    status: "CONVIDADO",
    tokenConvite: "tok_sara_demo",
    conviteExpiraEm: "2027-12-31T23:59:59.000Z",
    criadoEm: "2026-03-10T15:00:00.000Z",
    anamnese: null,
    avaliacoes: [],
    fotosProgresso: [],
  });

  return mapa;
}

export function criarRepositorioMemoria(comDadosIniciais = false): RepositorioClientes {
  return {
    clientes: comDadosIniciais ? criarDadosIniciaisDemo() : new Map(),
  };
}

export function criarServicoGestaoClientes(repositorio: RepositorioClientes) {
  return {
    async criarClienteComConvite(
      sessao: SessaoUsuario | null,
      dadosBrutos: unknown
    ): Promise<RegistroCliente> {
      const admin = exigirPapelAdmin(sessao);
      const dados = esquemaCriarCliente.parse(dadosBrutos);

      const sufixo = Math.random().toString(36).substring(2, 9);
      const id = `cli_${sufixo}`;
      const tokenConvite = `tok_${sufixo}`;
      const expira = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

      const novoCliente: RegistroCliente = {
        id,
        treinadorId: admin.usuarioId,
        usuarioId: null,
        nomeCompleto: dados.nomeCompleto,
        email: dados.email,
        telefone: dados.telefone,
        dataNascimento: dados.dataNascimento,
        idade: 28,
        sexo: dados.sexo,
        alturaCm: dados.alturaCm ?? 170,
        objetivoPrincipal: dados.objetivoPrincipal ?? "Condicionamento Geral",
        status: "CONVIDADO",
        tokenConvite,
        conviteExpiraEm: expira,
        criadoEm: new Date().toISOString(),
        anamnese: null,
        avaliacoes: [],
        fotosProgresso: [],
      };

      repositorio.clientes.set(id, novoCliente);
      return novoCliente;
    },

    async listarClientesDoTreinador(
      sessao: SessaoUsuario | null,
      termoBusca?: string
    ): Promise<PerfilCompletoCliente[]> {
      const admin = exigirPapelAdmin(sessao);
      const termo = termoBusca?.trim().toLowerCase() ?? "";

      const clientesDoTreinador = Array.from(repositorio.clientes.values()).filter(
        (cliente) => {
          if (cliente.treinadorId !== admin.usuarioId) return false;
          if (!termo) return true;
          return (
            cliente.nomeCompleto.toLowerCase().includes(termo) ||
            cliente.email.toLowerCase().includes(termo) ||
            cliente.objetivoPrincipal.toLowerCase().includes(termo)
          );
        }
      );

      return Promise.all(
        clientesDoTreinador.map((c) =>
          this.obterPerfilCompletoCliente(admin, c.id)
        )
      );
    },

    async obterPerfilCompletoCliente(
      sessao: SessaoUsuario | null,
      clienteId: string
    ): Promise<PerfilCompletoCliente> {
      if (!sessao) {
        throw new Error("Acesso negado: sessão não autenticada.");
      }

      const cliente = repositorio.clientes.get(clienteId);
      if (!cliente) {
        throw new Error("Cliente não encontrado.");
      }

      const autorizadoComoAdmin =
        sessao.papel === "ADMIN" && cliente.treinadorId === sessao.usuarioId;
      const autorizadoComoAluno =
        sessao.papel === "ALUNO" && cliente.usuarioId === sessao.usuarioId;

      if (!autorizadoComoAdmin && !autorizadoComoAluno) {
        throw new Error(
          "Acesso negado: você não tem permissão para visualizar este perfil."
        );
      }

      const avaliacoes = cliente.avaliacoes;
      const ultimaAvaliacao =
        avaliacoes.length > 0 ? avaliacoes[avaliacoes.length - 1] : null;
      const penultimaAvaliacao =
        avaliacoes.length >= 2 ? avaliacoes[avaliacoes.length - 2] : null;
      const primeiraAvaliacao =
        avaliacoes.length >= 2 ? avaliacoes[0] : null;

      const variacaoRecente =
        ultimaAvaliacao && penultimaAvaliacao
          ? calcularVariacaoAvaliacoes(ultimaAvaliacao, penultimaAvaliacao)
          : null;

      const variacaoDesdeInicio =
        ultimaAvaliacao && primeiraAvaliacao
          ? calcularVariacaoAvaliacoes(ultimaAvaliacao, primeiraAvaliacao)
          : null;

      return {
        ...cliente,
        ultimaAvaliacao,
        variacaoRecente,
        variacaoDesdeInicio,
      };
    },

    async obterClientePorTokenConvite(
      tokenConvite: string
    ): Promise<RegistroCliente | null> {
      for (const cliente of repositorio.clientes.values()) {
        if (cliente.tokenConvite === tokenConvite) {
          return cliente;
        }
      }
      return null;
    },

    async ativarConviteComAnamnese(
      tokenConvite: string,
      senhaPlana: string,
      dadosAnamneseBrutos: unknown,
      pesoInicialKg?: number
    ): Promise<RegistroCliente> {
      const cliente = await this.obterClientePorTokenConvite(tokenConvite);
      if (!cliente) {
        throw new Error("Convite inválido ou já utilizado.");
      }

      if (!senhaPlana || senhaPlana.length < 6) {
        throw new Error("A senha deve ter pelo menos 6 caracteres.");
      }

      const dadosAnamnese = esquemaAnamnese.parse(dadosAnamneseBrutos);
      const possuiRestricaoMedica = verificarRestricaoParq(dadosAnamnese);
      const senhaHash = await gerarHashSenha(senhaPlana);

      const anamnese: RegistroAnamnese = {
        id: `anam_${cliente.id}`,
        clienteId: cliente.id,
        ...dadosAnamnese,
        possuiRestricaoMedica,
        preenchidaEm: new Date().toISOString(),
      };

      cliente.status = "ATIVO";
      cliente.tokenConvite = null;
      cliente.conviteExpiraEm = null;
      cliente.usuarioId = cliente.usuarioId ?? `usuario_${cliente.id}`;
      cliente.senhaHash = senhaHash;
      cliente.anamnese = anamnese;

      if (pesoInicialKg && pesoInicialKg >= 20 && cliente.avaliacoes.length === 0) {
        const imc = calcularImc(pesoInicialKg, cliente.alturaCm || 170);
        cliente.avaliacoes.push({
          id: `aval_ini_${cliente.id}`,
          clienteId: cliente.id,
          avaliadoEm: new Date().toISOString(),
          rotuloData: "Inicial",
          pesoKg: pesoInicialKg,
          alturaCm: cliente.alturaCm || 170,
          idade: cliente.idade || 28,
          sexo: cliente.sexo,
          imc,
          protocolo: "MANUAL",
          percentualGordura: 18,
          massaGordaKg: Number((pesoInicialKg * 0.18).toFixed(2)),
          massaMagraKg: Number((pesoInicialKg * 0.82).toFixed(2)),
        });
      }

      return cliente;
    },

    async registrarAvaliacaoFisica(
      sessao: SessaoUsuario | null,
      dadosAvaliacaoBrutos: unknown
    ): Promise<RegistroAvaliacaoFisica> {
      const admin = exigirPapelAdmin(sessao);
      const dados = esquemaAvaliacaoFisica.parse(dadosAvaliacaoBrutos);

      const cliente = repositorio.clientes.get(dados.clienteId);
      if (!cliente || cliente.treinadorId !== admin.usuarioId) {
        throw new Error("Acesso negado: cliente não pertence a esta Personal Trainer.");
      }

      const imc = calcularImc(dados.pesoKg, dados.alturaCm);

      let somaDobrasMm: number | undefined;
      let densidadeCorporal: number | undefined;
      let percentualGordura = dados.percentualGorduraManual ?? 16;
      let massaGordaKg = Number(((dados.pesoKg * percentualGordura) / 100).toFixed(2));
      let massaMagraKg = Number((dados.pesoKg - massaGordaKg).toFixed(2));

      if (dados.protocolo === "POLLOCK_7") {
        const resultadoPollock7 = calcularPollock7Dobras({
          sexo: dados.sexo,
          idade: dados.idade,
          pesoKg: dados.pesoKg,
          dobraPeitoralMm: dados.dobraPeitoralMm ?? 10,
          dobraAxilarMediaMm: dados.dobraAxilarMediaMm ?? 10,
          dobraTricepsMm: dados.dobraTricepsMm ?? 10,
          dobraSubescapularMm: dados.dobraSubescapularMm ?? 10,
          dobraAbdominalMm: dados.dobraAbdominalMm ?? 10,
          dobraSuprailiacaMm: dados.dobraSuprailiacaMm ?? 10,
          dobraCoxaMm: dados.dobraCoxaMm ?? 10,
        });
        somaDobrasMm = resultadoPollock7.somaDobrasMm;
        densidadeCorporal = resultadoPollock7.densidadeCorporal;
        percentualGordura = resultadoPollock7.percentualGordura;
        massaGordaKg = resultadoPollock7.massaGordaKg;
        massaMagraKg = resultadoPollock7.massaMagraKg;
      } else if (dados.protocolo === "POLLOCK_3") {
        const resultadoPollock3 = calcularPollock3Dobras({
          sexo: dados.sexo,
          idade: dados.idade,
          pesoKg: dados.pesoKg,
          dobraPeitoralMm: dados.dobraPeitoralMm,
          dobraAbdominalMm: dados.dobraAbdominalMm,
          dobraTricepsMm: dados.dobraTricepsMm,
          dobraSuprailiacaMm: dados.dobraSuprailiacaMm,
          dobraCoxaMm: dados.dobraCoxaMm ?? 12,
        });
        somaDobrasMm = resultadoPollock3.somaDobrasMm;
        densidadeCorporal = resultadoPollock3.densidadeCorporal;
        percentualGordura = resultadoPollock3.percentualGordura;
        massaGordaKg = resultadoPollock3.massaGordaKg;
        massaMagraKg = resultadoPollock3.massaMagraKg;
      }

      const novaAvaliacao: RegistroAvaliacaoFisica = {
        id: `aval_${Date.now()}_${cliente.avaliacoes.length + 1}`,
        clienteId: cliente.id,
        avaliadoEm: new Date().toISOString(),
        rotuloData: "Hoje",
        pesoKg: dados.pesoKg,
        alturaCm: dados.alturaCm,
        idade: dados.idade,
        sexo: dados.sexo,
        imc,
        protocolo: dados.protocolo,
        dobraPeitoralMm: dados.dobraPeitoralMm,
        dobraAxilarMediaMm: dados.dobraAxilarMediaMm,
        dobraTricepsMm: dados.dobraTricepsMm,
        dobraSubescapularMm: dados.dobraSubescapularMm,
        dobraAbdominalMm: dados.dobraAbdominalMm,
        dobraSuprailiacaMm: dados.dobraSuprailiacaMm,
        dobraCoxaMm: dados.dobraCoxaMm,
        somaDobrasMm,
        densidadeCorporal,
        percentualGordura,
        massaGordaKg,
        massaMagraKg,
        pescocoCm: dados.pescocoCm,
        ombrosCm: dados.ombrosCm,
        toraxCm: dados.toraxCm,
        cinturaCm: dados.cinturaCm,
        abdomenCm: dados.abdomenCm,
        quadrilCm: dados.quadrilCm,
        bracoRelaxadoDireitoCm: dados.bracoRelaxadoDireitoCm,
        bracoRelaxadoEsquerdoCm: dados.bracoRelaxadoEsquerdoCm,
        bracoContraidoDireitoCm: dados.bracoContraidoDireitoCm,
        bracoContraidoEsquerdoCm: dados.bracoContraidoEsquerdoCm,
        antebracoDireitoCm: dados.antebracoDireitoCm,
        antebracoEsquerdoCm: dados.antebracoEsquerdoCm,
        coxaDireitaCm: dados.coxaDireitaCm,
        coxaEsquerdaCm: dados.coxaEsquerdaCm,
        panturrilhaDireitaCm: dados.panturrilhaDireitaCm,
        panturrilhaEsquerdaCm: dados.panturrilhaEsquerdaCm,
        observacoes: dados.observacoes,
      };

      cliente.avaliacoes.push(novaAvaliacao);
      return novaAvaliacao;
    },
  };
}

const repositorioPadrao = criarRepositorioMemoria(true);
export const servicoClientes = criarServicoGestaoClientes(repositorioPadrao);

export const criarClienteComConvite =
  servicoClientes.criarClienteComConvite.bind(servicoClientes);
export const listarClientesDoTreinador =
  servicoClientes.listarClientesDoTreinador.bind(servicoClientes);
export const obterPerfilCompletoCliente =
  servicoClientes.obterPerfilCompletoCliente.bind(servicoClientes);
export const obterClientePorTokenConvite =
  servicoClientes.obterClientePorTokenConvite.bind(servicoClientes);
export const ativarConviteComAnamnese =
  servicoClientes.ativarConviteComAnamnese.bind(servicoClientes);
export const registrarAvaliacaoFisica =
  servicoClientes.registrarAvaliacaoFisica.bind(servicoClientes);
