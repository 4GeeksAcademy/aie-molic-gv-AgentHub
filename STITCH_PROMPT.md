# AgentHub — Google Stitch Design Prompt

## PROMPT PARA GOOGLE STITCH

Design a complete, high-fidelity internal SaaS administration application called **AgentHub**. Treat the full AgentHub specification as the source of truth. This is a real-feeling operational product interface, **not a marketing website or landing page**. The user is an internal platform administrator who supervises an AI-agent rental platform used by companies. The administrator must quickly inspect commercial and operational health, browse users, agents, skills, rental contracts and runtime errors, understand their relationships, and inspect records without losing context.

Create **six distinct, complete application screens**—Dashboard, Users, Agents, Skills, Agent Rentals, and Error Log—within one cohesive product. All six screens must share the same persistent application shell, navigation, typography, spacing, components, palette and light/dark themes. Do not produce six unrelated visual styles. Show representative interaction-state designs in addition to the base screens so it is clear how the required controls behave.

### 1. Language, product tone and design priorities

All visible interface copy, navigation labels, headings, button labels, table headers, statuses, helper text, modal copy and empty states must be **in Spanish**. Preserve the exact mock entity names, company names, emails, IDs and skill names supplied below; these are proper nouns and identifiers. Use a professional, concise operational tone. Prioritize legibility, information hierarchy, clear relationships, scannable data tables and calm confidence. Avoid decorative content, invented features, unnecessary charts, filters, search bars, pagination, extra KPIs or unsupported facts.

### 2. Visual design system

Create a modern, minimal, premium technology SaaS identity. Use blue, indigo and violet only as brand accents; do not add unrelated decorative hues. Use semantic status colors only where specified. Avoid large gradients, excessive glow, illustrations, ornamental shapes, or heavy shadows.

**Reference palette:**
- Brand blue `#2563EB`, primary indigo `#4F46E5`, violet `#7C3AED`.
- Light theme: app canvas `#F8FAFC`, cards/surfaces `#FFFFFF`, primary text `#0F172A`, secondary text `#64748B`, borders `#E2E8F0`.
- Dark theme: canvas `#0B1120`, standard surfaces `#111827`, elevated surfaces `#1F2937`, primary text `#F1F5F9`, secondary text `#94A3B8`, borders `#334155`.
- Semantic status colors: green for active/success, neutral gray for inactive, red for failing/critical, amber for warning, blue for informational. Always pair semantic color with a readable Spanish text label; never rely on color alone.

Use a clean system sans-serif. Establish clear type hierarchy: section titles around 24–30 px; card/table group headings 14–16 px; core data around 14 px; secondary metadata 12–13 px. Use comfortable consistent spacing, approximately 8 px-based increments, clear alignment, moderate content density and adequate touch targets. Cards and controls use subtle 8–12 px corner radii and thin borders. Reserve understated shadows for floating menus and dialogs. Icons should be simple, consistent line icons (not emoji), aligned with labels; decorative icons should not compete with key values. Show visible keyboard-focus treatment on interactive controls.

Create polished light and dark variants for **all six screens and all interaction states**. Keep identical layout and hierarchy between themes; adapt canvas, surfaces, borders, text, overlay and semantic badges for contrast. Dark mode should be elegant blue-black/charcoal, not pure black. Ensure adequate text contrast in both modes.

### 3. Shared application shell and responsive layout

Use a persistent desktop sidebar on the left, a top bar and a central content region. The sidebar contains the AgentHub wordmark/icon and exactly six navigation items, in this order and with these Spanish labels: **Panel**, **Usuarios**, **Agentes**, **Habilidades**, **Contrataciones**, **Registro de errores**. Provide a clear active item using a restrained indigo/blue surface or edge marker, stronger text and matching icon. The top bar contains the current view title or short breadcrumb/context and a visible light/dark theme toggle. The toggle must be represented in both states and must not change the selected section.

At desktop widths (reference 1440 px and 1024 px), show the full sidebar and spacious content. At tablet width (768 px), collapse the sidebar or show a compact/drawer version while preserving access to all six sections and the theme toggle. On narrow mobile width (375 px), preserve hierarchy and controls; stack cards and allow tables to scroll within their own bounded region rather than creating page-wide overflow. Maintain an active navigation state and consistent page header in every view. The application is a single-page static prototype: switching section changes the central content without a full-page reload; do not imply backend functionality.

### 4. Screen 1 — Panel (Dashboard)

Create a clear operations overview with a page heading such as **“Panel”** and optional short context **“Resumen operativo”**. The primary content begins with exactly four KPI cards, in this order:
1. **Ingresos mensuales — $24,860**
2. **Pérdidas por descuentos — $1,240**
3. **Agentes activos — 2**
4. **Agentes fallando — 1**

Each card has a distinct simple icon, small clear label, visually dominant value and subtle surface/border. Format monetary amounts in USD and counts without currency. Do not add invented trend percentages or unsupported comparative data. Arrange four columns on desktop, two columns on tablet, and one or two legible columns on mobile.

Below the KPI row, include a full-width card titled **“Actividad semanal”** with a restrained legend and a clearly illustrative placeholder chart for **Lun, Mar, Mié, Jue, Vie, Sáb, Dom**, consistent scale/grid and simple HTML-like bars or area. Label it as illustrative/sample activity, not production analytics. Do not invent specific underlying business claims or additional KPIs. Use clear whitespace and responsive chart proportions.

### 5. Screen 2 — Usuarios

Show a page title **“Usuarios”**, a concise explanatory subtitle, and a semantic-feeling data table inside a bordered surface. Include columns **Nombre**, **Correo electrónico**, **Plan**, **Estado** and an action column. Use the following exact five rows:
- Lucía Moreno | lucia.moreno@northstar.example | Northstar Labs | Enterprise | Activo | Alta 2025-03-12
- Mateo Ruiz | mateo.ruiz@brightpath.example | BrightPath | Pro | Activo | Alta 2025-06-04
- Sofía Chen | sofia.chen@orbitdata.example | Orbit Data | Pro | Activo | Alta 2025-08-19
- Diego Herrera | diego.herrera@verdeco.example | Verde & Co. | Starter | Pendiente | Alta 2026-01-10
- Valentina Cruz | valentina.cruz@northstar.example | Northstar Labs | Enterprise | Activo | Alta 2026-02-02

The table’s required visible columns are name, email, plan and status; company and join date appear in the detail dialog (do not force extra columns if density suffers). Status badges pair text with subtle semantic color. Every row has an accessible-looking ellipsis/action button.

Represent the contextual menu open state with **“Ver detalle”** and **“Eliminar”**. Represent a user-detail modal showing the selected person’s full name, email, company, plan, status, join date and associated agents. Relationships: Lucía (U-001) owns Atlas Researcher; Mateo (U-002) owns Nova Support; Sofía (U-003) owns Orbit Analyst; Diego (U-004) owns Verde Workflow; Valentina (U-005) owns no agent. The modal includes a close button and a dim backdrop. Also show a separate deletion-confirmation dialog state with clear **Cancelar** and **Confirmar eliminación** actions and explicit indication that this is a demo action. Cancel changes nothing; confirm removes only from in-memory mock data. Do not imply irreversible server deletion.

### 6. Screen 3 — Agentes

Show **“Agentes”** with four canonical agent rows or compact cards. Each displays agent name, owner (company, optionally owner name as secondary information), state badge with text, skills accordion control and action menu. Use these exact records and relationships:
- **Atlas Researcher** — Northstar Labs (Lucía Moreno, U-001) — **Activo** — Web Research, Data Analysis.
- **Nova Support** — BrightPath (Mateo Ruiz, U-002) — **Activo** — Customer Support, Workflow Automation.
- **Orbit Analyst** — Orbit Data (Sofía Chen, U-003) — **Fallando** — Data Analysis, Web Research.
- **Verde Workflow** — Verde & Co. (Diego Herrera, U-004) — **Inactivo** — Workflow Automation, Customer Support.

All skill groups are **collapsed initially**. Show both collapsed and expanded accordion states: a clear disclosure control, `aria-expanded`-like visual state, smooth short expansion, and visible skill names as chips or a concise list. Accordions operate independently. Do not hide agent ownership or status when expanded.

Each row’s menu contains **“Configurar”** and **“Eliminar”**. Show the agent configuration dialog state for one selected agent: agent name, owner, current status, a labeled editable multiline text area containing a fictional distinct **2–4 sentence system prompt**, and note **“Cambios de demostración; no se guardan en un servidor”**. Use a spacious, readable textarea with subtle border and internal scrolling if needed; show **Cancelar** and **Guardar cambios**. Saving is depicted as an in-session demo update with a small accessible success message; cancel/close discards unsaved edits. Also show an agent deletion confirmation state; no backend implication.

### 6. Screen 4 — Habilidades (Skills)

Show **“Habilidades”** and a prominent but compact informational panel titled **“¿Qué es una habilidad?”** explaining that a skill is a modular capability an agent can use (for example, research or analysis) and that one skill can be associated with multiple agents. Distinguish the skill catalog from agent records.

Show four canonical skill cards or table rows; each presents name, short description, category if space permits, derived number of associated agents, and a contextual action button:
- **Web Research** — Investigación — “Busca, compara y sintetiza información web.” — used by Atlas Researcher and Orbit Analyst — count **2**.
- **Data Analysis** — Analítica — “Analiza conjuntos de datos y resume hallazgos.” — used by Atlas Researcher and Orbit Analyst — count **2**.
- **Customer Support** — Atención — “Clasifica consultas y redacta respuestas de soporte.” — used by Nova Support and Verde Workflow — count **2**.
- **Workflow Automation** — Automatización — “Coordina pasos repetibles y tareas entre herramientas.” — used by Nova Support and Verde Workflow — count **2**.

The menu contains **“Ver detalle”** and **“Eliminar”**. Show the open detail modal state with selected skill’s name, full description, category, associated agent names and derived count. Show confirmation before skill deletion; removing a skill in the demo also removes its agent associations and updates counts. Keep relationships legible and avoid suggesting that a skill is an agent.

### 7. Screen 5 — Contrataciones

Show **“Contrataciones”** as a professional, readable table with columns **Cliente**, **Agente**, **Habilidades contratadas**, **Fecha de inicio**, **Fecha de fin**, **Importe pagado** and actions. Render skill names as compact consistent chips. Use exact mock records, dates, line items, totals and statuses:
- **C-1001** — Northstar Labs (U-001, Lucía Moreno) — Atlas Researcher (A-001) — 2026-10-01 to 2026-11-01 — Web Research **$320**, Data Analysis **$180** — total **$500** — Activo.
- **C-1002** — BrightPath (U-002, Mateo Ruiz) — Nova Support (A-002) — 2026-10-10 to 2026-11-10 — Customer Support **$240**, Workflow Automation **$160** — total **$400** — Activo.
- **C-1003** — Orbit Data (U-003, Sofía Chen) — Orbit Analyst (A-003) — 2026-09-15 to 2026-10-15 — Data Analysis **$300**, Web Research **$150** — total **$450** — Finalizado.
- **C-1004** — Northstar Labs (U-005, Valentina Cruz) — Atlas Researcher (A-001) — 2026-11-01 to 2026-12-01 — Web Research **$280**, Data Analysis **$170** — total **$450** — Activo.

Display USD consistently and dates in an unambiguous uniform format. The table menu offers **“Ver detalle”**. Show a contract-detail modal containing contract ID, customer, agent, dates, status, total and a clear line-item price breakdown with individual prices and subtotal. Ensure line items sum exactly to displayed total. Contract line items are a commercial snapshot and need not be altered by current skill-agent associations. Do not add unsupported contract edit/delete actions.

### 8. Screen 6 — Registro de errores (Error Log)

Show **“Registro de errores”** with a scannable table containing **Fecha y hora**, **Agente**, **Tipo/Gravedad**, **Descripción**, **Estado** and actions. Include all six exact records (timestamps in UTC):
- **E-001** | 2026-11-20 09:42 UTC | Orbit Analyst | **Crítico** | “Tiempo de espera agotado al consultar fuente de datos.” | Abierto.
- **E-002** | 2026-11-20 09:18 UTC | Nova Support | **Advertencia** | “Límite de reintentos alcanzado para una tarea.” | Abierto.
- **E-003** | 2026-11-20 08:56 UTC | Atlas Researcher | **Información** | “Una fuente devolvió contenido vacío.” | Abierto.
- **E-004** | 2026-11-19 17:31 UTC | Orbit Analyst | **Crítico** | “Fallo al validar el esquema de respuesta.” | Abierto.
- **E-005** | 2026-11-19 16:04 UTC | Verde Workflow | **Advertencia** | “La tarea se pausó por falta de entrada.” | Resuelto.
- **E-006** | 2026-11-19 14:27 UTC | Nova Support | **Información** | “Tarea completada tras un reintento.” | Abierto.

Use red for critical, amber for warning and blue for informational, always paired with text; show resolved as a clearly distinct status. The menu for open items offers **“Ver detalle”** and **“Marcar como resuelto”**. For E-005, which is already resolved, do not offer “Marcar como resuelto” again. Show the resolved-row visual state after marking an open error resolved.

Show the error detail modal state with ID, full timestamp, agent, severity, complete message, resolution state and a complete fictional multiline trace (at least three lines) in a monospaced, bounded, scrollable panel. Include a close button and backdrop. Keep trace content clearly synthetic and free of secrets. The row can truncate its description only because the modal displays the complete message.

### 9. Shared component and interaction states to depict

Use a consistent component language across the application:
- Primary, secondary, quiet and destructive buttons with clear labels, restrained brand fills/borders, hover and visible keyboard-focus states.
- Four KPI cards with icon, label and dominant value.
- Tables with clear header contrast, aligned columns, generous row padding, subtle separators and compact actions; do not overfill.
- Contextual action menu anchored to its trigger, visually elevated and unclipped. Include open states for user, agent, skill, contract and error menus. Only one menu is open at a time. Menus close on outside click, Escape, action selection or navigation change.
- Text-bearing semantic status/severity badges; consistent skill chips.
- Dialogs with named title, close button, dim backdrop, clear content hierarchy and distinct footer actions. Include user/agent/skill/contract/error details and deletion confirmation states as specified. Clicking within the dialog should not visually imply backdrop dismissal; the backdrop itself is a close affordance. Show an appropriate focus ring inside dialogs.
- Agent accordion with collapsed and expanded states.
- Agent configuration textarea with label, prompt text, helper note, cancel/save actions and saved-feedback state.
- Accessible, unobtrusive success feedback for saved prompt or resolved error; empty-state treatment when a list is emptied by a confirmed demo deletion.
- Theme toggle states, active navigation and responsive navigation state.

Depict interaction affordances faithfully: navigation switches section while shell/theme persist; menu selection opens the selected record’s modal or confirmation; cancel leaves data unchanged; confirmed demo deletion removes the row; saving a prompt updates the current session only; resolving an error changes its visible state and removes the resolve action. Modal close button, backdrop and Escape affordances should be evident. These are visual prototype states, not a request to create a backend.

### 10. Responsive design and accessibility

Design desktop-first and show how the same product adapts at 1440 px, 1024 px, 768 px and 375 px. On desktop, preserve the full sidebar and table readability. On tablet/mobile, use a compact/collapsible sidebar or drawer while retaining all six destinations and theme control; stack KPI cards as needed. Wide tables may horizontally scroll inside a bounded table container; never make the whole page overflow horizontally. Keep action controls reachable and do not hide essential columns/actions without a clear responsive treatment.

Use semantic-looking landmarks and hierarchy: header, navigation, main content, section headings, properly aligned table headers and labels. All controls should look keyboard operable with a strong visible focus indicator. Use text labels with status colors; provide readable labels for icon-only controls. Dialogs should appear to take focus and return it to the invoking control when closed. Respect reduced-motion preference by keeping transitions short and nonessential. Maintain readable type and contrast in both themes. Do not encode information through color alone.

### 11. Data integrity and exactness

Use only the provided mock records and do not invent additional users, agents, skills, contracts, errors, values or relationships. Preserve exact spellings, IDs, email addresses, amounts, dates, statuses and associations above. The canonical skill counts are 2 each: Web Research 2, Data Analysis 2, Customer Support 2, Workflow Automation 2. The active-agent KPI is **2**, counting only agents whose status is Activo; failing-agent KPI is **1**. Do not show 3 active agents. Monthly revenue **$24,860** and discount losses **$1,240** are global illustrative figures independent of the four sample contracts; do not recompute them from the listed contract totals. User U-005 has no owned agent but is the customer representative on C-1004. Keep contract totals exactly equal to their line-item sums. Error E-005 starts Resuelto; the other five start Abierto. The prompts and stack traces are fictional, distinct where applicable and contain no secrets.

### 12. Implementation constraints (for visual direction only)

This is a visual design request for a static prototype that will later be implemented using **semantic HTML5, Tailwind CSS loaded only through CDN, and vanilla JavaScript**. No React, Vue, Angular, TypeScript, backend, API, build tools, custom CSS, inline styles or charting libraries. Prefer designs feasible with Tailwind utility classes and native HTML elements; the weekly chart is a placeholder. No real data, server persistence or production execution of AI agents. Theme uses Tailwind `dark:` utilities with a root dark class; only theme preference may be persisted locally. Do not generate source code, a marketing landing page or backend screens.

**Deliverable in Stitch:** a unified AgentHub application design showing all six complete screens in both coherent light and dark themes, plus representative open/closed menu, modal, confirmation, accordion, prompt-editing and resolved-error states described above. Keep the same persistent shell, content model, visual system and Spanish UI copy throughout.
