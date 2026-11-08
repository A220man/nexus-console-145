# Changelog

## 1.3.0 — work-in-progress checkpoint

Partial code published for continued development. Known issues: STATUS.md.

## 1.2.0 — work-in-progress checkpoint

### theme-system
- Theme CLI (`scripts/theme.mjs`) with deal, draw, scaffold, validate, list commands
- 6 themes across 3 genres: clean (clean-minimal), expressive (editorial-magazine, warm-organic, brutalist), technical (technical-docs, dark-mode-first)
- Theme index (`references/themes/index.json`) and individual theme files with design tokens
- Theme deal: selects 3 themes, optionally filtered by genre
- Theme draw: infers page anatomy from job description
- Theme scaffold: emits tokens.css and base.css for a theme
- Theme validate: checks theme file contract for required tokens
- Tests for theme system (`tests/test_theme.py`)

Partial code published for continued development. Known issues: STATUS.md.
## 1.1.0 — work-in-progress checkpoint

Partial code published for continued development. Known issues: STATUS.md.

## 1.0.0 — work-in-progress checkpoint

### core-skeleton
- FastAPI/React skeleton with install script
- FastAPI backend with `/health`, `/api/themes`, `/api/themes/deal` endpoints
- React frontend with theme listing and deal functionality
- Install script (`scripts/install.mjs`) validates source structure and copies skill files
- Tests for backend (`tests/test_backend.py`) and install script (`tests/test_install.py`)
- TypeScript configuration for frontend (`tsconfig.json`, `tsconfig.node.json`)
- Frontend styling (`src/App.css`, `src/index.css`)

Partial code published for continued development. Known issues: STATUS.md.