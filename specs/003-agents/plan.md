# PLAN-003 — Plan técnico: Gestión de agentes

- **Derivado de:** [`spec.md`](spec.md), FR-001–FR-017, VIS-001–VIS-010 y AC-001–AC-019.
- **Estado:** propuesta para aprobación; describe una implementación futura y no autoriza modificar código ahora.
- **Precedencia:** `SPECS.md` > requisitos 4Geeks > `DESIGN.md` > Stitch.

## 1. Resultado y límites

Integrar en la sección Agentes existente un listado de los cuatro registros canónicos, acordeones independientes de skills, menú de configuración/eliminación, modal de prompt editable y confirmación de eliminación. La fuente será `mockData.agentsCollection`; el Dashboard ya deriva los KPI de ella. El catálogo futuro de Skills deberá derivar sus recuentos de agentes sobrevivientes.

No implementar runtime, telemetría, búsqueda/filtros, altas, edición de relaciones/campos distintos al prompt, persistencia de entidades, backend, API, frameworks, dependencias, build, CSS propio ni funciones observadas solo en Stitch. Esta fase documental no ejecuta cambios.

## 2. Arquitectura y archivos previstos

### 2.1 Integración

- Reutilizar `#agentes` / `data-page="agentes"` de `index.html`, shell, navegación, topbar, Tailwind CDN y tema raíz `dark` existente. No reconstruir shell ni duplicar destinos.
- Crear dentro de la sección el encabezado, contenedor de listado, estado vacío y estructuras comunes de dropdown/modal/confirmación/feedback requeridas. Se recomienda modal de configuración y diálogo de confirmación independientes, sin superposición simultánea.
- Extender `app.js` vanilla dentro del IIFE vigente, preservando navegación, tema, usuarios y funciones KPI. Centralizar datos en `mockData`; aislar funciones de renderizado, relación y acciones de agentes.
- Archivos de implementación previstos: `index.html`, `app.js`. La documentación bajo `specs/003-agents/` define contrato/plan/tareas, no código.

### 2.2 Datos y derivaciones

- Añadir `systemPrompt` a cada registro canónico existente, sin cambiar IDs, `ownerId`, `ownerCompany`, `status` ni `skillIds`. Textos distintos, ficticios y de 2–4 frases.
- Reutilizar `mockData.usersCollection` para nombre de owner y el catálogo compartido de skills cuando exista. Resolver por IDs; no duplicar arreglos relacionales.
- Crear una única operación de render de agentes que derive propietarios, etiquetas de estado y skills. Usar APIs DOM y `textContent` para contenido dinámico; evitar interpolar campos de usuario/prompt en HTML.
- `getKpiDefinitions()` ya cuenta la colección compartida. Verificar que guardar prompt no cambia los conteos, eliminar sí actualiza activos/fallando, y el inactivo nunca se cuenta como activo. No crear contadores paralelos.
- Mantener contratos y errores como registros/snapshots de sesión independientes de la eliminación de agentes. Futura vista Skills debe contar agentes sobrevivientes por `skillIds`.

### 2.3 Componentes

1. **AgentList / AgentCard:** muestra ID, nombre, usuario propietario y empresa, badge textual, botón acciones y sección de skills.
2. **SkillsAccordion:** botón con `aria-expanded`/`aria-controls`, resumen de skills y panel vinculado por ID. Cerrado inicial; cada estado se gestiona por ID o por estado del DOM regenerado cuidadosamente.
3. **ActionMenu:** un `openAgentMenuId`, opciones Configurar/Eliminar, un menú abierto y activador con `aria-haspopup`, `aria-expanded`, `aria-controls` y label por agente. Debe renderizar fuera del área con overflow o con una estrategia que no recorte el menú.
4. **ConfigDialog:** un único modal dinámico, relleno por ID. Campos de nombre, owner/empresa, estado de solo lectura y textarea asociada a `<label>`. Mantener draft separado hasta Guardar.
5. **DeleteConfirm:** diálogo con nombre/ID, nota de sesión, Cancelar y confirmar. Confirmar cambia exclusivamente la colección de agentes.
6. **Feedback / EmptyState:** región de anuncio `aria-live="polite"` y estado vacío sin controles huérfanos.

## 3. Estrategia de interacción

### 3.1 Render y estado UI

- Separar fuente de dominio (`mockData.agentsCollection`) de estado efímero UI: menú abierto, acordeones abiertos (si la persistencia del DOM no basta), agente seleccionado, prompt draft y elemento de retorno de foco.
- Render inicial conserva orden canónico y cierra todos los acordeones. Al renderizar tras eliminación, mantener orden relativo y nunca convertir datos en HTML no confiable.
- Al navegar fuera, cerrar menú y todos los diálogos; el tema y destino se mantienen a cargo del shell actual.
- Cuando se re-renderiza la tabla/lista, guardar IDs/estado UI necesario y no dejar listeners sobre elementos desconectados.

### 3.2 Dropdown y evento exterior

- Botón abre/cierra el menú asociado; abrir otro cierra anterior. `Escape` cierra y retorna foco al activador nuevo.
- El manejador global de clic debe excluir activador y menú. Si el listado se reconstruye durante el click, validar `event.composedPath()`/ruta original o usar delegación para no cerrar prematuramente la opción seleccionada. Ejecutar acción sobre ID estable capturado antes del re-render.
- Para evitar clipping: separar wrapper que recorta/scroll y menú (capa absoluta relativa a una región no recortada), o colocar menú en capa común de sección; escoger una estrategia sin librerías y verificar bordes del viewport.

### 3.3 Skills expandibles

- Cada control nativo actualiza su propia región, `aria-expanded` y estado visual de chevron opcional. La región oculta está realmente oculta a AT y foco (`hidden` o equivalente accesible); al abrir, chips/nombres vienen del catálogo.
- Transición aproximada de 150–250 ms mediante utilidades Tailwind; aplicar `motion-reduce:transition-none`. No retrasar el estado semántico para completar animación.

### 3.4 Configuración

- Abrir captura ID del agente y botón activador; poblar campos por entidad seleccionada y copiar `systemPrompt` al textarea. Presentar nota exacta de demo/no servidor.
- Guardar comprueba que sigue existiendo el ID, actualiza solo `systemPrompt`, cierra, devuelve foco y anuncia éxito. No ejecutar/interpretar el texto ni persistirlo.
- Cancelar, cierre, Escape y backdrop descartan draft. Backdrop cierra solo si el evento se originó y terminó en el backdrop; un click dentro no lo cierra.
- Modal con `role="dialog"`, `aria-modal`, `aria-labelledby`, foco inicial, trap Tab/Shift+Tab, Escape y retorno al activador. Contenido puede scrollar verticalmente dentro de max-height del viewport.

### 3.5 Eliminación

- Abrir confirmación no muta la colección. Cancelar/Escape/backdrop limpia selección pendiente. Confirmar filtra el ID exacto de `agentsCollection`, cierra capas, recalcula/renderiza, anuncia resultado y enfoca registro vecino/heading.
- Si está activa la vista Agentes, actualizarla inmediatamente. Los KPI leen la fuente compartida y deben actualizarse tras mutación (invocar el render KPI existente o disparar un refresco de vistas derivadas); recuentos de skills se calculan al entrar/renderizar Skills.
- No borrar ni actualizar agente en contratos/errores, usuarios o catálogo; los registros históricos conservan su información independiente. Recarga restaura todo al mock inicial.

## 4. Presentación, responsive y accesibilidad

- Reutilizar sans-serif del sistema, colores/base del shell, bordes slate/contraste y badges semánticos. Añadir pares `dark:` para fondos, texto, bordes, hover/foco, overlays y superficies; no importar tokens/configuración/estilos Stitch.
- Desktop admite tarjetas o filas; tablet mantiene jerarquía; móvil apila nombre/owner/estado/acciones sin ocultarlos. Lista no requiere scroll global horizontal.
- Menús tienen posición visible cerca del activador y no quedan bajo otro contenido; modal es max-height de viewport y textarea con scroll interno/resize razonable.
- Usar heading jerárquico, botones reales, `aria-label`, estados de acordeón y diálogos. Foco visible siempre. Para roles `menu`, implementar patrón completo; preferir grupo de botones normales cuando no se implementa teclado de menú completo.
- `aria-live="polite"` solo para resultado; evitar anunciar repetidamente la lista completa. Respetar movimiento reducido y no depender de color.

## 5. Secuencia de implementación propuesta

1. Añadir prompts mock seguros, distintos y de 2–4 frases a los cuatro agentes sin tocar otros campos.
2. Reemplazar placeholder por encabezado, estructura de listado, estado vacío y regiones de componentes.
3. Renderizar los cuatro agentes desde colección compartida, relaciones por ID, badges y acordeones cerrados.
4. Añadir expand/collapse accesible y transición respetuosa de movimiento reducido.
5. Implementar menú único, cierre exterior/Escape/navegación y selección robusta tras render.
6. Implementar modal de configuración con valores seleccionados, draft, guardar/cancelar y foco.
7. Implementar confirmación, eliminación en memoria, empty state, actualización de KPI/relaciones derivadas y foco.
8. Refinar responsive, tema, teclado, lector de pantalla y comportamiento de overlay.
9. Ejecutar validaciones estructurales, funcionales y manuales previstas en SPEC; registrar lo que no se haya podido comprobar.

## 6. Validación prevista

Se realiza en implementación posterior, no en este plan documental.

- **Datos y fuente (AC-002–003):** comparar IDs, nombres, owners, estados, skills; confirmar una sola colección y conteos 2/1/1, relación de owner y prompts separados.
- **Acordeón (AC-004–006):** comprobar cerrado inicial, cada relación exacta, independencia, `aria-expanded`, ocultamiento AT/foco, transición y movimiento reducido.
- **Menú (AC-007):** abrir para los cuatro registros; opciones exactas, relación ARIA, uno abierto, cierre por fuera/Escape/acción/navegación; menú completo dentro de viewport y sin clipping.
- **Configuración (AC-008–010):** abrir cada agente, revisar owner/status/prompt/label/nota; editar y guardar, confirmar cambio de sesión y restauración al recargar; cancelar/cerrar/Escape/backdrop y click interior; foco/trampa/retorno; estado de otros campos intacto.
- **Eliminación y coherencia (AC-011–015):** probar cancelar, confirmar distintos IDs, orden, KPI tras eliminar activo/failing/inactivo, Skills derivadas, no cascade, no almacenamiento/red, reload y empty state/foco.
- **Tema/responsive/a11y (AC-016–017):** 1440/1024/768/375 en claro/oscuro; lectura, overflow, owner/actions, acordeón, modal/textarea, contraste, teclado y foco.
- **Alcance/técnica (AC-018–019):** inspeccionar red y fuentes; no API, runtime, filtros, frameworks, build, CSS/style inline ni recursos Stitch.
- Las pruebas de interacción real del navegador no se marcarán completadas por inspección estática. Se registrarán por separado evidencias del usuario y limitaciones de herramientas.

## 7. Riesgos y mitigaciones

| Riesgo | Mitigación |
|---|---|
| Duplicación de agentes causa desincronización de Dashboard | Reutilizar exclusivamente `mockData.agentsCollection` y probar los KPI tras cambios. |
| Borrado deja referencias huérfanas en contratos/errores | Tratarlos como snapshots independientes; no borrar ni alterar registros históricos. No generar nuevos enlaces activos desde Agentes. |
| Skills, catálogo no implementado aún | Mantener `skillIds`; consumidores futuros derivan asociaciones de la colección sobreviviente. |
| Menú se recorta por overflow/DOM re-render | Separar capa de menú del contenedor de overflow; seleccionar por ID y preservar ruta original/delegación del evento. |
| Animación deja contenido accesible cuando cerrado | Estado semántico/hidden sincronizado inmediatamente y reducción de movimiento. |
| Prompt cambia sin guardar o se persiste | Draft separado; mutar solo al guardar; no localStorage/API; test de recarga. |
| Foco se pierde tras eliminar activador | Guardar ID/posición y mover foco a registro vecino o heading/empty state. |
| Stitch propone datos/acciones engañosos | Prevalencia de SPEC; lista explícita de elementos fuera de alcance y no copiar código/assets. |

## 8. Dependencias y supuestos

- La aprobación explícita de SPEC/PLAN/TASKS precede a implementación.
- `index.html` conserva sección `#agentes`, Tailwind CDN y shell; `app.js` mantiene su IIFE y `mockData` compartida.
- Usuarios compartidos están disponibles por `ownerId`; skills podrán consumirse de un catálogo canónico común. La vista Agentes debe mostrar solo IDs/nombres existentes, no crear un catálogo separado.
- La eliminación de agentes repercute en KPI y recuentos derivados; no hay persistencia de entidades. Los contratos/errores son snapshots independientes.
- Tailwind CDN requiere conectividad para apariencia; no se agrega fallback de CSS propio.
- La vista Stitch contiene funciones y datos no contractuales; su HTML no es una dependencia.

## 9. Trazabilidad

| Área del plan | Requisitos | Criterios |
|---|---|---|
| Shell, datos, dueño y listado | FR-001–FR-004, FR-012; VIS-001–VIS-004 | AC-001–AC-003, AC-006 |
| Skills y acordeón | FR-005–FR-006; VIS-005 | AC-004–AC-005 |
| Menú y evento | FR-007, FR-013; VIS-006 | AC-007 |
| Prompt/modal/feedback | FR-008–FR-009, FR-014, FR-016; VIS-007–VIS-008 | AC-008–AC-010, AC-017 |
| Confirmación/eliminación/coherencia | FR-010–FR-012; VIS-008 | AC-011–AC-015 |
| Responsive/accesibilidad/tema | FR-014–FR-016; VIS-002, VIS-009 | AC-010, AC-016–AC-017 |
| Alcance y stack | FR-017; VIS-010; §9 de SPEC | AC-018–AC-019 |
