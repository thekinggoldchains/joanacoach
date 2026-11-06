import React from "react";
import { ModuloEmBreve } from "@/componentes/comum/ModuloEmBreve";

export default function PaginaCheckinsAdmin() {
  return (
    <ModuloEmBreve
      etapa="Planejado • Fase 3"
      titulo="Check-ins Semanais & Feedback"
      descricao="Central de acompanhamento semanal de adesão ao treino, qualidade do sono, energia, dores articulares e resposta direta aos alunos."
      tipoIcone="CHECKIN"
      funcionalidadesPrevistas={[
        "Fila priorizada de check-ins recebidos com indicadores visuais de fadiga, sono e motivação.",
        "Comparação rápida do peso semanal reportado pelo aluno com a última avaliação Pollock.",
        "Envio de ajustes e orientações personalizadas para a próxima semana.",
      ]}
      linkVoltar="/admin/painel"
      rotuloVoltar="Voltar ao Painel"
    />
  );
}
