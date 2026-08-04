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
    <header className="relative border-b border-transparent bg-gradient-to-r from-slate-900/95 to-slate-800/95 backdrop-blur-md dark:from-slate-950 dark:to-slate-900 shadow-lg shadow-cyan-500/5">
      {/* Animated gradient line */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-30" />
      
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
        {/* Logo - Tech Forward */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center">
            {/* Animated border */}
            <div className="absolute inset-0 rounded bg-gradient-to-br from-cyan-500 to-blue-600 opacity-75 blur-sm group-hover:opacity-100 transition-opacity" />
            <div className="relative flex h-10 w-10 items-center justify-center rounded bg-slate-950 group-hover:bg-slate-900">
              <svg className="h-5 w-5 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
              </svg>
            </div>
          </div>
          <div>
            <span className="block font-bold text-white tracking-tight text-lg">PROPCHAIN</span>
            <span className="block text-xs text-cyan-400 font-medium">Real Estate Network</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden gap-8 md:flex">
          <Link
            href="/properties"
            className="relative text-sm font-medium text-gray-300 transition-colors hover:text-cyan-400 group"
          >
            Properties
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 transition-all group-hover:w-full" />
          </Link>
          <Link
            href="/about"
            className="relative text-sm font-medium text-gray-300 transition-colors hover:text-cyan-400 group"
          >
            About
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 transition-all group-hover:w-full" />
          </Link>
          <Link
            href="/contact"
            className="relative text-sm font-medium text-gray-300 transition-colors hover:text-cyan-400 group"
          >
            Contact
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 transition-all group-hover:w-full" />
          </Link>
        </div>

        {/* Auth Section */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="hidden text-sm text-gray-400 sm:inline">
                {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-semibold text-gray-300 hover:text-white transition-colors relative group"
              >
                <div className="absolute inset-0 rounded bg-cyan-500/10 group-hover:bg-cyan-500/20 transition-colors" />
                <span className="relative">Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/auth/register"
                className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg transition-all shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50"
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
            <span className={`block h-0.5 w-6 bg-cyan-400 transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 w-6 bg-cyan-400 transition-all ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-6 bg-cyan-400 transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </nav>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="border-t border-cyan-500/10 bg-slate-800/50 backdrop-blur px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            <Link
              href="/properties"
              className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10 rounded transition-colors"
            >
              Properties
            </Link>
            <Link
              href="/about"
              className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10 rounded transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10 rounded transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
