import { MainLayout } from '@/src/components/layout/MainLayout';

export const metadata = {
  title: 'About Us',
};

export default function AboutPage() {
  return (
    <MainLayout>
      <div className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-neutral-900 dark:text-white">About Us</h1>
            <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
              Learn more about Bienes Raíces and our mission to revolutionize real estate in Argentina
            </p>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="mb-4 text-2xl font-bold text-neutral-900 dark:text-white">Our Mission</h2>
              <p className="text-neutral-700 dark:text-neutral-300">
                At Bienes Raíces, we believe everyone deserves access to quality real estate services.
                Our mission is to make property buying, selling, and renting transparent, efficient, and
                accessible to everyone in Argentina.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-neutral-900 dark:text-white">Why Choose Us?</h2>
              <ul className="space-y-3 text-neutral-700 dark:text-neutral-300">
                <li className="flex gap-3">
                  <span className="text-blue-600 dark:text-blue-400">✓</span>
                  <span>Comprehensive property listings from trusted sellers</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-600 dark:text-blue-400">✓</span>
                  <span>Advanced search and filtering tools</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-600 dark:text-blue-400">✓</span>
                  <span>Expert guidance and support</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-600 dark:text-blue-400">✓</span>
                  <span>Secure transactions and verified listings</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-neutral-900 dark:text-white">Our Team</h2>
              <p className="text-neutral-700 dark:text-neutral-300">
                Our dedicated team of real estate professionals brings decades of combined experience in
                helping clients find their perfect property. We&apos;re committed to providing exceptional
                service and support throughout your real estate journey.
              </p>
            </section>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
