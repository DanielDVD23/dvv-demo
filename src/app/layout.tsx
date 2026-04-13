import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "beauOS – DVV Admin",
  description: "Spielbetriebs-Management-Software für den DVV",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="h-full antialiased">
      <body>{children}</body>
    </html>
  );
}
