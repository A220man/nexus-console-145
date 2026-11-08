
# Clean Minimal Theme

## Genre: Clean

High contrast, generous whitespace, system typography. Content-first with zero decoration.

## Design Tokens

### Colors
- `--color-bg`: `#ffffff`
- `--color-bg-alt`: `#f8f9fa`
- `--color-fg`: `#1a1a2e`
- `--color-fg-muted`: `#6c757d`
- `--color-primary`: `#2563eb`
- `--color-primary-hover`: `#1d4ed8`
- `--color-border`: `#e5e7eb`
- `--color-border-strong`: `#d1d5db`
- `--color-focus`: `#2563eb`
- `--color-error`: `#dc2626`
- `--color-success`: `#16a34a`

### Typography
- `--font-sans`: `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
- `--font-mono`: `ui-monospace, SFMono-Regular, 'SF Mono', Menlo, monospace`
- `--text-xs`: `0.75rem`
- `--text-sm`: `0.875rem`
- `--text-base`: `1rem`
- `--text-lg`: `1.125rem`
- `--text-xl`: `1.25rem`
- `--text-2xl`: `1.5rem`
- `--text-3xl`: `1.875rem`
- `--text-4xl`: `2.25rem`
- `--leading-tight`: `1.1`
- `--leading-normal`: `1.5`
- `--leading-relaxed`: `1.625`

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
- `--radius-sm`: `0.25rem`
- `--radius-md`: `0.375rem`
- `--radius-lg`: `0.5rem`
- `--radius-xl`: `0.75rem`
- `--radius-2xl`: `1rem`
- `--radius-full`: `9999px`

### Shadows
- `--shadow-sm`: `0 1px 2px 0 rgb(0 0 0 / 0.05)`
- `--shadow-md`: `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)`
- `--shadow-lg`: `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)`
- `--shadow-xl`: `0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)`

### Transitions
- `--transition-fast`: `150ms ease`
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

### Card
- `--card-padding`: `var(--space-6)`
- `--card-radius`: `var(--radius-lg)`
- `--card-border`: `1px solid var(--color-border)`

## Usage Notes

- Use system fonts for zero flash-of-unstyled-text
- Prefer semantic color tokens over hardcoded values
- Maintain 4.5:1 contrast ratio minimum
- Respect `prefers-reduced-motion` for all animations
- Dark mode via `prefers-color-scheme` media query
