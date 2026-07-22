import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
import { ThemeScript } from "@upwithagents/ui";
import "./globals.css";
import { PortalChrome } from "./components/PortalChrome";

const archivo = Archivo({
  variable: "--app-font-display",
  subsets: ["latin"],
  weight: ["600"],
});

const inter = Inter({
  variable: "--app-font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AgenticOS — Daily Briefing",
  description: "Personal daily briefing dashboard for the up ecosystem",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${archivo.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body>
        <PortalChrome>
          <div className="frame">{children}</div>
        </PortalChrome>
      </body>
    </html>
  );
}
