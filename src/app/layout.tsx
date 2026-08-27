import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { ThemeProvider } from "@/context/ThemeContext";
import { NotificationProvider } from "@/context/NotificationContext";
import { NotificationToast } from "@/components/common/NotificationToast";

export const metadata: Metadata = {
  title: "CodeStudio — Software Showcase, SaaS Apps & Engineering Portfolio",
  description:
    "Explore production-ready web apps, mobile applications (Android APK & iOS TestFlight), SaaS tools, and headless microservices with live interactive sandbox demos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
