'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Language, Translations, getTranslation } from '@/lib/i18n';

interface LanguageContextType {
  language: Language;
  t: Translations;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('zh');

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('nexus-care-lang', lang);
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    const newLang = language === 'zh' ? 'en' : 'zh';
    setLanguage(newLang);
  }, [language, setLanguage]);

  // Load language from localStorage on mount
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('nexus-care-lang') as Language | null;
    if (saved && (saved === 'zh' || saved === 'en')) {
      // Will be set on next render
    }
  }

  const value: LanguageContextType = {
    language,
    t: getTranslation(language),
    setLanguage,
    toggleLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
