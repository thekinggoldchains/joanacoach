# Regras do Projeto — PersonalTrainer (Joana Antunes Coaching)

Este arquivo define as diretrizes obrigatórias de arquitetura, estilização (Design System) e fluxo de trabalho para todos os agentes que atuam neste repositório.

## 1. Stack Tecnológica & Restrições Estritas

- **Framework:** Next.js (App Router) com TypeScript estrito.
- **Banco de Dados & ORM:** PostgreSQL com Prisma ORM (`prisma/schema.prisma`).
- **Autenticação:** Auth.js (NextAuth v5) com controle de papéis (`ADMIN` para Personal Trainer e `CLIENT` para Aluno).
- **Estilização:** **100% SCSS / CSS Modules (`.module.scss`)**.
  - **PROIBIDO usar Tailwind CSS**, classes utilitárias inline de frameworks CSS ou CSS-in-JS.
  - Todo componente ou página deve ter seu arquivo `<Nome>.module.scss` correspondente e importar tokens de `src/styles/_variables.scss` e `src/styles/_mixins.scss`.
- **Testes:** Vitest + Testing Library seguindo TDD estrito (Red-Green-Refactor).

---

## 2. Regra Oficial de Design System (Joana Antunes Coaching)

Toda interface construída neste repositório DEVE seguir fielmente a identidade visual **Premium Dark, Gold & Warm Light** estabelecida nos mockups de referência:

### 2.1 Paleta de Cores (`src/styles/_variables.scss`)
- **Superfícies Escuras (Premium Dark):**
  - `$color-dark-bg: #141414;` (Sidebar do Admin, Tela Splash Mobile, Cards de Destaque Escuros como "Próximo Treino" e "Resultado Calculado")
  - `$color-dark-surface: #1E1E1E;` (Superfície secundária/hover em áreas escuras)
- **Superfícies Claras (Warm Light):**
  - `$color-light-bg: #F8F7F4;` (Fundo geral da área principal no Admin e fundo das telas internas do App Mobile)
  - `$color-card-bg: #FFFFFF;` (Fundo padrão dos cards de conteúdo)
- **Acento Dourado / Bronze (Brand Gold):**
  - `$color-gold-primary: #C5A059;` (Botões primários, abas ativas, indicadores de gráficos, ícones de destaque, badges)
  - `$color-gold-hover: #B38E46;` (Hover de botões primários)
  - `$color-gold-soft: #F3ECE0;` (Fundos sutis de badges, alertas leves e áreas de upload)
  - `$color-gold-border: #E2D1B3;` (Bordas de botões outline dourados e destaques)
- **Tipografia & Contraste de Texto (REGRA CRÍTICA):**
  - **Em fundos claros (`#FFFFFF` e `#F8F7F4`):** Texto principal SEMPRE escuro (`$color-text-primary: #1A1A1A`), rótulos e textos secundários em cinza médio (`$color-text-secondary: #757575` ou `#555555`). **Nunca permitir texto branco em fundo claro**, garantindo `color: #1A1A1A` explícito em inputs, selects, textareas e tabelas.
  - **Em fundos escuros (`#141414` e `#1E1E1E`):** Texto principal branco (`#FFFFFF`) e texto secundário cinza claro (`#BDBDBD`).
- **Bordas & Semântica:**
  - `$color-border: #EAE6DF;` (Bordas finas de cards, inputs e divisórias de tabela)
  - `$color-success: #2E7D32;` (Evolução positiva, status Ativo, PAR-Q apto)
  - `$color-warning: #F57C00;` (Alertas médicos PAR-Q, anamnese pendente)
  - `$color-danger: #C62828;` (Erros de validação, ações destrutivas)

### 2.2 Tipografia & Geometria
- **Fonte Display (Monograma `JA` e Títulos de Marca):** Serifada clássica (*Cormorant Garamond* ou *Playfair Display*).
- **Fonte de Interface (UI, Tabelas, Inputs e KPIs):** Sans-serif limpa (*Plus Jakarta Sans* ou *Inter*).
- **Raios de Borda:**
  - `$radius-sm: 8px;` (Inputs, botões, badges quadrados)
  - `$radius-md: 12px;` (Cards de conteúdo)
  - `$radius-pill: 999px;` (Seletores tipo pill e tags de status)
- **Elevação:** Sombra sutil em cards (`$shadow-card: 0 2px 10px rgba(20, 20, 20, 0.04)`) combinada com borda `1px solid $color-border`.

### 2.3 Padrões de Layout por Perfil
- **Área Administrador (`ADMIN` — Desktop-First):**
  - Layout em grid com **Sidebar fixa à esquerda** (`240px`, fundo `#141414`, monograma `JA` dourado no topo, item ativo com barra lateral dourada e fundo `rgba(197, 160, 89, 0.22)`).
  - Área principal com fundo `#F8F7F4`, cabeçalho com título à esquerda e botão de ação dourado à direita.
  - Perfil do Cliente estruturado com navegação por **Abas Horizontais** (`Resumo`, `Avaliações`, `Treinos`, `Check-ins`, `Progresso`, `Mensagens`).
- **Área do Cliente (`CLIENT` — Mobile-First PWA):**
  - Container mobile centralizado (`max-width: 480px` no desktop, `100%` no mobile), com **Bottom Navigation Bar** fixa com 5 destinos (`Início`, `Treinos`, `Evolução`, `Check-in`, `Mais`).

---

## 3. Privacidade Total & Segurança
- Todas as queries e Server Actions do `ADMIN` devem filtrar registros por `trainerId = session.user.id`.
- Todas as queries e Server Actions do `CLIENT` devem acessar exclusivamente o `ClientProfile` vinculado ao `session.user.id` autenticado.
