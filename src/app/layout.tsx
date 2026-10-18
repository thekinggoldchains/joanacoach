import type { Metadata } from "next";
import "@/estilos/globais.scss";

export const metadata: Metadata = {
  title: "Joana Antunes Coaching",
  description: "Plataforma de Gestão de Alunos, Avaliações Físicas e Treinos",
};

export default function LayoutRaiz({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
