import { Metadata } from 'next';
import { APP_NAME, APP_URL } from './app';

export const seoConfig = {
  title: 'Bienes Raíces - Real Estate Platform',
  description: 'Find the best properties in Argentina. Buy, sell, or rent with confidence.',
  siteName: 'Bienes Raíces',
  siteUrl: APP_URL,
  author: 'Bienes Raíces Team',
};

export const defaultMetadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  description: 'Encuentra las mejores propiedades inmobiliarias en Rosario',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: APP_URL,
    siteName: APP_NAME,
  },
  robots: {
    index: true,
    follow: true,
  },
};
