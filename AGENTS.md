# AGENTS.md

Instructions for AI coding agents working with this codebase.

---

## Project Overview

This is a **UI8Kit** project — an ultra-fast UI system built on:

- **Tailwind JIT** — Zero unused CSS, responsive design
- **TWSX** — Inline styles for simple cases
- **shadcn color tokens** — Semantic design tokens
- **UI8Kit components** — 13 stateless UI components

## Three Rules to Follow

This project uses three Cursor rules in `.cursor/rules/`:

| Rule | File | When Applied |
|------|------|--------------|
| **Tailwind JIT** | `tailwind-jit.mdc` | Responsive layouts, states |
| **TWSX** | `twsx.mdc` | Simple inline styles |
| **UI8Kit** | `ui8kit.mdc` | UI components |

---

## Quick Reference

### 1. Layouts — Use Tailwind JIT

```tsx
// ✅ Use className for responsive layouts
<div className="min-h-screen flex flex-col md:grid-cols-2">
  <header>Header</header>
  <main>Main content</main>
</div>

// ✅ Use Grid component for responsive grids
<Grid cols="1-2-3" gap="lg" />
```

### 2. Styles — className or twsx()

```tsx
// ✅ For responsive/hover states - use className
<div className="hover:bg-primary transition-colors md:grid-cols-2" />

// ✅ For simple inline styles - use twsx
import { twsx } from '@/lib/twsx';
<div style={twsx('p-4 m-2 bg-primary')} />

// ❌ Don't mix className and style for same properties
<div className="p-4" style={twsx('m-2')} />
```

### 3. Components — Use UI8Kit

```tsx
// ❌ Don't create custom buttons/cards
<button className="px-4 py-2 bg-primary">Click</button>

// ✅ Use UI8Kit components
import { Button } from '@ui8kit/ui';
<Button variant="primary">Click</Button>
```

### 4. Colors — Use shadcn Tokens

```tsx
// ❌ Don't hardcode colors
<div className="bg-blue-500 text-gray-900" />
<div style={twsx('bg-blue-500 text-gray-900')} />

// ✅ Use semantic tokens
<div className="bg-primary text-foreground" />
<div style={twsx('bg-primary text-foreground')} />
```

---

## File Structure

```
src/
├── components/ui/     # UI8Kit components (DO NOT MODIFY unless asked)
├── variants/          # CVA variants (DO NOT MODIFY unless asked)
├── lib/
│   ├── twsx.ts        # TWSX utility (DO NOT MODIFY unless asked)
│   └── utils.ts       # Utilities
├── layouts/           # Page layouts (CREATE with Tailwind JIT)
└── blocks/            # Composite blocks (CREATE with Tailwind JIT)
```

---

## Common Tasks

### Creating a Page Layout

```tsx
// src/layouts/PageLayout.tsx
import { Container } from '@ui8kit/ui';

export function PageLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="w-full py-4 px-6 border-b border-border">
        <Container>Header</Container>
      </header>
      <main className="flex-1 py-8">
        <Container>{children}</Container>
      </main>
      <footer className="w-full py-4 px-6 bg-muted mt-auto">
        <Container>Footer</Container>
      </footer>
    </div>
  );
}
```

### Creating a Block Component

```tsx
// src/blocks/HeroBlock.tsx
import { twsx } from '@/lib/twsx';
import { Container, Stack, Title, Text, Button } from '@ui8kit/ui';

const styles = {
  hero: twsx('py-24 px-6'),
};

export function HeroBlock({ title, subtitle, ctaText, onCtaClick }) {
  return (
    <section style={styles.hero}>
      <Container ta="center">
        <Stack gap="lg" align="center">
          <Title size="5xl">{title}</Title>
          <Text size="xl" c="muted">{subtitle}</Text>
          <Button variant="primary" size="lg" onClick={onCtaClick}>
            {ctaText}
          </Button>
        </Stack>
      </Container>
    </section>
  );
}
```

### Creating a Grid Layout

```tsx
// Use Grid component for responsive layouts
import { Grid } from '@ui8kit/ui';

<Grid cols="1-2-3" gap="lg">
  {items.map(item => (
    <Card key={item.id}>
      <Card.Content>{item.content}</Card.Content>
    </Card>
  ))}
</Grid>

// Or use className directly
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => <Card key={item.id} />)}
</div>
```

---

## Decision Matrix

| Task | Solution |
|------|----------|
| Button, Badge, Card | `import { X } from '@ui8kit/ui'` |
| Page layout | `className="min-h-screen flex"` |
| Responsive grid | `<Grid cols="1-2-3">` or `className="grid-cols-1 md:grid-cols-2"` |
| Hover/focus states | `className="hover:bg-primary focus:ring-2"` |
| Animations | `className="transition-all duration-300"` |
| Simple inline styles | `style={twsx('p-4 m-2')}` |
| Section wrapper | `<section className="py-8">` |
| Semantic heading | `<Title order={1} size="4xl">` |
| Paragraph text | `<Text size="lg">` |
| Vertical stack | `<Stack gap="lg">` |
| Horizontal group | `<Group gap="md">` |
| Color | shadcn token (`bg-primary`, `text-foreground`) |

---

## What NOT to Do

### ❌ Don't Mix Approaches

```tsx
// WRONG - mixing className and style for same properties
<div className="p-4" style={twsx('m-2')} />

// WRONG - twsx with responsive modifiers
<div style={twsx('md:grid-cols-2')} /> // Won't work!
```

### ❌ Don't Use Dynamic Class Strings

```tsx
// WRONG - JIT can't analyze dynamic strings
<div className={`grid grid-cols-${cols}`} />

// RIGHT - use static strings or twsx for dynamic values
<div className="grid" style={twsx(`grid-cols-${cols}`)} />
```

### ❌ Don't Hardcode Colors

```tsx
// WRONG
<div className="bg-blue-500 text-gray-900" />
<div style={twsx('bg-blue-500 text-gray-900')} />

// RIGHT
<div className="bg-primary text-foreground" />
<div style={twsx('bg-primary text-foreground')} />
```

### ❌ Don't Create Custom Components

```tsx
// WRONG — use UI8Kit instead
<button className="px-4 py-2 bg-primary rounded">Click</button>

// RIGHT
import { Button } from '@ui8kit/ui';
<Button variant="primary">Click</Button>
```

### ❌ Don't Use TWSX for Interactive Styles

```tsx
// WRONG — use className for hover/focus/animations
<div style={twsx('hover:bg-primary transition-colors')} />

// RIGHT
<div className="hover:bg-primary transition-colors" />
```

---

## Testing Commands

```bash
# Start development server
bun run dev:web

# Build for production
bun run build

# Type check
bun run typecheck
```

---

## Performance Checklist

- [ ] Use `className` for responsive layouts and states
- [ ] Use `twsx()` for simple inline styles only
- [ ] No dynamic class strings (`` `grid-cols-${n}` ``)
- [ ] Using UI8Kit for common elements
- [ ] Colors from shadcn tokens only
- [ ] No mixed styling approaches

---

## Reference Links

- [101 Guide](./docs/101-guide.md) — Complete introduction
- [React Strict DOM](https://github.com/facebook/react-strict-dom) — RSD documentation
- [shadcn/ui](https://ui.shadcn.com/) — Color token reference
- [Tailwind CSS](https://tailwindcss.com/docs) — Class reference for TWSX

