'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, MessageCircle, Calendar, Users, FileText, User } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', icon: Home, labelKey: 'nav.home' as const },
  { href: '/consultation', icon: MessageCircle, labelKey: 'nav.consultation' as const },
  { href: '/appointment', icon: Calendar, labelKey: 'nav.appointment' as const },
  { href: '/companion', icon: Users, labelKey: 'nav.companion' as const },
  { href: '/records', icon: FileText, labelKey: 'nav.records' as const },
  { href: '/profile', icon: User, labelKey: 'nav.profile' as const },
];

export function BottomNav() {
  const pathname = usePathname();
  const { t } = useLanguage();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 md:hidden">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center flex-1 h-full transition-colors',
                isActive 
                  ? 'text-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs mt-1 truncate max-w-full">
                {t.nav[item.labelKey.replace('nav.', '') as keyof typeof t.nav]}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
