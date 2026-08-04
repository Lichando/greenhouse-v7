import { MainLayout } from '@/src/components/layout/MainLayout';
import Link from 'next/link';

export default function HomePage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-blue-50 to-white px-4 py-20 dark:from-neutral-900 dark:to-neutral-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="text-5xl font-bold text-neutral-900 dark:text-white md:text-6xl">
            Find Your Dream Property
          </h1>
          <p className="mt-6 text-xl text-neutral-600 dark:text-neutral-400">
            Discover the perfect home or investment opportunity in Argentina
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/properties?operation=SALE"
              className="rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Browse for Sale
            </Link>
            <Link
              href="/properties?operation=RENT"
              className="rounded-lg border-2 border-blue-600 px-8 py-3 font-semibold text-blue-600 transition-colors hover:bg-blue-50 dark:border-blue-500 dark:text-blue-400 dark:hover:bg-neutral-800"
            >
              Browse to Rent
            </Link>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="border-y border-neutral-200 bg-white px-4 py-12 dark:border-neutral-800 dark:bg-neutral-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-white">Find Properties</h2>
          <form className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Type
              </label>
              <select className="mt-1 w-full rounded-lg border border-neutral-300 px-4 py-2 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white">
                <option>Any Type</option>
                <option>Apartment</option>
                <option>House</option>
                <option>Land</option>
                <option>Commercial</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                City
              </label>
              <input
                type="text"
                placeholder="Enter city"
                className="mt-1 w-full rounded-lg border border-neutral-300 px-4 py-2 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Price Range
              </label>
              <input
                type="text"
                placeholder="Max price"
                className="mt-1 w-full rounded-lg border border-neutral-300 px-4 py-2 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white"
              />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Featured Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-neutral-900 dark:text-white">Featured Properties</h2>
              <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                Check out our latest listings
              </p>
            </div>
            <Link
              href="/properties"
              className="text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              View All →
            </Link>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Featured properties will be loaded here */}
            <div className="h-64 animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-800" />
            <div className="h-64 animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-800" />
            <div className="h-64 animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-800" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 px-4 py-16 dark:bg-blue-500 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-white">Need Help?</h2>
          <p className="mt-4 text-blue-100">
            Our team of experts is ready to help you find the perfect property.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-block rounded-lg bg-white px-8 py-3 font-semibold text-blue-600 transition-colors hover:bg-blue-50"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </MainLayout>
  );
}
