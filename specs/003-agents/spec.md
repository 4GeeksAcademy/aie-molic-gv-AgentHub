# SPEC-003 — Gestión de agentes

- **Derivada de:** [`../../SPECS.md`](../../SPECS.md); `SPECS.es.md` se consulta como traducción.
- **Referencias subordinadas:** [`../../design/DESIGN.md`](../../design/DESIGN.md) y [`../../design/stitch/agentes/code.html`](../../design/stitch/agentes/code.html), con `screen.png` como referencia visual secundaria.
- **Estado:** propuesta documental para aprobación; no autoriza implementar código.
- **Alcance:** definir la vista Agentes integrada al shell SPA existente.
- **Precedencia:** `SPECS.md` > requisitos 4Geeks > `DESIGN.md` > Stitch. La imagen Stitch está presente en el workspace, pero esta sesión no pudo inspeccionarla visualmente; no se toman decisiones de requisito a partir de ella.

## 1. Objetivo

Permitir al administrador inspeccionar los cuatro agentes canónicos, sus propietarios, estados y skills; editar en memoria el system prompt de un agente y eliminar agentes de la sesión mediante confirmación explícita. La vista debe compartir la fuente de agentes con Dashboard y respetar relaciones, KPI, tema y navegación existentes.

## 2. Alcance

### Incluido

- Vista Agentes dentro del shell actual, con título y descripción concisa.
- Listado de los cuatro registros iniciales canónicos, identificados establemente por A-001–A-004.
- Nombre, propietario humano/empresa, estado textual y sección inicialmente contraída con nombres de skills asociadas.
- Un acordeón de skills independiente por agente; dropdown por agente con “Configurar” y “Eliminar”.
- Modal de configuración con propietario, estado, prompt precargado y editable, guardado local de sesión y cancelación sin guardar.
- Confirmación antes de eliminar; eliminación solo de la colección de agentes en memoria.
- Relaciones por IDs, coherencia con los recuentos KPI y catálogo de skills; estado vacío cuando no hay agentes.
- Operación por teclado, foco, modal accesible, modo claro/oscuro y adaptación responsive.

### Fuera de alcance

Crear agentes o skills; editar nombre, propietario, estado o asignaciones; ejecutar agentes, reintentar pipelines, pausa/reanudación, métricas de runtime, telemetría, permisos, facturación, búsqueda, filtros, ordenación, paginación, exportación y navegación lateral móvil propia. Sin backend, API, llamadas de aplicación, persistencia de entidades o acciones reales. La eliminación no cambia usuarios, contratos ni registros de error; sus snapshots/relaciones existentes se conservan y no se borran en cascada.

## 3. Modelo canónico y fuente de verdad

La colección única existente es `mockData.agentsCollection` en `app.js`. La vista debe consumir esa misma colección; no crear una segunda lista, duplicar datos de agentes en HTML, ni modificar la fuente de métricas para sostener contadores independientes. Propiedades actuales: `id`, `name`, `ownerId`, `ownerCompany`, `status`, `skillIds`; el prompt de sistema se añadirá a cada registro manteniendo su ID estable.

| ID | Nombre | Propietario (`ownerId` / empresa) | Estado canónico | Skills (`skillIds`) |
|---|---|---|---|---|
| A-001 | Atlas Researcher | U-001 / Northstar Labs | `active` / Activo | S-001, S-002 |
| A-002 | Nova Support | U-002 / BrightPath | `active` / Activo | S-003, S-004 |
| A-003 | Orbit Analyst | U-003 / Orbit Data | `failing` / Fallando | S-002, S-001 |
| A-004 | Verde Workflow | U-004 / Verde & Co. | `inactive` / Inactivo | S-004, S-003 |

- Resolver persona por `ownerId` usando la colección canónica de usuarios compartida; mostrar nombre y empresa. `ownerCompany` puede corroborar/representar la empresa, pero no crear un propietario duplicado ni reemplazar `ownerId` como relación. Si la persona no está disponible en sesión, mostrar empresa y una etiqueta neutral de propietario no disponible, sin fallar.
- Resolver cada skill mediante `skillIds` contra el catálogo compartido por ID. Mostrar solo nombres canónicos existentes. Eliminar agente no elimina skills.
- La colección inicial tiene cuatro registros, dos `active`, uno `failing` y uno `inactive`. Dashboard cuenta exclusivamente `active` como activos (2) y `failing` como fallando (1). Tras guardar prompt o eliminar, los KPI deben seguir derivados de la misma colección y actualizarse coherentemente; eliminar actualiza el conteo de activos/fallando según el estado borrado. El inactivo no cuenta como activo.
- Los contratos retienen sus referencias y líneas comerciales como snapshots independientes; errores conservan su agente/nombre histórico. No cascada ni mutación de esas entidades. Skills deriva sus recuentos desde agentes aún presentes, por lo que al eliminar cambian los recuentos pertinentes.
- Cada agente tendrá un system prompt ficticio, distinto, de 2–4 frases, legible y seguro; sin credenciales, secretos, instrucciones peligrosas ni afirmaciones de ejecución real. Guardar modifica solo ese campo en el objeto del agente local; recargar restaura el prompt canónico.

## 4. Requisitos funcionales

| ID | Requisito |
|---|---|
| FR-001 | La vista se integra en `#agentes`/`data-page="agentes"` del shell vigente. Sidebar, topbar, ruta activa, preferencia de tema y otras vistas permanecen. |
| FR-002 | Encabezado visible “Agentes” y descripción breve de consulta de propietario, estado y skills; sin KPI adicionales ni afirmaciones de flota/rendimiento no respaldadas. |
| FR-003 | La carga inicial muestra exactamente los cuatro registros canónicos A-001–A-004 en el orden indicado, consumiendo `mockData.agentsCollection`. Cada tarjeta/fila presenta nombre e ID, propietario humano y empresa, estado y acciones. |
| FR-004 | El estado muestra etiquetas Activo, Fallando o Inactivo conforme a `active`, `failing`, `inactive`; verde, rojo y gris pueden reforzar el significado, pero texto siempre visible. |
| FR-005 | Cada agente presenta un botón de acordeón con resumen de skills asociadas y una región etiquetada. Todos inician cerrados; cada acordeón opera independientemente y expone `aria-expanded`/`aria-controls`. Las skills se resuelven por ID compartido y se muestran por nombre. |
| FR-006 | La transición de abrir/cerrar es breve, aprox. 150–250 ms, y respeta `prefers-reduced-motion`. El contenido contraído no queda enfocable ni expuesto como visible a lectores de pantalla; al expandir queda disponible. |
| FR-007 | Cada menú de acciones ofrece exactamente “Configurar” y “Eliminar”. Solo un menú abierto; botón identificado por agente y estado `aria-expanded`, con cierre por fuera, Escape, acción y navegación. No se recorta por overflow de listado/contenedor. |
| FR-008 | “Configurar” abre modal para el agente elegido con nombre, propietario, estado actual y system prompt precargado en `textarea` etiquetado. Incluye la nota exacta “Cambios de demostración; no se guardan en un servidor”. |
| FR-009 | Guardar confirma el valor actual del textarea en memoria para el agente seleccionado, cierra el modal y anuncia una confirmación no intrusiva con `aria-live="polite"`. No cambia otros campos ni persiste. Cancelar, botón de cierre, Escape o backdrop descartan cambios sin guardar. |
| FR-010 | “Eliminar” abre confirmación accesible que identifica el agente y deja claro que solo se retira de la sesión. Abrir/cancelar no muta datos; confirmar elimina por ID únicamente de `agentsCollection`, cierra controles y actualiza lista, KPI y recuentos derivados de skills. |
| FR-011 | La eliminación no modifica usuarios, skills, contratos ni errores, no escribe datos operativos en `localStorage` ni contacta servicios; recargar restaura el estado canónico. Lista vacía presenta EmptyState accesible. |
| FR-012 | Una acción resuelve el registro seleccionado por ID, no valores hardcodeados de la presentación. Tras re-render se conservan IDs/orden de restantes y se enfoca un destino lógico; navegación cierra menú/modal. |
| FR-013 | Dropdown no se cierra prematuramente al seleccionar una acción. El manejo de clic exterior reconoce la ruta original del evento/delegación cuando el DOM se re-renderiza y excluye activador y menú. |
| FR-014 | Los diálogos tienen título accesible, `role="dialog"`, `aria-modal="true"`, foco dentro mientras abiertos, nombre en controles, cierre por botón/Escape/backdrop y retorno lógico de foco. Clic dentro no cierra; el backdrop no cierra una interacción iniciada dentro del panel. Confirmación puede cerrar con Escape como cancelación segura. |
| FR-015 | La vista y estados se adaptan a escritorio/tablet/móvil sin overflow global; tarjetas/filas conservan propietario, estado, acciones y acceso a skills. Menú/modal caben en viewport y pueden desplazarse internamente si el prompt es largo. |
| FR-016 | Clases Tailwind base y `dark:` cubren tarjetas/listado, acordeón, badges, dropdown, modal, confirmación, feedback y foco en ambos temas. |
| FR-017 | La vista no añade búsquedas, filtros, acciones de ejecución o contenidos de telemetría no definidos por `SPECS.md`; no cambia entidades fuera del alcance. |

## 5. Requisitos visuales

- **VIS-001 Shell:** reutilizar encabezado, sidebar, topbar y área `main`; mantener el patrón existente sin replicar navegación ni copiar Stitch.
- **VIS-002 Identidad:** jerarquía clara, sans-serif del sistema y paleta/colores de `SPECS.md` y `DESIGN.md`. `DESIGN.md` favorece densidad operativa, bordes estructurales y elevación sobria; no prevalece sobre legibilidad/accesibilidad de SPEC.
- **VIS-003 Elemento de agente:** tarjeta/lista compacta con nombre prominente, ID como metadato, propietario/empresa, badge textual y botón kebab. Debe poder leerse como registro administrativo, no como unidad real de runtime.
- **VIS-004 Estados:** badge verde Activo, rojo Fallando, gris Inactivo, con etiqueta textual; respetar contraste en claro/oscuro.
- **VIS-005 Skills:** resumen expandible reconocible como botón, lista legible de chips/nombres, cerrado inicialmente; solo información vinculada por `skillIds`, sin telemetría/“capacidades” inventadas.
- **VIS-006 Dropdown:** anclado a activador, capa elevada discreta, opción destructiva reconocible y no recortada. Kebab con nombre “Acciones para [nombre]”.
- **VIS-007 Configuración:** modal con encabezado y nombre del agente, atributos en etiquetas/valores y textarea amplia, con etiqueta explícita, scroll vertical si hace falta y texto ficticio completo legible. Nota de demostración visible. No copiar prompt de Stitch salvo que coincida con texto canónico aprobado.
- **VIS-008 Confirmación/feedback:** identificación inequívoca, Cancelar como opción segura y confirmación claramente destructiva; mensaje de guardado claro y breve, no afirma persistencia remota.
- **VIS-009 Responsive:** escritorio puede usar tarjetas o filas; móvil apila sin omitir datos/acciones. A 375 px no hay overflow horizontal de página; modal restringe altura al viewport.
- **VIS-010 Referencias Stitch:** se descartan números de flota, tasa operativa, alertas, filtros/búsqueda, quick actions, botones reintentar/despertar, motor/modelo, tokens, latencia, integraciones, capacidades no modeladas, credenciales y cualquier dato no establecido por SPEC. No cargar fuentes, imágenes, Material Symbols ni código exportado.

## 6. Interacciones y estados

### Carga/listado

- Render inicial de A-001 a A-004 desde fuente compartida; acordeones cerrados. Se mantienen los estados originales aunque un registro asociado esté eliminado localmente en otra vista solo si es independiente del ciclo de sesión actual; en la aplicación actual no hay eliminación de agentes externa.
- Al salir de Agentes se cierra dropdown y cualquier modal; el tema y la navegación no cambian por renderizar la lista.

### Acordeón de skills

- Botón nativo con nombre “Skills de [nombre]”, `aria-expanded` y `aria-controls` asociados a panel único.
- Abrir/cerrar un agente no altera otros. Presentación animada con transición breve, `motion-reduce` sin transición y contenido correctamente oculto/deshabilitado al estar cerrado. No mostrar métricas o acciones en el panel de skills.

### Menú

- Un `openAgentMenuId` a la vez. Abrir otro cierra anterior; Escape lo cierra y devuelve foco al activador vigente. Clic exterior, acción o navegación lo cierra.
- Las opciones ejecutan la acción del ID seleccionado. La selección captura la referencia del activador antes de cerrar/re-renderizar, para que el listener global no anule el clic.

### Configuración

- Guardar valor inicial del prompt para descartar cambios y mantener selección por ID. Abrir el modal pone foco en encabezado enfocable o textarea; recorrido Tab/Shift+Tab queda contenido.
- Cancelar/cerrar/Escape/backdrop no altera prompt. Guardar actualiza prompt local, cierra, devuelve foco y anuncia “Configuración de [nombre] guardada en esta sesión.” El texto puede editarse libremente; la UI no lo ejecuta ni valida como instrucción real.

### Eliminación

- Confirmación identifica nombre/ID; cancelar o cerrar no altera colección. Confirmar filtra solo el ID, actualiza fuente compartida y vuelve a renderizar la vista si está activa; Dashboard y Skills consultan derivados dinámicos al mostrarse/actualizarse.
- Contratos siguen mostrando snapshot de agente y líneas; errores mantienen referencias históricas; usuarios y skills sobreviven. No reasignar agentes ni limpiar referencias históricas.
- Tras confirmar, foco a la tarjeta/acción cercana siguiente, anterior o heading/empty state. EmptyState informa que no hay agentes disponibles en esta sesión y no ofrece acciones huérfanas.

## 7. Accesibilidad, responsive y temas

- Reutilizar landmarks/headings del shell; controles reales `button`; acordeón `aria-expanded` y `aria-controls`; botones de icono con nombre accesible, decoración `aria-hidden`.
- El menú y confirmación/modal se operan con teclado; Escape cierra contexto superior sin propagación. Foco visible. Si se emplea `role="menu"`, completar patrón de teclado; se prefiere grupo de botones normales si se evita semántica de menú completa.
- Modal nombrado, foco contenido, cierre por botón/Escape/backdrop, no cierre al hacer clic dentro y restauración al activador si sigue conectado. En eliminar, fallback a registro vecino o encabezado.
- `aria-live="polite"` para confirmación de guardado/eliminación sin anunciar todo el listado.
- Contraste claro/oscuro; estados incluyen texto; respetar movimiento reducido.
- Comprobar 1440, 1024, 768 y 375 px. A 375 px el propietario y controles no desaparecen; acordeones y dropdown caben; modal tiene max-height y scroll interno de prompt/contenido sin scroll global causado por ancho.

## 8. Criterios de aceptación

1. Navegar a Agentes conserva el shell, muestra encabezado y sección activa correcta sin recargar.
2. La carga inicial muestra A-001 Atlas Researcher, A-002 Nova Support, A-003 Orbit Analyst y A-004 Verde Workflow en orden, con los propietarios/empresas canónicos y estado textual correcto.
3. La vista consume `mockData.agentsCollection`; no existe una segunda fuente de registros. Inicialmente contiene 2 active, 1 failing y 1 inactive; Dashboard muestra 2 activos y 1 fallando derivados de esa colección.
4. Cada agente tiene acordeón cerrado inicialmente, botón con nombre y `aria-expanded=false`, `aria-controls` y nombres skills exactos derivados de sus IDs.
5. Cada acordeón abre/cierra independientemente, su contenido queda disponible/oculto correctamente a tecnologías de asistencia, la transición es breve y movimiento reducido la suprime.
6. Badge muestra Activo/Fallando/Inactivo junto a color verde/rojo/gris; el significado no depende solo de color.
7. El menú de cada agente ofrece exactamente Configurar y Eliminar, identifica el agente y solo hay uno abierto; no se recorta y cierra por fuera, Escape, selección o navegación.
8. Configurar muestra el agente seleccionado, owner/empresa, estado y prompt canónico ficticio de 2–4 frases en textarea etiquetado; nota exacta de no persistencia de servidor visible.
9. Guardar cambia solo el prompt en el estado compartido local, cierra el modal y anuncia éxito; el cambio permanece durante sesión y recarga restaura el prompt inicial.
10. Cancelar, cierre, Escape o backdrop descartan cambios no guardados; clic dentro no cierra; el foco queda contenido y vuelve lógicamente al activador.
11. Eliminar abre confirmación del nombre/ID correcto y no cambia estado hasta confirmar; cancelar/Escape/backdrop conserva registro.
12. Confirmar elimina solo el agente seleccionado en memoria, re-renderiza la lista, preserva orden de restantes y actualiza KPI/contadores derivados sin tocar otras entidades.
13. Tras eliminar un agente, los recuentos de skills reflejan solo agentes existentes; usuarios, catálogo de skills, contratos y errores no se borran ni alteran. Contratos/errores conservan su snapshot/referencia.
14. Recarga restablece los cuatro agentes y prompts canónicos; no hay persistencia operativa local ni solicitudes de aplicación.
15. Si se eliminan todos, se muestra estado vacío accesible; foco se restaura en fila vecina o heading/estado vacío.
16. En 1440/1024/768/375 px el contenido es legible; en móvil no hay overflow global, propietario/acciones permanecen accesibles y modal/prompt se desplazan dentro del viewport.
17. Claro/oscuro estilizan listado, badges, acordeones, dropdowns, diálogos, feedback y foco con contraste; toda interacción es usable por teclado y no depende de color.
18. No se presentan búsqueda/filtros, telemetría, acciones de runtime, datos ficticios no canónicos ni implementación visual copiada de Stitch.
19. La implementación posterior se limita a HTML semántico existente, Tailwind CDN y JS vanilla; no frameworks, TypeScript, APIs, backend, build, CSS propio ni estilos inline.

## 9. Restricciones técnicas y de alcance

- Seguir §3 de `SPECS.md`: HTML5 semántico, Tailwind por CDN, JavaScript vanilla, mocks locales; tema mediante clase `dark` raíz y utilidades `dark:`.
- Sin frameworks, TypeScript, API/backend, dependencias instaladas, herramientas/build, CSS propio, `<style>` ni atributos `style` inline.
- No copiar markup/scripts/clases arbitrarias ni fuentes/assets Stitch; reinterpretación visual solo con Tailwind existente.
- Reutilizar `mockData.agentsCollection`, usuarios y catálogo compartidos. Cambiar únicamente prompt o eliminar elemento de agentes en memoria.
- No persistir prompt/eliminación en localStorage; solo la preferencia de tema vigente puede estar allí.
- No crear funciones, entidades ni datos de runtime. No cascada a contratos/errores/usuarios/skills.

## 10. Trazabilidad

| Fuente/área | Concreción |
|---|---|
| `SPECS.md` §6.3 | FR-003–FR-010; AC-002, AC-004–AC-005, AC-007–AC-008. |
| `SPECS.md` §8 | IDs/nombres/owners/estados/skills y prompts 2–4 frases; relaciones y KPI. |
| `SPECS.md` §§3–5, 9–10 | Stack, shell, tema, menús, diálogos, teclado, responsive y restricciones. |
| `SPECS.md` AC-001–AC-006, AC-011–AC-013, AC-019–AC-025 | Coherencia global, listado, acordeón, configuración, tema, responsive, accesibilidad y operación solo local. |
| Requisitos 4Geeks / alcance | Listado mínimo canónico, skills expandibles, configurar prompt, confirmar eliminación. No se amplía con filtros/telemetría de Stitch. |
| `DESIGN.md` | Paleta semántica, superficies estructurales, filas/tarjetas legibles, foco y elevación sobria. |
| Stitch agentes | Referencia subordinada de composición; se excluyen métricas de flota, filtros, runtime, capacidades no canónicas, botones de ejecución, scripts inline, fuentes/assets y datos inventados. Imagen encontrada pero no inspeccionable en esta sesión. |
| Shell (`index.html`, `app.js`) | Sección placeholder existente; `mockData.agentsCollection`, `usersCollection`, Tailwind CDN, tema y navegación compartidos; KPI activos/fallando derivables. |
| Privacidad/coherencia | Guardar solo prompt temporal en mock; eliminación solo de agentes; no borrar contratos/errores por tratarse de relaciones/snapshots independientes. |
