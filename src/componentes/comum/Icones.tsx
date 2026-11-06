import React from "react";

export interface PropriedadesIcone {
  tamanho?: number;
  classe?: string;
}

function BaseIcone({
  tamanho = 18,
  classe,
  children,
}: PropriedadesIcone & { children: React.ReactNode }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={tamanho}
      height={tamanho}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={classe}
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      {children}
    </svg>
  );
}

/** Grade executiva assimétrica — Dashboard / Visão Geral */
export function IconePainel(props: PropriedadesIcone) {
  return (
    <BaseIcone {...props}>
      <rect x="3" y="3" width="7" height="9" rx="1.5" />
      <rect x="14" y="3" width="7" height="5" rx="1.5" />
      <rect x="14" y="12" width="7" height="9" rx="1.5" />
      <rect x="3" y="16" width="7" height="5" rx="1.5" />
    </BaseIcone>
  );
}

/** Dupla de perfis — Gestão de Clientes */
export function IconeClientes(props: PropriedadesIcone) {
  return (
    <BaseIcone {...props}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </BaseIcone>
  );
}

/** Pulso biométrico / Avaliação Física */
export function IconeAvaliacao(props: PropriedadesIcone) {
  return (
    <BaseIcone {...props}>
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </BaseIcone>
  );
}

/** Haltere arquitetônico — Plano de Treino / Treinos */
export function IconeHaltere(props: PropriedadesIcone) {
  return (
    <BaseIcone {...props}>
      <path d="M6.5 6.5h11" transform="rotate(45 12 12)" />
      <rect x="3" y="8" width="3" height="8" rx="1" />
      <rect x="18" y="8" width="3" height="8" rx="1" />
      <rect x="6" y="6" width="2.5" height="12" rx="1" />
      <rect x="15.5" y="6" width="2.5" height="12" rx="1" />
      <line x1="8.5" y1="12" x2="15.5" y2="12" />
    </BaseIcone>
  );
}

/** Prancheta com confirmação — Check-ins / Anamnese */
export function IconeCheckin(props: PropriedadesIcone) {
  return (
    <BaseIcone {...props}>
      <rect x="8" y="2" width="8" height="4" rx="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="m9 14 2 2 4-4" />
    </BaseIcone>
  );
}

/** Calendário corporativo — Agenda */
export function IconeCalendario(props: PropriedadesIcone) {
  return (
    <BaseIcone {...props}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
    </BaseIcone>
  );
}

/** Encerrar sessão — Sair */
export function IconeSair(props: PropriedadesIcone) {
  return (
    <BaseIcone {...props}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </BaseIcone>
  );
}

/** Casa minimalista — Início Mobile */
export function IconeInicio(props: PropriedadesIcone) {
  return (
    <BaseIcone {...props}>
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </BaseIcone>
  );
}

/** Curva ascendente — Evolução Corporal */
export function IconeEvolucao(props: PropriedadesIcone) {
  return (
    <BaseIcone {...props}>
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </BaseIcone>
  );
}

/** Perfil / Ajustes do Aluno — Mais */
export function IconePerfilUsuario(props: PropriedadesIcone) {
  return (
    <BaseIcone {...props}>
      <circle cx="12" cy="8" r="4" />
      <path d="M20 21a8 8 0 0 0-16 0" />
    </BaseIcone>
  );
}

/** Alerta clínico / PAR-Q — Triângulo de precisão */
export function IconeAlertaClinico(props: PropriedadesIcone) {
  return (
    <BaseIcone {...props}>
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </BaseIcone>
  );
}

/** Câmera corporativa — Fotos de Progresso */
export function IconeCamera(props: PropriedadesIcone) {
  return (
    <BaseIcone {...props}>
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </BaseIcone>
  );
}

/** Lupa — Pesquisa em tabelas */
export function IconeBusca(props: PropriedadesIcone) {
  return (
    <BaseIcone {...props}>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </BaseIcone>
  );
}

/** Sinal de adição — Novo Registro */
export function IconeAdicionar(props: PropriedadesIcone) {
  return (
    <BaseIcone {...props}>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </BaseIcone>
  );
}

/** Seta direcional direita */
export function IconeSetaDireita(props: PropriedadesIcone) {
  return (
    <BaseIcone {...props}>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </BaseIcone>
  );
}

/** Seta direcional esquerda */
export function IconeSetaEsquerda(props: PropriedadesIcone) {
  return (
    <BaseIcone {...props}>
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </BaseIcone>
  );
}

/** Tendência de redução positiva (ex.: redução de % gordura / peso) */
export function IconeTendenciaBaixa(props: PropriedadesIcone) {
  return (
    <BaseIcone {...props}>
      <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
      <polyline points="16 17 22 17 22 11" />
    </BaseIcone>
  );
}

/** Tendência de ganho positivo (ex.: ganho de massa magra) */
export function IconeTendenciaAlta(props: PropriedadesIcone) {
  return (
    <BaseIcone {...props}>
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </BaseIcone>
  );
}

/** Relógio — Duração de sessão */
export function IconeRelogio(props: PropriedadesIcone) {
  return (
    <BaseIcone {...props}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </BaseIcone>
  );
}

/** Menu hambúrguer corporativo — Gaveta Mobile */
export function IconeMenu(props: PropriedadesIcone) {
  return (
    <BaseIcone {...props}>
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="20" y2="17" />
    </BaseIcone>
  );
}

/** Fechar modal / gaveta */
export function IconeFechar(props: PropriedadesIcone) {
  return (
    <BaseIcone {...props}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </BaseIcone>
  );
}

/** Copiar link de convite para área de transferência */
export function IconeCopiar(props: PropriedadesIcone) {
  return (
    <BaseIcone {...props}>
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </BaseIcone>
  );
}
