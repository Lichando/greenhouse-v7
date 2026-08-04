'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  user?: { id: string; email: string; name: string } | null;
}

export function Header({ user }: HeaderProps) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  const navItems = [
    { href: '/properties', label: 'Properties' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-primary to-secondary dark:from-primary/90 dark:to-secondary/90 border-b border-primary/30 shadow-lg">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group hover:opacity-80 transition-opacity">
            <img 
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo-imagenes1-8BGADuqIJcAYegc7I8SaNJd43ZreBc.png"
              alt="Greenhouse Logo"
              className="h-8 w-8 object-contain"
            />
            <div className="hidden sm:block">
              <span className="block font-bebas text-lg text-white leading-none">PROPCHAIN</span>
              <span className="block text-xs font-montserrat font-medium text-accent/90">Real Estate</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-montserrat font-medium text-white/80 hover:text-white transition-colors relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden ml-2 p-2"
            aria-label="Toggle menu"
          >
            <div className="space-y-1.5">
              <span className={`block h-0.5 w-5 bg-white transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 w-5 bg-white transition-all ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 w-5 bg-white transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="md:hidden border-t border-white/20 pb-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-2 font-montserrat font-medium text-white/80 hover:text-white hover:bg-white/10 rounded transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
