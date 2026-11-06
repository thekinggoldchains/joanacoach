"use client";

import React, { useEffect, useState } from "react";
import {
  criarClienteComConvite,
  listarClientesDoTreinador,
  PerfilCompletoCliente,
  StatusCliente,
} from "@/acoes/clientes";
import { SexoBiologico } from "@/dominio/avaliacao/calculadora";
import {
  IconeAdicionar,
  IconeBusca,
  IconeSetaDireita,
} from "@/componentes/comum/Icones";
import { obterSessaoPadraoAdmin } from "@/servicos/autenticacao";
import estilos from "./Clientes.module.scss";

function formatarPeso(pesoKg?: number): string {
  if (typeof pesoKg !== "number") return "—";
  return `${pesoKg.toFixed(1).replace(".", ",")} kg`;
}

export default function PaginaClientesAdmin() {
  const [clientes, setClientes] = useState<PerfilCompletoCliente[]>([]);
  const [termoBusca, setTermoBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState<"TODOS" | StatusCliente>("TODOS");
  const [modalAberto, setModalAberto] = useState(false);

  const [nomeCompleto, setNomeCompleto] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [sexo, setSexo] = useState<SexoBiologico>("FEMININO");
  const [alturaCm, setAlturaCm] = useState("170");
  const [objetivoPrincipal, setObjetivoPrincipal] = useState("Ganhar Massa Muscular");
  const [linkConviteGerado, setLinkConviteGerado] = useState<string | null>(null);

  useEffect(() => {
    const sessao = obterSessaoPadraoAdmin();
    listarClientesDoTreinador(sessao, termoBusca).then((lista) => {
      setClientes(lista);
    });
  }, [termoBusca]);

  const clientesFiltrados = clientes.filter((c) => {
    if (filtroStatus === "TODOS") return true;
    return c.status === filtroStatus;
  });

  async function lidarComCriarCliente(evento: React.FormEvent) {
    evento.preventDefault();
    const sessao = obterSessaoPadraoAdmin();
    const criado = await criarClienteComConvite(sessao, {
      nomeCompleto,
      email,
      telefone,
      sexo,
      alturaCm: Number(alturaCm) || 170,
      objetivoPrincipal,
    });

    setLinkConviteGerado(`/convite/${criado.tokenConvite}`);
    const atualizados = await listarClientesDoTreinador(sessao, termoBusca);
    setClientes(atualizados);
  }

  return (
    <div className={estilos.paginaClientes}>
      <header className={estilos.cabecalho}>
        <div>
          <h1 className={estilos.tituloPagina}>Gestão de Clientes</h1>
          <p className={estilos.subtituloPagina}>
            Acompanhe seus alunos ativos, convites pendentes e histórico de avaliações
          </p>
        </div>
        <button
          type="button"
          className={estilos.botaoNovoCliente}
          onClick={() => {
            setLinkConviteGerado(null);
            setModalAberto(true);
          }}
        >
          <IconeAdicionar tamanho={16} />
          <span>Novo Cliente</span>
        </button>
      </header>

      <div className={estilos.barraFerramentas}>
        <div className={estilos.envoltorioBusca}>
          <span className={estilos.iconeBusca}>
            <IconeBusca tamanho={16} />
          </span>
          <input
            type="search"
            className={estilos.campoPesquisa}
            placeholder="Pesquisar cliente..."
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
          />
        </div>

        <div className={estilos.grupoFiltros}>
          <button
            type="button"
            className={`${estilos.pilulaFiltro} ${
              filtroStatus === "TODOS" ? estilos.pilulaFiltroAtiva : ""
            }`}
            onClick={() => setFiltroStatus("TODOS")}
          >
            Todos
          </button>
          <button
            type="button"
            className={`${estilos.pilulaFiltro} ${
              filtroStatus === "ATIVO" ? estilos.pilulaFiltroAtiva : ""
            }`}
            onClick={() => setFiltroStatus("ATIVO")}
          >
            Ativos
          </button>
          <button
            type="button"
            className={`${estilos.pilulaFiltro} ${
              filtroStatus === "CONVIDADO" ? estilos.pilulaFiltroAtiva : ""
            }`}
            onClick={() => setFiltroStatus("CONVIDADO")}
          >
            Aguardando Anamnese
          </button>
        </div>
      </div>

      <div className={estilos.cartaoTabela}>
        <table className={estilos.tabela}>
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Idade</th>
              <th>Peso Atual</th>
              <th>Objetivo</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientesFiltrados.map((cliente) => (
              <tr key={cliente.id}>
                <td>
                  <div className={estilos.celulaCliente}>
                    <span className={estilos.nomeCliente}>{cliente.nomeCompleto}</span>
                    <span className={estilos.emailCliente}>{cliente.email}</span>
                  </div>
                </td>
                <td>{cliente.idade} anos</td>
                <td>{formatarPeso(cliente.ultimaAvaliacao?.pesoKg)}</td>
                <td>{cliente.objetivoPrincipal}</td>
                <td>
                  {cliente.status === "ATIVO" ? (
                    <span className={estilos.seloAtivo}>Ativo</span>
                  ) : (
                    <span className={estilos.seloConvidado}>Aguardando Anamnese</span>
                  )}
                </td>
                <td>
                  <a href={`/admin/clientes/${cliente.id}`} className={estilos.botaoVer}>
                    <span>Ver</span>
                    <IconeSetaDireita tamanho={14} />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalAberto && (
        <div className={estilos.modalFundo} role="dialog" aria-modal="true">
          <div className={estilos.modalCartao}>
            <h2 className={estilos.tituloModal}>Pré-cadastrar Novo Cliente</h2>
            <form onSubmit={lidarComCriarCliente} className={estilos.gradeFormulario}>
              <div className={estilos.campoCompleto}>
                <label className={estilos.rotuloCampo}>
                  Nome Completo
                  <input
                    type="text"
                    className={estilos.entrada}
                    value={nomeCompleto}
                    onChange={(e) => setNomeCompleto(e.target.value)}
                    required
                  />
                </label>
              </div>

              <div>
                <label className={estilos.rotuloCampo}>
                  E-mail
                  <input
                    type="email"
                    className={estilos.entrada}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </label>
              </div>

              <div>
                <label className={estilos.rotuloCampo}>
                  Telefone
                  <input
                    type="text"
                    className={estilos.entrada}
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                  />
                </label>
              </div>

              <div>
                <label className={estilos.rotuloCampo}>
                  Sexo Biológico
                  <select
                    className={estilos.entrada}
                    value={sexo}
                    onChange={(e) => setSexo(e.target.value as SexoBiologico)}
                  >
                    <option value="FEMININO">Feminino</option>
                    <option value="MASCULINO">Masculino</option>
                  </select>
                </label>
              </div>

              <div>
                <label className={estilos.rotuloCampo}>
                  Altura (cm)
                  <input
                    type="number"
                    className={estilos.entrada}
                    value={alturaCm}
                    onChange={(e) => setAlturaCm(e.target.value)}
                  />
                </label>
              </div>

              <div className={estilos.campoCompleto}>
                <label className={estilos.rotuloCampo}>
                  Objetivo Principal
                  <input
                    type="text"
                    className={estilos.entrada}
                    value={objetivoPrincipal}
                    onChange={(e) => setObjetivoPrincipal(e.target.value)}
                  />
                </label>
              </div>

              {linkConviteGerado && (
                <div className={`${estilos.campoCompleto} ${estilos.caixaConviteGerado}`}>
                  <strong>Link Único de Convite Gerado:</strong>
                  <code>{linkConviteGerado}</code>
                </div>
              )}

              <div className={`${estilos.campoCompleto} ${estilos.acoesModal}`}>
                <button
                  type="button"
                  className={estilos.botaoVer}
                  onClick={() => setModalAberto(false)}
                >
                  Fechar
                </button>
                <button type="submit" className={estilos.botaoNovoCliente}>
                  Gerar Link de Convite
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
