import type { Metadata } from "next";
import "./globals.css";
import { PortalChrome } from "./components/PortalChrome";

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
    <html lang="en">
      <body>
        <PortalChrome />
        <div className="frame">{children}</div>
      </body>
    </html>
  );
}
