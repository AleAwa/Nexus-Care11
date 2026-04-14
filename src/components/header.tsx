'use client';

import { Heart, Phone } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import { LanguageSwitcher } from './language-switcher';
import { Button } from '@/components/ui/button';

export function Header() {
  const { t } = useLanguage();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg md:text-xl font-bold text-gray-900">
              {t.common.appName}
            </span>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Emergency Hotline */}
            <Button variant="ghost" size="sm" className="hidden md:flex gap-2 text-red-600">
              <Phone className="w-4 h-4" />
              <span>Emergency</span>
            </Button>

            {/* Language Switcher */}
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
}
