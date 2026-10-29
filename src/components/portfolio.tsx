'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import Image from 'next/image';
import { motion, MotionConfig, useScroll, useSpring, useTransform } from 'motion/react';
import { ArrowDown, ArrowRight, ArrowUpRight, Cat, Check, Code, Copy, EnvelopeSimple, GameController, GithubLogo, GlobeHemisphereWest, IconContext, LinkedinLogo, List, Monitor, Moon, Pause, Play, Sun, X, DeviceMobile } from '@phosphor-icons/react';
import { Phone } from './phone';
import { CvDownload } from './cv-download';
import { Skills } from './skills';
import { Reveal, useAmbientMotion } from './page-motion';
import { demoProjects, experience, projects, social, type PhoneScreen, type ProjectId } from '@/content/projects';
import { locales, type Dictionary, type Locale } from '@/content/i18n';

function subscribePreferences(callback: () => void) {
  window.addEventListener('portfolio-preferences', callback);
  window.addEventListener('storage', callback);
  const media = ['(prefers-color-scheme: dark)', '(prefers-reduced-motion: reduce)'].map(query => window.matchMedia(query));
  media.forEach(query => query.addEventListener('change', callback));
  return () => { window.removeEventListener('portfolio-preferences', callback); window.removeEventListener('storage', callback); media.forEach(query => query.removeEventListener('change', callback)); };
}
function getTheme() { try { return localStorage.getItem('portfolio-theme') ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'); } catch { return 'light'; } }
function getMotion() { if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'reduced'; try { return localStorage.getItem('portfolio-motion') ?? 'full'; } catch { return 'full'; } }
function savePreference(key: string, value: string) { try { localStorage.setItem(key, value); } catch { /* Preferences still work for this page through DOM below. */ } window.dispatchEvent(new Event('portfolio-preferences')); }

export default function Portfolio({ lang, d }: { lang: Locale; d: Dictionary }) {
  const theme = useSyncExternalStore(subscribePreferences, getTheme, () => 'light');
  const motionSetting = useSyncExternalStore(subscribePreferences, getMotion, () => 'full');
  const reduced = motionSetting === 'reduced';
  const [menuOpen, setMenuOpen] = useState(false);
  const [heroScreen, setHeroScreen] = useState<PhoneScreen | null>(null);
  const [workScreen, setWorkScreen] = useState<PhoneScreen | null>('core');
  const [selected, setSelected] = useState<ProjectId>('core');
  const [wide, setWide] = useState(false);
  const [projectFilter, setProjectFilter] = useState<'all' | 'alisa' | 'personal'>('all');
  const [copyStatus, setCopyStatus] = useState('');
  const [catActive, setCatActive] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const catTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const preview = useRef<HTMLDivElement>(null);
  const timeline = useRef<HTMLDivElement>(null);
  const hero = useRef<HTMLElement>(null);
  useAmbientMotion(hero, reduced);
  const { scrollYProgress } = useScroll({ target: timeline, offset: ['start 75%', 'end 65%'] });
  const lineProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });
  const lineTransform = useTransform(lineProgress, value => `scaleY(${value})`);
  useEffect(() => { document.documentElement.dataset.theme = theme; document.documentElement.dataset.motion = reduced ? 'reduced' : 'full'; }, [theme, reduced]);
  useEffect(() => () => { if (timeout.current) clearTimeout(timeout.current); if (catTimeout.current) clearTimeout(catTimeout.current); }, []);
  const selectProject = (id: ProjectId) => { setSelected(id); setWorkScreen(id); if (window.innerWidth < 900) preview.current?.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth', block: 'center' }); };
  const copyEmail = async () => { try { await navigator.clipboard.writeText(social.email); setCopyStatus(d.copied); } catch { setCopyStatus(d.copyError); } if (timeout.current) clearTimeout(timeout.current); timeout.current = setTimeout(() => setCopyStatus(''), 3000); };
  const changeLanguage = (next: Locale) => {
    const params = new URLSearchParams();
    if (heroScreen) params.set('app', heroScreen);
    params.set('project', selected);
    const suffix = params.toString();
    return `/${next}${suffix ? `?${suffix}` : ''}`;
  };
  useEffect(() => {
    const url = new URL(window.location.href);
    const h = url.searchParams.get('app'); const p = url.searchParams.get('project');
    // Restore language-navigation state via an event so the initial render stays deterministic.
    const restore = () => {
      if ([...projects, ...demoProjects].some(project => project.id === h)) setHeroScreen(h as PhoneScreen);
      if (projects.some(project => project.id === p)) { setSelected(p as ProjectId); setWorkScreen(p as ProjectId); }
    };
    const frame = requestAnimationFrame(restore); return () => cancelAnimationFrame(frame);
  }, []);
  const navIds = ['projects', 'journey', 'about', 'contact'];
  const currentProject = projects.find(p => p.id === selected)!;
  const visibleProjects = projects.filter(project => projectFilter === 'all' || project.group === projectFilter);
  const filterProjects = (filter: 'all' | 'alisa' | 'personal') => {
    setProjectFilter(filter);
    if (filter !== 'all' && currentProject.group !== filter) {
      const first = projects.find(project => project.group === filter)!;
      setSelected(first.id); setWorkScreen(first.id);
    }
  };
  return <IconContext.Provider value={{ size: 20, weight: 'regular', 'aria-hidden': true }}><MotionConfig reducedMotion={reduced ? 'always' : 'user'}>
    <a className="skip-link" href="#main">{d.skip}</a>
    <header className="site-header" onKeyDown={e => { if (e.key === 'Escape') setMenuOpen(false); }}>
      <a href={`/${lang}`} className="brand" aria-label="William Burrión"><span className="brand-seal">WB</span><span>William Burrión</span></a>
      <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label={d.menu} id="main-navigation">{d.nav.map((item, i) => <a href={`#${navIds[i]}`} key={item} onClick={() => setMenuOpen(false)}>{item}</a>)}</nav>
      <div className="header-controls">
        <nav className="locale-switch" aria-label={lang === 'es' ? 'Idioma' : lang === 'en' ? 'Language' : '言語'}>{locales.map(locale => <a key={locale} href={changeLanguage(locale)} hrefLang={locale} lang={locale} aria-label={locale === 'es' ? 'Español' : locale === 'en' ? 'English' : '日本語'} aria-current={locale === lang ? 'page' : undefined} onClick={e => { if (locale === lang) e.preventDefault(); else e.currentTarget.href += window.location.hash; }}>{locale === 'ja' ? '日本語' : locale.toUpperCase()}</a>)}</nav>
        <span className="control-divider" />
        <button className="icon-button theme-button" onClick={() => savePreference('portfolio-theme', theme === 'dark' ? 'light' : 'dark')} aria-label={theme === 'dark' ? d.light : d.dark} title={theme === 'dark' ? d.light : d.dark}>{theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}</button>
        <button className="icon-button menu-button" aria-label={menuOpen ? d.close : d.menu} aria-controls="main-navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(v => !v)}>{menuOpen ? <X size={22} /> : <List size={22} />}</button>
      </div>
    </header>
    <main id="main">
      <section className="hero" aria-labelledby="hero-title" ref={hero} data-ambient="paused" onFocusCapture={event => {
        event.currentTarget.getAnimations({ subtree: true }).forEach(animation => {
          if (animation instanceof CSSAnimation && ['hero-in', 'name-in', 'phone-in'].includes(animation.animationName)) animation.finish();
        });
      }}>
        <div className="hero-scene" aria-hidden="true">
          <div className="scene-layer scene-ink"><div className="scene-drift">
            <Image className="hero-art hero-art-light" src="/art/ink-landscape.webp" alt="" fill sizes="100vw" preload />
            <Image className="hero-art hero-art-dark" src="/art/ink-landscape-dark.webp" alt="" fill sizes="100vw" loading="eager" fetchPriority="high" />
          </div></div>
          <div className="scene-layer scene-village"><div className="scene-drift">
            <Image className="hero-art hero-art-light" src="/art/ink-landscape.webp" alt="" fill sizes="100vw" loading="eager" />
            <Image className="hero-art hero-art-dark" src="/art/ink-landscape-dark.webp" alt="" fill sizes="100vw" loading="eager" />
          </div></div>
        </div>
        <div className="hero-inner">
          <div className="hero-copy">
            <p className="eyebrow hero-enter">{d.role}</p>
            <h1 id="hero-title" className="hero-name" aria-label="William Burrión"><span className="hero-name-line"><span className="hero-name-word">William</span></span><span className="hero-name-line"><span className="hero-name-word">Burrión<span className="name-dot">.</span></span></span></h1>
            <p className="hero-description hero-enter">{d.intro}</p>
            <div className="hero-actions"><a className="button button-accent" href="#projects">{d.explore}<ArrowDown size={18} /></a><a className="text-link" href="#about">{d.aboutLink}<ArrowUpRight size={15} /></a></div>
          </div>
          <div className="hero-showcase">
            <div className="calligraphy" lang="ja" aria-hidden="true"><span>創</span><span>造</span></div>
            <div className="hero-phone-wrap"><div className="hero-phone-entry"><div className={`hero-phone-float ${heroScreen ? 'is-interactive' : ''}`}><Phone d={d} lang={lang} screen={heroScreen} setScreen={setHeroScreen} reduced={reduced} instance="hero" /></div></div></div>
            <p className="phone-hint"><span className="hint-mark" aria-hidden="true">↳</span>{d.phoneHint}</p>
          </div>
        </div>
        <div className="hero-bottom"><span className="hero-signature" lang="ja">墨とピクセル</span><button className="motion-toggle" onClick={() => savePreference('portfolio-motion', motionSetting === 'full' ? 'reduced' : 'full')} aria-label={reduced ? d.play : d.pause} title={reduced ? d.play : d.pause}>{reduced ? <Play size={13} /> : <Pause size={13} />}<span>{reduced ? d.play : d.pause}</span></button></div>
      </section>
      <section className="intro-section section-shell"><Reveal reduced={reduced} className="intro-grid"><span className="intro-symbol" aria-hidden="true"><Code size={45} weight="thin" /></span><h2>{d.opening}</h2><p>{d.openingBody}</p></Reveal></section>
      <section className="work-section section-shell" id="projects" aria-labelledby="work-title">
        <Reveal reduced={reduced} className="section-heading"><h2 id="work-title">{d.workTitle}</h2><p>{d.workIntro}</p></Reveal>
        <div className="project-filters" role="group" aria-label={d.projectFilter}>{(['all', 'alisa', 'personal'] as const).map(filter => <button key={filter} aria-pressed={projectFilter === filter} onClick={() => filterProjects(filter)}>{filter === 'all' ? d.allProjects : filter === 'alisa' ? d.alisa : d.personal}<span>{projects.filter(project => filter === 'all' || project.group === filter).length}</span></button>)}</div>
        <div className="work-grid">
          <div className="project-list">
            {visibleProjects.map((p, index) => { const content = p.content[lang]; const active = p.id === selected; return <Reveal as="article" reduced={reduced} select=".project-trigger" key={p.id} className={`project ${active ? 'project-active' : ''}`}>
              <button data-testid={`project-${p.id}`} className="project-trigger" onClick={() => selectProject(p.id)} aria-expanded={active} aria-controls={`project-${p.id}`}>
                <span className="project-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><span><span className="project-category">{p.group === 'alisa' ? 'ALISA' : d.personal} / {content.category}</span><span className="project-title">{p.name}</span><span className="project-tagline">{content.title}</span></span><span className="project-toggle">{active ? <ArrowUpRight size={22} /> : <ArrowRight size={22} />}</span>
              </button>
              <div id={`project-${p.id}`} className="project-detail" hidden={!active}><span className="project-stage">{content.status}</span><p>{content.summary}</p><div className="project-role"><strong>{d.contribution}</strong><p>{content.role}</p></div><div className="tech-tags">{p.tags.map(tag => <span key={tag}>{tag}</span>)}</div><button className="text-link project-demo-link" onClick={() => { setWorkScreen(p.id); preview.current?.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth', block: 'center' }); }}>{d.openProject}<ArrowUpRight size={16} /></button></div>
            </Reveal>; })}
            <p className="demo-disclosure"><Code size={17} /><span>{d.workNote}</span></p>
          </div>
          <div className="work-preview" ref={preview}><Reveal reduced={reduced}>
            <div className="preview-controls" role="group" aria-label={d.preview}><button aria-pressed={!wide} onClick={() => setWide(false)}><DeviceMobile size={16} />{d.mobile}</button><button aria-pressed={wide} onClick={() => setWide(true)}><Monitor size={16} />{d.desktop}</button></div>
            <div className={`preview-stage ${wide ? 'preview-wide' : ''}`}><span className="preview-kanji" aria-hidden="true" lang="ja">作</span><Phone d={d} lang={lang} screen={workScreen} setScreen={id => { setWorkScreen(id); if (id && projects.some(project => project.id === id)) { setSelected(id as ProjectId); setProjectFilter('all'); } }} reduced={reduced} wide={wide} instance="work" /></div>
            <p className="preview-caption"><span>{currentProject.content[lang].short}</span><span>{demoProjects.some(project => project.id === workScreen) ? d.demoLabel : d.projectSheet}</span></p>
          </Reveal></div>
        </div>
      </section>
      <section className="journey-section section-shell" id="journey" aria-labelledby="journey-title">
        <Reveal reduced={reduced} className="section-heading"><span className="eyebrow">{d.nav[1]}</span><h2 id="journey-title">{d.journeyTitle}</h2><p>{d.journeyIntro}</p></Reveal>
        <div className="timeline" ref={timeline}>
          <div className="timeline-track" aria-hidden="true"><motion.div style={{ transform: reduced ? 'scaleY(1)' : lineTransform }} /></div>
          {experience.map((job, i) => { const content = job.content[lang]; return <Reveal select=".timeline-date, .timeline-content > *" className="timeline-item" key={job.company} reduced={reduced} delay={.05 * i}><div className="timeline-marker" aria-hidden="true" /><div className="timeline-date"><span>{job.period}</span><p>{job.company}</p></div><div className="timeline-content"><span className="job-role">{content.role}</span><h3>{content.title}</h3><p>{content.body}</p><p className="timeline-tech">{job.tech}</p></div></Reveal>; })}
        </div>
      </section>
      <section className="about-section section-shell" id="about" aria-labelledby="about-title">
        <div className="about-grid"><Reveal reduced={reduced} className="about-art-wrap" select=".about-art" image><Image src="/art/pixel-alley.webp" alt={d.aboutImage} width={1536} height={1024} sizes="(max-width: 900px) 95vw, 48vw" className="about-art" /><span className="about-seal" lang="ja" aria-hidden="true">好奇心</span><button className={`cat-button ${catActive ? 'cat-active' : ''}`} aria-label={d.cat} onClick={() => { setCatActive(true); if (catTimeout.current) clearTimeout(catTimeout.current); catTimeout.current = setTimeout(() => setCatActive(false), 3500); }}><Cat size={22} /><span>?</span></button><span className="cat-reply" role="status">{catActive ? d.catResponse : ''}</span></Reveal><Reveal reduced={reduced} className="about-copy"><h2 id="about-title">{d.aboutTitle}</h2><p>{d.aboutBody}</p><p>{d.aboutPersonal}</p><div className="interests">{[Code, GameController, GlobeHemisphereWest].map((Icon, i) => <span key={i}><Icon size={19} />{d.interests[i]}</span>)}</div><p className="language-note">{d.languageNote}</p></Reveal></div>
      </section>
      <Skills d={d} reduced={reduced} />
      <section className="contact-section" id="contact" aria-labelledby="contact-title"><div className="contact-ink" aria-hidden="true" /><div className="section-shell contact-inner"><Reveal reduced={reduced}><h2 id="contact-title">{d.contactTitle}</h2><p>{d.contactBody}</p><a className="contact-email" href={`mailto:${social.email}`}>{social.email}<ArrowUpRight /></a><div className="contact-links"><a className="button button-accent" href={`mailto:${social.email}`}>{d.emailCta}<EnvelopeSimple size={19} /></a><a className="text-link" href={social.linkedin} target="_blank" rel="noopener noreferrer"><LinkedinLogo size={19} />LinkedIn<ArrowUpRight size={14} /></a>{social.github && <a className="text-link" href={social.github} target="_blank" rel="noopener noreferrer"><GithubLogo size={19} />GitHub<ArrowUpRight size={14} /></a>}<button className="text-link" onClick={copyEmail}>{copyStatus === d.copied ? <Check size={17} /> : <Copy size={17} />}{copyStatus === d.copied ? d.copied : d.copy}</button><CvDownload lang={lang} d={d} /></div><p className="copy-status sr-only" role="status">{copyStatus}</p></Reveal></div></section>
    </main>
    <footer className="site-footer section-shell"><a className="brand footer-brand" href={`/${lang}`}><span className="brand-seal">WB</span><span>William Burrión</span></a><span>{d.footer}</span><span>© {new Date().getFullYear()}</span></footer>
  </MotionConfig></IconContext.Provider>;
}
