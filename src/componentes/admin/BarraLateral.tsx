import React from "react";
import estilos from "./BarraLateral.module.scss";

export interface PropriedadesBarraLateral {
  rotaAtiva: string;
  totalClientesAtivos?: number;
}

interface ItemMenuAdmin {
  rotulo: string;
  href: string;
  icone: string;
  exibirContador?: boolean;
}

const ITENS_MENU_ADMIN: ItemMenuAdmin[] = [
  { rotulo: "Dashboard", href: "/admin/painel", icone: "📊" },
  { rotulo: "Clientes", href: "/admin/clientes", icone: "👥", exibirContador: true },
  { rotulo: "Avaliações", href: "/admin/clientes/cli_joao?aba=avaliacoes", icone: "📐" },
  { rotulo: "Plano de Treino", href: "/admin/painel", icone: "🏋️" },
  { rotulo: "Check-ins", href: "/admin/painel", icone: "✅" },
  { rotulo: "Agenda", href: "/admin/painel", icone: "📅" },
];

export function BarraLateral({ rotaAtiva, totalClientesAtivos }: PropriedadesBarraLateral) {
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
            const ativo =
              rotaAtiva === item.href ||
              (item.href === "/admin/clientes" && rotaAtiva.startsWith("/admin/clientes"));

            return (
              <a
                key={item.rotulo}
                href={item.href}
                className={`${estilos.itemNavegacao} ${ativo ? estilos.itemAtivo : ""}`}
              >
                <span className={estilos.rotuloItem}>
                  <span aria-hidden="true">{item.icone}</span>
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
          <span aria-hidden="true">🚪</span>
          <span>Sair</span>
        </a>
      </div>
    </aside>
  );
}
