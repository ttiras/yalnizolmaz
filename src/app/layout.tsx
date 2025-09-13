import type { Metadata } from "next";
import { Geist, Geist_Mono, Lora, Inter } from "next/font/google";
import "./globals.css";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AppToaster } from "@/components/ui/toaster";
import { VerifyBanner } from "@/components/VerifyBanner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-serif",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "yalnizolmaz",
  description: "Yalnız yaşayanlar için yumuşak ve destekleyici yazılar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="min-h-dvh" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('theme');
                  var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var theme = stored || (systemDark ? 'dark' : 'light');
                  var html = document.documentElement;
                  html.classList.remove('light', 'dark');
                  html.classList.add(theme);
                  html.setAttribute('data-theme', theme);
                  html.style.colorScheme = theme;
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${lora.variable} ${inter.variable} antialiased`}
        suppressHydrationWarning
      >
        <Navbar />
        <VerifyBanner />
        {children}
        <Footer />
        <AppToaster />
      </body>
    </html>
  );
}
