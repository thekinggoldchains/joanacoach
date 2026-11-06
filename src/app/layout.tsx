import type { Metadata, Viewport } from "next";
import { RegistroPwa } from "@/componentes/comum/RegistroPwa";
import "@/estilos/globais.scss";

export const viewport: Viewport = {
  themeColor: "#141414",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Joana Antunes Coaching",
  description: "Plataforma PWA de Gestão de Alunos, Avaliações Físicas e Treinos",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "JA Coaching",
  },
  icons: {
    icon: "/icone-pwa.svg",
    apple: "/icone-pwa.svg",
  },
};

export default function LayoutRaiz({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-PT">
      <body>
        <RegistroPwa />
        {children}
      </body>
    </html>
  );
}
