import type { Metadata } from 'next';
import { Inspector } from 'react-dev-inspector';
import { MainLayout } from '@/components/main-layout';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Nexus Care | International Medical AI Consultation',
    template: '%s | Nexus Care',
  },
  description:
    'International Medical AI Bilingual Consultation & Companion System - Your trusted healthcare assistant',
  keywords: [
    'medical',
    'healthcare',
    'AI consultation',
    'bilingual',
    'companion care',
    'international hospital',
    'appointment booking',
  ],
  authors: [{ name: 'Nexus Care Team' }],
  icons: {
    icon: '/favicon.ico',
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
  const isDev = process.env.COZE_PROJECT_ENV === 'DEV';

  return (
    <html lang="en">
      <body className={`antialiased`}>
        {isDev && <Inspector />}
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
