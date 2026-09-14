import { notFound } from 'next/navigation';
import Portfolio from '@/components/portfolio';
import { dictionaries, isLocale } from '@/content/i18n';
export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <Portfolio lang={lang} d={dictionaries[lang]} />;
}
