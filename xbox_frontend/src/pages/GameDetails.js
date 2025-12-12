import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Api } from '../api/client';
import '../components/layout.css';

// PUBLIC_INTERFACE
export default function GameDetails() {
  /** Game Details page shows detailed info for a specific game by id */
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    Api.getGame(id)
      .then(setGame)
      .catch((e) => setError(e.message || 'Failed to load game'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="detail-section">Loading...</div>;
  if (error) return <div className="detail-section" style={{ borderColor: '#fecaca', background: '#fff1f2' }}>
    <strong style={{ color: '#b91c1c' }}>Error:</strong> {error}
  </div>;

  if (!game) return <div className="detail-section">Game not found.</div>;

  return (
    <div>
      <div className="kicker">Game</div>
      <h1 style={{ marginTop: 0 }}>{game.title}</h1>
      <div className="detail">
        <div className="detail-section">
          <div className="detail-poster" />
          <div style={{ marginTop: 12 }}>
            <div className="card-sub">Genre: {game.genre || 'Unknown'}</div>
            <div className="card-sub">Developer: {game.developer || 'Unknown'}</div>
            <div className="card-sub">Release: {game.release_date || 'N/A'}</div>
          </div>
        </div>
        <div className="detail-section">
          <div className="card-title">About</div>
          <p style={{ marginTop: 8, lineHeight: 1.6 }}>
            {game.description || 'No description available.'}
          </p>
          <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
            <Link to="/" className="btn small" aria-label="Back to games">Back</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
