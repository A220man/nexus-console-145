
# Technical Docs Theme

## Genre: Technical

Monospace-forward, dense information architecture, syntax-aware. Built for documentation and specs.

## Design Tokens

### Colors
- `--color-bg`: `#0d1117`
- `--color-bg-alt`: `#161b22`
- `--color-bg-tertiary`: `#21262d`
- `--color-fg`: `#e6edf3`
- `--color-fg-muted`: `#8b949e`
- `--color-primary`: `#58a6ff`
- `--color-primary-hover`: `#79b8ff`
- `--color-accent`: `#d2a8ff`
- `--color-border`: `#30363d`
- `--color-border-strong`: `#484f58`
- `--color-focus`: `#58a6ff`
- `--color-error`: `#f85149`
- `--color-success`: `#3fb950`
- `--color-warning`: `#d29922`
- `--color-code-bg`: `#161b22`
- `--color-code-border`: `#30363d`

### Typography
- `--font-mono`: `'JetBrains Mono', 'Fira Code', ui-monospace, SFMono-Regular, monospace`
- `--font-sans`: `'IBM Plex Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
- `--text-xs`: `0.6875rem`
- `--text-sm`: `0.8125rem`
- `--text-base`: `0.9375rem`
- `--text-lg`: `1.0625rem`
- `--text-xl`: `1.25rem`
- `--text-2xl`: `1.5rem`
- `--text-3xl`: `2rem`
- `--text-4xl`: `2.5rem`
- `--leading-tight`: `1.25`
- `--leading-normal`: `1.6`
- `--leading-relaxed`: `1.75`
- `--leading-code`: `1.7`

### Spacing
- `--space-1`: `0.25rem`
- `--space-2`: `0.5rem`
- `--space-3`: `0.75rem`
- `--space-4`: `1rem`
- `--space-5`: `1.25rem`
- `--space-6`: `1.5rem`
- `--space-8`: `2rem`
- `--space-10`: `2.5rem`
- `--space-12`: `3rem`
- `--space-16`: `4rem`

### Radii
- `--radius-none`: `0`
- `--radius-sm`: `0.125rem`
- `--radius-md`: `0.25rem`
- `--radius-lg`: `0.375rem`
- `--radius-xl`: `0.5rem`
- `--radius-2xl`: `0.75rem`
- `--radius-full`: `9999px`

### Shadows
- `--shadow-sm`: `0 1px 2px 0 rgb(0 0 0 / 0.3)`
- `--shadow-md`: `0 4px 8px -2px rgb(0 0 0 / 0.4)`
- `--shadow-lg`: `0 8px 16px -4px rgb(0 0 0 / 0.5)`
- `--shadow-xl`: `0 16px 32px -8px rgb(0 0 0 / 0.6)`
- `--shadow-inset`: `inset 0 2px 4px 0 rgb(0 0 0 / 0.3)`

### Transitions
- `--transition-fast`: `100ms ease`
- `--transition-normal`: `150ms ease`
- `--transition-slow`: `200ms ease`

## Component Tokens

### Button
- `--btn-padding-x`: `var(--space-4)`
- `--btn-padding-y`: `var(--space-2)`
- `--btn-radius`: `var(--radius-md)`
- `--btn-font-weight`: `500`
- `--btn-font-family`: `var(--font-sans)`
- `--btn-gap`: `var(--space-2)`

### Input
- `--input-padding-x`: `var(--space-3)`
- `--input-padding-y`: `var(--space-2)`
- `--input-radius`: `var(--radius-md)`
- `--input-font-family`: `var(--font-mono)`
- `--input-font-size`: `var(--text-sm)`

### Card
- `--card-padding`: `var(--space-5)`
- `--card-radius`: `var(--radius-lg)`
- `--card-border`: `1px solid var(--color-border)`
- `--card-bg`: `var(--color-bg-alt)`

### Code Block
- `--code-padding`: `var(--space-4)`
- `--code-radius`: `var(--radius-md)`
- `--code-font-size`: `var(--text-sm)`
- `--code-line-height`: `var(--leading-code)`

### Table
- `--table-cell-padding`: `var(--space-3) var(--space-4)`
- `--table-border-color`: `var(--color-border)`
- `--table-header-bg`: `var(--color-bg-tertiary)`

## Usage Notes

- Monospace as primary typeface for code-centric UI
- Dark background as default (docs are read in dark)
- Syntax highlighting built into token system
- Dense information hierarchy with clear visual separation
- Keyboard-first interaction patterns
- Respect `prefers-reduced-motion` for all animations
- Light mode via `prefers-color-scheme: light` media query
