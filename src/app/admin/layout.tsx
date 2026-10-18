import React from "react";
import { BarraLateral } from "@/componentes/admin/BarraLateral";
import estilos from "./AdminLayout.module.scss";

export default function LayoutAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={estilos.estruturaAdmin}>
      <BarraLateral rotaAtiva="/admin/painel" totalClientesAtivos={24} />
      <main className={estilos.conteudoPrincipal}>{children}</main>
    </div>
  );
}
