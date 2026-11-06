import React from "react";
import {
  IconeCalendario,
  IconeCheckin,
  IconeHaltere,
  IconeSetaEsquerda,
} from "@/componentes/comum/Icones";
import estilos from "./ModuloEmBreve.module.scss";

export interface PropriedadesModuloEmBreve {
  etapa: string;
  titulo: string;
  descricao: string;
  tipoIcone: "TREINOS" | "CHECKIN" | "AGENDA";
  funcionalidadesPrevistas: string[];
  linkVoltar: string;
  rotuloVoltar: string;
  compactoMobile?: boolean;
}

export function ModuloEmBreve({
  etapa,
  titulo,
  descricao,
  tipoIcone,
  funcionalidadesPrevistas,
  linkVoltar,
  rotuloVoltar,
  compactoMobile = false,
}: PropriedadesModuloEmBreve) {
  const IconeSelecionado =
    tipoIcone === "TREINOS"
      ? IconeHaltere
      : tipoIcone === "CHECKIN"
        ? IconeCheckin
        : IconeCalendario;

  return (
    <div
      className={`${estilos.envoltorioModulo} ${
        compactoMobile ? estilos.envoltorioCompacto : ""
      }`}
    >
      <section className={estilos.cartaoDestaqueEscuro}>
        <div className={estilos.topoSelo}>
          <span className={estilos.iconeDestaque}>
            <IconeSelecionado tamanho={22} />
          </span>
          <span className={estilos.seloEtapa}>{etapa}</span>
        </div>

        <h1 className={estilos.tituloModulo}>{titulo}</h1>
        <p className={estilos.descricaoModulo}>{descricao}</p>
      </section>

      <section className={estilos.cartaoDetalhesClaro}>
        <h2 className={estilos.subtituloLista}>O que entrará neste módulo</h2>
        <ul className={estilos.listaRecursos}>
          {funcionalidadesPrevistas.map((item) => (
            <li key={item} className={estilos.itemRecurso}>
              <span className={estilos.marcadorDourado} aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <a href={linkVoltar} className={estilos.botaoVoltar}>
          <IconeSetaEsquerda tamanho={16} />
          <span>{rotuloVoltar}</span>
        </a>
      </section>
    </div>
  );
}
