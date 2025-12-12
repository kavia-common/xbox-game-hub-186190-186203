import React, { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Api } from '../api/client';
import '../components/layout.css';

// PUBLIC_INTERFACE
export default function Home() {
  /** Home page shows games in a responsive grid with simple search */
  const [params, setParams] = useSearchParams();
  const initialQ = params.get('q') || '';
  const [q, setQ] = useState(initialQ);
  const [loading, setLoading] = useState(false);
  const [games, setGames] = useState([]);
  const [error, setError] = useState('');

  const debouncedQ = useDebounce(q, 250);

  useEffect(() => {
    setLoading(true);
    setError('');
    Api.listGames(debouncedQ)
      .then(setGames)
      .catch((e) => setError(e.message || 'Failed to load games'))
      .finally(() => setLoading(false));
  }, [debouncedQ]);

  useEffect(() => {
    const next = new URLSearchParams(params);
    if (q) next.set('q', q);
    else next.delete('q');
    setParams(next, { replace: true });
  }, [q]);

  return (
    <div>
      <div className="kicker">Browse</div>
      <h1 style={{ marginTop: 0 }}>Games</h1>

      <div className="searchbar">
        <input
          className="input"
          placeholder="Search games..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Search games"
        />
        <button className="btn" onClick={() => setQ('')}>Clear</button>
      </div>

      {error && <div className="detail-section" style={{ borderColor: '#fecaca', background: '#fff1f2' }}>
        <strong style={{ color: '#b91c1c' }}>Error:</strong> {error}
      </div>}

      {loading && <div className="detail-section">Loading games...</div>}

      {!loading && !error && (
        <div className="grid">
          {games.map((g) => (
            <div key={g.id} className="card" style={{ gridColumn: 'span 3' }}>
              <div className="detail-poster" aria-label={`${g.title} cover`} />
              <div className="card-body">
                <div className="card-title">{g.title}</div>
                <div className="card-sub">{g.genre || 'Unknown Genre'}</div>
                <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                  <Link className="btn small" to={`/games/${g.id}`}>View</Link>
                </div>
              </div>
            </div>
          ))}
          {!games.length && <div className="detail-section" style={{ gridColumn: '1 / -1' }}>No games found.</div>}
        </div>
      )}
    </div>
  );
}

// PUBLIC_INTERFACE
export function useDebounce(value, delay) {
  /** Debounces a value change by delay ms */
  const [v, setV] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setV(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return v;
}
