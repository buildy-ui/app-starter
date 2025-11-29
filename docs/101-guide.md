# UI8Kit 101 Guide

A complete introduction to building ultra-fast UIs with Tailwind JIT, inline styles, shadcn colors, and UI8Kit components.

---

## Table of Contents

1. [The Problem We Solve](#the-problem-we-solve)
2. [Architecture Overview](#architecture-overview)
3. [Layer 1: Tailwind JIT](#layer-1-tailwind-jit)
4. [Layer 2: TWSX — Inline Styles](#layer-2-twsx--inline-styles)
5. [Layer 3: shadcn Color Tokens](#layer-3-shadcn-color-tokens)
6. [Layer 4: UI8Kit Components](#layer-4-ui8kit-components)
7. [Putting It All Together](#putting-it-all-together)
8. [Decision Tree](#decision-tree)
9. [Common Patterns](#common-patterns)
10. [Performance Tips](#performance-tips)

---

## The Problem We Solve

Traditional React UI development has several issues:

| Problem | Traditional | Our Solution |
|---------|-------------|--------------|
| Large bundles | CSS-in-JS runtime overhead | Tailwind JIT + inline styles |
| Style conflicts | Global CSS, specificity wars | Atomic classes, scoped styles |
| Inconsistent APIs | Different patterns per library | Unified component props |
| Cognitive load | Learn multiple systems | Two simple approaches |

**Our goal:** Build UIs with **zero overhead** and **maximum clarity**.

---

## Architecture Overview

```
┌────────────────────────────────────────────────────────────────┐
│                        APPLICATION                              │
│                                                                 │
│   ┌─────────────────┐    ┌──────────────────────────────────┐  │
│   │   UI8Kit        │    │   Tailwind JIT + TWSX           │  │
│   │   Components    │    │   Custom Layouts                 │  │
│   │                 │    │                                  │  │
│   │   <Button>      │    │   <div className="grid-cols-3">   │  │
│   │   <Card>        │    │   <div style={twsx('p-4')}>      │  │
│   │   <Grid>        │    │   <Grid cols="1-2-3">            │  │
│   └────────┬────────┘    └─────────────┬────────────────────┘  │
│            │                           │                        │
│            └───────────┬───────────────┘                        │
│                        ▼                                        │
│   ┌────────────────────────────────────────────────────────┐   │
│   │              shadcn Color Tokens                        │   │
│   │   --primary, --secondary, --background, --foreground   │   │
│   └────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────┘
```

---

## Layer 1: Tailwind JIT

Tailwind CSS with Just-In-Time compilation is the foundation. It provides:

- **Zero unused CSS** — only generate what's used
- **Responsive design** — md:, lg:, xl: modifiers
- **Consistent spacing** — predefined scale
- **Atomic classes** — no conflicts

### Basic Usage

```tsx
// Use className for responsive layouts
function MyComponent() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full py-4 px-6 border-b border-border">
        Header
      </header>
      <main className="flex-1 p-6 max-w-7xl mx-auto">
        Content
      </main>
    </div>
  );
}
```

### Responsive Design

```tsx
// Mobile-first responsive classes
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Responsive grid: 1 col mobile, 2 tablet, 3 desktop */}
</div>
```

### Key Rules

1. **Use `className`** — for all responsive and pseudo-state styles
2. **Static strings only** — never template literals like `mt-${n}`
3. **Tailwind classes** — follow standard Tailwind naming conventions

### Pseudo-states

```tsx
const styles = css.create({
  button: {
    backgroundColor: {
      default: 'blue',      // Required!
      ':hover': 'darkblue',
      ':active': 'navy'
    }
  }
});
```

### Media Queries

```tsx
const styles = css.create({
  container: {
    width: {
      default: '100%',
      '@media (min-width: 768px)': 600,
      '@media (min-width: 1024px)': 800
    }
  }
});
```

---

## Layer 2: TWSX — Inline Styles

For simple inline styles without responsive behavior, use TWSX to convert Tailwind classes to CSS properties:

```tsx
import { html } from 'react-strict-dom';
import { twsx } from '@/lib/twsx';

// Instead of this:
<div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 24 }} />

// Write this:
<div style={twsx('flex flex-col gap-4 p-6')} />
```

### How It Works

1. **Parse** — Split class string into individual classes
2. **Map** — Convert each class to CSS properties
3. **Cache** — Store result for reuse
4. **Return** — React CSSProperties object

```
twsx('flex gap-4')
    ↓
{ display: 'flex', gap: 16 }
    ↓
Cached and returned
```

### Module-Level Styles (Recommended)

```tsx
import { twsxCreate } from '@/lib/twsx';

// Define once at module level
const styles = twsxCreate({
  container: 'min-h-screen flex flex-col',
  header: 'w-full py-4 px-6 bg-background border-b border-border',
  main: 'flex-1 p-6 max-w-7xl mx-auto w-full',
  footer: 'w-full py-4 px-6 bg-muted mt-auto',
});

// Use in component
function PageLayout({ children }) {
  return (
    <div style={styles.container}>
      <header style={styles.header}>Header</header>
      <main style={styles.main}>{children}</main>
      <footer style={styles.footer}>Footer</footer>
    </div>
  );
}
```

### Conditional Styles

```tsx
<button
  style={{
    ...twsx('px-4 py-2 rounded-lg font-medium'),
    ...(isActive
      ? twsx('bg-primary text-primary-foreground')
      : twsx('bg-secondary text-secondary-foreground')
    )
  }}
/>
```

### Limitations

**TWSX does NOT support:**
- **Responsive modifiers:** `md:`, `lg:`, `xl:` → use `className`
- **Pseudo-classes:** `:hover`, `:focus`, `:active` → use `className`
- **Animations:** `transition-*`, `animate-*` → use `className`

**Use TWSX for:**
- Simple inline styles without responsive behavior
- Dynamic styles computed at runtime
- Colors, spacing, typography basics

**Use className for:**
- Responsive layouts (`md:grid-cols-2`)
- Hover/focus states (`hover:bg-primary`)
- Animations and transitions
- Complex styling logic

---

## Layer 3: shadcn Color Tokens

All colors use semantic tokens from shadcn/ui:

```css
:root {
  --background: hsl(0 0% 100%);
  --foreground: hsl(240 10% 4%);
  --card: hsl(0 0% 100%);
  --card-foreground: hsl(240 10% 4%);
  --primary: hsl(211 100% 50%);
  --primary-foreground: hsl(0 0% 100%);
  --secondary: hsl(210 40% 96%);
  --secondary-foreground: hsl(222 47% 11%);
  --muted: hsl(210 40% 96%);
  --muted-foreground: hsl(215 16% 47%);
  --accent: hsl(210 40% 96%);
  --accent-foreground: hsl(222 47% 11%);
  --destructive: hsl(0 84% 60%);
  --destructive-foreground: hsl(0 0% 100%);
  --border: hsl(214 32% 91%);
  --input: hsl(214 32% 91%);
  --ring: hsl(211 100% 50%);
}
```

### Usage in TWSX

```tsx
// Background colors
twsx('bg-background')      // Main background
twsx('bg-primary')         // Primary action color
twsx('bg-secondary')       // Secondary elements
twsx('bg-muted')           // Muted/subtle areas
twsx('bg-card')            // Card backgrounds
twsx('bg-destructive')     // Error/danger states

// Text colors
twsx('text-foreground')    // Main text
twsx('text-muted-foreground') // Secondary text
twsx('text-primary')       // Accent text

// Border colors
twsx('border-border')      // Default borders
twsx('border-input')       // Input borders
```

### Dark Mode

Dark mode is automatic via CSS variables:

```css
.dark {
  --background: hsl(0 0% 7%);
  --foreground: hsl(0 0% 88%);
  /* ... other dark values */
}
```

---

## Layer 4: UI8Kit Components

Pre-built, stateless components for common UI elements.

### Layout Components

```tsx
import { Block, Container, Stack, Group, Box } from '@ui8kit/ui'

// Block — semantic sections
<Block variant="section" py="xl" bg="background">
  content
</Block>

// Container — width-constrained wrapper
<Container size="lg" ta="center">
  content
</Container>

// Stack — vertical flex
<Stack gap="lg" align="center">
  <item />
  <item />
</Stack>

// Group — horizontal flex
<Group gap="md" justify="between">
  <item />
  <item />
</Group>

// Box — universal container
<Box p="md" bg="card" rounded="lg" shadow="sm">
  content
</Box>
```

### Typography

```tsx
import { Title, Text } from '@ui8kit/ui'

<Title order={1} size="4xl" fw="bold">Heading</Title>
<Text size="lg" c="muted">Paragraph text</Text>
```

### Interactive

```tsx
import { Button, Badge } from '@ui8kit/ui'

<Button variant="primary" size="md" rounded="lg">
  Click me
</Button>

<Badge variant="success" dot>
  Online
</Badge>
```

### Media

```tsx
import { Image, Icon } from '@ui8kit/ui'
import { Settings } from 'lucide-react'

<Image src="/photo.jpg" aspect="video" rounded="lg" />
<Icon lucideIcon={Settings} size="md" c="muted" />
```

### Composite

```tsx
import { Card } from '@ui8kit/ui'

<Card variant="default" shadow="sm">
  <Card.Header>
    <Card.Title>Title</Card.Title>
    <Card.Description>Description</Card.Description>
  </Card.Header>
  <Card.Content>
    Content here
  </Card.Content>
  <Card.Footer>
    <Button>Action</Button>
  </Card.Footer>
</Card>
```

---

## Putting It All Together

### Example: Landing Page

```tsx
import { twsx } from '@/lib/twsx';
import { Container, Stack, Title, Text, Button, Grid } from '@ui8kit/ui';

// Simple inline styles (no responsive)
const styles = {
  hero: twsx('py-24 px-6'),
  features: twsx('py-16 px-6 bg-muted'),
};

function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Hero Section — UI8Kit components */}
      <section style={styles.hero}>
        <Container ta="center">
          <Stack gap="lg" align="center">
            <Title size="5xl">Build Faster</Title>
            <Text size="xl" c="muted">
              Ultra-fast UI system for modern web apps
            </Text>
            <Button variant="primary" size="lg">
              Get Started
            </Button>
          </Stack>
        </Container>
      </section>

      {/* Features Section — Tailwind JIT Grid */}
      <section style={styles.features}>
        <Container>
          <Grid cols="1-2-3" gap="lg">
            <FeatureCard title="Fast" description="Tailwind JIT" />
            <FeatureCard title="Simple" description="Inline styles" />
            <FeatureCard title="Flexible" description="UI8Kit components" />
          </Grid>
        </Container>
      </section>
    </div>
  );
}
```

---

## Decision Tree

```
Need to build UI?
│
├─ Is it a common element (button, card, badge)?
│  └─ YES → Use UI8Kit component
│
├─ Need responsive layout (md:, lg:, xl:)?
│  └─ YES → Use className + Tailwind JIT
│
├─ Need hover/focus states or animations?
│  └─ YES → Use className + Tailwind JIT
│
├─ Need simple inline styles?
│  └─ YES → Use twsx() for inline styles
│
└─ Need a color?
   └─ Always use shadcn tokens (bg-primary, text-foreground)
```

---

## Common Patterns

### Page Layout

```tsx
// Use className for responsive layouts
function PageLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full py-4 px-6 bg-background border-b border-border">
        <Container>Header content</Container>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="w-full py-4 px-6 bg-muted">
        <Container>Footer content</Container>
      </footer>
    </div>
  );
}
```

### Responsive Grid

```tsx
// Use Grid component for responsive layouts
<Grid cols="1-2-3" gap="lg">
  {items.map(item => <Card key={item.id} {...item} />)}
</Grid>

// Or use className directly
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => <Card key={item.id} {...item} />)}
</div>
```

### Centered Content

```tsx
<div style={twsx('min-h-screen flex items-center justify-center')}>
  <Container ta="center">
    <Stack gap="lg" align="center">
      {/* content */}
    </Stack>
  </Container>
</div>
```

---

## Performance Tips

### 1. Define Styles at Module Level

```tsx
// ✅ Good — cached once
const styles = twsxCreate({
  card: 'bg-card rounded-lg p-6 shadow-sm',
});

// ❌ Bad — recreated every render
function Card() {
  return <html.div style={twsx('bg-card rounded-lg p-6 shadow-sm')} />;
}
```

### 2. Use Static Class Strings

```tsx
// ✅ Good — static string
twsx('mt-4')

// ❌ Bad — dynamic string (can't be cached efficiently)
twsx(`mt-${spacing}`)
```

### 3. Minimize Style Arrays

```tsx
// ✅ Good — simple composition
style={[styles.base, isActive && styles.active]}

// ❌ Bad — too many conditions
style={[
  styles.base,
  isActive && styles.active,
  isDisabled && styles.disabled,
  isHovered && styles.hovered,
  isFocused && styles.focused,
]}
```

### 4. Use UI8Kit for Common Elements

UI8Kit components are pre-optimized. Don't recreate buttons, cards, etc.

---

## Summary

| Layer | Purpose | When to Use |
|-------|---------|-------------|
| **RSD** | Foundation | Always (html.* elements) |
| **TWSX** | Styling | Custom layouts, grids |
| **shadcn** | Colors | All color values |
| **UI8Kit** | Components | Common UI elements |

**Result:** Ultra-fast, maintainable, consistent UIs with minimal code.

