import React from "react";
import { ModuloEmBreve } from "@/componentes/comum/ModuloEmBreve";

export default function PaginaAgendaAdmin() {
  return (
    <ModuloEmBreve
      etapa="Planejado • Fase 4"
      titulo="Agenda de Avaliações & Sessões"
      descricao="Organização de horários presenciais, reavaliações físicas periódicas (a cada 4–6 semanas) e lembretes automáticos."
      tipoIcone="AGENDA"
      funcionalidadesPrevistas={[
        "Calendário mobile de sessões presenciais e janelas de reavaliação física Pollock.",
        "Aviso automático de alunos que completaram 30 dias desde a última avaliação.",
        "Confirmação rápida de presença pelo telemóvel.",
      ]}
      linkVoltar="/admin/painel"
      rotuloVoltar="Voltar ao Painel"
    />
  );
}
