import type { Metadata } from "next";
import "./globals.css";

const title = "GEMA — Tu gemelo metabólico";
const description =
  "GEMA crea una copia digital de tu metabolismo para detectar el riesgo de síndrome metabólico antes de que aparezcan los síntomas.";

export const metadata: Metadata = {
  // absolute URL needed so LinkedIn/WhatsApp previews can resolve /og-image.png
  metadataBase: new URL("https://gema-metabolic-twin.vercel.app"),
  title,
  description,
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "GEMA",
    locale: "es_PE",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "GEMA: login y dashboard del Índice de Carga Metabólica" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og-image.png"] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
