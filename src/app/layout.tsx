/**
 * Root layout — wraps every page.
 * Sets up: ThemeProvider, Navbar, Footer, global fonts, and metadata.
 *
 * Server Component by default (no "use client").
 */
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import "./globals.css";

/* ── Fonts ──────────────────────────────────────────────────────────────────── */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* ── Site metadata ───────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: {
    default: "Amrit Banga — Developer & AI Enthusiast",
    template: "%s | Amrit Banga",
  },
  description:
    "Personal portfolio of Amrit Banga — software developer and AI enthusiast based in Bothell, WA. Building modern web experiences at the frontier of AI and code.",
  keywords: [
    "Amrit Banga",
    "software developer",
    "AI",
    "Next.js",
    "TypeScript",
    "React",
    "Bothell",
    "portfolio",
  ],
  authors: [{ name: "Amrit Banga", url: "https://x.com/AmritBanga" }],
  creator: "Amrit Banga",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Amrit Banga — Developer & AI Enthusiast",
    description:
      "Personal portfolio of Amrit Banga — software developer and AI enthusiast based in Bothell, WA.",
    siteName: "Amrit Banga",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amrit Banga — Developer & AI Enthusiast",
    description:
      "Software developer & AI enthusiast based in Bothell, WA. Building at the frontier of AI and code.",
    creator: "@AmritBanga",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
};

/* ── Layout component ────────────────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      // `suppressHydrationWarning` is required by next-themes to prevent
      // a mismatch between server-rendered class and client theme state.
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen flex flex-col font-[family-name:var(--font-geist-sans)]">
        {/*
         * ThemeProvider from next-themes:
         * - attribute="class" → adds/removes "dark" class on <html>
         * - defaultTheme="system" → respects OS preference on first visit
         * - enableSystem → allows system preference detection
         * - disableTransitionOnChange → prevents flash during theme switch
         */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />

          {/* Main content area grows to fill viewport height */}
          <main className="flex-1">{children}</main>

          <Footer />

          {/* Sonner toast notifications — rendered at root so all pages can use it */}
          <Toaster richColors position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
