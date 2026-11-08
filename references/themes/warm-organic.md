# Warm Organic Theme

## Genre: Expressive

Soft radii, natural palette, hand-drawn accents. Approachable and human.

## Design Tokens

### Colors
- `--color-bg`: `#fefcf8`
- `--color-bg-alt`: `#faf8f3`
- `--color-bg-warm`: `#f5f0e8`
- `--color-fg`: `#2d2a26`
- `--color-fg-muted`: `#8a837a`
- `--color-primary`: `#a16207`
- `--color-primary-hover`: `#854d0e`
- `--color-accent`: `#c2410c`
- `--color-accent-soft`: `#fdba74`
- `--color-border`: `#e7e0d7`
- `--color-border-strong`: `#d6cfc7`
- `--color-focus`: `#a16207`
- `--color-error`: `#b91c1c`
- `--color-success`: `#15803d`
- `--color-ink`: `#1c1b18`

### Typography
- `--font-sans`: `'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
- `--font-serif`: `'DM Serif Display', Georgia, serif`
- `--font-hand`: `'Caveat', cursive`
- `--text-xs`: `0.75rem`
- `--text-sm`: `0.875rem`
- `--text-base`: `1rem`
- `--text-lg`: `1.125rem`
- `--text-xl`: `1.375rem`
- `--text-2xl`: `1.75rem`
- `--text-3xl`: `2.5rem`
- `--text-4xl`: `3.5rem`
- `--leading-tight`: `1.2`
- `--leading-normal`: `1.6`
- `--leading-relaxed`: `1.8`

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
- `--space-20`: `5rem`
- `--space-24`: `6rem`

### Radii
- `--radius-none`: `0`
- `--radius-sm`: `0.375rem`
- `--radius-md`: `0.625rem`
- `--radius-lg`: `1rem`
- `--radius-xl`: `1.5rem`
- `--radius-2xl`: `2.5rem`
- `--radius-full`: `9999px`
- `--radius-organic-1`: `1.25rem 1rem 1.5rem 0.75rem`
- `--radius-organic-2`: `1rem 1.5rem 0.75rem 1.25rem`
- `--radius-organic-3`: `1.5rem 0.75rem 1.25rem 1rem`

### Shadows
- `--shadow-sm`: `0 2px 4px 0 rgb(28 27 24 / 0.06)`
- `--shadow-md`: `0 6px 16px -2px rgb(28 27 24 / 0.08)`
- `--shadow-lg`: `0 12px 28px -4px rgb(28 27 24 / 0.1)`
- `--shadow-xl`: `0 20px 40px -8px rgb(28 27 24 / 0.12)`
- `--shadow-soft`: `0 4px 24px 0 rgb(28 27 24 / 0.06)`

### Transitions
- `--transition-fast`: `200ms cubic-bezier(0.4, 0, 0.2, 1)`
- `--transition-normal`: `300ms cubic-bezier(0.4, 0, 0.2, 1)`
- `--transition-slow`: `400ms cubic-bezier(0.4, 0, 0.2, 1)`
- `--transition-bounce`: `500ms cubic-bezier(0.34, 1.56, 0.64, 1)`

## Component Tokens

### Button
- `--btn-padding-x`: `var(--space-5)`
- `--btn-padding-y`: `var(--space-3)`
- `--btn-radius`: `var(--radius-full)`
- `--btn-font-weight`: `500`
- `--btn-gap`: `var(--space-2)`
- `--btn-shadow`: `var(--shadow-sm)`

### Input
- `--input-padding-x`: `var(--space-4)`
- `--input-padding-y`: `var(--space-3)`
- `--input-radius`: `var(--radius-lg)`
- `--input-border-width`: `2px`
- `--input-border-color`: `var(--color-border)`
- `--input-border-focus`: `var(--color-primary)`

### Card
- `--card-padding`: `var(--space-6)`
- `--card-radius`: `var(--radius-xl)`
- `--card-border`: `1px solid var(--color-border)`
- `--card-shadow`: `var(--shadow-soft)`

### Accent Line
- `--accent-line-width`: `3px`
- `--accent-line-color`: `var(--color-accent)`
- `--accent-line-radius`: `var(--radius-full)`

## Usage Notes

- Generous border radii for approachable feel
- Warm, paper-like backgrounds
- Hand-drawn accent lines for human touch
- Soft shadows for depth without harshness
- Serif display for warmth, sans for readability
- Respect `prefers-reduced-motion` for all animations (disable bounce)
- Dark mode via `prefers-color-scheme` media query (warmer dark palette)
