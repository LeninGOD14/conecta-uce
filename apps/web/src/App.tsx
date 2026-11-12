import { useEffect, useState } from 'react';
import type { ApiHealthResponse } from '@conectauce/contracts';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';

export default function App() {
  const [health, setHealth] = useState<ApiHealthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch(`${API_BASE_URL}/api/v1/health`, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error(`La API respondió ${response.status}`);
        return (await response.json()) as ApiHealthResponse;
      })
      .then(setHealth)
      .catch((cause: unknown) => {
        if (cause instanceof Error && cause.name === 'AbortError') return;
        setError(cause instanceof Error ? cause.message : 'No se pudo conectar con la API');
      });

    return () => controller.abort();
  }, []);

  return (
    <main className="page-shell">
      <nav className="topbar" aria-label="Navegación principal">
        <a className="brand" href="/" aria-label="ConectaUCE inicio">
          <span className="brand-mark">C</span>
          <span>Conecta<span className="brand-accent">UCE</span></span>
        </a>
        <span className="university-label">Comunidad universitaria UCE</span>
      </nav>

      <section className="hero">
        <p className="eyebrow">UNIVERSIDAD CENTRAL DEL ECUADOR</p>
        <h1>Tu comunidad.<br /><span>Un solo lugar.</span></h1>
        <p className="hero-copy">
          Comparte información, resuelve dudas académicas y conecta con otros estudiantes de la UCE.
        </p>
        <div className="hero-actions">
          <button className="primary-button" type="button" disabled>Prototipo en construcción</button>
          <span className="status-indicator" aria-live="polite">
            <span className={`status-dot ${health ? 'is-online' : error ? 'is-offline' : ''}`} />
            {health ? `API ${health.status}` : error ? 'API no disponible' : 'Conectando API…'}
          </span>
        </div>
        {error && <p className="error-message">{error}. Inicia el backend para comprobar la conexión.</p>}
      </section>

      <section className="feature-grid" aria-label="Módulos de ConectaUCE">
        <article className="feature-card">
          <span className="feature-number">01 / COMUNIDAD</span>
          <h2>Muro universitario</h2>
          <p>Avisos, actividades, publicaciones y grupos de estudio en un espacio compartido.</p>
        </article>
        <article className="feature-card">
          <span className="feature-number">02 / APRENDIZAJE</span>
          <h2>Foros académicos</h2>
          <p>Preguntas, respuestas y conocimiento organizado por materias y categorías.</p>
        </article>
        <article className="feature-card feature-card-muted">
          <span className="feature-number">03 / INTERCAMBIO</span>
          <h2>Clasificados</h2>
          <p>Materiales y artículos universitarios conectando directamente a estudiantes.</p>
        </article>
      </section>

      <footer className="footer">
        <span>ConectaUCE · Proyecto académico</span>
        <span>{health ? `${health.application} · v${health.version}` : 'Construyendo comunidad UCE'}</span>
      </footer>
    </main>
  );
}
