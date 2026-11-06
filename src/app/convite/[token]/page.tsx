"use client";

import React, { useEffect, useState } from "react";
import {
  ativarConviteComAnamnese,
  NivelAtividade,
  obterClientePorTokenConvite,
} from "@/acoes/clientes";
import { IconeAlertaClinico } from "@/componentes/comum/Icones";
import estilos from "./Convite.module.scss";

export interface PropriedadesPaginaConvite {
  params?: Promise<{ token: string }>;
  tokenInicial?: string;
}

interface PerguntaParq {
  chave:
    | "parqProblemaCardiaco"
    | "parqDorPeitoAtividade"
    | "parqDorPeitoRepouso"
    | "parqTonturaDesmaio"
    | "parqProblemaOsseoArticular"
    | "parqMedicamentoPressao"
    | "parqOutraRazaoMedica";
  texto: string;
}

const PERGUNTAS_PARQ: PerguntaParq[] = [
  {
    chave: "parqProblemaCardiaco",
    texto: "Problema cardíaco diagnosticado pelo médico?",
  },
  {
    chave: "parqDorPeitoAtividade",
    texto: "Sente dor no peito durante atividade física?",
  },
  {
    chave: "parqDorPeitoRepouso",
    texto: "Sentiu dor no peito no último mês em repouso?",
  },
  {
    chave: "parqTonturaDesmaio",
    texto: "Perde o equilíbrio por tontura ou já desmaiou?",
  },
  {
    chave: "parqProblemaOsseoArticular",
    texto: "Possui problema ósseo ou articular agravado por treino?",
  },
  {
    chave: "parqMedicamentoPressao",
    texto: "Toma medicamento para pressão arterial ou coração?",
  },
  {
    chave: "parqOutraRazaoMedica",
    texto: "Existe outra razão médica para não praticar exercício?",
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function PaginaConviteAluno(propriedades: any = {}) {
  const { params, tokenInicial }: PropriedadesPaginaConvite = propriedades;
  const [token, setToken] = useState<string>(tokenInicial || "tok_sara_demo");
  const [nomeCliente, setNomeCliente] = useState<string>("Sara Martins");
  const [emailCliente, setEmailCliente] = useState<string>("sara.martins@email.com");
  const [senha, setSenha] = useState<string>("Sara1234!");
  const [pesoInicialKg, setPesoInicialKg] = useState<number>(62.5);

  const [respostasParq, setRespostasParq] = useState<Record<PerguntaParq["chave"], boolean>>({
    parqProblemaCardiaco: false,
    parqDorPeitoAtividade: false,
    parqDorPeitoRepouso: false,
    parqTonturaDesmaio: false,
    parqProblemaOsseoArticular: false,
    parqMedicamentoPressao: false,
    parqOutraRazaoMedica: false,
  });

  const [lesoesOuDores, setLesoesOuDores] = useState<string>("");
  const [mediaHorasSono, setMediaHorasSono] = useState<number>(7.5);
  const [nivelAtividadeTrabalho, setNivelAtividadeTrabalho] =
    useState<NivelAtividade>("MODERADO");
  const [cadastroConcluido, setCadastroConcluido] = useState<boolean>(false);

  useEffect(() => {
    if (tokenInicial) {
      setToken(tokenInicial);
      return;
    }
    if (params) {
      Promise.resolve(params).then((resolvido) => {
        if (resolvido?.token) {
          setToken(resolvido.token);
        }
      });
    }
  }, [params, tokenInicial]);

  useEffect(() => {
    obterClientePorTokenConvite(token).then((cliente) => {
      if (cliente) {
        setNomeCliente(cliente.nomeCompleto);
        setEmailCliente(cliente.email);
      }
    });
  }, [token]);

  const alternarParq = (chave: PerguntaParq["chave"], valor: boolean) => {
    setRespostasParq((atual) => ({
      ...atual,
      [chave]: valor,
    }));
  };

  const temAlertaParq = Object.values(respostasParq).some(Boolean);

  const aoSubmeterConvite = async (evento: React.FormEvent) => {
    evento.preventDefault();
    await ativarConviteComAnamnese(
      token,
      senha,
      {
        ...respostasParq,
        lesoesOuDores: lesoesOuDores || "Nenhuma restrição informada",
        mediaHorasSono,
        nivelAtividadeTrabalho,
      },
      pesoInicialKg
    );
    setCadastroConcluido(true);
  };

  return (
    <main className={estilos.paginaConvite}>
      <div className={estilos.containerMobile}>
        <header className={estilos.cabecalhoEscuro}>
          <div className={estilos.monograma}>JA</div>
          <span className={estilos.seloConvite}>Convite Exclusivo • Joana Antunes Coaching</span>
          <h1 className={estilos.tituloBoasVindas}>Bem-vinda, {nomeCliente}</h1>
          <p className={estilos.subtituloBoasVindas}>
            Complete sua anamnese inicial e ative seu acesso ao acompanhamento ({emailCliente}).
          </p>
        </header>

        {cadastroConcluido && (
          <div className={estilos.mensagemSucesso} role="status">
            Cadastro concluído com sucesso! Seu perfil foi ativado.{" "}
            <a href="/app/inicio">Ir para o App</a>
          </div>
        )}

        <form onSubmit={aoSubmeterConvite} className={estilos.formulario}>
          {/* Etapa 1: Credenciais e Peso Inicial */}
          <section className={estilos.cartaoEtapa}>
            <div className={estilos.cabecalhoEtapa}>
              <span className={estilos.numeroEtapa}>1</span>
              <div>
                <h2 className={estilos.tituloEtapa}>Credenciais &amp; Medidas Iniciais</h2>
                <p className={estilos.descricaoEtapa}>
                  Defina sua senha de acesso e seu peso atual.
                </p>
              </div>
            </div>

            <div className={estilos.gradeCampos}>
              <div className={estilos.grupoCampo}>
                <label htmlFor="senha-convite" className={estilos.rotulo}>
                  Criar Palavra-passe
                </label>
                <input
                  id="senha-convite"
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className={estilos.campo}
                  required
                />
              </div>

              <div className={estilos.grupoCampo}>
                <label htmlFor="peso-inicial" className={estilos.rotulo}>
                  Peso Inicial (kg)
                </label>
                <input
                  id="peso-inicial"
                  type="number"
                  step="0.1"
                  value={pesoInicialKg}
                  onChange={(e) => setPesoInicialKg(Number(e.target.value))}
                  className={estilos.campo}
                  required
                />
              </div>
            </div>
          </section>

          {/* Etapa 2: Questionário PAR-Q */}
          <section className={estilos.cartaoEtapa}>
            <div className={estilos.cabecalhoEtapa}>
              <span className={estilos.numeroEtapa}>2</span>
              <div>
                <h2 className={estilos.tituloEtapa}>Questionário PAR-Q</h2>
                <p className={estilos.descricaoEtapa}>
                  Prontidão para Atividade Física (7 perguntas obrigatórias)
                </p>
              </div>
            </div>

            <div className={estilos.listaParq}>
              {PERGUNTAS_PARQ.map((pergunta) => {
                const marcadoSim = respostasParq[pergunta.chave];
                return (
                  <div key={pergunta.chave} className={estilos.itemParq}>
                    <span className={estilos.perguntaParq}>{pergunta.texto}</span>
                    <div className={estilos.botoesSimNao}>
                      <button
                        type="button"
                        onClick={() => alternarParq(pergunta.chave, true)}
                        className={`${estilos.botaoOpcao} ${
                          marcadoSim ? estilos.opcaoSimAtiva : ""
                        }`}
                      >
                        Sim
                      </button>
                      <button
                        type="button"
                        onClick={() => alternarParq(pergunta.chave, false)}
                        className={`${estilos.botaoOpcao} ${
                          !marcadoSim ? estilos.opcaoNaoAtiva : ""
                        }`}
                      >
                        Não
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {temAlertaParq && (
              <div className={estilos.alertaParq}>
                <span className={estilos.iconeAlertaParq}>
                  <IconeAlertaClinico tamanho={17} />
                </span>
                <span>
                  A Personal Joana Antunes será notificada sobre sua restrição no PAR-Q para adaptar seu plano com segurança.
                </span>
              </div>
            )}
          </section>

          {/* Etapa 3: Histórico Clínico e Rotina */}
          <section className={estilos.cartaoEtapa}>
            <div className={estilos.cabecalhoEtapa}>
              <span className={estilos.numeroEtapa}>3</span>
              <div>
                <h2 className={estilos.tituloEtapa}>Histórico Clínico &amp; Rotina</h2>
                <p className={estilos.descricaoEtapa}>
                  Informações sobre articulações, sono e rotina diária.
                </p>
              </div>
            </div>

            <div className={estilos.grupoCampo}>
              <label htmlFor="lesoes-dores" className={estilos.rotulo}>
                Lesões, dores articulares ou cirurgias prévias
              </label>
              <textarea
                id="lesoes-dores"
                rows={3}
                placeholder="Descreva se sente algum desconforto no joelho, ombro ou coluna..."
                value={lesoesOuDores}
                onChange={(e) => setLesoesOuDores(e.target.value)}
                className={estilos.campo}
              />
            </div>

            <div className={estilos.gradeCampos}>
              <div className={estilos.grupoCampo}>
                <label htmlFor="horas-sono" className={estilos.rotulo}>
                  Horas de sono/noite
                </label>
                <input
                  id="horas-sono"
                  type="number"
                  step="0.5"
                  value={mediaHorasSono}
                  onChange={(e) => setMediaHorasSono(Number(e.target.value))}
                  className={estilos.campo}
                />
              </div>

              <div className={estilos.grupoCampo}>
                <label htmlFor="nivel-atividade" className={estilos.rotulo}>
                  Nível de atividade no trabalho
                </label>
                <select
                  id="nivel-atividade"
                  value={nivelAtividadeTrabalho}
                  onChange={(e) =>
                    setNivelAtividadeTrabalho(e.target.value as NivelAtividade)
                  }
                  className={estilos.campo}
                >
                  <option value="SEDENTARIO">Sedentário (Sentado)</option>
                  <option value="LEVE">Leve (Caminhadas curtas)</option>
                  <option value="MODERADO">Moderado (Ativo)</option>
                  <option value="INTENSO">Intenso (Trabalho físico)</option>
                </select>
              </div>
            </div>
          </section>

          <button type="submit" className={estilos.botaoConcluir}>
            Concluir Cadastro e Entrar no App
          </button>
        </form>
      </div>
    </main>
  );
}
