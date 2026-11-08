# Dark Mode First Theme

## Genre: Technical

Deep surfaces, vibrant accents, reduced glare. Optimized for low-light environments.

## Design Tokens

### Colors
- `--color-bg`: `#0a0f14`
- `--color-bg-alt`: `#111827`
- `--color-bg-elevated`: `#1a2332`
- `--color-bg-tertiary`: `#222d3e`
- `--color-fg`: `#f1f5f9`
- `--color-fg-muted`: `#94a3b8`
- `--color-primary`: `#06b6d4`
- `--color-primary-hover`: `#0891b2`
- `--color-accent`: `#a855f7`
- `--color-border`: `#1e293b`
- `--color-border-strong`: `#334155`
- `--color-focus`: `#06b6d4`
- `--color-error`: `#f87171`
- `--color-success`: `#4ade80`
- `--color-warning`: `#fbbf24`
- `--color-glow-primary`: `rgba(6, 182, 212, 0.3)`
- `--color-glow-accent`: `rgba(168, 85, 247, 0.3)`

### Typography
- `--font-sans`: `'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
- `--font-mono`: `'Space Mono', ui-monospace, SFMono-Regular, 'SF Mono', monospace`
- `--text-xs`: `0.75rem`
- `--text-sm`: `0.875rem`
- `--text-base`: `1rem`
- `--text-lg`: `1.125rem`
- `--text-xl`: `1.25rem`
- `--text-2xl`: `1.5rem`
- `--text-3xl`: `2rem`
- `--text-4xl`: `3rem`
- `--leading-tight`: `1.2`
- `--leading-normal`: `1.5`
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

### Radii
- `--radius-none`: `0`
- `--radius-sm`: `0.25rem`
- `--radius-md`: `0.375rem`
- `--radius-lg`: `0.5rem`
- `--radius-xl`: `0.75rem`
- `--radius-2xl`: `1rem`
- `--radius-full`: `9999px`

### Shadows
- `--shadow-sm`: `0 1px 2px 0 rgb(0 0 0 / 0.3)`
- `--shadow-md`: `0 4px 8px -2px rgb(0 0 0 / 0.4)`
- `--shadow-lg`: `0 8px 16px -4px rgb(0 0 0 / 0.5)`
- `--shadow-xl`: `0 16px 32px -8px rgb(0 0 0 / 0.6)`
- `--shadow-glow`: `0 0 24px var(--color-glow-primary)`
- `--shadow-glow-accent`: `0 0 24px var(--color-glow-accent)`

### Transitions
- `--transition-fast`: `100ms ease`
- `--transition-normal`: `200ms ease`
- `--transition-slow`: `300ms ease`

## Component Tokens

### Button
- `--btn-padding-x`: `var(--space-4)`
- `--btn-padding-y`: `var(--space-2)`
- `--btn-radius`: `var(--radius-md)`
- `--btn-font-weight`: `500`
- `--btn-gap`: `var(--space-2)`

### Input
- `--input-padding-x`: `var(--space-3)`
- `--input-padding-y`: `var(--space-2)`
- `--input-radius`: `var(--radius-md)`
- `--input-bg`: `var(--color-bg-alt)`
- `--input-border-color`: `var(--color-border)`
- `--input-border-focus`: `var(--color-primary)`

### Card
- `--card-padding`: `var(--space-5)`
- `--card-radius`: `var(--radius-lg)`
- `--card-border`: `1px solid var(--color-border)`
- `--card-bg`: `var(--color-bg-elevated)`

## Usage Notes

- Dark background as default, light mode optional
- Vibrant cyan/teal primary for visibility on dark
- Subtle glow effects for depth and focus indication
- Reduced glare: avoid pure white (#ffffff) for text
- Elevated surfaces use `--color-bg-elevated`
- Respect `prefers-reduced-motion` for all animations
- Light mode via `prefers-color-scheme: light` media query
