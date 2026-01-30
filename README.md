# Netflix Trailer Browser

Minimal Netflix-style trailer browser built with React + Vite.

## Run locally

1. Install dependencies:
   - `npm install`
2. Set the API base URL (optional):
   - `export VITE_API_BASE_URL="http://localhost:3001"`
3. Start the dev server:
   - `npm run dev`

## API expectations

The frontend expects the backend to expose:
- `GET /api/catalog` -> array of `{ id, title, posterUrl }`
- `GET /api/catalog/:id` -> `{ id, title, posterUrl, videoUrl }`
