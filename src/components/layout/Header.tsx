'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Carousel3D } from '../Carousel3D';

interface HeaderProps {
  user?: { id: string; email: string; name: string } | null;
}

const navItems = [
  { href: '/properties', label: 'Properties' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Header({ user }: HeaderProps) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  const handleNavClick = (index: number) => {
    setActiveIndex(index);
    router.push(navItems[index].href);
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-primary/95 dark:bg-primary/80 backdrop-blur-md shadow-lg shadow-primary/20' 
        : 'bg-gradient-to-b from-primary/90 to-primary/70 dark:from-primary/85 dark:to-primary/65'
    } border-b border-primary/20 dark:border-primary/40`}>
      {/* Accent line - lighter verde */}
      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent opacity-50 dark:opacity-70" />
      
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2 transition-opacity hover:opacity-90">
          <div className="relative flex h-10 w-10 items-center justify-center">
            <img 
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo-imagenes1-8BGADuqIJcAYegc7I8SaNJd43ZreBc.png"
              alt="Greenhouse Logo"
              className="h-10 w-10 object-contain"
            />
          </div>
          <div className="hidden sm:block">
            <span className="block font-bebas text-lg text-white dark:text-accent leading-tight">PROPCHAIN</span>
            <span className="block text-xs font-montserrat font-medium text-accent/90 dark:text-accent">Real Estate</span>
          </div>
        </Link>

        {/* 3D Carousel Navigation - Desktop */}
        <div className="hidden md:flex items-center justify-center flex-1 px-8">
          <Carousel3D items={navItems} onSelect={setActiveIndex} />
        </div>

        {/* Auth Section */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="hidden text-sm font-montserrat text-white/70 sm:inline">
                {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 text-xs font-montserrat font-medium text-white hover:bg-white/20 transition-colors rounded-lg border border-white/20"
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
                className="px-4 py-1.5 text-xs sm:text-sm font-montserrat font-semibold text-primary dark:text-primary bg-white/90 hover:bg-white rounded-lg transition-all shadow-lg"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden relative ml-2"
          aria-label="Toggle menu"
        >
          <div className="space-y-1.5">
            <span
              className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
                menuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
                menuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="border-t border-white/20 bg-gradient-to-b from-primary/95 to-primary/85 backdrop-blur px-4 py-4 md:hidden">
          <div className="flex flex-col gap-2">
            {navItems.map((item, index) => (
              <button
                key={item.href}
                onClick={() => {
                  handleNavClick(index);
                  setMenuOpen(false);
                }}
                className={`px-4 py-3 text-sm font-montserrat font-medium rounded-lg transition-all ${
                  activeIndex === index
                    ? 'text-primary bg-white/20 shadow-lg'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
