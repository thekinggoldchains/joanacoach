import React from "react";
import { ModuloEmBreve } from "@/componentes/comum/ModuloEmBreve";

export default function PaginaTreinosAdmin() {
  return (
    <ModuloEmBreve
      etapa="Próxima Etapa • Fase 2"
      titulo="Biblioteca & Prescrição de Treinos"
      descricao="Montagem ágil de fichas personalizadas (Treino A, B, C, D) direto no telemóvel ou computador, integrada às restrições do PAR-Q de cada aluno."
      tipoIcone="TREINOS"
      funcionalidadesPrevistas={[
        "Catálogo de exercícios por grupo muscular com vídeos demonstrativos e observações biomecânicas.",
        "Prescrição rápida de séries, repetições, carga/RPE, cadência e tempo de descanso.",
        "Alerta automático de segurança caso o exercício conflite com alguma lesão registrada na Anamnese.",
        "Clonagem e adaptação de modelos de treino em 2 toques.",
      ]}
      linkVoltar="/admin/painel"
      rotuloVoltar="Voltar ao Painel"
    />
  );
}
