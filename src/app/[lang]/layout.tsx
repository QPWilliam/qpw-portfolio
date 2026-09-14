import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { dictionaries, isLocale, locales } from '@/content/i18n';
import '../globals.css';

export function generateStaticParams() { return locales.map(lang => ({ lang })); }
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const d = dictionaries[lang];
  return { title: d.meta, description: d.description, authors: [{ name: 'William Burrión' }], openGraph: { title: d.meta, description: d.description, type: 'website', locale: lang === 'es' ? 'es_GT' : lang === 'en' ? 'en_US' : 'ja_JP' }, robots: { index: true, follow: true } };
}
const preferenceScript = `(function(){try{var t=localStorage.getItem('portfolio-theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.dataset.theme=t;document.documentElement.dataset.motion=localStorage.getItem('portfolio-motion')==='reduced'||matchMedia('(prefers-reduced-motion: reduce)').matches?'reduced':'full'}catch(e){}})()`;
export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <html lang={lang} suppressHydrationWarning><head><link rel="preload" href="/fonts/dm-sans-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" /><link rel="preload" href="/fonts/yuji-portfolio.woff2" as="font" type="font/woff2" crossOrigin="anonymous" /><script dangerouslySetInnerHTML={{ __html: preferenceScript }} /></head><body>{children}</body></html>;
}
