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
  title: "Alan — Fullstack Developer",
  description: "Fullstack developer building web, mobile, bots, CRM and AI-powered products — from idea to launch.",
  keywords: "Alan, Fullstack Developer, Flutter, FlutterFlow, Mobile Developer, Web, Backend, Telegram Bots, CRM, AI, Supabase, Postgres, Firebase, JavaScript, TypeScript, Python, Portfolio",
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
    title: "Alan — Fullstack Developer",
    description: "Web, mobile, bots, CRM and AI — from idea to launch.",
    siteName: "Alan's Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alan — Fullstack Developer",
    description: "Web, mobile, bots, CRM and AI — from idea to launch.",
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
