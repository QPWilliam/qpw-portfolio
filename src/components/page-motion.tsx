'use client';

import { useEffect, useRef, type ReactNode, type RefObject } from 'react';

const easeOut = 'cubic-bezier(.23, 1, .32, 1)';

/** Progressive enhancement: server-rendered content remains readable without JS. */
export function Reveal({ children, className = '', reduced, delay = 0, as = 'div', select = ':scope > :not([aria-hidden="true"]):not(.sr-only)', image = false }: {
  children: ReactNode;
  className?: string;
  reduced: boolean;
  delay?: number;
  as?: 'div' | 'article';
  select?: string;
  image?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useRef(new WeakSet<Element>());
  const finish = useRef(() => {});

  useEffect(() => {
    const root = ref.current;
    if (!root || !('IntersectionObserver' in window)) return;
    const items = [...root.querySelectorAll<HTMLElement>(select)].filter(item => !item.hidden && item.getAttribute('role') !== 'status');
    const animations = new Map<HTMLElement, Animation>();
    const clear = (item: HTMLElement) => {
      animations.get(item)?.cancel();
      animations.delete(item);
      item.style.removeProperty('opacity');
      item.dataset.revealState = 'visible';
    };
    const show = (item: HTMLElement) => { seen.current.add(item); clear(item); };
    if (reduced || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      items.forEach(show);
      return;
    }
    const observer = new IntersectionObserver(entries => {
      const entering = entries.filter(entry => entry.isIntersecting);
      entering.forEach((entry, index) => {
        const item = entry.target as HTMLElement;
        observer.unobserve(item);
        if (seen.current.has(item)) return;
        seen.current.add(item);
        item.dataset.revealState = 'entering';
        const heading = /^H[1-3]$/.test(item.tagName);
        const keyframes: Keyframe[] = image ? [
          { opacity: .25, clipPath: 'inset(0 0 95% 0)' },
          { opacity: 1, clipPath: 'inset(0 0 0% 0)' },
        ] : [
          { opacity: 0, transform: `translateY(${heading ? 32 : 20}px)`, ...(heading ? { clipPath: 'inset(0 0 85% 0)' } : {}) },
          { opacity: 1, transform: 'translateY(0px)', ...(heading ? { clipPath: 'inset(-8% -2% -8% -2%)' } : {}) },
        ];
        const animation = item.animate(keyframes, {
          duration: image ? 1000 : heading ? 780 : 620,
          delay: delay * 1000 + Math.min(index, 4) * 60,
          easing: easeOut,
          fill: 'both',
        });
        animations.set(item, animation);
        animation.onfinish = () => clear(item);
      });
    }, { rootMargin: '0px 0px -40px 0px', threshold: 0 });

    items.forEach(item => {
      if (seen.current.has(item)) return;
      item.dataset.revealState = 'waiting';
      // Never hide content already on screen while hydration catches up.
      if (item.getBoundingClientRect().top >= window.innerHeight) item.style.opacity = '0';
      observer.observe(item);
    });
    // Tabbing into an offscreen section must reveal its controls immediately.
    finish.current = () => { items.forEach(show); observer.disconnect(); };
    return () => { observer.disconnect(); items.forEach(clear); finish.current = () => {}; };
  }, [reduced, delay, select, image]);

  const props = { ref, className: `reveal-group ${className}`, onFocusCapture: () => finish.current() };
  return as === 'article' ? <article {...props}>{children}</article> : <div {...props}>{children}</div>;
}

/** Pause decorative loops outside the viewport and in background tabs. */
export function useAmbientMotion(ref: RefObject<HTMLElement | null>, reduced: boolean) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let visible = false;
    const sync = () => { element.dataset.ambient = visible && !document.hidden && !reduced ? 'running' : 'paused'; };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    observer.observe(element);
    document.addEventListener('visibilitychange', sync);
    sync();
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', sync); element.dataset.ambient = 'paused'; };
  }, [ref, reduced]);
}
