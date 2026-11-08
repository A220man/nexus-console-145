
# Editorial Magazine Theme

## Genre: Expressive

Asymmetric layouts, dramatic type scale, editorial rhythm. Storytelling through visual hierarchy.

## Design Tokens

### Colors
- `--color-bg`: `#faf8f5`
- `--color-bg-alt`: `#f0ebe3`
- `--color-fg`: `#1c1b18`
- `--color-fg-muted`: `#78716c`
- `--color-primary`: `#7c2d12`
- `--color-primary-hover`: `#9a3412`
- `--color-accent`: `#b45309`
- `--color-border`: `#d6d3d1`
- `--color-border-strong`: `#a8a29e`
- `--color-focus`: `#7c2d12`
- `--color-error`: `#b91c1c`
- `--color-success`: `#15803d`

### Typography
- `--font-serif`: `'Playfair Display', Georgia, 'Times New Roman', serif`
- `--font-sans`: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
- `--font-mono`: `ui-monospace, SFMono-Regular, 'SF Mono', Menlo, monospace`
- `--text-xs`: `0.75rem`
- `--text-sm`: `0.875rem`
- `--text-base`: `1.0625rem`
- `--text-lg`: `1.25rem`
- `--text-xl`: `1.5rem`
- `--text-2xl`: `2rem`
- `--text-3xl`: `3rem`
- `--text-4xl`: `4.5rem`
- `--text-5xl`: `6rem`
- `--leading-tight`: `1.05`
- `--leading-normal`: `1.4`
- `--leading-relaxed`: `1.7`

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
- `--space-32`: `8rem`

### Radii
- `--radius-none`: `0`
- `--radius-sm`: `0.125rem`
- `--radius-md`: `0.25rem`
- `--radius-lg`: `0.5rem`
- `--radius-xl`: `1rem`
- `--radius-2xl`: `2rem`
- `--radius-full`: `9999px`

### Shadows
- `--shadow-sm`: `0 1px 3px 0 rgb(28 27 24 / 0.08)`
- `--shadow-md`: `0 4px 12px -2px rgb(28 27 24 / 0.12)`
- `--shadow-lg`: `0 12px 24px -4px rgb(28 27 24 / 0.15)`
- `--shadow-xl`: `0 24px 48px -8px rgb(28 27 24 / 0.18)`
- `--shadow-editorial`: `0 0 0 1px rgb(28 27 24 / 0.08), 0 4px 12px -2px rgb(28 27 24 / 0.12)`

### Transitions
- `--transition-fast`: `200ms cubic-bezier(0.25, 0.1, 0.25, 1)`
- `--transition-normal`: `300ms cubic-bezier(0.25, 0.1, 0.25, 1)`
- `--transition-slow`: `500ms cubic-bezier(0.25, 0.1, 0.25, 1)`
- `--transition-editorial`: `600ms cubic-bezier(0.16, 1, 0.3, 1)`

## Component Tokens

### Button
- `--btn-padding-x`: `var(--space-6)`
- `--btn-padding-y`: `var(--space-3)`
- `--btn-radius`: `var(--radius-none)`
- `--btn-font-weight`: `400`
- `--btn-letter-spacing`: `0.05em`
- `--btn-gap`: `var(--space-3)`

### Input
- `--input-padding-x`: `var(--space-4)`
- `--input-padding-y`: `var(--space-3)`
- `--input-radius`: `var(--radius-none)`
- `--input-border-width`: `1px`
- `--input-border-color`: `var(--color-border)`
- `--input-border-focus`: `var(--color-primary)`

### Card
- `--card-padding`: `var(--space-8)`
- `--card-radius`: `var(--radius-none)`
- `--card-border`: `1px solid var(--color-border)`

### Heading
- `--heading-font`: `var(--font-serif)`
- `--heading-weight`: `400`
- `--heading-letter-spacing`: `-0.02em`
- `--heading-line-height`: `var(--leading-tight)`

## Usage Notes

- Use dramatic type scale for editorial hierarchy
- Asymmetric grid layouts encouraged
- Generous whitespace as active design element
- Serif for headlines, sans for body
- Respect `prefers-reduced-motion` for all animations
- Dark mode via `prefers-color-scheme` media query
