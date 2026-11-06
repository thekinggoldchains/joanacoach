import React from "react";
import { ModuloEmBreve } from "@/componentes/comum/ModuloEmBreve";

export default function PaginaCheckinAluno() {
  return (
    <ModuloEmBreve
      etapa="Planejado • Fase 3"
      titulo="Check-in Semanal"
      descricao="Envie seu resumo da semana em menos de 1 minuto para a Joana Antunes ajustar seu acompanhamento."
      tipoIcone="CHECKIN"
      compactoMobile
      funcionalidadesPrevistas={[
        "Avaliação rápida de energia, sono, recuperação muscular e adesão aos treinos.",
        "Envio opcional de peso em jejum e fotos atualizadas de progresso.",
        "Histórico de feedbacks recebidos da sua Personal Trainer.",
      ]}
      linkVoltar="/app/inicio"
      rotuloVoltar="Voltar ao Início"
    />
  );
}
