import React from "react";
import { ModuloEmBreve } from "@/componentes/comum/ModuloEmBreve";

export default function PaginaTreinosAluno() {
  return (
    <ModuloEmBreve
      etapa="Próxima Etapa • Fase 2"
      titulo="Meus Planos de Treino"
      descricao="Execução interativa do seu treino diário no telemóvel, com vídeos demonstrativos, cargas e cronômetro de descanso."
      tipoIcone="TREINOS"
      compactoMobile
      funcionalidadesPrevistas={[
        "Visualização clara das fichas (Treino A, B, C) prescritas pela Personal Joana Antunes.",
        "Marcação de séries concluídas e registro da carga utilizada em cada exercício.",
        "Cronômetro automático de descanso entre séries com aviso sonoro/vibração.",
      ]}
      linkVoltar="/app/inicio"
      rotuloVoltar="Voltar ao Início"
    />
  );
}
