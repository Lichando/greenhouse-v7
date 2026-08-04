import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-600">
                <span className="font-bold text-white">RE</span>
              </div>
              <span className="font-bold text-neutral-900 dark:text-white">Bienes Raíces</span>
            </div>
            <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
              Your trusted real estate platform for finding the perfect property.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-neutral-900 dark:text-white">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/properties" className="text-sm text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white">
                  Browse Properties
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* For Buyers */}
          <div>
            <h3 className="font-semibold text-neutral-900 dark:text-white">For Buyers</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/properties?operation=SALE" className="text-sm text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white">
                  Properties for Sale
                </Link>
              </li>
              <li>
                <Link href="/properties?operation=RENT" className="text-sm text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white">
                  Properties to Rent
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-neutral-900 dark:text-white">Contact</h3>
            <ul className="mt-4 space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
              <li>Email: info@bienesraices.com</li>
              <li>Phone: +54 11 1234-5678</li>
              <li>Address: Buenos Aires, Argentina</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 border-t border-neutral-200 pt-8 dark:border-neutral-800">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              © {currentYear} Bienes Raíces. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-neutral-600 dark:text-neutral-400">
              <Link href="/privacy" className="transition-colors hover:text-neutral-900 dark:hover:text-white">
                Privacy Policy
              </Link>
              <Link href="/terms" className="transition-colors hover:text-neutral-900 dark:hover:text-white">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
