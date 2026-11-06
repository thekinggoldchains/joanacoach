"use client";

import React from "react";
import { usePathname } from "next/navigation";
import {
  IconeAvaliacao,
  IconeCalendario,
  IconeCheckin,
  IconeClientes,
  IconeHaltere,
  IconePainel,
  IconeSair,
  PropriedadesIcone,
} from "@/componentes/comum/Icones";
import estilos from "./BarraLateral.module.scss";

export interface PropriedadesBarraLateral {
  rotaAtiva?: string;
  totalClientesAtivos?: number;
}

interface ItemMenuAdmin {
  rotulo: string;
  href: string;
  Icone: React.ComponentType<PropriedadesIcone>;
  exibirContador?: boolean;
  principalPainel?: boolean;
}

const ITENS_MENU_ADMIN: ItemMenuAdmin[] = [
  { rotulo: "Dashboard", href: "/admin/painel", Icone: IconePainel, principalPainel: true },
  { rotulo: "Clientes", href: "/admin/clientes", Icone: IconeClientes, exibirContador: true },
  { rotulo: "Avaliações", href: "/admin/clientes/cli_joao?aba=avaliacoes", Icone: IconeAvaliacao },
  { rotulo: "Plano de Treino", href: "/admin/treinos", Icone: IconeHaltere },
  { rotulo: "Check-ins", href: "/admin/checkins", Icone: IconeCheckin },
  { rotulo: "Agenda", href: "/admin/agenda", Icone: IconeCalendario },
];

export function BarraLateral({ rotaAtiva, totalClientesAtivos }: PropriedadesBarraLateral) {
  const caminhoNavegador = usePathname();
  const rotaEfetiva = caminhoNavegador || rotaAtiva || "/admin/painel";

  return (
    <aside className={estilos.barraLateral} aria-label="Menu Principal da Personal">
      <div>
        <div className={estilos.topoMarca}>
          <div className={estilos.monograma}>JA</div>
          <div className={estilos.textosMarca}>
            <span className={estilos.nomeMarca}>Joana Antunes</span>
            <span className={estilos.subtituloMarca}>Coaching</span>
          </div>
        </div>

        <nav className={estilos.navegacao}>
          {ITENS_MENU_ADMIN.map((item) => {
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
                className={`${estilos.itemNavegacao} ${ativo ? estilos.itemAtivo : ""}`}
              >
                <span className={estilos.rotuloItem}>
                  <span className={estilos.iconeItem}>
                    <Ic tamanho={18} />
                  </span>
                  <span>{item.rotulo}</span>
                </span>
                {item.exibirContador && typeof totalClientesAtivos === "number" && (
                  <span className={estilos.contadorSelo}>{totalClientesAtivos}</span>
                )}
              </a>
            );
          })}
        </nav>
      </div>

      <div className={estilos.rodape}>
        <a href="/entrar" className={estilos.linkSair}>
          <span className={estilos.iconeItem}>
            <IconeSair tamanho={18} />
          </span>
          <span>Sair</span>
        </a>
      </div>
    </aside>
  );
}
