import Link from 'next/link';
export default function NotFound() {
  return <main className="not-found"><span className="brand-seal">WB</span><h1>404</h1><p>Esta página no existe.</p><Link className="button button-accent" href="/es">Volver al portafolio</Link></main>;
}
