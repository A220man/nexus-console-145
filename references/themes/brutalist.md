# Brutalist Theme

## Genre: Expressive

Raw structure, stark contrasts, anti-aesthetic. Honest materials, no pretense.

## Design Tokens

### Colors
- `--color-bg`: `#ffffff`
- `--color-bg-alt`: `#f5f5f5`
- `--color-bg-inverse`: `#000000`
- `--color-fg`: `#000000`
- `--color-fg-muted`: `#525252`
- `--color-fg-inverse`: `#ffffff`
- `--color-primary`: `#000000`
- `--color-primary-hover`: `#1a1a1a`
- `--color-accent`: `#ff0000`
- `--color-border`: `#000000`
- `--color-border-strong`: `#000000`
- `--color-focus`: `#ff0000`
- `--color-error`: `#ff0000`
- `--color-success`: `#000000`

### Typography
- `--font-sans`: `'IBM Plex Mono', ui-monospace, SFMono-Regular, monospace`
- `--font-mono`: `'IBM Plex Mono', ui-monospace, SFMono-Regular, monospace`
- `--text-xs`: `0.75rem`
- `--text-sm`: `0.875rem`
- `--text-base`: `1rem`
- `--text-lg`: `1.25rem`
- `--text-xl`: `1.5rem`
- `--text-2xl`: `2rem`
- `--text-3xl`: `3rem`
- `--text-4xl`: `4rem`
- `--leading-tight`: `1.1`
- `--leading-normal`: `1.3`
- `--leading-relaxed`: `1.5`

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
- `--radius-sm`: `0`
- `--radius-md`: `0`
- `--radius-lg`: `0`
- `--radius-xl`: `0`
- `--radius-2xl`: `0`
- `--radius-full`: `0`

### Shadows
- `--shadow-none`: `none`
- `--shadow-sm`: `none`
- `--shadow-md`: `none`
- `--shadow-lg`: `none`
- `--shadow-xl`: `none`
- `--shadow-brutal`: `4px 4px 0 0 var(--color-border)`
- `--shadow-brutal-lg`: `8px 8px 0 0 var(--color-border)`

### Transitions
- `--transition-none`: `0ms`
- `--transition-fast`: `0ms`
- `--transition-normal`: `0ms`
- `--transition-slow`: `0ms`

## Component Tokens

### Button
- `--btn-padding-x`: `var(--space-3)`
- `--btn-padding-y`: `var(--space-2)`
- `--btn-radius`: `var(--radius-none)`
- `--btn-font-weight`: `700`
- `--btn-font-family`: `var(--font-mono)`
- `--btn-border`: `2px solid var(--color-border)`
- `--btn-shadow`: `var(--shadow-brutal)`
- `--btn-gap`: `var(--space-2)`

### Input
- `--input-padding-x`: `var(--space-3)`
- `--input-padding-y`: `var(--space-2)`
- `--input-radius`: `var(--radius-none)`
- `--input-border-width`: `2px`
- `--input-border-color`: `var(--color-border)`
- `--input-border-focus`: `var(--color-accent)`
- `--input-font-family`: `var(--font-mono)`

### Card
- `--card-padding`: `var(--space-4)`
- `--card-radius`: `var(--radius-none)`
- `--card-border`: `2px solid var(--color-border)`
- `--card-shadow`: `var(--shadow-brutal)`

### Divider
- `--divider-width`: `2px`
- `--divider-color`: `var(--color-border)`
- `--divider-style`: `solid`

## Usage Notes

- Zero border radius - sharp corners only
- No shadows except brutalist offset shadows
- No transitions - instant state changes
- Monospace type for everything
- High contrast black/white/primary red only
- Thick borders (2px+) as primary visual separator
- Respect `prefers-reduced-motion` (already zero motion)
- Inverted variant via `prefers-color-scheme: dark` (swap bg/fg)
