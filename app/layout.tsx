import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata, Viewport } from "next";
import localFont from 'next/font/local';
import "./globals.css";

const soriaFont = localFont({
  src: "../public/soria-font.ttf",
  variable: "--font-soria",
});

const vercettiFont = localFont({
  src: "../public/Vercetti-Regular.woff",
  variable: "--font-vercetti",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://alkontv.github.io/'),
  title: "Alan — Full-Cycle Developer",
  description:
    "Full-cycle developer: mobile apps, web, Telegram bots, backend and AI. From idea to release, infrastructure included.",
  keywords:
    "Alan, Full-Cycle Developer, Flutter, Mobile Developer, Web, Next.js, Backend, FastAPI, Telegram Bots, Mini Apps, Supabase, PostgreSQL, AI Integration, Vector Search, Escrow Marketplace, Portfolio",
  authors: [{ name: "Alan" }],
  creator: "Alan",
  publisher: "Alan",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Alan — Full-Cycle Developer",
    description: "Mobile, web, Telegram bots, backend and AI — from idea to release.",
    siteName: "Alan's Portfolio",
    locale: "en_US",
    type: "website",
    // Статический файл, а не маршрут метаданных: Pages отдаёт расширение
    // как Content-Type, и без .png превью в мессенджерах не разворачивается.
    images: [{ url: "/og.png", width: 1200, height: 630, type: "image/png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alan — Full-Cycle Developer",
    description: "Mobile, web, Telegram bots, backend and AI — from idea to release.",
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0690d4",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overscroll-y-none">
      <body
        className={`${soriaFont.variable} ${vercettiFont.variable} font-sans antialiased`}
      >
        {children}
      </body>
      {process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      )}
    </html>
  );
}
