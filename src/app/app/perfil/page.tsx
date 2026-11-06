"use client";

import React, { useEffect, useState } from "react";
import { obterPerfilCompletoCliente } from "@/acoes/clientes";
import { IconeAlertaClinico, IconeSair } from "@/componentes/comum/Icones";
import { obterSessaoPadraoAluno } from "@/servicos/autenticacao";
import estilos from "./Perfil.module.scss";

export default function PaginaPerfilAluno() {
  const [nomeCompleto, setNomeCompleto] = useState<string>("João Silva");
  const [email, setEmail] = useState<string>("joao@email.com");
  const [telefone, setTelefone] = useState<string>("+351 962 000 004");
  const [idade, setIdade] = useState<number>(28);
  const [alturaCm, setAlturaCm] = useState<number>(178);
  const [objetivoPrincipal, setObjetivoPrincipal] = useState<string>(
    "Ganhar Massa Muscular"
  );
  const [lesoesOuDores, setLesoesOuDores] = useState<string>(
    "Condromalácia leve (Joelho D)"
  );
  const [mediaHorasSono, setMediaHorasSono] = useState<number>(7.5);

  useEffect(() => {
    const sessao = obterSessaoPadraoAluno();
    obterPerfilCompletoCliente(sessao, "cli_joao").then((perfil) => {
      setNomeCompleto(perfil.nomeCompleto);
      setEmail(perfil.email);
      if (perfil.telefone) setTelefone(perfil.telefone);
      setIdade(perfil.idade);
      setAlturaCm(perfil.alturaCm);
      setObjetivoPrincipal(perfil.objetivoPrincipal);
      if (perfil.anamnese?.lesoesOuDores) {
        setLesoesOuDores(perfil.anamnese.lesoesOuDores);
      }
      if (perfil.anamnese?.mediaHorasSono) {
        setMediaHorasSono(perfil.anamnese.mediaHorasSono);
      }
    });
  }, []);

  return (
    <main className={estilos.paginaPerfil}>
      <header className={estilos.topoPerfil}>
        <div className={estilos.avatarGrande} aria-hidden="true">
          JS
        </div>
        <div className={estilos.dadosTopo}>
          <h1 className={estilos.nomeAluno}>{nomeCompleto}</h1>
          <p className={estilos.emailAluno}>{email}</p>
          <span className={estilos.seloStatus}>Aluno Ativo • Joana Antunes</span>
        </div>
      </header>

      <section className={estilos.cartaoSecao}>
        <h2 className={estilos.tituloSecao}>Dados Pessoais</h2>
        <div className={estilos.listaDados}>
          <div className={estilos.linhaDado}>
            <span className={estilos.rotuloDado}>Telefone</span>
            <span className={estilos.valorDado}>{telefone}</span>
          </div>
          <div className={estilos.linhaDado}>
            <span className={estilos.rotuloDado}>Idade / Altura</span>
            <span className={estilos.valorDado}>
              {idade} anos • {alturaCm} cm
            </span>
          </div>
          <div className={estilos.linhaDado}>
            <span className={estilos.rotuloDado}>Objetivo Principal</span>
            <span className={estilos.seloObjetivo}>{objetivoPrincipal}</span>
          </div>
        </div>
      </section>

      <section className={estilos.cartaoSecao}>
        <h2 className={estilos.tituloSecao}>Minha Anamnese e PAR-Q</h2>
        <div className={estilos.alertaClinico}>
          <span className={estilos.iconeAlertaClinico}>
            <IconeAlertaClinico tamanho={16} />
          </span>
          <span>
            <strong>Atenção Articular (PAR-Q):</strong> {lesoesOuDores}
          </span>
        </div>
        <div className={estilos.listaDados}>
          <div className={estilos.linhaDado}>
            <span className={estilos.rotuloDado}>Média de Sono</span>
            <span className={estilos.valorDado}>{mediaHorasSono} h / noite</span>
          </div>
          <div className={estilos.linhaDado}>
            <span className={estilos.rotuloDado}>Nível de Atividade Diária</span>
            <span className={estilos.valorDado}>Sedentário (Escritório)</span>
          </div>
        </div>
      </section>

      <a href="/entrar" className={estilos.linkSair}>
        <IconeSair tamanho={16} />
        <span>Terminar Sessão</span>
      </a>
    </main>
  );
}
