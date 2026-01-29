# Netflix Demo Backend

Minimal Node.js + Express backend for the Netflix demo.

## Setup

```bash
npm install
```

## Run

```bash
npm run start
```

## Dev

```bash
npm run dev
```

## Endpoints

- `GET /api/health` -> `200 OK`
- `GET /api/catalog` -> JSON array of 12 trailers

## cURL

```bash
curl -i http://localhost:3000/api/health
curl -i http://localhost:3000/api/catalog
```
