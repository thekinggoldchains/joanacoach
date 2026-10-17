# Regras do Projeto — PersonalTrainer (Joana Antunes Coaching)

Este arquivo define as diretrizes obrigatórias de nomenclatura, arquitetura, estilização (Design System) e fluxo de trabalho para todos os agentes que atuam neste repositório.

## 1. Regra de Ouro: Nomenclatura 100% em Português

- **PROIBIDO usar termos em inglês** para pastas de domínio, arquivos da aplicação, tabelas/colunas do banco de dados, variáveis SCSS, funções de negócio ou documentos de especificação/planos.
- **Exceções técnicas obrigatórias do ecossistema:** apenas palavras reservadas da linguagem/framework (ex.: `src/app`, `page.tsx`, `layout.tsx`, `route.ts`, `middleware.ts`, `schema.prisma`) permanecem como o Next.js/Prisma exige.
- **Documentação:**
  - Especificações ficam em `docs/especificacoes/AAAA-MM-DD-<tema>.md`.
  - Planos de implementação ficam em `docs/planos/AAAA-MM-DD-<tema>.md`.
- **Estrutura de Código (`src/`):**
  - `src/estilos/` (`_variaveis.scss`, `_mixins.scss`, `globais.scss`)
  - `src/dominio/` (ex.: `src/dominio/avaliacao/calculadora.ts`)
  - `src/componentes/` (ex.: `BarraLateral.tsx`, `BarraLateral.module.scss`)
  - `src/acoes/` (Server Actions em português: `clientes.ts`, `avaliacoes.ts`, `anamnese.ts`)
- **Banco de Dados (`prisma/schema.prisma`):**
  - Modelos e campos 100% em português (sem acentos no identificador): `Usuario`, `PerfilCliente`, `Anamnese`, `AvaliacaoFisica`, `FotoProgresso`, `PapelUsuario` (`ADMIN`, `ALUNO`), `StatusCliente` (`CONVIDADO`, `ATIVO`, `INATIVO`), `SexoBiologico` (`MASCULINO`, `FEMININO`).

---

## 2. Stack Tecnológica & Restrições Estritas

- **Framework:** Next.js (App Router) com TypeScript estrito.
- **Banco de Dados & ORM:** PostgreSQL com Prisma ORM (`prisma/schema.prisma`).
- **Autenticação:** Auth.js (NextAuth v5) com controle de papéis (`ADMIN` para Personal Trainer e `ALUNO` para Cliente/Aluno).
- **Estilização:** **100% SCSS / CSS Modules (`.module.scss`)**.
  - **PROIBIDO usar Tailwind CSS**, classes utilitárias inline de frameworks CSS ou CSS-in-JS.
  - Todo componente ou página deve ter seu arquivo `<Nome>.module.scss` correspondente e importar tokens de `src/estilos/_variaveis.scss` e `src/estilos/_mixins.scss`.
- **Testes:** Vitest + Testing Library seguindo TDD estrito (Vermelho-Verde-Refatorar).

---

## 3. Regra Oficial de Design System (Joana Antunes Coaching)

Toda interface construída neste repositório DEVE seguir fielmente a identidade visual estabelecida nos mockups de referência:

### 3.1 Paleta de Cores (`src/estilos/_variaveis.scss`)
- **Superfícies Escuras:**
  - `$cor-fundo-escuro: #141414;` (Barra lateral da Personal, Tela inicial Mobile, Cards escuros como "Próximo Treino" e "Resultado Calculado")
  - `$cor-superficie-escura: #1E1E1E;` (Superfície secundária/hover em áreas escuras)
- **Superfícies Claras:**
  - `$cor-fundo-claro: #F8F7F4;` (Fundo geral da área principal no Admin e fundo das telas internas do App Mobile)
  - `$cor-fundo-cartao: #FFFFFF;` (Fundo padrão dos cartões de conteúdo)
- **Acento Dourado / Bronze:**
  - `$cor-dourado-primario: #C5A059;` (Botões principais, abas ativas, indicadores de gráficos, ícones de destaque, selos)
  - `$cor-dourado-hover: #B38E46;` (Hover de botões principais)
  - `$cor-dourado-suave: #F3ECE0;` (Fundos sutis de selos, alertas leves e áreas de envio de foto)
  - `$cor-borda-dourada: #E2D1B3;` (Bordas de botões contornados dourados e destaques)
- **Tipografia & Contraste de Texto (REGRA CRÍTICA):**
  - **Em fundos claros (`#FFFFFF` e `#F8F7F4`):** Texto principal SEMPRE escuro (`$cor-texto-primario: #1A1A1A`), rótulos e textos secundários em cinza médio (`$cor-texto-secundario: #757575` ou `#555555`). **Nunca permitir texto branco em fundo claro**, garantindo `color: #1A1A1A` explícito em `input`, `select`, `textarea` e tabelas.
  - **Em fundos escuros (`#141414` e `#1E1E1E`):** Texto principal branco (`#FFFFFF`) e texto secundário cinza claro (`#BDBDBD`).
- **Bordas & Semântica:**
  - `$cor-borda: #EAE6DF;` (Bordas finas de cartões, campos e divisórias de tabela)
  - `$cor-sucesso: #2E7D32;` (Evolução positiva, status Ativo, PAR-Q apto)
  - `$cor-alerta: #F57C00;` (Alertas médicos PAR-Q, anamnese pendente)
  - `$cor-perigo: #C62828;` (Erros de validação, ações destrutivas)

### 3.2 Tipografia & Geometria
- **Fonte de Destaque (Monograma `JA` e Títulos de Marca):** Serifada clássica (`$fonte-destaque`: *Cormorant Garamond* ou *Playfair Display*).
- **Fonte de Interface (Telas, Tabelas, Campos e Indicadores):** Sans-serif limpa (`$fonte-interface`: *Plus Jakarta Sans* ou *Inter*).
- **Raios de Borda:**
  - `$raio-pequeno: 8px;` (Campos, botões, selos quadrados)
  - `$raio-medio: 12px;` (Cartões de conteúdo)
  - `$raio-pilula: 999px;` (Seletores tipo pílula e etiquetas de status)
- **Elevação:** Sombra sutil em cartões (`$sombra-cartao: 0 2px 10px rgba(20, 20, 20, 0.04)`) combinada com borda `1px solid $cor-borda`.

### 3.3 Padrões de Layout por Perfil
- **Área Administradora (`ADMIN` — Desktop):**
  - Layout em grade com **Barra Lateral fixa à esquerda** (`240px`, fundo `#141414`, monograma `JA` dourado no topo, item ativo com barra lateral dourada e fundo `rgba(197, 160, 89, 0.22)`).
  - Área principal com fundo `#F8F7F4`, cabeçalho com título à esquerda e botão dourado à direita.
  - Perfil do Cliente estruturado com navegação por **Abas Horizontais** (`Resumo`, `Avaliações`, `Treinos`, `Check-ins`, `Progresso`, `Mensagens`).
- **Área do Aluno (`ALUNO` — Mobile PWA):**
  - Container mobile centralizado (`max-width: 480px` no computador, `100%` no celular), com **Barra de Navegação Inferior** fixa com 5 destinos (`Início`, `Treinos`, `Evolução`, `Check-in`, `Mais`).

---

## 4. Privacidade Total & Segurança
- Todas as consultas e Server Actions do `ADMIN` devem filtrar registros por `treinadorId = sessao.usuario.id`.
- Todas as consultas e Server Actions do `ALUNO` devem acessar exclusivamente o `PerfilCliente` vinculado ao `sessao.usuario.id` autenticado.
