"use client";

import React, { useEffect, useState } from "react";
import { obterPerfilCompletoCliente } from "@/acoes/clientes";
import {
  IconeRelogio,
  IconeSetaDireita,
  IconeTendenciaAlta,
  IconeTendenciaBaixa,
} from "@/componentes/comum/Icones";
import { obterSessaoPadraoAluno } from "@/servicos/autenticacao";
import estilos from "./Inicio.module.scss";

export default function PaginaInicioAluno() {
  const [nomeAluno, setNomeAluno] = useState<string>("João Silva");
  const [objetivo, setObjetivo] = useState<string>("Ganhar Massa Muscular");
  const [pesoAtual, setPesoAtual] = useState<string>("78,5 kg");
  const [percentualGordura, setPercentualGordura] = useState<string>("14,2%");
  const [massaMagra, setMassaMagra] = useState<string>("67,35 kg");

  useEffect(() => {
    const sessao = obterSessaoPadraoAluno();
    obterPerfilCompletoCliente(sessao, "cli_joao").then((perfil) => {
      setNomeAluno(perfil.nomeCompleto);
      setObjetivo(perfil.objetivoPrincipal);
      if (perfil.ultimaAvaliacao) {
        setPesoAtual(`${perfil.ultimaAvaliacao.pesoKg.toFixed(1).replace(".", ",")} kg`);
        setPercentualGordura(
          `${perfil.ultimaAvaliacao.percentualGordura.toFixed(1).replace(".", ",")}%`
        );
        setMassaMagra(
          `${perfil.ultimaAvaliacao.massaMagraKg.toFixed(2).replace(".", ",")} kg`
        );
      }
    });
  }, []);

  return (
    <main className={estilos.paginaInicio}>
      <header className={estilos.topoEscuro}>
        <div className={estilos.saudacaoTexto}>
          <span className={estilos.rotuloMarca}>Joana Antunes Coaching</span>
          <h1 className={estilos.tituloSaudacao}>Olá, {nomeAluno}</h1>
          <p className={estilos.subtituloObjetivo}>Foco atual: {objetivo}</p>
        </div>
        <div className={estilos.avatarInicial} aria-hidden="true">
          JS
        </div>
      </header>

      <section className={estilos.cartaoProximoTreino} aria-label="Destaque de Treino">
        <div className={estilos.topoProximoTreino}>
          <span className={estilos.seloProximoTreino}>Próximo Treino</span>
          <span className={estilos.duracaoTreino}>
            <IconeRelogio tamanho={13} />
            <span>6 exercícios • ~50 min</span>
          </span>
        </div>
        <h2 className={estilos.nomeTreino}>Treino A — Peito e Tríceps</h2>
        <button type="button" className={estilos.botaoIniciarTreino}>
          <span>Iniciar Sessão de Treino</span>
          <IconeSetaDireita tamanho={16} />
        </button>
      </section>

      <section className={estilos.secaoResumo}>
        <div className={estilos.cabecalhoSecao}>
          <h2 className={estilos.tituloSecao}>Resumo Corporal</h2>
          <a href="/app/evolucao" className={estilos.linkEvolucao}>
            <span>Ver evolução completa</span>
            <IconeSetaDireita tamanho={14} />
          </a>
        </div>

        <div className={estilos.gradeMetricas}>
          <div className={estilos.cartaoMetrica}>
            <span className={estilos.rotuloMetrica}>Peso Atual</span>
            <strong className={estilos.valorMetrica}>{pesoAtual}</strong>
            <span className={estilos.variacaoPositiva}>
              <IconeTendenciaBaixa tamanho={13} />
              <span>-1,8 kg</span>
            </span>
          </div>

          <div className={estilos.cartaoMetrica}>
            <span className={estilos.rotuloMetrica}>% Gordura</span>
            <strong className={estilos.valorMetrica}>{percentualGordura}</strong>
            <span className={estilos.variacaoPositiva}>
              <IconeTendenciaBaixa tamanho={13} />
              <span>-2,1%</span>
            </span>
          </div>

          <div className={estilos.cartaoMetrica}>
            <span className={estilos.rotuloMetrica}>Massa Magra</span>
            <strong className={estilos.valorMetrica}>{massaMagra}</strong>
            <span className={estilos.variacaoPositiva}>
              <IconeTendenciaAlta tamanho={13} />
              <span>+1,2 kg</span>
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
