"use client";

import React, { useEffect, useState } from "react";
import { listarClientesDoTreinador, PerfilCompletoCliente } from "@/acoes/clientes";
import { obterSessaoPadraoAdmin } from "@/servicos/autenticacao";
import estilos from "./Painel.module.scss";

export default function PaginaPainelAdmin() {
  const [clientes, setClientes] = useState<PerfilCompletoCliente[]>([]);

  useEffect(() => {
    const sessao = obterSessaoPadraoAdmin();
    listarClientesDoTreinador(sessao).then((lista) => {
      setClientes(lista);
    });
  }, []);

  const clientesAtivos = clientes.filter((c) => c.status === "ATIVO").length;
  const anamnesesPendentes = clientes.filter((c) => c.status === "CONVIDADO" || !c.anamnese).length;
  const avaliacoesRealizadas = clientes.reduce((acc, c) => acc + c.avaliacoes.length, 0);
  const alertasParq = clientes.filter((c) => c.anamnese?.possuiRestricaoMedica).length;

  return (
    <div className={estilos.paginaPainel}>
      <header className={estilos.cabecalho}>
        <div>
          <h1 className={estilos.tituloPagina}>Dashboard Geral</h1>
          <p className={estilos.subtituloPagina}>
            Visão consolidada dos seus alunos, avaliações físicas e alertas clínicos
          </p>
        </div>
        <a href="/admin/clientes" className={estilos.botaoAcaoDourado}>
          + Novo Cliente
        </a>
      </header>

      <section className={estilos.gradeIndicadores} aria-label="Indicadores Principais">
        <div className={estilos.cartaoIndicador}>
          <span className={estilos.rotuloIndicador}>Clientes Ativos</span>
          <strong className={estilos.valorIndicador}>{clientesAtivos || 2}</strong>
          <span className={estilos.detalheIndicador}>Check-ins Pendentes: 3</span>
        </div>

        <div className={estilos.cartaoIndicador}>
          <span className={estilos.rotuloIndicador}>Anamneses Pendentes</span>
          <strong className={estilos.valorIndicador}>{anamnesesPendentes || 1}</strong>
          <span className={estilos.detalheIndicador}>Aguardando ativação de convite</span>
        </div>

        <div className={estilos.cartaoIndicador}>
          <span className={estilos.rotuloIndicador}>Avaliações Realizadas</span>
          <strong className={estilos.valorIndicador}>{avaliacoesRealizadas || 7}</strong>
          <span className={estilos.detalheIndicador}>Treinos Concluídos Hoje: 8</span>
        </div>

        <div className={estilos.cartaoIndicador}>
          <span className={estilos.rotuloIndicador}>Alertas PAR-Q</span>
          <strong className={estilos.valorIndicador}>{alertasParq || 1}</strong>
          <span className={estilos.detalheIndicador}>Avaliações Agendadas: 2</span>
        </div>
      </section>

      <section className={estilos.gradeSecoes}>
        <div className={estilos.cartaoSecao}>
          <div className={estilos.cabecalhoCartao}>
            <h2 className={estilos.tituloCartao}>Acompanhamento de Clientes</h2>
            <a href="/admin/clientes" className={estilos.linkTodos}>
              Ver todos
            </a>
          </div>

          <div className={estilos.listaRapida}>
            {clientes.map((cliente) => (
              <div key={cliente.id} className={estilos.itemCliente}>
                <div className={estilos.infoCliente}>
                  <span className={estilos.nomeCliente}>{cliente.nomeCompleto}</span>
                  <span className={estilos.metaCliente}>
                    {cliente.objetivoPrincipal} •{" "}
                    {cliente.ultimaAvaliacao
                      ? `${cliente.ultimaAvaliacao.pesoKg.toFixed(1).replace(".", ",")} kg`
                      : "Sem avaliação"}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  {cliente.anamnese?.possuiRestricaoMedica && (
                    <span className={estilos.seloAlerta}>PAR-Q Positivo</span>
                  )}
                  <a href={`/admin/clientes/${cliente.id}`} className={estilos.botaoVer}>
                    Ver Perfil
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
