# Xbox Game Hub Frontend

A lightweight React frontend implementing a dashboard layout with sidebar, header, and pages for browsing games and viewing details.

## Routes
- `/` Home: Grid listing of games with search
- `/games/:id` Game Details: Detailed info for a game
- `/account` Account: Basic placeholder for user info

## Backend API
The frontend connects to a FastAPI backend. The base URL is:
- `REACT_APP_BACKEND_URL` (optional). Defaults to `http://localhost:3001`.

See `.env.example` for an example of configuring the environment variable.

## Development

- `npm start` — start the development server at http://localhost:3000
- `npm test` — run tests
- `npm run build` — create production build

No changes were made to the start/test processes.

## Styling
- Light theme using primary #3b82f6 and success #06b6d4 accents
- Layout and component styles in `src/components/layout.css`
- Theme variables in `src/App.css`
