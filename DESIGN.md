---
name: GroqChat Design System
colors:
  surface: '#0c1322'
  surface-dim: '#0c1322'
  surface-bright: '#323949'
  surface-container-lowest: '#070e1d'
  surface-container-low: '#141b2b'
  surface-container: '#191f2f'
  surface-container-high: '#232a3a'
  surface-container-highest: '#2e3545'
  on-surface: '#dce2f7'
  on-surface-variant: '#e5beb2'
  inverse-surface: '#dce2f7'
  inverse-on-surface: '#293040'
  outline: '#ac897e'
  outline-variant: '#5c4038'
  surface-tint: '#ffb59d'
  primary: '#ffb59d'
  on-primary: '#5d1800'
  primary-container: '#ff5712'
  on-primary-container: '#511400'
  inverse-primary: '#ac3400'
  secondary: '#d0bcff'
  on-secondary: '#3c0091'
  secondary-container: '#571bc1'
  on-secondary-container: '#c4abff'
  tertiary: '#a8c8ff'
  on-tertiary: '#003061'
  tertiary-container: '#3491ff'
  on-tertiary-container: '#002955'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdbd0'
  primary-fixed-dim: '#ffb59d'
  on-primary-fixed: '#390b00'
  on-primary-fixed-variant: '#832600'
  secondary-fixed: '#e9ddff'
  secondary-fixed-dim: '#d0bcff'
  on-secondary-fixed: '#23005c'
  on-secondary-fixed-variant: '#5516be'
  tertiary-fixed: '#d5e3ff'
  tertiary-fixed-dim: '#a8c8ff'
  on-tertiary-fixed: '#001b3c'
  on-tertiary-fixed-variant: '#004689'
  background: '#0c1322'
  on-background: '#dce2f7'
  surface-variant: '#2e3545'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  code-sm:
    fontFamily: Geist
    fontSize: 13px
    fontWeight: '450'
    lineHeight: 20px
  label-caps:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1200px
  sidebar-width: 280px
  gutter: 1.5rem
  margin-mobile: 1rem
  stack-gap: 1rem
  bubble-padding: 1rem 1.25rem
---

## Brand & Style

The design system is engineered for high-performance AI interaction, targeting developers and power users who prioritize speed and technical clarity. The aesthetic is a refined **Modern Corporate** style with **Minimalist** influences, specifically optimized for a deep-dark environment. 

The emotional response should be one of "effortless power"—where the interface recedes to highlight the speed of the underlying compute. It utilizes high-contrast typography against low-contrast backgrounds to maintain focus during long-form chat sessions. The style leans into subtle glassmorphism for overlays to maintain a sense of depth without distracting from the primary chat stream.

## Colors

The palette is anchored in a deep-dark theme to reduce eye strain and emphasize the vibrant accent colors. 

- **Primary (Groq Orange):** Used sparingly for action-oriented elements like the "Send" button or active states to signify energy and speed.
- **Secondary (Violet):** Used for AI-specific branding elements, such as the AI avatar or feature highlights.
- **Neutrals:** A range of deep grays provides the structural scaffolding. `#111827` serves as the primary surface, while `#1F2937` defines elevated containers.
- **Functional Colors:** Success (Emerald) and Info (Blue) are utilized specifically for technical metrics (tokens per second, latency) to provide instant visual feedback on performance.

## Typography

This design system utilizes **Inter** for all primary interface and prose elements due to its exceptional legibility and neutral character. For technical data and code blocks, **Geist** is used to provide a monospaced, developer-friendly feel that aligns with the "technical but accessible" voice.

- **Readability:** Body text is set with a generous line height (1.6x) to ensure long AI responses remain approachable.
- **Hierarchy:** Use `label-caps` for metadata like "Tokens/sec" or "Model Version" to distinguish data from conversational content.
- **Scaling:** Headlines shift significantly on mobile to ensure the chat window remains the focal point.

## Layout & Spacing

The layout employs a **Fixed Sidebar / Fluid Content** model. 

1. **Sidebar:** A fixed 280px left-hand column houses chat history and workspace management.
2. **Main Stage:** A centered fluid container with a max-width of 1200px ensures that chat bubbles do not become excessively wide on ultra-wide monitors, maintaining a comfortable reading measure.
3. **Responsive Flow:** On mobile devices, the sidebar collapses into a hidden drawer, and the main stage margins reduce to 16px.
4. **Chat Rhythm:** A consistent 1rem (16px) vertical gap is maintained between message bubbles, with larger 2rem gaps between distinct logical sections or dates.

## Elevation & Depth

Visual hierarchy is achieved through **Tonal Layering** and **Subtle Outlines** rather than heavy shadows.

- **Level 0 (Background):** The darkest shade (`#030712`), used for the main application background.
- **Level 1 (Surface):** The Sidebar and Chat Input area use `#111827`, differentiated by a 1px border of `#374151`.
- **Level 2 (Floating):** Metrics cards and User Chat bubbles use `#1F2937`. These elements feature a soft, 8% opacity black shadow with a 4px blur to suggest a slight lift.
- **Glass Effects:** Top navigation bars and modal backdrops use a 12px backdrop-blur with a 60% transparent background to maintain context of the underlying chat.

## Shapes

The design system uses a **Rounded** shape language, specifically leaning into `2xl` (1.5rem) radii for large containers to soften the technical nature of the product.

- **Primary Containers:** Message bubbles and metrics cards use `rounded-2xl` (1.5rem).
- **Interactive Elements:** Buttons and input fields use `rounded-xl` (1rem).
- **Small Details:** Checkboxes and status indicators use `rounded-md` (0.375rem).

## Components

### Chat Bubbles
- **User Bubble:** Surface color `#1F2937` with a subtle 1px border. Aligned to the right or center-right.
- **AI Bubble:** No background or a very slight transparent tint. Features the secondary color (Violet) in the avatar or as a left-hand accent line.
- **Code Blocks:** Deep background (`#030712`) with `rounded-lg` corners and a "Copy" utility button in the top right.

### Input Area
- **Container:** A floating "pill" or docked bar with a `rounded-2xl` shape.
- **State:** High-contrast focus ring using the Primary Orange.
- **Actions:** The "Send" button should be a solid Primary Orange circle with a white icon.

### Metrics Cards
- Small, `rounded-xl` widgets displayed at the top of the chat or in the sidebar.
- Use `label-caps` for the metric title and `code-sm` for the value.
- Include a small sparkline or status dot using Success/Info colors.

### Sidebar Navigation
- **Hover States:** Use a ghost-hover effect (light gray tint at 5% opacity).
- **Active State:** A subtle left-border indicator in Primary Orange and a slightly lighter background.