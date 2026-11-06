import React from "react";
import { BarraNavegacaoInferior } from "@/componentes/aluno/BarraNavegacaoInferior";
import estilos from "./AppLayout.module.scss";

export default function LayoutAppAluno({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={estilos.envoltorioMobile}>
      <div className={estilos.containerAppMobile}>
        {children}
        <BarraNavegacaoInferior rotaAtiva="/app/inicio" />
      </div>
    </div>
  );
}
