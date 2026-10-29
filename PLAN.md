# Product development plan

Each round completes one feature or repair. Future items are planned, not implemented claims.

## Current round

core-skeleton

## Roadmap

### core-skeleton — FastAPI/React skeleton with install script

Status: in_progress

Acceptance:
- FastAPI backend runs and serves API
- React frontend builds and loads
- Install script validates and copies skill structure
- Basic lint/check passes

Implementation: `backend/main.py`, `frontend/src/App.tsx`, `scripts/install.mjs`, `package.json`

Tests: `tests/test_backend.py`, `tests/test_install.py`

### theme-system — Theme system with 3 themes and deal/draw/scaffold

Status: planned

Acceptance:
- Theme deal selects 3 themes by genre
- Theme draw deals page anatomy from job
- Theme scaffold emits tokens.css and base.css
- Theme validate checks theme file contract

Implementation: `scripts/theme.mjs`, `references/themes/index.json`, `references/themes/*.md`

Tests: `tests/test_theme.py`

### sloplint — Sloplint static and render checks

Status: planned

Acceptance:
- Static checks run against Floor rules
- Render checks via Puppeteer
- Reports FAIL/REFLEX/FINISH with line numbers

Implementation: `scripts/sloplint.mjs`, `scripts/sloplint-render.mjs`

Tests: `tests/test_sloplint.py`

### capture-photos — Capture screenshots and photo library

Status: planned

Acceptance:
- Capture.mjs takes screenshots of URL/dev server
- Photo library provides stand-in images by subject
- Photos credited on page

Implementation: `scripts/capture.mjs`, `scripts/photos.json`, `scripts/picture.mjs`

Tests: `tests/test_capture.py`

### redesign-audit — Redesign and audit commands

Status: planned

Acceptance:
- Redesign keeps content/wiring, changes system
- Audit reports violations without changes
- Sloplint --before/--kept validates redesign

Implementation: `scripts/refcheck.mjs`, `references/redesign.md`

Tests: `tests/test_redesign.py`

