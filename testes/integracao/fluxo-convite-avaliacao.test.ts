import { describe, it, expect, beforeEach } from "vitest";
import {
  criarRepositorioMemoria,
  criarServicoGestaoClientes,
} from "@/acoes/clientes";
import {
  gerarHashSenha,
  verificarSenha,
  exigirPapelAdmin,
  obterSessaoPadraoAdmin,
  obterSessaoPadraoAluno,
} from "@/servicos/autenticacao";

describe("Fluxo Completo: Pré-cadastro -> Convite -> Anamnese -> Avaliação Pollock & Privacidade Total", () => {
  let servico: ReturnType<typeof criarServicoGestaoClientes>;

  beforeEach(() => {
    const repo = criarRepositorioMemoria();
    servico = criarServicoGestaoClientes(repo);
  });

  it("deve criar convite, permitir que o aluno ative a conta com anamnese, calcular Pollock 7 e isolar dados entre treinadores", async () => {
    const sessaoJoana = { usuarioId: "treinadora_joana", papel: "ADMIN" as const };
    const sessaoOutroPersonal = { usuarioId: "treinador_outro", papel: "ADMIN" as const };

    // 1. Joana pré-cadastra João Silva e gera link de convite
    const clienteCriado = await servico.criarClienteComConvite(sessaoJoana, {
      nomeCompleto: "João Silva",
      email: "joao@email.com",
      telefone: "962000004",
      sexo: "MASCULINO",
      alturaCm: 178,
      objetivoPrincipal: "Ganhar Massa Muscular",
    });

    expect(clienteCriado.status).toBe("CONVIDADO");
    expect(clienteCriado.tokenConvite).toMatch(/^tok_/);

    // 2. Outro personal NÃO consegue ver os clientes da Joana (Privacidade Total)
    const listaOutro = await servico.listarClientesDoTreinador(sessaoOutroPersonal);
    expect(listaOutro).toHaveLength(0);

    // 3. João acessa o link de convite, cria senha e envia Anamnese com 1 alerta PAR-Q
    const ativacao = await servico.ativarConviteComAnamnese(
      clienteCriado.tokenConvite!,
      "SenhaSegura123!",
      {
        parqProblemaCardiaco: false,
        parqDorPeitoAtividade: false,
        parqDorPeitoRepouso: false,
        parqTonturaDesmaio: false,
        parqProblemaOsseoArticular: true,
        parqMedicamentoPressao: false,
        parqOutraRazaoMedica: false,
        lesoesOuDores: "Condromalácia leve no joelho direito",
        mediaHorasSono: 7,
        nivelAtividadeTrabalho: "SEDENTARIO",
        ingestaoAguaLitros: 2.5,
      }
    );

    expect(ativacao.status).toBe("ATIVO");
    expect(ativacao.tokenConvite).toBeNull();
    expect(ativacao.anamnese?.possuiRestricaoMedica).toBe(true);

    // 4. Joana registra duas avaliações físicas Pollock 7 e obtém variação automática
    await servico.registrarAvaliacaoFisica(sessaoJoana, {
      clienteId: clienteCriado.id,
      pesoKg: 80.3,
      alturaCm: 178,
      idade: 28,
      sexo: "MASCULINO",
      protocolo: "POLLOCK_7",
      dobraPeitoralMm: 10,
      dobraAxilarMediaMm: 11,
      dobraTricepsMm: 11,
      dobraSubescapularMm: 14,
      dobraAbdominalMm: 19,
      dobraSuprailiacaMm: 13,
      dobraCoxaMm: 15,
    });

    const segundaAvaliacao = await servico.registrarAvaliacaoFisica(sessaoJoana, {
      clienteId: clienteCriado.id,
      pesoKg: 78.5,
      alturaCm: 178,
      idade: 28,
      sexo: "MASCULINO",
      protocolo: "POLLOCK_7",
      dobraPeitoralMm: 8,
      dobraAxilarMediaMm: 9,
      dobraTricepsMm: 10,
      dobraSubescapularMm: 12,
      dobraAbdominalMm: 16,
      dobraSuprailiacaMm: 11,
      dobraCoxaMm: 13,
      toraxCm: 104,
      cinturaCm: 81,
    });

    expect(segundaAvaliacao.somaDobrasMm).toBe(79);
    expect(segundaAvaliacao.imc).toBe(24.78);

    const perfilCompleto = await servico.obterPerfilCompletoCliente(
      sessaoJoana,
      clienteCriado.id
    );
    expect(perfilCompleto.avaliacoes).toHaveLength(2);
    expect(perfilCompleto.variacaoRecente?.variacaoPesoKg).toBe(-1.8);
  });

  it("deve bloquear acesso de um aluno ao perfil de outro aluno e validar funções de autenticação", async () => {
    const hash = await gerarHashSenha("MinhaSenha123");
    expect(await verificarSenha("MinhaSenha123", hash)).toBe(true);
    expect(await verificarSenha("SenhaErrada", hash)).toBe(false);

    const sessaoAdmin = obterSessaoPadraoAdmin();
    const sessaoAluno = obterSessaoPadraoAluno();
    expect(exigirPapelAdmin(sessaoAdmin).papel).toBe("ADMIN");
    expect(() => exigirPapelAdmin(sessaoAluno)).toThrow(/Acesso negado/);

    const repoDemo = criarRepositorioMemoria(true);
    const servicoDemo = criarServicoGestaoClientes(repoDemo);

    const listaJoana = await servicoDemo.listarClientesDoTreinador(sessaoAdmin);
    expect(listaJoana.length).toBeGreaterThanOrEqual(3);

    const perfilJoaoComoAluno = await servicoDemo.obterPerfilCompletoCliente(
      sessaoAluno,
      "cli_joao"
    );
    expect(perfilJoaoComoAluno.nomeCompleto).toBe("João Silva");

    await expect(
      servicoDemo.obterPerfilCompletoCliente(sessaoAluno, "cli_miguel")
    ).rejects.toThrow(/Acesso negado/);
  });
});
