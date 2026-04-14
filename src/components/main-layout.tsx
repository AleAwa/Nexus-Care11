'use client';

import { LanguageProvider } from '@/hooks/use-language';
import { BottomNav } from '@/components/bottom-nav';
import { Header } from './header';

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
        <Header />
        <main className="container mx-auto px-4 py-4 md:py-6">
          {children}
        </main>
        <BottomNav />
      </div>
    </LanguageProvider>
  );
}
