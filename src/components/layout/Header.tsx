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

  return (
    <header className="relative border-b border-primary/10 bg-gradient-to-b from-white to-primary/5 backdrop-blur-sm dark:from-slate-950 dark:to-slate-900/50 dark:border-primary/20 shadow-sm dark:shadow-lg dark:shadow-primary/10">
      {/* Accent line - verde */}
      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-40 dark:opacity-60" />
      
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-3 transition-opacity hover:opacity-90">
          <div className="relative flex h-11 w-11 items-center justify-center">
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary/40 to-accent/30 opacity-60 blur group-hover:opacity-100 transition-all duration-300" />
            <div className="relative flex h-11 w-11 items-center justify-center rounded-lg bg-white dark:bg-slate-900 border border-primary/20 dark:border-primary/40">
              {/* House icon SVG */}
              <svg className="h-6 w-6 text-primary dark:text-accent" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </svg>
            </div>
          </div>
          <div className="hidden sm:block">
            <span className="block font-bebas text-xl text-foreground dark:text-white leading-tight">PROPCHAIN</span>
            <span className="block text-xs font-montserrat font-medium text-primary dark:text-accent">Real Estate Platform</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden gap-8 md:flex">
          {[
            { href: '/properties', label: 'Properties' },
            { href: '/about', label: 'About' },
            { href: '/contact', label: 'Contact' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative text-sm font-montserrat font-medium text-foreground/70 dark:text-gray-300 transition-colors hover:text-primary dark:hover:text-accent group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Auth Section */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="hidden text-sm font-montserrat text-foreground/60 dark:text-gray-400 sm:inline">
                {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-montserrat font-medium text-foreground hover:text-primary dark:text-gray-300 dark:hover:text-accent transition-colors border border-primary/20 hover:border-primary/40 dark:border-primary/30 rounded-lg group"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="text-sm font-montserrat font-medium text-foreground/70 dark:text-gray-300 hover:text-primary dark:hover:text-accent transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/auth/register"
                className="px-5 py-2.5 text-sm font-montserrat font-semibold text-white bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary rounded-lg transition-all shadow-lg shadow-primary/30 hover:shadow-primary/50 dark:shadow-primary/20"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden relative"
          aria-label="Toggle menu"
        >
          <div className="space-y-1.5">
            <span
              className={`block h-0.5 w-6 bg-primary transition-all duration-300 ${
                menuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-primary transition-all duration-300 ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-primary transition-all duration-300 ${
                menuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="border-t border-primary/10 dark:border-primary/20 bg-primary/5 dark:bg-slate-900/50 backdrop-blur px-4 py-4 md:hidden">
          <div className="flex flex-col gap-2">
            {[
              { href: '/properties', label: 'Properties' },
              { href: '/about', label: 'About' },
              { href: '/contact', label: 'Contact' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2.5 text-sm font-montserrat font-medium text-foreground/70 dark:text-gray-300 hover:text-primary dark:hover:text-accent hover:bg-primary/10 dark:hover:bg-primary/20 rounded transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
