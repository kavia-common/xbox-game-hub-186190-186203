//
// Simple API client for Xbox Game Hub frontend
//

const DEFAULT_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';

// PUBLIC_INTERFACE
export async function apiGet(path, options = {}) {
  /** Fetches data via GET from the backend API using the configured base URL. */
  const url = `${DEFAULT_BASE_URL}${path}`;
  const resp = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      ...(options.headers || {})
    },
    ...options
  });
  if (!resp.ok) {
    const text = await resp.text().catch(() => '');
    throw new Error(`API GET ${path} failed: ${resp.status} ${text}`);
  }
  return resp.json();
}

// PUBLIC_INTERFACE
export const Api = {
  /** Get list of games, optionally with simple query like ?q= */
  listGames: (query = '') => apiGet(`/games${query ? `?q=${encodeURIComponent(query)}` : ''}`),
  /** Get game details by id */
  getGame: (id) => apiGet(`/games/${encodeURIComponent(id)}`),
  /** Placeholder for account profile */
  getProfile: () => apiGet(`/account/profile`).catch(() => ({ gamertag: 'Guest', membership: 'Free' })),
};
