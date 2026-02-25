import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ui/theme-provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "PulseAnalytics - Real-time Analytics for Modern Teams",
    template: "%s | PulseAnalytics",
  },
  description:
    "Track, analyze, and optimize your business metrics with real-time dashboards, AI-powered insights, and collaborative reports. Trusted by 2,000+ companies worldwide.",
  keywords: [
    "analytics",
    "dashboard",
    "real-time",
    "business intelligence",
    "data visualization",
    "SaaS",
    "metrics",
  ],
  authors: [{ name: "PulseAnalytics" }],
  creator: "PulseAnalytics",
  metadataBase: new URL("https://pulseanalytics.io"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pulseanalytics.io",
    siteName: "PulseAnalytics",
    title: "PulseAnalytics - Real-time Analytics for Modern Teams",
    description:
      "Track, analyze, and optimize your business metrics with real-time dashboards and AI-powered insights.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PulseAnalytics Dashboard Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PulseAnalytics - Real-time Analytics for Modern Teams",
    description:
      "Track, analyze, and optimize your business metrics with real-time dashboards and AI-powered insights.",
    images: ["/og-image.png"],
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#1E40AF" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const t = localStorage.getItem('theme');
                if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                }
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
