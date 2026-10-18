import React from "react";
import estilos from "./BarraNavegacaoInferior.module.scss";

export interface PropriedadesBarraNavegacaoInferior {
  rotaAtiva: string;
}

interface ItemNavegacaoMobile {
  rotulo: string;
  href: string;
  icone: string;
}

const ITENS_NAVEGACAO_ALUNO: ItemNavegacaoMobile[] = [
  { rotulo: "Início", href: "/app/inicio", icone: "🏠" },
  { rotulo: "Treinos", href: "/app/inicio", icone: "🏋️" },
  { rotulo: "Evolução", href: "/app/evolucao", icone: "📈" },
  { rotulo: "Check-in", href: "/app/inicio", icone: "📋" },
  { rotulo: "Mais", href: "/app/perfil", icone: "⚙️" },
];

export function BarraNavegacaoInferior({ rotaAtiva }: PropriedadesBarraNavegacaoInferior) {
  return (
    <nav className={estilos.barraInferior} aria-label="Navegação Principal do Aluno">
      {ITENS_NAVEGACAO_ALUNO.map((item) => {
        const ativo = rotaAtiva === item.href && (item.rotulo === "Início" || item.href !== "/app/inicio");

        return (
          <a
            key={item.rotulo}
            href={item.href}
            className={`${estilos.itemMenu} ${ativo ? estilos.itemAtivo : ""}`}
          >
            <span className={estilos.icone} aria-hidden="true">
              {item.icone}
            </span>
            <span>{item.rotulo}</span>
          </a>
        );
      })}
    </nav>
  );
}
