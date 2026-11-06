"use client";

import React from "react";
import { usePathname } from "next/navigation";
import {
  IconeCheckin,
  IconeEvolucao,
  IconeHaltere,
  IconeInicio,
  IconePerfilUsuario,
  PropriedadesIcone,
} from "@/componentes/comum/Icones";
import estilos from "./BarraNavegacaoInferior.module.scss";

export interface PropriedadesBarraNavegacaoInferior {
  rotaAtiva?: string;
}

interface ItemNavegacaoMobile {
  rotulo: string;
  href: string;
  Icone: React.ComponentType<PropriedadesIcone>;
}

const ITENS_NAVEGACAO_ALUNO: ItemNavegacaoMobile[] = [
  { rotulo: "Início", href: "/app/inicio", Icone: IconeInicio },
  { rotulo: "Treinos", href: "/app/treinos", Icone: IconeHaltere },
  { rotulo: "Evolução", href: "/app/evolucao", Icone: IconeEvolucao },
  { rotulo: "Check-in", href: "/app/checkin", Icone: IconeCheckin },
  { rotulo: "Mais", href: "/app/perfil", Icone: IconePerfilUsuario },
];

export function BarraNavegacaoInferior({ rotaAtiva }: PropriedadesBarraNavegacaoInferior) {
  const caminhoNavegador = usePathname();
  const rotaEfetiva = caminhoNavegador || rotaAtiva || "/app/inicio";

  return (
    <nav className={estilos.barraInferior} aria-label="Navegação Principal do Aluno">
      {ITENS_NAVEGACAO_ALUNO.map((item) => {
        const Ic = item.Icone;
        const ativo =
          rotaEfetiva === item.href && (item.rotulo === "Início" || item.href !== "/app/inicio");

        return (
          <a
            key={item.rotulo}
            href={item.href}
            className={`${estilos.itemMenu} ${ativo ? estilos.itemAtivo : ""}`}
          >
            <span className={estilos.icone}>
              <Ic tamanho={20} />
            </span>
            <span>{item.rotulo}</span>
          </a>
        );
      })}
    </nav>
  );
}
