# UI8Kit — Ultra-Fast UI System

A minimal, high-performance UI system combining **Tailwind JIT**, **inline styles**, and **shadcn color tokens**.

## 🎯 Philosophy

**Zero overhead, maximum speed.**

- **Zero unused CSS** with Tailwind JIT
- **Inline styles** for simple cases via TWSX
- **13 components** cover 80% of UI needs
- **Responsive design** out of the box

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Your Application                        │
├─────────────────────────────────────────────────────────────┤
│  UI8Kit Components    │  Tailwind JIT + TWSX                │
│  (Button, Card, etc.) │  (className, style={twsx(...)})     │
├───────────────────────┴─────────────────────────────────────┤
│                    shadcn Color Tokens                       │
│     (--primary, --background, --foreground, etc.)           │
├─────────────────────────────────────────────────────────────┤
│                    Tailwind JIT                              │
│           (Zero unused CSS, responsive design)              │
└─────────────────────────────────────────────────────────────┘
```

## 📦 Three Layers

### 1. UI8Kit — Stateless Components
Pre-built components with CVA variants. No state, no hooks — pure styling.

```tsx
import { Button, Stack, Title, Text } from '@ui8kit/ui'

<Stack gap="lg" align="center">
  <Title size="4xl">Welcome</Title>
  <Text c="muted">Build fast UIs</Text>
  <Button variant="primary">Get Started</Button>
</Stack>
```

### 2. Tailwind JIT + TWSX — Custom Layouts
Tailwind JIT for responsive layouts, TWSX for simple inline styles.

```tsx
import { twsx } from '@/lib/twsx'

// For responsive layouts - use className
<div className="min-h-screen flex flex-col md:grid-cols-2">
  <header className="w-full py-4 px-6 bg-background" />
  <main style={twsx('flex-1 p-6 max-w-7xl mx-auto')} />
</div>

// For simple styles - use twsx
<div style={twsx('p-4 m-2 bg-primary')} />
```

### 3. shadcn Colors — Design Tokens
Semantic color tokens via CSS variables.

```css
:root {
  --background: hsl(0 0% 100%);
  --foreground: hsl(240 10% 4%);
  --primary: hsl(211 100% 50%);
  --secondary: hsl(210 40% 96%);
  --muted: hsl(210 40% 96%);
  --accent: hsl(210 40% 96%);
  --destructive: hsl(0 84% 60%);
}
```

## 🚀 Quick Start

```bash
# Clone with submodules
git clone --recurse-submodules https://github.com/ui8kit/create-app.git
cd create-app

# Install dependencies
bun install

# Start development
bun run dev:web
```

## 📁 Project Structure

```
apps/web/src/
├── components/ui/     # UI8Kit components (13)
├── variants/          # CVA variant definitions (12 modules)
├── lib/
│   ├── twsx.ts        # Tailwind → StyleX converter
│   └── utils.ts       # Utilities (cn, etc.)
├── layouts/           # Tailwind JIT page layouts
└── blocks/            # Tailwind JIT composite blocks
```

## 🎨 When to Use What

| Need | Use | Example |
|------|-----|---------|
| Button, Badge, Card | UI8Kit | `<Button variant="primary">` |
| Page layout | Tailwind JIT | `className="min-h-screen flex"` |
| Responsive grid | Grid component | `<Grid cols="1-2-3">` |
| Simple styles | TWSX | `style={twsx('p-4 m-2')}` |
| Custom block | Tailwind JIT | `<section className="py-8">` |
| Colors | shadcn tokens | `bg-primary`, `text-foreground` |

## 📚 Documentation

- **[101 Guide](./docs/101-guide.md)** — Complete introduction to the system
- **[AGENTS.md](./AGENTS.md)** — Instructions for AI coding agents

## 🔧 Rules Files

Three Cursor rules define how to use the system:

1. **`.cursor/rules/tailwind-jit.mdc`** — Tailwind JIT for layouts
2. **`.cursor/rules/twsx.mdc`** — Inline styles utility
3. **`.cursor/rules/ui8kit.mdc`** — Component library usage

## ⚡ Performance

| Metric | Target |
|--------|--------|
| Tailwind JIT | Zero unused CSS |
| Bundle Size | Only used styles |
| Performance | Fast compilation |
| First Paint | < 1s |

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

Built for speed. Designed for clarity. Tailwind JIT + inline styles.
