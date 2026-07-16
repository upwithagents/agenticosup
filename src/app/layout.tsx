import type { Metadata } from "next";
import "./globals.css";

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
        <div className="frame">{children}</div>
      </body>
    </html>
  );
}
