# SPEC-006 — Registro de errores

- **Derivada de:** [`../../SPECS.md`](../../SPECS.md) §§3–6.6, 8–10 y 12; `SPECS.es.md` se consulta como traducción.
- **Referencias visuales subordinadas:** [`../../design/DESIGN.md`](../../design/DESIGN.md) y Stitch `design/stitch/errores/{code.html,screen.png}`. El código Stitch se consulta solo para composición; no se incorporan funciones o datos no autorizados por `SPECS.md`.
- **Estado:** propuesta SDD; no autoriza implementación.
- **Precedencia:** `SPECS.md` > requisitos 4Geeks > `DESIGN.md` > Stitch.
- **Alcance de esta fase:** especificar la última sección del shell SPA actual. No modificar código ni documentación anterior.

## 1. Objetivo

Permitir que una persona administradora consulte los errores ficticios canónicos, identifique agente, timestamp, categoría/severidad y descripción, inspeccione el mensaje y la traza completos, y marque un error como resuelto solo durante la sesión. El historial permanece disponible aunque se retire de la sesión el agente relacionado.

## 2. Alcance

### Incluido

- Contenido de `#registro-de-errores` / `data-page="registro-de-errores"` dentro del shell existente.
- Listado semántico de los seis registros E-001–E-006, en orden canónico, con timestamp, agente, tipo/severidad, descripción breve, estado textual y acciones.
- Badge textual y color semántico: Crítico rojo, Advertencia ámbar, Información azul; Resuelto se identifica además de su severidad.
- Menú accesible por registro, con «Ver detalle» y «Marcar como resuelto» solo cuando el estado sea Abierto. Para Resuelto no se ofrece reabrir ni volver a resolver.
- Un diálogo de detalle asociado al error seleccionado con ID, timestamp, agente, severidad, mensaje completo, estado y traza completa legible.
- Resolución en memoria durante la sesión. Actualiza lista y detalle abierto si corresponde; recargar repone estados iniciales.
- Conservación del registro y del nombre histórico del agente cuando la referencia activa ya no existe.
- Navegación de teclado, foco visible, tema claro/oscuro y comportamiento responsive.

### Fuera de alcance

Filtros, búsqueda, ordenación configurable, paginación, exportación, borrado/reapertura, reintentos, cambios de estado del agente, cálculo o modificación de KPI, notificaciones operativas, telemetría en vivo, sincronización, servicios de aplicación, backend/API o persistencia de logs/resoluciones. No copiar KPIs, auto-sync, clústeres, afirmaciones de recuperación ni texto ampliado de Stitch.

## 3. Modelo canónico

Fuente: `SPECS.md` §8. Los timestamps canónicos tienen precisión de minuto y UTC. No se inventan segundos. En la vista visible se respeta literalmente ese valor UTC; el detalle puede presentarlo como `YYYY-MM-DD HH:mm UTC`. Los seis errores deben enlazar a agentes del modelo canónico de `SPECS.md` §8 y mostrarlos por su nombre registrado. E-005 (`Verde Workflow`) conserva su registro histórico, aunque no haya agente activo con ese nombre. La relación estructurada (ID de agente) solo se fija si existe una correspondencia inequívoca en el modelo; de lo contrario se conserva el nombre histórico canónico y no se inventa ID.

| ID | Timestamp UTC | Agente | Tipo/severidad | Descripción breve | Estado inicial |
|---|---|---|---|---|---|
| E-001 | 2026-11-20 09:42 UTC | Orbit Analyst | Crítico | Tiempo de espera agotado al consultar fuente de datos. | Abierto |
| E-002 | 2026-11-20 09:18 UTC | Nova Support | Advertencia | Límite de reintentos alcanzado para una tarea. | Abierto |
| E-003 | 2026-11-20 08:56 UTC | Atlas Researcher | Información | Una fuente devolvió contenido vacío. | Abierto |
| E-004 | 2026-11-19 17:31 UTC | Orbit Analyst | Crítico | Fallo al validar el esquema de respuesta. | Abierto |
| E-005 | 2026-11-19 16:04 UTC | Verde Workflow | Advertencia | La tarea se pausó por falta de entrada. | Resuelto |
| E-006 | 2026-11-19 14:27 UTC | Nova Support | Información | Tarea completada tras un reintento. | Abierto |

El modelo mínimo incluye ID estable, timestamp UTC, referencia de agente cuando sea inequívoca, nombre snapshot del agente, tipo/severidad, descripción breve canónica, mensaje completo, stack trace ficticio de al menos tres líneas y estado inicial. `SPECS.md` no proporciona trazas literales ni mensajes completos adicionales: estos dos campos deben ser fixtures demostrativos redactados para cada evento, compatibles con su descripción, no datos supuestamente telemétricos. No se copiarán trazas concretas de Stitch como si fueran fuente canónica. Las descripciones cortas de la tabla permanecen idénticas a la tabla anterior.

La colección es local y única, y cada registro mantiene su nombre histórico. Si existe una relación ID-agente canónica, renderizar el nombre vigente por ID cuando esté disponible y usar el snapshot si falta; sin relación inequívoca, no crearla por aproximación de nombres. Resolver cambia el estado del registro en memoria, no el estado del agente.

## 4. Requisitos funcionales

| ID | Requisito |
|---|---|
| FR-001 | Integrar Registro de errores en su ruta/vista existentes, sin recarga SPA ni cambios al shell, sidebar, topbar o destinos previos. |
| FR-002 | Mostrar encabezado «Registro de errores» y descripción neutral, sin métricas no especificadas. |
| FR-003 | Renderizar exactamente los seis IDs E-001–E-006 en orden canónico, desde una única colección mock local. |
| FR-004 | Cada fila presenta timestamp con fecha/hora/UTC, agente, tipo/severidad, descripción breve, estado y acciones; la tabla/listado mantiene semántica apropiada. |
| FR-005 | Conservar exactamente timestamps, nombres, tipo, descripción y estado inicial de §3. |
| FR-006 | Presentar Crítico rojo, Advertencia ámbar e Información azul mediante badges con texto visible; estado Resuelto también es textual y no sustituye la severidad. |
| FR-007 | Cada fila tiene botón nativo accesible `⋮` con nombre único por ID y un dropdown con «Ver detalle» y, solo para Abierto, «Marcar como resuelto». No hay opción de reapertura. |
| FR-008 | Solo un menú está abierto. Cierra por Escape, clic fuera, selección y navegación; el click en acción no se cancela por el listener exterior. ARIA y teclado son coherentes. |
| FR-009 | La capa de menú no se recorta por contenedores scrolleables ni por límites de viewport; se mantiene visible junto al activador. |
| FR-010 | «Ver detalle» abre un diálogo para el ID activado con ID, timestamp completo UTC, agente, tipo/severidad, mensaje completo, estado y traza íntegra. |
| FR-011 | La traza se inserta como texto no confiable usando APIs DOM/textContent; tipografía monoespaciada, saltos de línea y scroll local horizontal/vertical si precisa. |
| FR-012 | Cerrar diálogo mediante botón visible, Escape y clic válido en backdrop; click dentro no cierra. Escape cierra solo la capa superior. Navegar cierra diálogo y menú. |
| FR-013 | Foco entra al diálogo, queda contenido con Tab/Shift+Tab y vuelve al activador conectado o fallback lógico al cerrar. |
| FR-014 | «Marcar como resuelto» cambia solo ese registro a Resuelto en memoria, actualiza su badge y acción disponible; el registro permanece visible. Al ya estar Resuelto no existe acción para resolver/reabrir. Si el diálogo del mismo registro está abierto, su estado se actualiza. |
| FR-015 | Recargar restaura estados iniciales. No se escribe estado de resolución a localStorage ni se emiten peticiones de red. |
| FR-016 | Resolver no altera estado `failing`/otro estado de agentes ni KPI del Dashboard. Un error resuelto no implica agente recuperado. |
| FR-017 | El historial no se borra al eliminar un agente; nombre snapshot se mantiene, y ausencia de relación actual no genera error ni una entidad vigente ficticia. |
| FR-018 | Implementación limitada a HTML semántico, Tailwind CDN existente y JavaScript vanilla, sin dependencias, build, CSS propio/inline ni funcionalidades ajenas. |

## 5. Requisitos visuales

- **VIS-001 — Shell:** reutilizar la sección, shell y encabezados existentes, sin duplicar navegación.
- **VIS-002 — Tabla/listado:** superficie sobria, filas escaneables y timestamp legible; `caption`, encabezados y asociación semántica si se usa tabla.
- **VIS-003 — Severidad/estado:** texto siempre visible; rojo/ámbar/azul para las tres categorías canónicas. Abierto/Resuelto se muestra por texto además del tratamiento visual.
- **VIS-004 — Acciones:** botón táctil con etiqueta accesible y dropdown elevado, adyacente y sin clipping.
- **VIS-005 — Detalle:** diálogo titulado, jerarquía clara y cierre evidente. Mensaje y stack trace separados; el stack emplea fuente monoespaciada, conserva líneas y se desplaza localmente sin ensanchar página.
- **VIS-006 — Responsive/temas:** desktop-first; tabla puede scrollear horizontalmente en su región, no la página; modal cabe en viewport con scroll interno. Clases `dark:` para superficie, texto, borde, badges y controles.
- **VIS-007 — Foco/movimiento:** focus-visible legible en ambos temas; transiciones no esenciales respetan `prefers-reduced-motion`.

## 6. Estados e interacciones

### Listado y menú

- El orden se conserva estable, sin ordenación por estado ni filtrado.
- Al abrir menú, actualizar `aria-expanded` y relación con el menú; mantener un solo menú abierto.
- Seleccionar «Ver detalle» captura el ID antes de cerrar/renderizar y restaura foco al activador al salir del modal.
- Seleccionar «Marcar como resuelto» cambia estado en la colección de sesión y vuelve a renderizar; el menú se cierra y no se muestra una acción de reabrir.
- E-005 carga como Resuelto y no ofrece resolver. Resolver E-001/E-002/E-003/E-004/E-006 no cambia el agente asociado.

### Detalle y traza

- Un único modal se llena desde el registro seleccionado; no se hardcodean errores distintos en el HTML.
- El contenido de `message` y `stackTrace` se escribe como texto. Nunca usar `innerHTML` con strings de logs.
- Backdrop cierra solo cuando el gesto/click válido se origina y termina fuera del panel. Escape cierra primero el modal; con modal cerrado cierra el menú.

## 7. Accesibilidad, responsive y temas

- Landmarks/heading existentes; tabla con `caption`, `thead`, `tbody`, `th scope="col"`; `time`/texto accesible para timestamp puede usarse sin perder UTC.
- Botones reales, nombres accesibles incluyendo ID, `aria-haspopup`, `aria-expanded`, `aria-controls`, foco visible. No convertir filas en controles.
- Badges incluyen categoría y estado como texto. Diálogo `role="dialog"`, `aria-modal="true"`, `aria-labelledby`; foco inicial, trampa Tab/Shift+Tab, Escape y retorno.
- Lectura de stack trace disponible por teclado/lector; scroll localizado con foco accesible cuando haga falta.
- Probar 1440, 1024, 768 y 375 px en claro/oscuro: sin overflow horizontal global, columna de acción alcanzable, menú visible y modal/stack scrolleables dentro del viewport.

## 8. Criterios de aceptación

1. Entrar a Registro de errores mantiene shell/tema y muestra título y descripción sin recarga.
2. La vista muestra E-001 a E-006 en orden y exactamente seis registros iniciales.
3. Timestamp UTC, agente, categoría, descripción breve y estado inicial de cada fila coinciden carácter por carácter con §3.
4. Las tres severidades tienen badges textuales diferenciables: crítico rojo, advertencia ámbar, información azul; hay más de una categoría.
5. Cada fila tiene botón accesible único; menú ofrece solo las acciones permitidas para el estado, solo uno abierto y cierre exterior/Escape/selección/navegación.
6. Dropdown de primera/última fila permanece visible y alcanzable en viewports definidos sin clipping por overflow/viewport.
7. Cada modal corresponde al registro activado y muestra ID, fecha/hora UTC, agente, severidad, mensaje, estado y traza completa coherente; E-005 se presenta Resuelto.
8. Cada stack trace incluye al menos tres líneas ficticias, conserva saltos de línea, se lee como texto y desplaza localmente sin overflow global.
9. Botón, Escape y backdrop válido cierran; click interior no cierra; foco entra, queda contenido y retorna al activador/fallback.
10. Marcar un error abierto como resuelto actualiza texto/badge, mantiene fila y al abrir detalle presenta Resuelto; desaparece la acción de resolver, sin reapertura.
11. Al recargar, los seis estados son los iniciales de §3; no hay persistencia operativa ni solicitudes de aplicación.
12. Resolver error no cambia el estado de agente (incluido Orbit Analyst `failing`) ni los KPI del Dashboard.
13. Retirar un agente en otra vista no borra los eventos ni su nombre snapshot; no se inventan relaciones IDs cuando la fuente no las define.
14. Temas claro/oscuro, focus-visible, reduced-motion, layout responsive y scroll local cumplen VIS-006/007 a 1440/1024/768/375.
15. Recorrer las cinco secciones previas no muestra regresiones ni cambios en colecciones/KPI; navegar cierra overlays de logs.
16. No se añaden filtros, búsqueda, exportación, auto-sync, telemetría, reintentos, backend/API, dependencias ni tecnologías prohibidas.

## 9. Restricciones técnicas y exclusiones

HTML5 semántico, Tailwind CSS 3.4.17 ya cargado por CDN y JavaScript vanilla en la IIFE existente. No React/Vue/Angular/TypeScript, build, API/backend, dependencias, CSS personalizado, `<style>`, atributos `style` o persistencia de logs/resoluciones. No modificar otras vistas, fuentes globales, documentos SDD anteriores ni artefactos Stitch durante implementación de esta sección. El estado de tema global existente no se confunde con persistencia operativa de errores.

## 10. Trazabilidad

| Fuente | Requisitos concretados |
|---|---|
| `SPECS.md` §6.6 | Listado, badges, menú, resolución local, modal, mensaje/traza, estado y cierres. |
| `SPECS.md` §8 | Los seis registros, nombres, timestamp a minuto, descripción y estado exactos; trazas ficticias mínimas. |
| `SPECS.md` §§3–5, 9–10 | Shell SPA, modelo compartido, accesibilidad, responsive, tema y límites técnicos. |
| `SPECS.md` §12, criterios 17–25 | Requisitos de listado/detalle, dropdowns, modales, teclado, tablas, tema, resolución y regresión. |
| `specs/003-agents/spec.md` | Relación histórica: eliminar agente no altera errores ni sus nombres históricos; estado `failing` independiente. |
| `specs/005-contracts/spec.md` | Patrón de snapshots y prioridad de modelo canónico sobre diseño referencial; no mezclar conceptos comerciales/logs. |
| `DESIGN.md` | Dirección visual, contraste, superficies, densidad y estados; subordinado a fuentes normativas. |
| Stitch `errores/code.html` | Referencia de composición únicamente; excluir filtros, métricas, auto-sync, datos/trazas ampliados no autorizados. |

## 11. Ambigüedades y decisiones

1. **Timestamp:** fuente define minuto y UTC, no segundos. Se conserva esa precisión; no copiar segundos inventados por Stitch.
2. **Trazas y mensaje completo:** fuente pide trazas ficticias de al menos tres líneas, pero no entrega sus literales ni mensajes ampliados. La implementación deberá añadir fixtures demostrativos internamente coherentes; la descripción breve canónica no cambia. Revisión de producto puede sustituirlos por textos aprobados antes de implementar.
3. **E-005 y agentes:** `Verde Workflow` no aparece entre agentes activos del modelo actual; no asumir que un nombre parecido es el mismo agente. Mostrar snapshot histórico y enlazar ID solo con confirmación explícita de fuente.
4. **Tipo vs severidad:** tabla de datos usa `Tipo`, UI normativa usa `Tipo/Severidad`; este documento los trata como una categoría canónica única (Crítico/Advertencia/Información), sin inventar subtipos técnicos.
5. **Resolución:** menú sin acción para Resuelto, incluyendo E-005; no hay reapertura, acorde a preferencia explícita de `SPECS.md`.
