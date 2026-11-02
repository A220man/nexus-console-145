# nexus-console-145 — Ryan Vo

> Work in progress. This checkpoint may be incomplete or fail tests. See PLAN.md and STATUS.md before use.

## Quick Start

```bash
# Install dependencies
npm install

# Run development servers (backend on :8000, frontend on :5173)
npm run dev

# Build frontend
npm run build

# Run tests
npm run test

# Install skill to target directory
npm run install:skill [target-dir]
```

## API Endpoints

- `GET /health` — Health check
- `GET /api/themes` — List all themes
- `POST /api/themes/deal` — Deal 3 themes (optional `?genre=` filter)

## Project Structure

```
backend/           # FastAPI backend
  main.py          # API endpoints
frontend/          # React + Vite frontend
  src/             # React components
scripts/           # Build and utility scripts
  install.mjs      # Skill installer
tests/             # Python tests
```

Maintainer: Ryan Vo <ryandtvo@gmail.com>