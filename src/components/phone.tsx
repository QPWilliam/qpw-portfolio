'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowCounterClockwise, ArrowLeft, BatteryFull, Buildings, CaretRight, CellSignalFull, House, Package, Robot, WifiHigh } from '@phosphor-icons/react';
import { demoProjects, projects, type PhoneScreen } from '@/content/projects';
import type { Dictionary, Locale } from '@/content/i18n';
import { BotDemo, ErpDemo, ResidenceDemo } from './demo-apps';
import { ProjectCase, ProjectMark } from './project-case';

const projectIcons = { residence: Buildings, bots: Robot, erp: Package };
type ScreenMotion = { direction: number; instant: boolean };
export function Phone({ d, lang, screen, setScreen, reduced, wide = false, instance }: {
  d: Dictionary; lang: Locale; screen: PhoneScreen | null; setScreen: (value: PhoneScreen | null) => void; reduced: boolean; wide?: boolean; instance: string;
}) {
  const [generation, setGeneration] = useState(0);
  const [direction, setDirection] = useState(1);
  const [instant, setInstant] = useState(false);
  const viewport = useRef<HTMLDivElement>(null);
  useEffect(() => { viewport.current?.scrollTo({ top: 0, behavior: 'instant' }); }, [screen, generation]);
  const changeScreen = (id: PhoneScreen | null, keyboard = false) => { setDirection(id ? 1 : -1); setInstant(keyboard); setScreen(id); if (viewport.current) { viewport.current.scrollTop = 0; viewport.current.focus({ preventScroll: true }); } };
  const noMotion = reduced || instant;
  const transition = { duration: noMotion ? 0 : .22, ease: [.23, 1, .32, 1] as const };
  const screens = {
    enter: ({ direction: sign, instant: stop }: ScreenMotion) => ({ opacity: stop ? 1 : 0, transform: stop ? 'none' : `translateX(${sign * 22}px) scale(.985)` }),
    visible: { opacity: 1, transform: 'translateX(0px) scale(1)' },
    exit: ({ direction: sign, instant: stop }: ScreenMotion) => ({ opacity: 0, transform: stop ? 'none' : `translateX(${sign * -14}px) scale(.99)`, transition: { ...transition, duration: stop ? 0 : .12 } }),
  };
  const realProject = projects.find(project => project.id === screen);
  const item = realProject ?? demoProjects.find(project => project.id === screen);
  return <div className={`device ${wide ? 'device-wide' : ''}`} data-testid={`${instance}-phone`}>
    <span className="device-side side-left" /><span className="device-side side-right" />
    <div className="device-screen">
      <div className="device-status" aria-hidden="true"><span>9:41</span><span className="device-island" /><span className="device-indicators"><CellSignalFull weight="fill" /><WifiHigh weight="bold" /><BatteryFull weight="fill" /></span></div>
      <div className="device-toolbar">
        {screen ? <button onClick={event => changeScreen(null, event.detail === 0)} aria-label={d.home}><ArrowLeft size={19} /></button> : <span className="device-wordmark">Tinta y píxel<span /></span>}
        {screen && <span className="device-app-name">{item?.content[lang].short}</span>}
        <span className="demo-stamp">{screen && !realProject ? d.demo : d.projectSheet}</span>
      </div>
      <div ref={viewport} className="device-viewport" tabIndex={0} aria-label={d.preview}>
        <AnimatePresence mode="wait" initial={false} custom={{ direction, instant: noMotion }}>
          <motion.div key={`${screen ?? 'home'}-${generation}`} className="device-page" custom={{ direction, instant: noMotion }} variants={screens} initial="enter" animate="visible" exit="exit" transition={transition}>
            {!screen ? <div className="launcher">
              <div className="launcher-art"><Image src="/art/pixel-alley.webp" alt="" width={1536} height={1024} sizes="(max-width: 600px) 290px, 320px" preload={instance === 'hero'} /><span className="launcher-art-caption" aria-hidden="true">小さな世界</span></div>
              <div className="launcher-content"><p className="launcher-title">{d.phoneHome}</p><p className="launcher-sub">{d.phoneSub}</p>
                <div className="launcher-apps launcher-catalog">{projects.map(p => <button key={p.id} onClick={event => changeScreen(p.id, event.detail === 0)} aria-label={`${d.openProject}: ${p.name}`}><span className={`launcher-icon case-${p.tone}`}><ProjectMark project={p} size={25} /></span><span>{p.name}<small>{p.group === 'alisa' ? 'Alisa' : d.personal}</small></span><CaretRight size={15} /></button>)}</div>
                <p className="launcher-section-title">{d.playground}</p><p className="launcher-sub">{d.playgroundNote}</p>
                <div className="launcher-apps">{demoProjects.map(p => { const Icon = projectIcons[p.id]; return <button key={p.id} onClick={event => changeScreen(p.id, event.detail === 0)} aria-label={`${d.tryDemo}: ${p.content[lang].short}`}><span className="launcher-icon"><Icon size={21} /></span><span>{p.content[lang].short}</span><CaretRight size={15} /></button>; })}</div>
                <p className="launcher-note"><span />{d.homeNote}</p>
              </div>
            </div> : realProject ? <ProjectCase project={realProject} lang={lang} d={d} /> : screen === 'residence' ? <ResidenceDemo d={d} lang={lang} /> : screen === 'bots' ? <BotDemo d={d} /> : <ErpDemo d={d} />}
          </motion.div>
        </AnimatePresence>
      </div>
      {screen && <div className="device-bottom-tools"><button onClick={event => changeScreen(null, event.detail === 0)}><House size={15} /><span>{d.back}</span></button>{!realProject && <button onClick={event => { setInstant(event.detail === 0); setGeneration(g => g + 1); }} aria-label={d.reset}><ArrowCounterClockwise size={16} /></button>}</div>}
      <div className="device-bottom"><span /></div>
    </div>
  </div>;
}
