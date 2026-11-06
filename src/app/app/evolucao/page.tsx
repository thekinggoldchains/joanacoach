"use client";

import React, { useState } from "react";
import { AnguloFoto } from "@/acoes/clientes";
import { IconeCamera } from "@/componentes/comum/Icones";
import estilos from "./Evolucao.module.scss";

export default function PaginaEvolucaoAluno() {
  const [anguloAtivo, setAnguloAtivo] = useState<AnguloFoto>("FRENTE");

  const rotuloAngulo: Record<AnguloFoto, string> = {
    FRENTE: "Frente",
    COSTAS: "Costas",
    PERFIL: "Perfil",
  };

  return (
    <main className={estilos.paginaEvolucao}>
      <header className={estilos.cabecalho}>
        <h1 className={estilos.tituloPagina}>Minha Evolução</h1>
        <p className={estilos.subtituloPagina}>
          Acompanhamento de composição corporal e progresso visual
        </p>
      </header>

      {/* Cartões de Resumo */}
      <section className={estilos.gradeResumo} aria-label="Indicadores Atuais">
        <div className={estilos.cartaoResumo}>
          <span className={estilos.rotuloResumo}>Peso Atual</span>
          <strong className={estilos.valorResumo}>78,5 kg</strong>
          <span className={estilos.variacaoPositiva}>-1,8 kg</span>
        </div>

        <div className={estilos.cartaoResumo}>
          <span className={estilos.rotuloResumo}>% Gordura</span>
          <strong className={estilos.valorResumo}>14,2%</strong>
          <span className={estilos.variacaoPositiva}>-2,1%</span>
        </div>

        <div className={estilos.cartaoResumo}>
          <span className={estilos.rotuloResumo}>Massa Magra</span>
          <strong className={estilos.valorResumo}>67,35 kg</strong>
          <span className={estilos.variacaoPositiva}>+1,2 kg</span>
        </div>
      </section>

      {/* Gráfico SVG de Evolução de Peso */}
      <section className={estilos.cartaoSecao}>
        <div className={estilos.topoSecao}>
          <h2 className={estilos.tituloSecao}>Peso Corporal (Últimas 6 semanas)</h2>
          <span className={estilos.seloProtocolo}>-4,2 kg total</span>
        </div>

        <div className={estilos.containerGrafico}>
          <svg
            viewBox="0 0 320 110"
            className={estilos.svgGrafico}
            role="img"
            aria-label="Gráfico de evolução de peso corporal"
          >
            <polyline
              fill="none"
              stroke="#C5A059"
              strokeWidth="3"
              points="15,20 75,32 135,46 195,58 255,72 305,92"
            />
            <circle cx="15" cy="20" r="4" fill="#C5A059" />
            <circle cx="75" cy="32" r="4" fill="#C5A059" />
            <circle cx="135" cy="46" r="4" fill="#C5A059" />
            <circle cx="195" cy="58" r="4" fill="#C5A059" />
            <circle cx="255" cy="72" r="4" fill="#C5A059" />
            <circle cx="305" cy="92" r="5" fill="#141414" stroke="#C5A059" strokeWidth="2" />
          </svg>
          <div className={estilos.legendaEixoX}>
            <span>Out (82.7)</span>
            <span>Nov (82.1)</span>
            <span>Dez (81.4)</span>
            <span>Jan (80.9)</span>
            <span>Fev (80.3)</span>
            <span>Mar (78.5)</span>
          </div>
        </div>
      </section>

      {/* Histórico de Avaliações */}
      <section className={estilos.cartaoSecao}>
        <div className={estilos.topoSecao}>
          <h2 className={estilos.tituloSecao}>Histórico de Avaliações</h2>
          <span className={estilos.seloProtocolo}>Pollock 7 Dobras</span>
        </div>

        <div className={estilos.listaHistorico}>
          <div className={estilos.itemHistorico}>
            <div>
              <span className={estilos.dataHistorico}>15 Mar 2026</span>
              <span className={estilos.detalheProtocolo}>
                Soma Dobras: 79 mm • Massa Magra: 67.35kg
              </span>
            </div>
            <div className={estilos.metricasHistorico}>
              <strong>78.5kg</strong>
              <span>BF 14.2 %</span>
            </div>
          </div>

          <div className={estilos.itemHistorico}>
            <div>
              <span className={estilos.dataHistorico}>15 Fev 2026</span>
              <span className={estilos.detalheProtocolo}>
                Soma Dobras: 93 mm • Massa Magra: 66.15kg
              </span>
            </div>
            <div className={estilos.metricasHistorico}>
              <strong>80.3kg</strong>
              <span>BF 16.3 %</span>
            </div>
          </div>

          <div className={estilos.itemHistorico}>
            <div>
              <span className={estilos.dataHistorico}>15 Out 2025 (Inicial)</span>
              <span className={estilos.detalheProtocolo}>
                Soma Dobras: 112 mm • Massa Magra: 65.15kg
              </span>
            </div>
            <div className={estilos.metricasHistorico}>
              <strong>82.7kg</strong>
              <span>BF 18.8 %</span>
            </div>
          </div>
        </div>
      </section>

      {/* Fotos de Progresso */}
      <section className={estilos.cartaoSecao}>
        <div className={estilos.topoSecao}>
          <h2 className={estilos.tituloSecao}>Fotos de Progresso</h2>
          <div className={estilos.filtrosAngulo}>
            {(["FRENTE", "COSTAS", "PERFIL"] as AnguloFoto[]).map((angulo) => (
              <button
                key={angulo}
                type="button"
                onClick={() => setAnguloAtivo(angulo)}
                className={`${estilos.botaoAngulo} ${
                  anguloAtivo === angulo ? estilos.anguloAtivo : ""
                }`}
              >
                {rotuloAngulo[angulo]}
              </button>
            ))}
          </div>
        </div>

        <div className={estilos.comparadorFotos}>
          <div className={estilos.quadroFoto}>
            <span className={estilos.etiquetaEtapa}>Início • Out 2025</span>
            <div className={estilos.silhuetaFoto}>
              Foto {rotuloAngulo[anguloAtivo]} (Início)
            </div>
            <span className={estilos.legendaFoto}>82.7kg • 18.8 % BF</span>
          </div>

          <div className={estilos.quadroFoto}>
            <span className={estilos.etiquetaEtapa}>Atual • Mar 2026</span>
            <div className={estilos.silhuetaFoto}>
              Foto {rotuloAngulo[anguloAtivo]} (Atual)
            </div>
            <span className={estilos.legendaFoto}>78.5kg • 14.2 % BF</span>
          </div>
        </div>

        <button type="button" className={estilos.botaoEnviarFotos}>
          <IconeCamera tamanho={16} />
          <span>Enviar Novas Fotos</span>
        </button>
      </section>
    </main>
  );
}
