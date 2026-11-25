---
name: AgentHub Operational System
colors:
  surface: '#051424'
  surface-dim: '#051424'
  surface-bright: '#2c3a4c'
  surface-container-lowest: '#010f1f'
  surface-container-low: '#0d1c2d'
  surface-container: '#122131'
  surface-container-high: '#1c2b3c'
  surface-container-highest: '#273647'
  on-surface: '#d4e4fa'
  on-surface-variant: '#c7c4d8'
  inverse-surface: '#d4e4fa'
  inverse-on-surface: '#233143'
  outline: '#918fa1'
  outline-variant: '#464555'
  surface-tint: '#c3c0ff'
  primary: '#c3c0ff'
  on-primary: '#1d00a5'
  primary-container: '#4f46e5'
  on-primary-container: '#dad7ff'
  inverse-primary: '#4d44e3'
  secondary: '#b4c5ff'
  on-secondary: '#002a78'
  secondary-container: '#0053db'
  on-secondary-container: '#cdd7ff'
  tertiary: '#d2bbff'
  on-tertiary: '#3f008e'
  tertiary-container: '#7531e6'
  on-tertiary-container: '#e4d4ff'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#0f0069'
  on-primary-fixed-variant: '#3323cc'
  secondary-fixed: '#dbe1ff'
  secondary-fixed-dim: '#b4c5ff'
  on-secondary-fixed: '#00174b'
  on-secondary-fixed-variant: '#003ea8'
  tertiary-fixed: '#eaddff'
  tertiary-fixed-dim: '#d2bbff'
  on-tertiary-fixed: '#25005a'
  on-tertiary-fixed-variant: '#5a00c6'
  background: '#051424'
  on-background: '#d4e4fa'
  surface-variant: '#273647'
typography:
  headline-xl:
    fontFamily: Geist
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 44px
    letterSpacing: -0.025em
  headline-xl-mobile:
    fontFamily: Geist
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Geist
    fontSize: 15px
    fontWeight: '600'
    lineHeight: 22px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Geist
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  body-xs:
    fontFamily: Geist
    fontSize: 11px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: -0.01em
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.02em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-mobile: 0.75rem
  margin: 1.5rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
---

## Brand & Style

This design system governs an enterprise-grade, high-density B2B administration console for orchestrating, renting, and monitoring autonomous AI agents. The user persona is an operational technical manager, infrastructure engineer, or enterprise account administrator managing mission-critical fleets of algorithmic units across distributed systems.

The emotional signature is precise, technical, unshakeable, and authoritative. It strips away ornamental distractions to elevate signal over noise, handling complex orchestration states, telemetry streams, and granular provisioning controls in technical Spanish.

The aesthetic fuses **Modern Technical Minimalism** with **Information-Dense SaaS Architecture**:
- Structural layouts leverage rigorous 1px structural framing, high-density data surfaces, and surgical alignment.
- Interaction states prioritize immediate status recognition over decorative transitions.
- The interface feels calibrated, analytical, and low-latency, mirroring modern cloud infrastructure consoles and IDE workspace environments.

## Colors

The system uses an infrastructure-native default **dark mode** for prolonged multi-monitor monitoring, alongside a fully calibrated light mode for high-ambient enterprise environments.

### Light Theme
- **Canvas:** `#F8FAFC` (Slate 50)
- **Surface (Base Cards, Table Rows):** `#FFFFFF`
- **Surface Elevated (Flyouts, Dropdowns, Tooltips):** `#FFFFFF`
- **Text Primary:** `#0F172A` (Slate 900)
- **Text Muted / Secondary:** `#64748B` (Slate 500)
- **Border / Divider:** `#E2E8F0` (Slate 200)

### Dark Theme (Default)
- **Canvas:** `#0B1120` (Obsidian Blue)
- **Surface:** `#111827` (Rich Night)
- **Surface Elevated:** `#1F2937` (Charcoal Slate)
- **Text Primary:** `#F1F5F9` (Slate 100)
- **Text Muted / Secondary:** `#94A3B8` (Slate 400)
- **Border / Divider:** `#334155` (Slate 700)

### Accents & Semantic Telemetry
- **Primary Action (Brand Core):** `#4F46E5` (Indigo 600) — Primary controls, active navigation markers, key operational triggers.
- **Secondary Action (Compute & Runtime):** `#2563EB` (Blue 600) — Data visualizers, runtime indicators, telemetry links.
- **Tertiary Accent (Agent Specialization):** `#7C3AED` (Violet 600) — Multi-agent clusters, VIP agent tiers, orchestration routing nodes.
- **Operational Statuses:**
  - **Activo / En Ejecución (Active/Success):** `#10B981` (Emerald 500) | Dark tint fill: `rgba(16, 185, 129, 0.12)`
  - **Inactivo / Detenido (Inactive/Standby):** `#64748B` (Slate 500) | Dark tint fill: `rgba(100, 116, 139, 0.12)`
  - **Crítico / Fallo (Failing/Critical):** `#EF4444` (Red 500) | Dark tint fill: `rgba(239, 68, 68, 0.14)`
  - **Advertencia / Umbral (Warning/Throttled):** `#F59E0B` (Amber 500) | Dark tint fill: `rgba(245, 158, 11, 0.14)`
  - **Informativo / Despliegue (Info/Deploying):** `#3B82F6` (Blue 500) | Dark tint fill: `rgba(59, 130, 246, 0.14)`

## Typography

The type system prioritizes high-velocity legibility in data-dense matrices and tabular trees.

- **Primary UI & Headings:** `Geist` provides neutral, uninhibited geometric clarity engineered specifically for complex software and technical interfaces.
- **Data & Telemetry Tokens:** `JetBrains Mono` handles all agent IDs (`agt_01J9X7...`), token metrics, RAM/VRAM allocations, IP addresses, latency counters, and financial figures (rentals in EUR/USD).
- **Internationalization (Spanish):** Ensure typographic tracking supports standard Spanish punctuation marks (`¿`, `¡`) and diacritics (`á`, `é`, `í`, `ó`, `ú`, `ñ`) without vertical baseline jitter. Maintain tabular numeric alignment (`font-variant-numeric: tabular-nums`) across all grid displays.

## Layout & Spacing

The layout is built around a structured, fluid administrative grid capable of docking persistent command sidebars, live agent detail inspectors, and responsive data workspaces.

- **Grid Model:** 12-column adaptive fluid grid with a strict 4px sub-grid baseline.
- **Desktop (≥ 1280px):** 240px collapsable left operational navrail + fluid main workspace + optional 360px contextual telemetry drawer on the right. Outer margins `margin: 1.5rem`, column gutters `gutter: 1rem`.
- **Tablet (768px - 1279px):** Slim 64px icon-only navrail, adaptive content columns reflowing from multi-column grids to paired pairs, inspector shifts to an overlay drawer.
- **Mobile (< 768px):** Single-column stack, full-screen overlay drawers for complex filtering, persistent bottom sheet for quick agent control states (Pausar, Reanudar, Terminar). Outer margins `margin-mobile: 1rem`, gutters `gutter-mobile: 0.75rem`.
- **Internal Density:** Table rows adhere strictly to compact heights (36px compact, 44px default) to maximize simultaneous instance visibility without scrolling.

## Elevation & Depth

This system avoids heavy drop shadows in favor of **structural line work, luminance contrast, and tonal layering**. Depth is created through surface contrast and crisp 1px borders.

1. **Base Floor (Canvas):** Lowest level (`#0B1120` dark / `#F8FAFC` light). Hosts grid backdrops and page canvas boundaries.
2. **First Tier (Surface Cards, Tables, Toolbars):** `#111827` (dark) or `#FFFFFF` (light), delimited by a clean `1px solid #334155` (dark) or `1px solid #E2E8F0` (light). Zero shadow in rest state.
3. **Second Tier (Flyouts, Popovers, Contextual Drawers):** `#1F2937` (dark) or `#FFFFFF` (light) with a subtle directional ambient shadow:
   - Dark: `0 8px 24px -4px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.08)`
   - Light: `0 10px 25px -5px rgba(15, 23, 42, 0.08), 0 0 0 1px rgba(15, 23, 42, 0.05)`
4. **Interactive Focus Layers:** Elevated elements never use colored blurs. Active interaction states leverage a high-contrast double ring: an inner canvas-colored offset ring followed by an accessible focus ring (`#4F46E5` or `#2563EB`).

## Shapes

The system implements a **Soft / Technical (Level 1)** curvature discipline. Corner radii remain intentionally restrained to preserve the architectural, data-first feel of a mission-critical utility.

- **Base Components (Inputs, Buttons, Badges, Dropdowns):** `0.25rem` (4px).
- **Surface Cards & Table Containers (`rounded-lg`):** `0.5rem` (8px).
- **Modals, Floating Panels & Drawers (`rounded-xl`):** `0.75rem` (12px).
- **Status Indicator Dots & Avatars:** Fully circular (`rounded-full` / 9999px) to contrast with the angular layout geometry.

## Components

### Botones (Buttons)
- **Primario:** Background `#4F46E5`, text `#FFFFFF`, border `transparent`. Hover `#4338CA`. Active `#3730A3`. Height 36px (compact: 32px), padding `0 12px`, typography `Geist` 13px weight 500.
- **Secundario / Contorno:** Background transparent, text `primary`, border `1px solid` border token. Hover background `#1F2937` (dark) or `#F1F5F9` (light).
- **Destructivo (Terminar Instancia):** Background `rgba(239, 68, 68, 0.1)`, text `#EF4444`, border `1px solid rgba(239, 68, 68, 0.25)`. Hover background `#EF4444`, text `#FFFFFF`.
- **Focus State:** Accessible `2px solid #2563EB` with `2px` offset.

### Placas de Estado y Etiquetas (Badges & Chips)
- **Structure:** Pill/capsule format, height 20px, font `JetBrains Mono` 11px weight 500, padding `0 6px`.
- **Status Variants:**
  - *Activo (Operational):* Text `#10B981`, surface `rgba(16, 185, 129, 0.12)`, 1px border `rgba(16, 185, 129, 0.25)`. Includes 6px solid green status dot.
  - *En Pausa (Suspended):* Text `#F59E0B`, surface `rgba(245, 158, 11, 0.12)`, 1px border `rgba(245, 158, 11, 0.25)`.
  - *Fallo Crítico (Terminated/Error):* Text `#EF4444`, surface `rgba(239, 68, 68, 0.12)`, 1px border `rgba(239, 68, 68, 0.25)`.
  - *Desconectado (Inactive):* Text `#94A3B8`, surface `rgba(148, 163, 184, 0.1)`, 1px border `rgba(148, 163, 184, 0.2)`.

### Tablas de Datos (Data Tables)
- Dense administrative tables with sticky headers. Header row height 34px, uppercase `JetBrains Mono` 11px muted text.
- Data rows height 40px, bottom border `1px solid` border token. Hover row background `rgba(255, 255, 255, 0.02)` (dark) or `#F8FAFC` (light).
- Numeric, latency, and currency columns aligned flush-right with `JetBrains Mono` tabular figures.

### Campos de Entrada y Búsqueda (Inputs & Filters)
- Height 36px, background `#111827` (dark) or `#FFFFFF` (light), border `1px solid #334155` (dark) or `#CBD5E1` (light), text `13px`.
- Placeholder `#64748B`. Focus border `#4F46E5` with `0 0 0 1px #4F46E5`. Prefix/suffix slots designed for monospaced parameters and shortcut indicators (e.g., `⌘K`).

### Casillas de Selección y Radios (Checkboxes & Radios)
- Box dimension 16x16px, corner radius 3px (`roundedness: 1`).
- Checked state fills `#4F46E5` with crisp white checkmark vector. Border `1px solid #475569`.

### Tarjetas de Métricas de Agente (Metric & Agent Cards)
- Background Surface (`#111827` / `#FFFFFF`), border `1px solid` border token.
- Top banner features Agent ID in mono typography, trailing status badge, and quick action icon menu (3 vertical dots).
- Body section contains KPI key-value pairs (Consumo de Tokens, Latencia p99, Coste acumulado/hora, Tasa de aciertos).

### Monitor de Telemetría (Telemetry Drawer / Inspector)
- Contextual slide-over pinned to the right edge. Header contains agent runtime breadcrumb, live status indicator, and tabbed navigation: *Métricas*, *Logs de Ejecución*, *Permisos*, and *Facturación*.