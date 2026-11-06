"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import {
  IconeAdicionar,
  IconeAvaliacao,
  IconeCalendario,
  IconeCheckin,
  IconeClientes,
  IconeFechar,
  IconeHaltere,
  IconeMenu,
  IconePainel,
  IconeSair,
  PropriedadesIcone,
} from "@/componentes/comum/Icones";
import estilos from "./BarraInferiorAdmin.module.scss";

export interface PropriedadesBarraInferiorAdmin {
  rotaAtiva?: string;
  totalClientesAtivos?: number;
}

interface ItemInferiorAdmin {
  rotulo: string;
  href: string;
  Icone: React.ComponentType<PropriedadesIcone>;
  exibirContador?: boolean;
  principalPainel?: boolean;
}

const ITENS_PRINCIPAIS_MOBILE: ItemInferiorAdmin[] = [
  { rotulo: "Painel", href: "/admin/painel", Icone: IconePainel, principalPainel: true },
  { rotulo: "Clientes", href: "/admin/clientes", Icone: IconeClientes, exibirContador: true },
  { rotulo: "Avaliar", href: "/admin/clientes/cli_joao?aba=avaliacoes", Icone: IconeAvaliacao },
  { rotulo: "Treinos", href: "/admin/treinos", Icone: IconeHaltere },
];

export function BarraInferiorAdmin({
  rotaAtiva,
  totalClientesAtivos,
}: PropriedadesBarraInferiorAdmin) {
  const [menuAberto, setMenuAberto] = useState(false);
  const caminhoNavegador = usePathname();
  const rotaEfetiva = caminhoNavegador || rotaAtiva || "/admin/painel";

  return (
    <>
      {/* Cabeçalho Superior PWA (visível apenas no telemóvel/tablet <= 900px) */}
      <header className={estilos.cabecalhoMobileAdmin} aria-label="Topo Mobile da Personal">
        <a href="/admin/painel" className={estilos.marcaMobile}>
          <span className={estilos.monogramaPequeno}>JA</span>
          <div className={estilos.textosMarcaMobile}>
            <span className={estilos.nomeMarcaMobile}>Joana Antunes</span>
            <span className={estilos.papelMobile}>Personal • PWA</span>
          </div>
        </a>

        <a href="/admin/clientes" className={estilos.atalhoClientesTopo}>
          <IconeAdicionar tamanho={14} />
          <span>Convite</span>
        </a>
      </header>

      {/* Barra Inferior Fixa PWA (visível apenas no telemóvel/tablet <= 900px) */}
      <nav className={estilos.barraInferiorAdmin} aria-label="Navegação Mobile da Personal">
        {ITENS_PRINCIPAIS_MOBILE.map((item) => {
          const Ic = item.Icone;
          const ativo =
            (item.href === "/admin/clientes" &&
              rotaEfetiva.startsWith("/admin/clientes") &&
              !rotaEfetiva.includes("aba=avaliacoes")) ||
            (item.href === "/admin/painel" &&
              item.principalPainel &&
              rotaEfetiva === "/admin/painel") ||
            (item.href !== "/admin/painel" &&
              item.href !== "/admin/clientes" &&
              rotaEfetiva === item.href);

          return (
            <a
              key={item.rotulo}
              href={item.href}
              className={`${estilos.itemInferior} ${ativo ? estilos.itemInferiorAtivo : ""}`}
            >
              <span className={estilos.envoltorioIcone}>
                <Ic tamanho={20} />
                {item.exibirContador && typeof totalClientesAtivos === "number" && (
                  <span className={estilos.seloContadorMobile}>{totalClientesAtivos}</span>
                )}
              </span>
              <span>{item.rotulo}</span>
            </a>
          );
        })}

        <button
          type="button"
          className={`${estilos.itemInferior} ${estilos.botaoMenu} ${
            menuAberto ? estilos.itemInferiorAtivo : ""
          }`}
          onClick={() => setMenuAberto((v) => !v)}
          aria-expanded={menuAberto}
        >
          <span className={estilos.envoltorioIcone}>
            <IconeMenu tamanho={20} />
          </span>
          <span>Menu</span>
        </button>
      </nav>

      {/* Gaveta Deslizante Mobile (Bottom Sheet) */}
      {menuAberto && (
        <div
          className={estilos.fundoGaveta}
          role="dialog"
          aria-modal="true"
          aria-label="Menu Completo da Personal"
          onClick={() => setMenuAberto(false)}
        >
          <div
            className={estilos.folhaGaveta}
            onClick={(evento) => evento.stopPropagation()}
          >
            <div className={estilos.topoGaveta}>
              <div>
                <strong className={estilos.tituloGaveta}>Joana Antunes Coaching</strong>
                <span className={estilos.subtituloGaveta}>Gestão Mobile • Área da Personal</span>
              </div>
              <button
                type="button"
                className={estilos.botaoFecharGaveta}
                onClick={() => setMenuAberto(false)}
                aria-label="Fechar menu"
              >
                <IconeFechar tamanho={18} />
              </button>
            </div>

            <div className={estilos.listaLinksGaveta}>
              <a
                href="/admin/checkins"
                className={estilos.linkGaveta}
                onClick={() => setMenuAberto(false)}
              >
                <IconeCheckin tamanho={18} />
                <span>Check-ins Semanais</span>
              </a>

              <a
                href="/admin/agenda"
                className={estilos.linkGaveta}
                onClick={() => setMenuAberto(false)}
              >
                <IconeCalendario tamanho={18} />
                <span>Agenda de Avaliações</span>
              </a>

              <a
                href="/entrar"
                className={`${estilos.linkGaveta} ${estilos.linkSairGaveta}`}
                onClick={() => setMenuAberto(false)}
              >
                <IconeSair tamanho={18} />
                <span>Terminar Sessão</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
