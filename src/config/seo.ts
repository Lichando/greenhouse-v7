import { Metadata } from 'next';
import { APP_NAME, APP_URL } from './app';

export const seoConfig = {
  title: 'GreenHouse Brokers | Conectamos negocios. Generamos oportunidades.',
  description: 'La red de negocios inmobiliarios que conecta personas, oportunidades y proyectos para hacer crecer cada operación.',
  siteName: 'GreenHouse Brokers',
  siteUrl: APP_URL,
  author: 'GreenHouse Brokers',
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
