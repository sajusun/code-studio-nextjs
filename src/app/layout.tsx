import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { ThemeProvider } from "@/context/ThemeContext";
import { NotificationProvider } from "@/context/NotificationContext";
import { NotificationToast } from "@/components/common/NotificationToast";
import { JsonLd } from "@/components/common/JsonLd";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#090d16" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://code-studio-pro.vercel.app"),
  title: {
    default: "CodeStudio PRO — Software Showcase & Engineering Hub",
    template: "%s | CodeStudio PRO",
  },
  description:
    "Explore production-ready web apps, mobile applications (Android APK & iOS TestFlight), SaaS tools, and headless microservices with live interactive sandbox demos. Engineered by Sakhawat Hossain (@sajusun).",
  applicationName: "CodeStudio PRO",
  authors: [
    {
      name: "Sakhawat Hossain",
      url: "https://sajusun.github.io/",
    },
  ],
  generator: "Next.js",
  keywords: [
    "CodeStudio PRO",
    "Sakhawat Hossain",
    "sajusun",
    "Backend Software Engineer",
    "Laravel 12 Microservice",
    "Next.js 16 Showcase",
    "React 19 Apps",
    "Tailwind CSS v4",
    "Open Source Software Showcase",
    "Laravel Reverb WebSockets",
    "Android APK Demos",
    "iOS TestFlight Apps",
    "Full-Stack Engineering Portfolio",
  ],
  creator: "Sakhawat Hossain (sajusun)",
  publisher: "Sakhawat Hossain",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "CodeStudio PRO — Software Showcase & Engineering Hub",
    description:
      "Explore production-ready web apps, mobile apps, SaaS tools, and headless microservices with live interactive sandbox demos. Architected by Sakhawat Hossain (@sajusun).",
    url: "https://code-studio-pro.vercel.app",
    siteName: "CodeStudio PRO",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeStudio PRO — Software Showcase & Engineering Hub",
    description:
      "Enterprise digital software showcase, SaaS marketplace, and interactive engineering platform by Sakhawat Hossain (@sajusun).",
    creator: "@sajusun",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
        <JsonLd />
      </head>
      <body className="min-h-screen flex flex-col antialiased selection:bg-blue-500 selection:text-white">
        <ThemeProvider>
          <NotificationProvider>
            <div className="flex flex-col min-h-screen relative bg-cyber-grid">
              {/* Ambient Glow */}
              <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-blue-500/10 via-indigo-500/5 to-transparent blur-3xl pointer-events-none -z-10"></div>

              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
              <NotificationToast />
            </div>
          </NotificationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
