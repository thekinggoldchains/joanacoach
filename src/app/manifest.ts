import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Joana Antunes Coaching — Personal & Aluno",
    short_name: "JA Coaching",
    description:
      "Plataforma PWA de Gestão de Clientes, Avaliações Físicas Pollock e Acompanhamento de Treinos",
    start_url: "/entrar",
    display: "standalone",
    orientation: "portrait",
    background_color: "#141414",
    theme_color: "#141414",
    lang: "pt-PT",
    icons: [
      {
        src: "/icone-pwa.svg",
        sizes: "192x192",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icone-pwa.svg",
        sizes: "512x512",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      {
        name: "Painel da Personal",
        short_name: "Painel",
        description: "Abrir Dashboard e Clientes da Personal Trainer",
        url: "/admin/painel",
      },
      {
        name: "Gestão de Clientes",
        short_name: "Clientes",
        description: "Pesquisar alunos, gerar convites e registrar avaliações",
        url: "/admin/clientes",
      },
      {
        name: "App do Aluno",
        short_name: "Aluno",
        description: "Abrir área de treinos e evolução do aluno",
        url: "/app/inicio",
      },
    ],
  };
}
