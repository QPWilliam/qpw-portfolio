'use client';

import { useEffect, useRef, type CSSProperties } from 'react';
import { DeviceMobile } from '@phosphor-icons/react';
import { Reveal } from './page-motion';
import { meteredSkills, skillGroups, skillScale } from '@/content/skills';
import type { Dictionary } from '@/content/i18n';

/** Meters render filled on the server; with JS they empty out and ink in once on screen. */
export function Skills({ d, reduced }: { d: Dictionary; reduced: boolean }) {
  const meters = useRef<HTMLUListElement>(null);
  useEffect(() => {
    const list = meters.current;
    if (!list || reduced || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rows = [...list.querySelectorAll<HTMLElement>('.skill-meter')].filter(row => row.getBoundingClientRect().top >= window.innerHeight);
    rows.forEach(row => { row.dataset.fill = 'waiting'; });
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      (entry.target as HTMLElement).dataset.fill = 'filled';
    }), { rootMargin: '0px 0px -60px 0px' });
    rows.forEach(row => observer.observe(row));
    const fill = () => rows.forEach(row => { row.dataset.fill = 'filled'; });
    list.addEventListener('focusin', fill);
    return () => { observer.disconnect(); list.removeEventListener('focusin', fill); fill(); };
  }, [reduced]);
  const yearLabel = (years: number) => `${years} ${d.yearUnit[years === 1 ? 0 : 1]}`;
  return <section className="tools-section section-shell" id="skills" aria-labelledby="tools-title">
    <div className="skills-grid">
      <Reveal reduced={reduced} className="skills-heading">
        <span className="eyebrow">{d.skillsEyebrow}</span>
        <h2 id="tools-title">{d.toolkit}</h2>
        <p>{d.skillsIntro}</p>
        <p className="skills-stat"><DeviceMobile size={22} /><span><strong>5</strong>{d.appsStat}</span></p>
        <p className="skills-legend" aria-hidden="true"><span className="skill-segment is-on"><span /></span>{d.skillsScale}</p>
      </Reveal>
      <ul className="skill-meters" ref={meters}>
        {meteredSkills.map((skill, i) => <li className="skill-meter" key={skill.name} style={{ '--row': i } as CSSProperties}>
          <span className="skill-name" id={`skill-${i}`}>{skill.name}</span>
          <span className="skill-years" aria-hidden="true"><strong>{skill.years}</strong>{d.yearUnit[skill.years === 1 ? 0 : 1]}</span>
          <span className="skill-track" role="meter" aria-labelledby={`skill-${i}`} aria-valuemin={0} aria-valuemax={skillScale} aria-valuenow={skill.years} aria-valuetext={yearLabel(skill.years)}>
            {Array.from({ length: skillScale }, (_, n) => <span key={n} className={`skill-segment ${n < skill.years ? 'is-on' : ''}`} style={{ '--seg': n } as CSSProperties}><span /></span>)}
          </span>
        </li>)}
      </ul>
    </div>
    <Reveal reduced={reduced} className="tool-groups" select=".tool-group">{skillGroups.map((group, i) => <div className="tool-group" key={d.skillGroups[i]}><span>{d.skillGroups[i]}</span><p>{group.map(tool => <span key={tool}>{tool}</span>)}</p></div>)}</Reveal>
  </section>;
}
