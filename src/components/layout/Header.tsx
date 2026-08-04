'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { NavigationModal } from '../NavigationModal';

interface HeaderProps {
  user?: { id: string; email: string; name: string } | null;
}

export function Header({ user }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentLabel, setCurrentLabel] = useState('');
  const [mounted, setMounted] = useState(false);

  const navItems = [
    { href: '/properties', label: 'Properties' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  useEffect(() => {
    setMounted(true);
    if (pathname === '/') {
      setCurrentLabel('Home');
    } else {
      const current = navItems.find(item => item.href === pathname);
      setCurrentLabel(current?.label || 'Home');
    }
  }, [pathname]);

  const handleLogout = async () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  if (!mounted) return null;

  return (
    <>
      <header className="sticky top-0 z-40 bg-gradient-to-r from-primary to-secondary dark:from-primary/90 dark:to-secondary/90 border-b border-primary/30 shadow-lg">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group hover:opacity-85 transition-opacity">
              <img 
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logos-08-bnrXmopZHTaexDH9J3uMSrSa6zmdUC.png"
                alt="GREEN HOUSE icon"
                className="h-8 w-auto object-contain"
              />
              <span className="font-bebas text-lg font-bold text-white tracking-wider">GREEN HOUSE</span>
            </Link>

            {/* Center Navigation Trigger - Desktop */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="hidden md:flex items-center justify-center gap-2 px-6 py-2 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 cursor-pointer group"
            >
              <span className="font-bebas text-lg text-white tracking-wide">{currentLabel}</span>
              <svg className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Auth Section */}
            <div className="flex items-center gap-3">
              {user ? (
                <>
                  <span className="hidden text-sm font-montserrat text-white/70 sm:inline">
                    {user.name}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="px-3 py-1.5 text-xs font-montserrat font-medium text-primary bg-white/90 hover:bg-white rounded-lg transition-all"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="hidden sm:block text-sm font-montserrat font-medium text-white/70 hover:text-white transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/register"
                    className="px-4 py-1.5 text-xs sm:text-sm font-montserrat font-semibold text-primary bg-white/95 hover:bg-white rounded-lg transition-all shadow-lg"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Navigation Trigger */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="md:hidden p-2 rounded-lg hover:bg-white/20 transition-all"
              aria-label="Open navigation"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Navigation Modal */}
      <NavigationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentPath={pathname}
        items={navItems}
      />
    </>
  );
}
