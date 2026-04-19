import type { Metadata } from "next";
import { Sora, Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora-var",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Arota — Startup Agency",
    template: "%s — Arota",
  },
  description:
    "Arota is a startup agency established in 2026. We design and build launch-ready websites, with Batla Medicos as our first live production project.",
  keywords: ["startup agency", "web design", "frontend development", "batla medicos", "netlify", "next.js"],
  openGraph: {
    title: "Arota — Startup Agency",
    description: "Established in 2026. Launch-ready websites with Batla Medicos as our first live demo.",
    type: "website",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${inter.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
