import React, { useEffect, useState } from 'react';
import { Api } from '../api/client';
import '../components/layout.css';

// PUBLIC_INTERFACE
export default function Account() {
  /** Basic account placeholder page */
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  useEffect(() => {
    Api.getProfile().then(setProfile).catch((e) => setError(e.message || 'Unable to load profile'));
  }, []);
  return (
    <div>
      <div className="kicker">Account</div>
      <h1 style={{ marginTop: 0 }}>Your Profile</h1>
      {error && <div className="detail-section" style={{ borderColor: '#fecaca', background: '#fff1f2' }}>
        <strong style={{ color: '#b91c1c' }}>Error:</strong> {error}
      </div>}
      {!error && !profile && <div className="detail-section">Loading...</div>}
      {profile && (
        <div className="detail-section">
          <div className="card-title">{profile.gamertag || 'Guest'}</div>
          <div className="card-sub">Membership: {profile.membership || 'Free'}</div>
        </div>
      )}
    </div>
  );
}
