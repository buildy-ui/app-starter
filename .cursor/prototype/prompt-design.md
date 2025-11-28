Prototype: Dashboard layout with left sidebar, main content, and right side panel (ui8kit)

Goal
- Draw a clean wireframe/prototype matching the provided reference: fixed left sidebar, central page with header + main content, and a fixed right side panel. Use neutral, grayscale wireframe styling with dashed placeholders and labels.

ui8kit compliance (must follow)
- Build conceptually from `ui 8 px design` primitives only: `Container`, `Grid`, `Stack`, `Block`, `Box`, `Text`, `Title`, `Icon`, `Button`, `Card`.
- No custom CSS, no decorative effects. Use simple strokes, tokens-like spacing, and clear hierarchy. Keep it neutral (no gradients, no shadows).
- Layout width controlled by container-like regions; compose with grid/stack blocks. Icons should be generic (Lucide-like) and sit next to text labels.

Canvas
- Size: 1440×1024 (desktop wireframe)
- Background: white (#FFFFFF)
- Stroke color: neutral gray (#DADADA for dividers, #C9C9C9 for dashed placeholders)
- Text: neutral gray/black (#111 for headings, #666 for helper labels)

Global layout grid
- Three columns:
  - Left sidebar: fixed 280 px width
  - Main content: fluid
  - Right side panel: fixed 360 px width
- Vertical structure in main column: top header area, then a large main content area
- Spacing tokens (approximate): 16 px inner gaps; 24 px section paddings

Left sidebar (fixed, full height)
- Top section:
  - Row 1: wordmark "Logo" (Text, medium weight)
  - Row 2: search input field with a leading search icon and placeholder text "Search"
- Navigation list (stacked):
  - Home (home icon)
  - Saved (star icon) with a right-aligned circular counter badge displaying "24"
  - Dashboard (layout icon) with a small chevron indicating expandable state
  - Projects (layers icon)
  - Documents (file-text icon)
- Bottom utility section (above profile):
  - Support (help-circle icon)
  - Settings (settings icon)
- User profile footer block:
  - Small avatar placeholder (circle)
  - Two lines of text: "Name Surname" and "hello@relume.io"
  - A subtle 3-dots/kebab icon on the far right

Main column
- Top header placeholder: a horizontal bar area with the caption centered "Click and paste Page Header". Use a dashed rectangle to indicate a drop area.
- Main content placeholder: large dashed rectangle occupying most of the center column under the header. Center the caption "Click and paste Main Content".

Right side panel (fixed)
- Full-height dashed rectangle with centered caption "Click and paste Side Panel Content".

Dividers and structure
- Place a vertical divider line between the sidebar and the main column.
- Keep clear margins around dashed placeholders so the structure is readable.

Typography and icons
- Use simple, neutral text: 14–16 px for navigation, 12–14 px for captions.
- Use generic icons positioned to the left of labels; keep consistent icon size and alignment.

Interactions (wireframe only)
- Do not show hover, active states, or color accents. No shadows, gradients, or animations.
- The goal is a static, clean prototype that clearly communicates regions and information hierarchy.

Exact captions for placeholders (use these strings verbatim)
- Page header area: "Click and paste Page Header"
- Main content area: "Click and paste Main Content"
- Right panel area: "Click and paste Side Panel Content"

Accessibility and spacing
- Ensure sufficient contrast between text and background.
- Maintain consistent spacing between list items (approx. 12–16 px) and sections (24 px).

Deliverable
- A single static wireframe screen exactly following the structure above and matching the reference proportions.