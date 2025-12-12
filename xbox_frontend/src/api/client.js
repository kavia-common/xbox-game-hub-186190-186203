////
/// Simple API client for Xbox Game Hub frontend
////

const DEFAULT_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';

// PUBLIC_INTERFACE
export async function apiGet(path, options = {}) {
  /** Fetches data via GET from the backend API using the configured base URL. */
  const normalizedPath = path.startsWith('/api') ? path : `/api${path.startsWith('/') ? path : `/${path}`}`;
  const url = `${DEFAULT_BASE_URL}${normalizedPath}`;
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
    throw new Error(`API GET ${normalizedPath} failed: ${resp.status} ${text}`);
  }
  return resp.json();
}

// PUBLIC_INTERFACE
export const Api = {
  /** Get list of games, optionally with simple query like ?q=. Unwraps paginated response to items array. */
  listGames: async (query = '') => {
    const data = await apiGet(`/games${query ? `?q=${encodeURIComponent(query)}` : ''}`);
    // Support both paginated and non-paginated shapes defensively
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.items)) return data.items;
    return []; // fallback to empty array to avoid UI breakage
  },
  /** Get game details by id */
  getGame: (id) => apiGet(`/games/${encodeURIComponent(id)}`),
  /** Placeholder for account profile */
  getProfile: () =>
    apiGet(`/account/profile`).catch(() => ({ gamertag: 'Guest', membership: 'Free' })),
};
