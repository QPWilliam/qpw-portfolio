'use client';

import { useId, useState } from 'react';
import Image from 'next/image';
import { ArrowDown, ArrowUpRight, ChatCircleDots, Code, Plus } from '@phosphor-icons/react';
import type { Project } from '@/content/project-catalog';
import type { Dictionary, Locale } from '@/content/i18n';

export function ProjectMark({ project, size = 36 }: { project: Project; size?: number }) {
  if (project.logo) return <Image src={project.logo} alt="" width={size} height={size} className="project-logo" />;
  return project.id === 'chatmenu' ? <ChatCircleDots size={size} /> : <Code size={size} />;
}

export function ProjectCase({ project, lang, d }: { project: Project; lang: Locale; d: Dictionary }) {
  const [expanded, setExpanded] = useState<number | null>(0);
  const [view, setView] = useState<'features' | 'architecture'>('features');
  const id = useId();
  const content = project.content[lang];
  return <article className={`project-case case-${project.tone}`} aria-label={project.name}>
    <div className="case-cover">
      <div className="case-cover-top"><span>{project.group === 'alisa' ? 'ALISA' : d.personal}</span><span aria-hidden="true">↗</span></div>
      <span className="case-brand"><ProjectMark project={project} size={88} /></span>
      <h2>{project.name}</h2>
      <p>{content.category}</p>
    </div>
    <div className="case-body">
      <span className="case-status"><span aria-hidden="true" />{content.status}</span>
      <h3>{content.title}</h3>
      <p className="case-summary">{content.summary}</p>
      <div className="case-views" role="group" aria-label={d.caseView}>
        <button aria-pressed={view === 'features'} onClick={() => setView('features')}>{d.features}</button>
        <button aria-pressed={view === 'architecture'} onClick={() => setView('architecture')}>{d.architecture}</button>
      </div>
      {view === 'features' ? <div className="case-features">{content.features.map((feature, index) => <div className="case-feature" key={feature.title}>
        <button aria-expanded={expanded === index} aria-controls={`${id}-${index}`} onClick={() => setExpanded(value => value === index ? null : index)}><span className="case-feature-number">0{index + 1}</span><span>{feature.title}</span><Plus size={14} /></button>
        <p id={`${id}-${index}`} hidden={expanded !== index}>{feature.body}</p>
      </div>)}</div> : <div className="case-architecture"><Code size={22} /><p>{content.architecture}</p><div className="tech-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div>}
      <p className="case-footnote"><ArrowDown size={13} />{d.caseNote}</p>
      {project.id === 'portfolio' && <a href="#main" className="text-link">{d.returnTop}<ArrowUpRight size={14} /></a>}
    </div>
  </article>;
}
