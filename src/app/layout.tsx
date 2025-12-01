import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ChatWidget from "@/components/ChatWidget";
import { LanguageProvider } from "@/context/LanguageContext";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: 'ZertteHub.kz - Твой грант ждет тебя',
    template: '%s | ZertteHub.kz'
  },
  description: 'Персональный план поступления в зарубежные вузы для школьников Казахстана. Гранты, стипендии, чек-листы и помощь с документами.',
  keywords: ['гранты', 'поступление', 'вузы', 'образование за рубежом', 'Казахстан', 'стипендии', 'IELTS', 'SAT', 'ZertteHub'],
  authors: [{ name: 'ZertteHub Team' }],
  creator: 'ZertteHub',
  openGraph: {
    type: 'website',
    locale: 'ru_KZ',
    url: 'https://zerttehub.kz',
    title: 'ZertteHub.kz - Поступи на грант мечты',
    description: 'Платформа №1 для поступающих за рубеж. Чек-листы, базы вузов и персональные рекомендации.',
    siteName: 'ZertteHub.kz',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ZertteHub.kz Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZertteHub.kz - Твой грант ждет тебя',
    description: 'Персональный план поступления в зарубежные вузы.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-gray-50`}
      >
        <div className="grain-overlay"></div>
        <LanguageProvider>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
          <ChatWidget />
          <Toaster position="top-center" richColors theme="dark" />
        </LanguageProvider>
      </body>
    </html>
  );
}
