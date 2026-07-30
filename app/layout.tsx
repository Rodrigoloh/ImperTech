import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Impertech | Impermeabilización y mantenimiento en Querétaro",
  description:
    "Impermeabilización profesional, estructuras, techos y mantenimiento residencial e industrial. Cotiza tu proyecto por m².",
  icons: {
    icon: "/impertech-logo.png",
    shortcut: "/impertech-logo.png",
  },
  openGraph: {
    title: "Impertech | Impermeabilización profesional",
    description:
      "Protegemos tu propiedad con sistemas de impermeabilización, aplicación profesional y soluciones de mantenimiento.",
    type: "website",
    locale: "es_MX",
    images: [
      {
        url: "/og.png",
        width: 1680,
        height: 945,
        alt: "Impertech - Impermeabilización profesional",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Impertech | Impermeabilización profesional",
    description:
      "Cotiza impermeabilización, estructuras y mantenimiento en Querétaro.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
