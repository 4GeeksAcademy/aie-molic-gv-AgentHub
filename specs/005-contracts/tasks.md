# TASKS-005 — Implementación futura: Contrataciones

- **Derivadas de:** [`spec.md`](spec.md) y [`plan.md`](plan.md).
- **Estado:** todas las tareas pendientes; no se ha implementado Contrataciones.
- **Convención:** cada tarea incluye requisitos, archivos previstos, dependencias y criterio verificable. No marcar `[x]` sin evidencia real durante implementación futura.
- **Archivos previstos en implementación futura:** `index.html`, `app.js`. Este documento SDD no autoriza tocar otras vistas ni fuentes.
- **Secuencia:** las diez fases siguen el orden solicitado; tareas posteriores pueden depender de fases anteriores.

## Fase 1 — Modelo de contratos y snapshots

### T001 — Definir colección canónica de contratos
- **Requisitos:** FR-003, FR-013–014; AC-002, AC-11, AC-13.
- **Archivos:** `app.js`.
- **Depende de:** aprobación de SPEC/PLAN.
- **Criterio verificable:** una `contractsCollection` compartida contiene exactamente C-1001–C-1004 en orden canónico, con IDs estables, referencias de cliente/agente, fechas ISO, estado y líneas snapshot; no se duplica la colección en HTML ni se persiste.
- [ ]

### T002 — Incorporar snapshots de las líneas comerciales
- **Requisitos:** FR-005–006, FR-013; AC-004–005, AC-09, AC-11.
- **Archivos:** `app.js`.
- **Depende de:** T001.
- **Criterio verificable:** líneas contienen skill ID/nombre snapshot, precio y subtotal numérico; sumas dan exactamente $500, $400, $450 y $450; cambios a catálogo de Skills no pueden recalcularlas.
- [ ]

### T003 — Preservar snapshots de entidades relacionadas
- **Requisitos:** FR-004, FR-013; AC-002, AC-08, AC-11.
- **Archivos:** `app.js`.
- **Depende de:** T001.
- **Criterio verificable:** contratos guardan snapshots suficientes de empresa/contacto/agente; C-1004 refiere U-005/Valentina Cruz y A-001/Atlas; al faltar entidad, el contrato sigue renderizable con snapshot sin mutación del catálogo.
- [ ]

## Fase 2 — Integración de vista y tabla

### T004 — Sustituir placeholder de Contrataciones
- **Requisitos:** FR-001–002; VIS-001; AC-001, AC-14.
- **Archivos:** `index.html`.
- **Depende de:** aprobación SPEC/PLAN.
- **Criterio verificable:** contenido interno del placeholder usa encabezado «Contrataciones», descripción neutral y región de vista sin duplicar shell; sidebar, IDs de routing, tema y destinos previos permanecen intactos.
- [ ]

### T005 — Crear tabla semántica y región scrolleable
- **Requisitos:** FR-004, FR-015–016; VIS-002, VIS-008; AC-003, AC-12.
- **Archivos:** `index.html`.
- **Depende de:** T004.
- **Criterio verificable:** tabla con caption, thead/tbody, siete encabezados Cliente, Agente, Skills contratadas, Fecha de inicio, Fecha de fin, Importe pagado y Acciones; wrapper con nombre accesible y scroll horizontal local.
- [ ]

### T006 — Renderizar cuatro filas desde el modelo
- **Requisitos:** FR-003–007; VIS-003–005; AC-002, AC-004–006.
- **Archivos:** `app.js`, `index.html`.
- **Depende de:** T001–T005.
- **Criterio verificable:** render muestra exactamente cuatro filas en orden y datos canónicos; cliente/agente resueltos por IDs con fallback snapshot, chips con nombres históricos, fecha civil legible, importe USD coherente y estado textual; inserción dinámica segura mediante DOM/textContent.
- [ ]

### T007 — Implementar empty state defensivo
- **Requisitos:** FR-014; criterio de robustez de §2 y §8.
- **Archivos:** `index.html`, `app.js`.
- **Depende de:** T004–T006.
- **Criterio verificable:** colección vacía no deja filas/acciones huérfanas y muestra texto neutral de estado vacío sin botón de alta ni crear datos; dataset canónico sigue mostrando cuatro filas.
- [ ]

## Fase 3 — Menús de acciones por fila

### T008 — Crear activador y dropdown por contrato
- **Requisitos:** FR-008; VIS-006; AC-003, AC-07.
- **Archivos:** `index.html`, `app.js`.
- **Depende de:** T005–T006.
- **Criterio verificable:** cada fila tiene botón nativo con nombre «Acciones para contrato C-…», `aria-expanded`, `aria-controls` y menú con una única acción «Ver detalle»; no CRUD ni acciones extra.
- [ ]

### T009 — Gestionar estado, cierre y foco del menú
- **Requisitos:** FR-009, FR-012, FR-016; AC-07, AC-10.
- **Archivos:** `app.js`.
- **Depende de:** T008.
- **Criterio verificable:** un solo menú abierto; click exterior, Escape, selección y navegación cierran; Escape restaura foco al activador; click interno no se trata como exterior; activación por teclado y estado ARIA coherentes.
- [ ]

### T010 — Evitar clipping del menú en la tabla
- **Requisitos:** FR-015; VIS-006, VIS-008; AC-07, AC-12.
- **Archivos:** `index.html`, `app.js`.
- **Depende de:** T008–T009.
- **Criterio verificable:** menú de primera/última fila permanece dentro del viewport y no queda cortado por `overflow-x-auto`; posicionamiento vanilla/capa exterior sin dependencia adicional.
- [ ]

## Fase 4 — Modal de detalle y desglose

### T011 — Crear diálogo de detalle reutilizable
- **Requisitos:** FR-010–012, FR-016; VIS-007; AC-08, AC-10.
- **Archivos:** `index.html`.
- **Depende de:** T004–T005, T008.
- **Criterio verificable:** una estructura modal/dialog nombrada con título, botón visible de cierre, backdrop y contenedor de contenido; sin datos de contrato hardcodeados ni controles de edición.
- [ ]

### T012 — Renderizar datos completos del contrato seleccionado
- **Requisitos:** FR-010, FR-013; VIS-003–005, VIS-007; AC-08–09, AC-11.
- **Archivos:** `app.js`, `index.html`.
- **Depende de:** T001–T003, T011.
- **Criterio verificable:** activar cada fila muestra ID, cliente y representante, agente, fechas, estado, total y todas sus líneas con skill, precio/subtotal; C-1004 muestra U-005 y A-001 correctamente.
- [ ]

### T013 — Calcular y validar el desglose monetario
- **Requisitos:** FR-006, FR-010, FR-013; AC-05, AC-09, AC-11.
- **Archivos:** `app.js`.
- **Depende de:** T002, T012.
- **Criterio verificable:** suma de subtotales snapshot genera total mostrado y concuerda con el importe contractual esperado; formato USD uniforme y sin leer tarifas actuales del catálogo.
- [ ]

### T014 — Gestionar teclado, backdrop y retorno de foco
- **Requisitos:** FR-011–012, FR-016; AC-10.
- **Archivos:** `app.js`.
- **Depende de:** T009, T011–T012.
- **Criterio verificable:** foco inicial, contención Tab/Shift+Tab, cierre por botón/Escape/backdrop válido, click interior no cierra, Escape cierra solo capa superior, foco retorna a activador o fallback; navegación cierra diálogo.
- [ ]

## Fase 5 — Consistencia e inmutabilidad de snapshots

### T015 — Asegurar formato correcto de fechas civiles
- **Requisitos:** FR-007; AC-06.
- **Archivos:** `app.js`.
- **Depende de:** T006, T012.
- **Criterio verificable:** las ocho fechas iniciales se presentan uniformemente y de forma no ambigua; pruebas confirman que ninguna zona horaria altera el día ISO.
- [ ]

### T016 — Aislar contratos de cambios en skills/agentes
- **Requisitos:** FR-013; AC-11.
- **Archivos:** `app.js`.
- **Depende de:** T001–T003, T006, T012.
- **Criterio verificable:** prueba antes/después de eliminar o cambiar temporalmente una skill y un agente de colecciones relacionadas demuestra que ID de contrato, nombres snapshot, líneas, fechas, estado, subtotales y total no cambian; no se generan referencias visibles como entidades vigentes si no existen.
- [ ]

### T017 — Mantener independencia de métricas del Dashboard
- **Requisitos:** fuera de alcance §2 y FR-006, FR-014; AC-05, AC-13–14.
- **Archivos:** `app.js` (validación del estado), sin cambio del Dashboard.
- **Depende de:** T001–T003.
- **Criterio verificable:** las sumas de contratos no alimentan ingresos, gráficos ni métricas mensuales del Dashboard; no se modifica la vista Dashboard ni sus cifras canónicas.
- [ ]

## Fase 6 — Navegación, temas y estados

### T018 — Conectar vista al router existente
- **Requisitos:** FR-001, FR-012; VIS-001; AC-01, AC-10, AC-13.
- **Archivos:** `index.html`, `app.js`.
- **Depende de:** T004, T008–T014.
- **Criterio verificable:** navegación SPA entra/sale sin reload, activa el destino existente y limpia menú/modal sin alterar datos; otros destinos siguen operando.
- [ ]

### T019 — Completar tema claro/oscuro y foco visible
- **Requisitos:** FR-016–017; VIS-005–008; AC-12.
- **Archivos:** `index.html`.
- **Depende de:** T005–T014.
- **Criterio verificable:** tabla, estados, chips, menú, backdrop/modal y controles tienen estilos legibles en claro/oscuro, contraste y focus-visible; colores no comunican estados por sí solos.
- [ ]

### T020 — Respetar movimiento reducido y estado de overlays
- **Requisitos:** FR-017; VIS-008; AC-12.
- **Archivos:** `index.html`, `app.js`.
- **Depende de:** T009–T014, T019.
- **Criterio verificable:** transiciones no esenciales se reducen con `prefers-reduced-motion`; apertura/cierre no deja scroll bloqueado, listener duplicado ni overlay huérfano tras navegación.
- [ ]

## Fase 7 — Integración futura con colecciones compartidas

### T021 — Resolver cliente y agente por IDs con fallback
- **Requisitos:** FR-004, FR-013; AC-02, AC-08, AC-11.
- **Archivos:** `app.js`.
- **Depende de:** T001, T003, T006, T012, T016.
- **Criterio verificable:** para entidades existentes se respeta referencia estable y para eliminadas se muestra snapshot comercial con indicación histórica neutral; ningún lookup fallido impide abrir la fila o modal.
- [ ]

### T022 — Verificar límites de acoplamiento y persistencia
- **Requisitos:** FR-013–014; restricciones técnicas §9; AC-11, AC-13–14.
- **Archivos:** `app.js` (validación).
- **Depende de:** T016–T021.
- **Criterio verificable:** contratos no mutan `usersCollection`, `agentsCollection`, `skillsCollection`; no se usa localStorage para contratos, no hay fetch/API y recargar restaura datos canónicos.
- [ ]

## Fase 8 — Accesibilidad y responsive

### T023 — Verificar interacción accesible de tabla y overlays
- **Requisitos:** FR-009–012, FR-016; VIS-006–007; AC-07, AC-10, AC-12.
- **Archivos:** `index.html`, `app.js`.
- **Depende de:** T005, T008–T014, T019–T020.
- **Criterio verificable:** recorrido solo teclado de tabla, menú y modal funciona; roles, labels, expanded/controls y nombres son correctos; lector de pantalla distingue estado y encabezados; foco nunca se pierde.
- [ ]

### T024 — Validar layout en cuatro viewports y dos temas
- **Requisitos:** FR-015, FR-017; VIS-002, VIS-004, VIS-007–008; AC-12.
- **Archivos:** `index.html`.
- **Depende de:** T005–007, T010–014, T019–020.
- **Criterio verificable:** inspección a 1440, 1024, 768 y 375 px en claro/oscuro confirma sin overflow global, scroll de tabla confinado con acciones alcanzables, chips legibles, menú no cortado y modal con scroll interno dentro del viewport.
- [ ]

## Fase 9 — No regresión y alcance

### T025 — Recorrer destinos existentes para detectar regresiones
- **Requisitos:** FR-001, FR-012, FR-014; VIS-001; AC-01, AC-13.
- **Archivos:** `index.html`, `app.js`.
- **Depende de:** T018–T024.
- **Criterio verificable:** recorrido Dashboard, Usuarios, Agentes, Skills y Contrataciones confirma navegación, colecciones compartidas, overlays y tema; ningún cambio contractual altera vistas/datos de destinos previos.
- [ ]

### T026 — Auditar restricciones técnicas y funcionalidades excluidas
- **Requisitos:** FR-008, FR-014–017; fuera de alcance §2 y §9; AC-13–14.
- **Archivos:** `index.html`, `app.js` (revisión).
- **Depende de:** T001–T025.
- **Criterio verificable:** revisión confirma vanilla JS, HTML semántico y Tailwind CDN existente; no framework, TS, backend, nueva dependencia/build, CSS propio/inline, persistencia de contratos, CRUD, filtro/búsqueda/paginación, cifras/sync no autorizadas de Stitch.
- [ ]

## Fase 10 — Validación final

### T027 — Validar contratos canónicos y sumas
- **Requisitos:** FR-003–007, FR-010; AC-02–09.
- **Archivos:** `index.html`, `app.js` (validación).
- **Depende de:** T001–T026.
- **Criterio verificable:** checklist de las cuatro filas y cuatro modales confirma todos los IDs, empresas/usuarios, agentes, fechas, nombres/importe por skill, estados, totales, moneda y sumas exactas; anotar evidencia real, no supuesta.
- [ ]

### T028 — Ejecutar chequeos estáticos y revisar cambios
- **Requisitos:** §9 y todos los criterios de aceptación aplicables.
- **Archivos:** `index.html`, `app.js` (validación).
- **Depende de:** T001–T027.
- **Criterio verificable:** `node --check app.js` y `git diff --check` pasan; revisar diff para scope y que sólo cambien archivos de implementación previstos más progreso explícito de este task file, sin fuentes previas/Stitch.
- [ ]

### T029 — Registrar verificación visual, accesible y funcional
- **Requisitos:** FR-001–017; AC-001–014.
- **Archivos:** `index.html`, `app.js` (validación).
- **Depende de:** T023–T028.
- **Criterio verificable:** matriz documenta navegador disponible, operaciones probadas, foco/teclado, estados claro/oscuro, reduced-motion, dimensiones 1440/1024/768/375 y limitaciones; no se afirma una prueba que no se haya ejecutado.
- [ ]

## Trazabilidad de fases

| Fase | Tareas | Requisitos principales | Verificación |
|---|---|---|---|
| 1. Modelo/snapshots | T001–T003 | FR-003–006, FR-013–014 | Cuatro registros y snapshots íntegros |
| 2. Vista/tabla | T004–T007 | FR-001–007, FR-015–016 | Estructura, filas, formato y vacío |
| 3. Menús | T008–T010 | FR-008–009, FR-012, FR-015–016 | Acción única, teclado y no clipping |
| 4. Modal | T011–T014 | FR-010–012, FR-016 | Desglose exacto, foco/cierre |
| 5. Inmutabilidad | T015–T017 | FR-006–007, FR-013–014 | Fechas, no cascada, Dashboard independiente |
| 6. Navegación/tema | T018–T020 | FR-001, FR-012, FR-017 | Shell, overlays, tema y movimiento |
| 7. Relaciones | T021–T022 | FR-004, FR-013–014 | Fallback, aislamiento y no persistencia |
| 8. Responsive/a11y | T023–T024 | FR-009–017 | Teclado, temas y viewports |
| 9. Regresión/alcance | T025–T026 | FR-001, FR-008, FR-014–017 | Destinos previos y exclusiones |
| 10. Validación final | T027–T029 | FR-001–017; AC-001–014 | Datos, chequeos y matriz de evidencia |
