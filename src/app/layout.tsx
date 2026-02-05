import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ScrollProgress from "@/components/ui/ScrollProgress";
import CommandPalette from "@/components/CommandPalette";

export const metadata: Metadata = {
  title: "Iskandar Isabekov - Backend Developer | Laravel & PHP Specialist",
  description: "Backend Developer from Tashkent, Uzbekistan, specializing in Laravel, PHP, and modern web technologies. Building scalable web applications and e-commerce platforms with integrated payment systems.",
  keywords: ["Backend Developer", "Laravel Developer", "PHP Developer", "Full-Stack Developer", "Uzbekistan", "Tashkent", "Web Development", "E-commerce", "Payment Integration"],
  authors: [{ name: "Iskandar Isabekov" }],
  creator: "Iskandar Isabekov",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://isabekov.dev",
    title: "Iskandar Isabekov - Backend Developer",
    description: "Backend Developer specializing in Laravel, PHP, and modern web technologies",
    siteName: "Iskandar Isabekov Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Iskandar Isabekov - Backend Developer",
    description: "Backend Developer specializing in Laravel, PHP, and modern web technologies",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <ThemeProvider>
          <ScrollProgress />
          <CommandPalette />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
