'use client';

import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import { ArrowLeft, ArrowRight, Buildings, CalendarBlank, CheckCircle, Package, PaperPlaneTilt, Plus, Robot, X } from '@phosphor-icons/react';
import type { Dictionary, Locale } from '@/content/i18n';

export function ResidenceDemo({ d, lang }: { d: Dictionary; lang: Locale }) {
  const t = d.residency;
  const [view, setView] = useState<'home' | 'form' | 'success'>('home');
  const [space, setSpace] = useState(0);
  const [date, setDate] = useState('');
  const [slot, setSlot] = useState('09:00');
  const [booking, setBooking] = useState<{ space: number; date: string; slot: string } | null>(null);
  const [message, setMessage] = useState('');
  const today = () => new Date().toLocaleDateString('en-CA');
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!date || date < today()) { setMessage(t.validDate); return; }
    setBooking({ space, date, slot }); setMessage(''); setView('success');
  };
  const dateLabel = (value: string) => new Intl.DateTimeFormat(lang, { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(`${value}T12:00:00`));
  return <div className="mini-app residence-app">
    <div className="mini-brand"><Buildings size={20} /><span>{t.title}</span></div>
    {view === 'home' ? <>
      <div className="mini-welcome"><span className="mini-kicker">{t.title}</span><p className="mini-title">{t.welcome}</p><p>{t.subtitle}</p><Buildings size={62} weight="thin" /></div>
      <button className="mini-primary" onClick={() => { setMessage(''); setView('form'); }}>{t.reserve}<Plus /></button>
      <p className="mini-section-title">{t.bookings}</p>
      {booking ? <div className="booking-card"><CalendarBlank size={25} /><div><strong>{t.spaces[booking.space]}</strong><p>{dateLabel(booking.date)} / {booking.slot}</p></div><button className="mini-icon" aria-label={t.cancel} onClick={() => { setBooking(null); setMessage(t.cancelled); }}><X /></button></div> : <p className="mini-empty">{t.noBookings}</p>}
      <p className="mini-section-title">{t.announcements}</p><div className="mini-notice"><strong>{t.announcementTitle}</strong><p>{t.announcement}</p></div>
    </> : view === 'form' ? <>
      <button className="mini-back" onClick={() => setView('home')}><ArrowLeft />{d.back}</button><p className="mini-title">{t.reserve}</p>
      <form onSubmit={submit} className="mini-form">
        <label>{t.space}<select value={space} onChange={e => setSpace(Number(e.target.value))}>{t.spaces.map((s, i) => <option key={s} value={i}>{s}</option>)}</select></label>
        <label>{t.date}<input type="date" value={date} min={today()} required onChange={e => setDate(e.target.value)} /></label>
        <fieldset><legend>{t.time}</legend><div className="time-options">{t.slots.map(s => <button key={s} type="button" aria-pressed={slot === s} onClick={() => setSlot(s)}>{s}</button>)}</div></fieldset>
        <button className="mini-primary" type="submit">{t.confirm}<ArrowRight /></button>
      </form>
    </> : <div className="mini-success"><CheckCircle size={56} weight="light" /><p className="mini-title">{t.confirmed}</p><p>{t.confirmation}</p><div className="mini-notice"><strong>{t.spaces[booking!.space]}</strong><p>{dateLabel(booking!.date)} / {booking!.slot}</p></div><button className="mini-primary" onClick={() => setView('home')}>{t.bookings}<ArrowRight /></button></div>}
    <p role="status" className="mini-status">{message}</p>
  </div>;
}

type Message = { role: 'user' | 'bot'; text: string };
export function BotDemo({ d }: { d: Dictionary }) {
  const t = d.bot;
  const inputId = useId();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const history = useRef<HTMLDivElement>(null);
  useEffect(() => { if (history.current) history.current.scrollTop = history.current.scrollHeight; }, [messages]);
  const send = (text: string, index?: number) => {
    if (!text.trim()) return;
    const value = text.toLowerCase();
    const match = index ?? (/pedido|order|注文/.test(value) ? 0 : /horario|hour|時間/.test(value) ? 1 : /soporte|support|サポート/.test(value) ? 2 : -1);
    setMessages(previous => [...previous, { role: 'user', text: text.trim() }, { role: 'bot', text: t.replies[match] ?? t.fallback }]);
    setInput('');
  };
  return <div className="mini-app bot-app">
    <div className="bot-header"><span className="bot-avatar"><Robot size={26} /></span><div><strong>{t.title}</strong><p>{t.subtitle}</p></div></div>
    <div className="chat-history" ref={history} role="log" aria-live="polite" aria-label={t.title}>
      <div className="chat-bubble bot-bubble">{t.greeting}</div>
      {messages.map((m, i) => <div key={i} className={`chat-bubble ${m.role}-bubble`}>{m.text}</div>)}
    </div>
    <div className="chat-options">{t.options.map((option, i) => <button key={option} onClick={() => send(option, i)}>{option}<ArrowRight size={13} /></button>)}</div>
    <form className="chat-form" onSubmit={e => { e.preventDefault(); send(input); }}><label className="sr-only" htmlFor={inputId}>{t.input}</label><input id={inputId} value={input} maxLength={300} placeholder={t.input} onChange={e => setInput(e.target.value)} autoComplete="off" /><button type="submit" disabled={!input.trim()} aria-label={t.send}><PaperPlaneTilt size={20} /></button></form>
    <p className="mini-footnote">{t.note}</p>
  </div>;
}

type Order = { id: string; product: number; count: number; state: 'pending' | 'preparing' | 'ready' };
const sampleOrders: Order[] = [
  { id: '1042', product: 0, count: 2, state: 'pending' },
  { id: '1043', product: 1, count: 3, state: 'preparing' },
  { id: '1044', product: 2, count: 1, state: 'ready' },
];
export function ErpDemo({ d }: { d: Dictionary }) {
  const t = d.erp;
  const [orders, setOrders] = useState(sampleOrders);
  const [filter, setFilter] = useState('all');
  const [active, setActive] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const order = orders.find(o => o.id === active);
  const advance = () => { setOrders(list => list.map(o => o.id === active ? { ...o, state: o.state === 'pending' ? 'preparing' : 'ready' } : o)); setMessage(t.updated); };
  return <div className="mini-app erp-app">
    <div className="mini-brand"><Package size={20} /><span>{t.title}</span></div>
    {order ? <>
      <button className="mini-back" onClick={() => { setActive(null); setMessage(''); }}><ArrowLeft />{d.back}</button>
      <p className="mini-title">{t.order} #{order.id}</p><span className={`order-state ${order.state}`}>{t[order.state]}</span>
      <div className="order-summary"><span>{t.customer}</span><strong>{t.pickup}</strong><p>{t.products[order.product]}</p><p>{order.count} {t.items}</p></div>
      {order.state !== 'ready' ? <button className="mini-primary" onClick={advance}>{order.state === 'pending' ? t.start : t.finish}<ArrowRight /></button> : <div className="order-ready"><CheckCircle size={26} />{t.done}</div>}
    </> : <>
      <p className="mini-title">{t.subtitle}</p>
      <label className="mini-filter">{t.filter}<select value={filter} onChange={e => setFilter(e.target.value)}>{(['all', 'pending', 'preparing', 'ready'] as const).map(s => <option key={s} value={s}>{t[s]}</option>)}</select></label>
      <div className="orders-list">{orders.filter(o => filter === 'all' || o.state === filter).map(o => <button className="order-card" key={o.id} onClick={() => setActive(o.id)}><span className="order-card-top"><strong>#{o.id}</strong><span className={`order-state ${o.state}`}>{t[o.state]}</span></span><span>{t.products[o.product]}</span><span className="order-card-bottom">{o.count} {t.items}<ArrowRight /></span></button>)}</div>
      {!orders.some(o => filter === 'all' || o.state === filter) && <p className="mini-empty">{t.empty}</p>}
    </>}
    <p className="mini-status" role="status">{message}</p>
  </div>;
}
