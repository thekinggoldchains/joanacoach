"use client";

import React, { useEffect, useState } from "react";
import {
  AnguloFoto,
  obterPerfilCompletoCliente,
  PerfilCompletoCliente,
  registrarAvaliacaoFisica,
} from "@/acoes/clientes";
import {
  calcularImc,
  calcularPollock3Dobras,
  calcularPollock7Dobras,
} from "@/dominio/avaliacao/calculadora";
import {
  IconeAlertaClinico,
  IconeSetaEsquerda,
} from "@/componentes/comum/Icones";
import { obterSessaoPadraoAdmin } from "@/servicos/autenticacao";
import estilos from "./PerfilCliente.module.scss";

export interface PropriedadesPerfilClienteAdmin {
  params?: Promise<{ id: string }> | { id: string };
  clienteIdInicial?: string;
}

type AbaPerfil = "RESUMO" | "AVALIACOES" | "ANAMNESE" | "PROGRESSO";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function PaginaPerfilClienteAdmin(propriedades: any = {}) {
  const { params, clienteIdInicial }: PropriedadesPerfilClienteAdmin = propriedades;
  const [clienteId, setClienteId] = useState<string>(clienteIdInicial || "cli_joao");
  const [perfil, setPerfil] = useState<PerfilCompletoCliente | null>(null);
  const [abaAtiva, setAbaAtiva] = useState<AbaPerfil>("RESUMO");
  const [anguloSelecionado, setAnguloSelecionado] = useState<AnguloFoto>("FRENTE");
  const [protocolo, setProtocolo] = useState<"POLLOCK_7" | "POLLOCK_3">("POLLOCK_7");

  // Estados da Calculadora Pollock em tempo real
  const [pesoKg, setPesoKg] = useState(78.5);
  const [alturaCm, setAlturaCm] = useState(178);
  const [dobraPeitoral, setDobraPeitoral] = useState(8);
  const [dobraAxilarMedia, setDobraAxilarMedia] = useState(9);
  const [dobraTriceps, setDobraTriceps] = useState(10);
  const [dobraSubescapular, setDobraSubescapular] = useState(12);
  const [dobraAbdominal, setDobraAbdominal] = useState(16);
  const [dobraSuprailiaca, setDobraSuprailiaca] = useState(11);
  const [dobraCoxa, setDobraCoxa] = useState(13);
  const [toraxCm, setToraxCm] = useState(104);
  const [cinturaCm, setCinturaCm] = useState(81);
  const [mensagemSucesso, setMensagemSucesso] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const parametrosUrl = new URLSearchParams(window.location.search);
      if (parametrosUrl.get("aba") === "avaliacoes") {
        setAbaAtiva("AVALIACOES");
      }
    }
  }, []);

  useEffect(() => {
    if (clienteIdInicial) {
      setClienteId(clienteIdInicial);
      return;
    }
    if (params) {
      Promise.resolve(params).then((resolvido) => {
        if (resolvido?.id) {
          setClienteId(resolvido.id);
        }
      });
    }
  }, [params, clienteIdInicial]);

  useEffect(() => {
    const sessao = obterSessaoPadraoAdmin();
    obterPerfilCompletoCliente(sessao, clienteId).then((dados) => {
      setPerfil(dados);
      if (dados.ultimaAvaliacao) {
        const u = dados.ultimaAvaliacao;
        setPesoKg(u.pesoKg);
        setAlturaCm(u.alturaCm);
        setDobraPeitoral(u.dobraPeitoralMm ?? 8);
        setDobraAxilarMedia(u.dobraAxilarMediaMm ?? 9);
        setDobraTriceps(u.dobraTricepsMm ?? 10);
        setDobraSubescapular(u.dobraSubescapularMm ?? 12);
        setDobraAbdominal(u.dobraAbdominalMm ?? 16);
        setDobraSuprailiaca(u.dobraSuprailiacaMm ?? 11);
        setDobraCoxa(u.dobraCoxaMm ?? 13);
        setToraxCm(u.toraxCm ?? 104);
        setCinturaCm(u.cinturaCm ?? 81);
      }
    });
  }, [clienteId]);

  if (!perfil) {
    return <div className={estilos.paginaPerfil}>Carregando perfil...</div>;
  }

  const resultadoCalculo =
    protocolo === "POLLOCK_7"
      ? calcularPollock7Dobras({
          sexo: perfil.sexo,
          idade: perfil.idade,
          pesoKg,
          dobraPeitoralMm: dobraPeitoral,
          dobraAxilarMediaMm: dobraAxilarMedia,
          dobraTricepsMm: dobraTriceps,
          dobraSubescapularMm: dobraSubescapular,
          dobraAbdominalMm: dobraAbdominal,
          dobraSuprailiacaMm: dobraSuprailiaca,
          dobraCoxaMm: dobraCoxa,
        })
      : calcularPollock3Dobras({
          sexo: perfil.sexo,
          idade: perfil.idade,
          pesoKg,
          dobraPeitoralMm: dobraPeitoral,
          dobraAbdominalMm: dobraAbdominal,
          dobraTricepsMm: dobraTriceps,
          dobraSuprailiacaMm: dobraSuprailiaca,
          dobraCoxaMm: dobraCoxa,
        });

  const imcCalculado = calcularImc(pesoKg, alturaCm);

  async function lidarComSalvarAvaliacao(evento: React.FormEvent) {
    evento.preventDefault();
    const sessao = obterSessaoPadraoAdmin();
    await registrarAvaliacaoFisica(sessao, {
      clienteId: perfil!.id,
      pesoKg,
      alturaCm,
      idade: perfil!.idade,
      sexo: perfil!.sexo,
      protocolo,
      dobraPeitoralMm: dobraPeitoral,
      dobraAxilarMediaMm: dobraAxilarMedia,
      dobraTricepsMm: dobraTriceps,
      dobraSubescapularMm: dobraSubescapular,
      dobraAbdominalMm: dobraAbdominal,
      dobraSuprailiacaMm: dobraSuprailiaca,
      dobraCoxaMm: dobraCoxa,
      toraxCm,
      cinturaCm,
    });

    const atualizado = await obterPerfilCompletoCliente(sessao, perfil!.id);
    setPerfil(atualizado);
    setMensagemSucesso("Avaliação física registrada com sucesso!");
  }

  const alturaMetrosFormatada = `${(perfil.alturaCm / 100).toFixed(2).replace(".", ",")} m`;
  const pesoAtualFormatado = perfil.ultimaAvaliacao
    ? `${perfil.ultimaAvaliacao.pesoKg.toFixed(1).replace(".", ",")} kg`
    : "—";

  const fotosDoAngulo = perfil.fotosProgresso.filter(
    (f) => f.angulo === anguloSelecionado
  );

  return (
    <div className={estilos.paginaPerfil}>
      <header className={estilos.cabecalhoPerfil}>
        <div className={estilos.identidadeCliente}>
          <h1 className={estilos.nomeCliente}>{perfil.nomeCompleto}</h1>
          <span className={estilos.metaCliente}>
            {perfil.email} • {perfil.objetivoPrincipal}
          </span>
        </div>
        <a href="/admin/clientes" className={estilos.botaoVoltar}>
          <IconeSetaEsquerda tamanho={16} />
          <span>Voltar para Clientes</span>
        </a>
      </header>

      {perfil.anamnese?.possuiRestricaoMedica && (
        <div className={estilos.alertaParq} role="alert">
          <span className={estilos.iconeAlertaParq}>
            <IconeAlertaClinico tamanho={18} />
          </span>
          <span>
            Atenção Médica (PAR-Q Positivo) —{" "}
            {perfil.anamnese.lesoesOuDores || "Restrição articular relatada na anamnese"}
          </span>
        </div>
      )}

      <nav className={estilos.barraAbas} aria-label="Abas do Perfil do Cliente">
        <button
          type="button"
          className={`${estilos.botaoAba} ${
            abaAtiva === "RESUMO" ? estilos.botaoAbaAtiva : ""
          }`}
          onClick={() => setAbaAtiva("RESUMO")}
        >
          Resumo
        </button>
        <button
          type="button"
          className={`${estilos.botaoAba} ${
            abaAtiva === "AVALIACOES" ? estilos.botaoAbaAtiva : ""
          }`}
          onClick={() => setAbaAtiva("AVALIACOES")}
        >
          Avaliações
        </button>
        <button
          type="button"
          className={`${estilos.botaoAba} ${
            abaAtiva === "ANAMNESE" ? estilos.botaoAbaAtiva : ""
          }`}
          onClick={() => setAbaAtiva("ANAMNESE")}
        >
          Anamnese
        </button>
        <button
          type="button"
          className={`${estilos.botaoAba} ${
            abaAtiva === "PROGRESSO" ? estilos.botaoAbaAtiva : ""
          }`}
          onClick={() => setAbaAtiva("PROGRESSO")}
        >
          Progresso
        </button>
      </nav>

      {abaAtiva === "RESUMO" && (
        <section className={estilos.gradeResumo}>
          <div className={estilos.cartaoClaro}>
            <h2 className={estilos.tituloCartao}>Dados Pessoais</h2>
            <div className={estilos.listaDados}>
              <div className={estilos.itemDado}>
                <span className={estilos.rotuloDado}>Idade</span>
                <strong className={estilos.valorDado}>{perfil.idade} anos</strong>
              </div>
              <div className={estilos.itemDado}>
                <span className={estilos.rotuloDado}>Altura</span>
                <strong className={estilos.valorDado}>{alturaMetrosFormatada}</strong>
              </div>
              <div className={estilos.itemDado}>
                <span className={estilos.rotuloDado}>Peso Atual</span>
                <strong className={estilos.valorDado}>{pesoAtualFormatado}</strong>
              </div>
              <div className={estilos.itemDado}>
                <span className={estilos.rotuloDado}>Objetivo</span>
                <strong className={estilos.valorDado}>{perfil.objetivoPrincipal}</strong>
              </div>
              <div className={estilos.itemDado} style={{ gridColumn: "1 / -1" }}>
                <span className={estilos.rotuloDado}>Observação Clínica</span>
                <strong className={estilos.valorDado}>
                  {perfil.anamnese?.lesoesOuDores || "Sem restrições"}
                </strong>
              </div>
            </div>
          </div>

          <div className={estilos.cartaoClaro}>
            <h2 className={estilos.tituloCartao}>Estatísticas de Evolução</h2>
            <div className={estilos.gradeVariacoes}>
              <div className={estilos.blocoVariacao}>
                <span className={estilos.rotuloDado}>Peso</span>
                <div className={estilos.valorPositivo}>
                  {perfil.variacaoRecente
                    ? `${perfil.variacaoRecente.variacaoPesoKg
                        .toFixed(1)
                        .replace(".", ",")} kg`
                    : "-1,8 kg"}
                </div>
              </div>
              <div className={estilos.blocoVariacao}>
                <span className={estilos.rotuloDado}>Massa Magra</span>
                <div className={estilos.valorPositivo}>
                  {perfil.variacaoRecente
                    ? `+${perfil.variacaoRecente.variacaoMassaMagraKg
                        .toFixed(1)
                        .replace(".", ",")} kg`
                    : "+1,2 kg"}
                </div>
              </div>
              <div className={estilos.blocoVariacao}>
                <span className={estilos.rotuloDado}>% Gordura</span>
                <div className={estilos.valorPositivo}>
                  {perfil.variacaoRecente
                    ? `${perfil.variacaoRecente.variacaoPercentualGordura
                        .toFixed(1)
                        .replace(".", ",")} %`
                    : "-2,1 %"}
                </div>
              </div>
            </div>

            <svg
              className={estilos.graficoSvg}
              viewBox="0 0 320 110"
              aria-label="Gráfico Dourado de Evolução de Peso"
            >
              <polyline
                fill="none"
                stroke="#C5A059"
                strokeWidth="3"
                points="20,25 80,38 140,52 200,64 260,76 300,92"
              />
              <circle cx="20" cy="25" r="4" fill="#C5A059" />
              <circle cx="300" cy="92" r="5" fill="#141414" stroke="#C5A059" strokeWidth="2" />
            </svg>
          </div>

          <div className={estilos.cartaoClaro}>
            <h2 className={estilos.tituloCartao}>Última Avaliação Física</h2>
            {perfil.ultimaAvaliacao && (
              <div className={estilos.listaDados}>
                <div className={estilos.itemDado}>
                  <span className={estilos.rotuloDado}>Peso (kg)</span>
                  <strong className={estilos.valorDado}>
                    {perfil.ultimaAvaliacao.pesoKg.toFixed(1).replace(".", ",")}
                  </strong>
                </div>
                <div className={estilos.itemDado}>
                  <span className={estilos.rotuloDado}>% Gordura (BF)</span>
                  <strong className={estilos.valorDado}>
                    {perfil.ultimaAvaliacao.percentualGordura.toFixed(1).replace(".", ",")}%
                  </strong>
                </div>
                <div className={estilos.itemDado}>
                  <span className={estilos.rotuloDado}>Massa Magra (kg)</span>
                  <strong className={estilos.valorDado}>
                    {perfil.ultimaAvaliacao.massaMagraKg.toFixed(2).replace(".", ",")}
                  </strong>
                </div>
                <div className={estilos.itemDado}>
                  <span className={estilos.rotuloDado}>Soma 7 Dobras</span>
                  <strong className={estilos.valorDado}>
                    {perfil.ultimaAvaliacao.somaDobrasMm} mm
                  </strong>
                </div>
              </div>
            )}
          </div>

          <div className={estilos.cartaoClaro}>
            <h2 className={estilos.tituloCartao}>Perimetria Chave & Fotos de Progresso</h2>
            <div className={estilos.listaDados}>
              <div className={estilos.itemDado}>
                <span className={estilos.rotuloDado}>Tórax (cm)</span>
                <strong className={estilos.valorDado}>
                  {perfil.ultimaAvaliacao?.toraxCm ?? 104}
                </strong>
              </div>
              <div className={estilos.itemDado}>
                <span className={estilos.rotuloDado}>Cintura (cm)</span>
                <strong className={estilos.valorDado}>
                  {perfil.ultimaAvaliacao?.cinturaCm ?? 81}
                </strong>
              </div>
            </div>
            <span className={estilos.rotuloDado}>
              {perfil.fotosProgresso.length} fotos de evolução arquivadas
            </span>
          </div>
        </section>
      )}

      {abaAtiva === "AVALIACOES" && (
        <section className={estilos.gradeAvaliacao}>
          <form onSubmit={lidarComSalvarAvaliacao} className={estilos.cartaoClaro}>
            <h2 className={estilos.tituloCartao}>
              Nova Avaliação Física — Protocolo Pollock
            </h2>

            <div className={estilos.gradeCamposDobras}>
              <label className={estilos.rotuloEntrada}>
                Protocolo
                <select
                  className={estilos.campoEntrada}
                  value={protocolo}
                  onChange={(e) =>
                    setProtocolo(e.target.value as "POLLOCK_7" | "POLLOCK_3")
                  }
                >
                  <option value="POLLOCK_7">Pollock 7 Dobras</option>
                  <option value="POLLOCK_3">Pollock 3 Dobras</option>
                </select>
              </label>

              <label className={estilos.rotuloEntrada}>
                Peso (kg)
                <input
                  type="number"
                  step="0.1"
                  className={estilos.campoEntrada}
                  value={pesoKg}
                  onChange={(e) => setPesoKg(Number(e.target.value) || 0)}
                />
              </label>

              <label className={estilos.rotuloEntrada}>
                Altura (cm)
                <input
                  type="number"
                  className={estilos.campoEntrada}
                  value={alturaCm}
                  onChange={(e) => setAlturaCm(Number(e.target.value) || 178)}
                />
              </label>
            </div>

            <h3 className={estilos.tituloCartao}>Dobras Cutâneas (mm)</h3>
            <div className={estilos.gradeCamposDobras}>
              <label className={estilos.rotuloEntrada}>
                Peitoral (mm)
                <input
                  type="number"
                  className={estilos.campoEntrada}
                  value={dobraPeitoral}
                  onChange={(e) => setDobraPeitoral(Number(e.target.value) || 0)}
                />
              </label>

              <label className={estilos.rotuloEntrada}>
                Axilar Média (mm)
                <input
                  type="number"
                  className={estilos.campoEntrada}
                  value={dobraAxilarMedia}
                  onChange={(e) => setDobraAxilarMedia(Number(e.target.value) || 0)}
                />
              </label>

              <label className={estilos.rotuloEntrada}>
                Tríceps (mm)
                <input
                  type="number"
                  className={estilos.campoEntrada}
                  value={dobraTriceps}
                  onChange={(e) => setDobraTriceps(Number(e.target.value) || 0)}
                />
              </label>

              <label className={estilos.rotuloEntrada}>
                Subescapular (mm)
                <input
                  type="number"
                  className={estilos.campoEntrada}
                  value={dobraSubescapular}
                  onChange={(e) => setDobraSubescapular(Number(e.target.value) || 0)}
                />
              </label>

              <label className={estilos.rotuloEntrada}>
                Abdominal (mm)
                <input
                  type="number"
                  className={estilos.campoEntrada}
                  value={dobraAbdominal}
                  onChange={(e) => setDobraAbdominal(Number(e.target.value) || 0)}
                />
              </label>

              <label className={estilos.rotuloEntrada}>
                Supra-ilíaca (mm)
                <input
                  type="number"
                  className={estilos.campoEntrada}
                  value={dobraSuprailiaca}
                  onChange={(e) => setDobraSuprailiaca(Number(e.target.value) || 0)}
                />
              </label>

              <label className={estilos.rotuloEntrada}>
                Coxa (mm)
                <input
                  type="number"
                  className={estilos.campoEntrada}
                  value={dobraCoxa}
                  onChange={(e) => setDobraCoxa(Number(e.target.value) || 0)}
                />
              </label>
            </div>

            <h3 className={estilos.tituloCartao}>Perimetria (cm)</h3>
            <div className={estilos.gradeCamposDobras}>
              <label className={estilos.rotuloEntrada}>
                Tórax (cm)
                <input
                  type="number"
                  className={estilos.campoEntrada}
                  value={toraxCm}
                  onChange={(e) => setToraxCm(Number(e.target.value) || 0)}
                />
              </label>

              <label className={estilos.rotuloEntrada}>
                Cintura (cm)
                <input
                  type="number"
                  className={estilos.campoEntrada}
                  value={cinturaCm}
                  onChange={(e) => setCinturaCm(Number(e.target.value) || 0)}
                />
              </label>
            </div>

            {mensagemSucesso && <p>{mensagemSucesso}</p>}

            <button type="submit" className={estilos.botaoSalvarAvaliacao}>
              Salvar Avaliação Física
            </button>
          </form>

          <aside className={estilos.cartaoResultadoEscuro}>
            <h3 className={estilos.tituloResultadoEscuro}>Resultado Calculado</h3>

            <div className={estilos.linhaResultado}>
              <span>Soma das Dobras</span>
              <strong>{resultadoCalculo.somaDobrasMm} mm</strong>
            </div>

            <div className={estilos.linhaResultado}>
              <span>Densidade Corporal</span>
              <strong>{resultadoCalculo.densidadeCorporal.toFixed(4)} g/cm³</strong>
            </div>

            <div className={estilos.destaqueBfDourado}>
              <span>% Gordura Corporal (BF)</span>
              <strong>{resultadoCalculo.percentualGordura.toFixed(2)}%</strong>
            </div>

            <div className={estilos.linhaResultado}>
              <span>Massa Magra</span>
              <strong>{resultadoCalculo.massaMagraKg.toFixed(2)} kg</strong>
            </div>

            <div className={estilos.linhaResultado}>
              <span>Massa Gorda</span>
              <strong>{resultadoCalculo.massaGordaKg.toFixed(2)} kg</strong>
            </div>

            <div className={estilos.linhaResultado}>
              <span>IMC Atual</span>
              <strong>{imcCalculado.toFixed(2)} kg/m²</strong>
            </div>
          </aside>
        </section>
      )}

      {abaAtiva === "ANAMNESE" && (
        <section className={estilos.cartaoClaro}>
          <h2 className={estilos.tituloCartao}>Questionário Clínico & PAR-Q</h2>
          {perfil.anamnese ? (
            <div className={estilos.listaDados}>
              <div className={estilos.itemDado}>
                <span className={estilos.rotuloDado}>Problema Ósseo ou Articular (PAR-Q)</span>
                <strong className={estilos.valorDado}>
                  {perfil.anamnese.parqProblemaOsseoArticular ? "Sim (Positivo)" : "Não"}
                </strong>
              </div>
              <div className={estilos.itemDado}>
                <span className={estilos.rotuloDado}>Lesões ou Dores</span>
                <strong className={estilos.valorDado}>
                  {perfil.anamnese.lesoesOuDores}
                </strong>
              </div>
              <div className={estilos.itemDado}>
                <span className={estilos.rotuloDado}>Qualidade do Sono</span>
                <strong className={estilos.valorDado}>
                  {perfil.anamnese.qualidadeSono} ({perfil.anamnese.mediaHorasSono}h)
                </strong>
              </div>
              <div className={estilos.itemDado}>
                <span className={estilos.rotuloDado}>Observações Médicas</span>
                <strong className={estilos.valorDado}>
                  {perfil.anamnese.observacoes}
                </strong>
              </div>
            </div>
          ) : (
            <p>Anamnese ainda não preenchida pelo aluno.</p>
          )}
        </section>
      )}

      {abaAtiva === "PROGRESSO" && (
        <section className={estilos.cartaoClaro}>
          <h2 className={estilos.tituloCartao}>Comparador de Fotos: Antes vs. Atual</h2>
          <div className={estilos.barraAngulos}>
            <button
              type="button"
              className={`${estilos.botaoAba} ${
                anguloSelecionado === "FRENTE" ? estilos.botaoAbaAtiva : ""
              }`}
              onClick={() => setAnguloSelecionado("FRENTE")}
            >
              Frente
            </button>
            <button
              type="button"
              className={`${estilos.botaoAba} ${
                anguloSelecionado === "COSTAS" ? estilos.botaoAbaAtiva : ""
              }`}
              onClick={() => setAnguloSelecionado("COSTAS")}
            >
              Costas
            </button>
            <button
              type="button"
              className={`${estilos.botaoAba} ${
                anguloSelecionado === "PERFIL" ? estilos.botaoAbaAtiva : ""
              }`}
              onClick={() => setAnguloSelecionado("PERFIL")}
            >
              Perfil
            </button>
          </div>

          <div className={estilos.gradeComparadorFotos}>
            {fotosDoAngulo.map((foto) => (
              <div key={foto.id} className={estilos.cartaoFoto}>
                <strong>{foto.etapa === "INICIO" ? "Início" : "Atual"}</strong>
                <span>
                  {foto.registradaEm} • {foto.pesoKg} kg
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
