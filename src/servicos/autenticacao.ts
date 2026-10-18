import bcrypt from "bcryptjs";

export interface SessaoUsuario {
  usuarioId: string;
  papel: "ADMIN" | "ALUNO";
  nome?: string;
  email?: string;
}

export async function gerarHashSenha(senhaPlana: string): Promise<string> {
  return bcrypt.hash(senhaPlana, 10);
}

export async function verificarSenha(
  senhaPlana: string,
  senhaHash: string
): Promise<boolean> {
  return bcrypt.compare(senhaPlana, senhaHash);
}

export function exigirPapelAdmin(sessao: SessaoUsuario | null): SessaoUsuario {
  if (!sessao || sessao.papel !== "ADMIN") {
    throw new Error("Acesso negado: apenas a Personal Trainer pode executar esta ação.");
  }
  return sessao;
}

export function obterSessaoPadraoAdmin(): SessaoUsuario {
  return {
    usuarioId: "treinadora_joana",
    papel: "ADMIN",
    nome: "Joana Antunes",
    email: "joana@coaching.pt",
  };
}

export function obterSessaoPadraoAluno(): SessaoUsuario {
  return {
    usuarioId: "usuario_joao",
    papel: "ALUNO",
    nome: "João Silva",
    email: "joao@email.com",
  };
}
