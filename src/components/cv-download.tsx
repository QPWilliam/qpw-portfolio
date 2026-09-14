'use client';

import { useId, useState } from 'react';
import { DownloadSimple } from '@phosphor-icons/react';
import { locales, type Dictionary, type Locale } from '@/content/i18n';

export function CvDownload({ lang, d }: { lang: Locale; d: Dictionary }) {
  const [language, setLanguage] = useState<Locale>(lang);
  const id = useId();
  return <div className="cv-download">
    <label htmlFor={id}>{d.cvLanguage}</label>
    <div className="cv-download-controls">
      <select id={id} value={language} onChange={event => setLanguage(event.target.value as Locale)}>
        {locales.map(locale => <option key={locale} value={locale} lang={locale}>{locale === 'es' ? 'Español' : locale === 'en' ? 'English' : '日本語'}</option>)}
      </select>
      <a className="cv-link" href={`/cv/william-burrion-${language}.pdf`} hrefLang={language} download={`William-Burrion-CV-${language.toUpperCase()}.pdf`}><DownloadSimple size={19} /><span>{d.cv}<small>PDF · {language.toUpperCase()}</small></span></a>
    </div>
  </div>;
}
