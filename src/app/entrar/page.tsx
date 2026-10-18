import React from "react";
import estilos from "./Entrar.module.scss";

export default function PaginaEntrar() {
  return (
    <main className={estilos.paginaLogin}>
      <div className={estilos.containerCentral}>
        <header className={estilos.cabecalhoMarca}>
          <div className={estilos.monogramaCirculo}>JA</div>
          <h1 className={estilos.tituloMarca}>JOANA ANTUNES COACHING</h1>
          <p className={estilos.subtituloMarca}>
            Acompanhamento Personalizado &amp; Performance
          </p>
        </header>

        <section className={estilos.cartaoFormulario} aria-label="Formulário de Autenticação">
          <h2 className={estilos.tituloSessao}>Iniciar Sessão</h2>

          <form action="/admin/painel" method="GET" className={estilos.grupoCampo}>
            <div className={estilos.grupoCampo}>
              <label htmlFor="email-acesso" className={estilos.rotulo}>
                E-mail
              </label>
              <input
                id="email-acesso"
                name="email"
                type="email"
                placeholder="joana@joanaantunes.pt"
                defaultValue="joana@joanaantunes.pt"
                className={estilos.campo}
                required
              />
            </div>

            <div className={estilos.grupoCampo}>
              <label htmlFor="senha-acesso" className={estilos.rotulo}>
                Palavra-passe
              </label>
              <input
                id="senha-acesso"
                name="senha"
                type="password"
                placeholder="••••••••"
                defaultValue="12345678"
                className={estilos.campo}
                required
              />
            </div>

            <button type="submit" className={estilos.botaoPrincipal}>
              Entrar
            </button>
          </form>

          <div className={estilos.divisorAcessoRapido}>
            <p className={estilos.textoAcessoRapido}>Acesso rápido ao ambiente:</p>
            <div className={estilos.botoesDemonstracao}>
              <a href="/admin/painel" className={estilos.linkDemonstracao}>
                Acessar Painel da Personal (Joana Antunes)
              </a>
              <a href="/app/inicio" className={estilos.linkDemonstracao}>
                Acessar App Mobile do Aluno (João Silva)
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
