# TASKS-006 — Implementación futura: Registro de errores

- **Derivadas de:** [`spec.md`](spec.md) y [`plan.md`](plan.md).
- **Estado:** todas las tareas pendientes; documentación propuesta, sin implementación.
- **Convención:** marcar `[x]` solo tras ejecutar y registrar evidencia del criterio completo.
- **Archivos previstos:** `index.html`, `app.js` y este archivo únicamente para seguimiento.
- **Secuencia:** seguir dependencias; no empezar implementación sin aprobar SPEC/PLAN.

## Fase 1 — Modelo mock de errores

### T001 — Definir los seis registros canónicos
- **Requisitos:** FR-003, FR-005; AC-002–003.
- **Archivos:** `app.js`.
- **Depende de:** aprobación de SPEC/PLAN.
- **Criterio de finalización:** una colección local contiene E-001–E-006 una sola vez y en orden; comparación documentada verifica timestamp UTC, agente, tipo, descripción y estado inicial exactos de `SPECS.md` §8.
- [ ]

### T002 — Añadir fixtures de detalle completos
- **Requisitos:** FR-010–011; AC-007–008.
- **Archivos:** `app.js`.
- **Depende de:** T001.
- **Criterio de finalización:** cada evento tiene mensaje completo coherente con descripción y traza ficticia de tres o más líneas; `spec.md` marca expresamente que los literales ampliados son demos y no se copian de Stitch como datos normativos.
- [ ]

### T003 — Modelar referencias y snapshots de agente
- **Requisitos:** FR-017; AC-013.
- **Archivos:** `app.js`.
- **Depende de:** T001.
- **Criterio de finalización:** cada agente se referencia por ID solo si fuente canónica lo confirma; cada evento preserva nombre snapshot. E-005 no recibe una asociación inventada por similitud de nombre.
- [ ]

## Fase 2 — Estructura y renderizado del listado

### T004 — Sustituir placeholder de Registro de errores
- **Requisitos:** FR-001–002; VIS-001; AC-001.
- **Archivos:** `index.html`.
- **Depende de:** aprobación de SPEC/PLAN.
- **Criterio de finalización:** sección existente tiene encabezado, descripción neutral y área de contenido; shell, sidebar, routing, tema y otros destinos no cambian.
- [ ]

### T005 — Crear listado semántico
- **Requisitos:** FR-004; VIS-002; AC-002–003.
- **Archivos:** `index.html`.
- **Depende de:** T004.
- **Criterio de finalización:** tabla/listado semántico con timestamp, agente, tipo/severidad, descripción, estado y acciones; caption, thead, tbody y encabezados asociados si se elige tabla; scroll local nombrado.
- [ ]

### T006 — Renderizar filas desde colección única
- **Requisitos:** FR-003–005, FR-017; AC-002–003, AC-013.
- **Archivos:** `app.js`, `index.html`.
- **Depende de:** T001, T003–T005.
- **Criterio de finalización:** se representan seis filas en orden; ID/valores visibles coinciden con fuente; render dinámico usa DOM/textContent, resuelve referencia disponible con snapshot de fallback y conserva E-005 histórico.
- [ ]

### T007 — Formatear timestamp sin alterar UTC
- **Requisitos:** FR-004–005; AC-003, AC-007.
- **Archivos:** `app.js`.
- **Depende de:** T001, T006.
- **Criterio de finalización:** las seis fechas y horas se muestran con indicador UTC y precisión canónica a minuto, sin conversión de timezone ni segundos inventados; detalle mantiene timestamp íntegro.
- [ ]

### T008 — Añadir empty state defensivo
- **Requisitos:** FR-018; robustez del plan.
- **Archivos:** `index.html`, `app.js`.
- **Depende de:** T004–T006.
- **Criterio de finalización:** colección vacía no deja acciones/filas huérfanas y muestra mensaje neutral sin crear errores; colección canónica permanece en seis eventos.
- [ ]

## Fase 3 — Badges y estados

### T009 — Renderizar badges semánticos de severidad
- **Requisitos:** FR-006; VIS-003; AC-004.
- **Archivos:** `app.js`, `index.html`.
- **Depende de:** T006.
- **Criterio de finalización:** Crítico rojo, Advertencia ámbar, Información azul; todos incluyen texto y son distinguibles sin depender solo del color en claro/oscuro.
- [ ]

### T010 — Renderizar estado de resolución por fila
- **Requisitos:** FR-004, FR-014; VIS-003; AC-003, AC-010.
- **Archivos:** `app.js`.
- **Depende de:** T006, T009.
- **Criterio de finalización:** cinco errores empiezan Abierto y E-005 Resuelto; cada fila mantiene texto/estilo de estado independiente de la severidad.
- [ ]

## Fase 4 — Dropdowns de acciones

### T011 — Añadir botón accesible por error
- **Requisitos:** FR-007–008; VIS-004; AC-005.
- **Archivos:** `app.js`, `index.html`.
- **Depende de:** T005–T006.
- **Criterio de finalización:** botón nativo `⋮` con nombre único que incluye ID, `aria-haspopup`, `aria-expanded`, `aria-controls` y foco visible.
- [ ]

### T012 — Implementar menú condicionado por estado
- **Requisitos:** FR-007–008, FR-014; AC-005, AC-010.
- **Archivos:** `app.js`.
- **Depende de:** T010–T011.
- **Criterio de finalización:** Abierto ofrece exactamente «Ver detalle» y «Marcar como resuelto»; Resuelto ofrece «Ver detalle» solamente, sin reabrir; un solo menú abierto y activación por teclado.
- [ ]

### T013 — Gestionar cierre, foco y posición del dropdown
- **Requisitos:** FR-008–009; VIS-004; AC-005–006.
- **Archivos:** `app.js`, `index.html`.
- **Depende de:** T011–T012.
- **Criterio de finalización:** click exterior/Escape/selección/navegación cierra; Escape restaura foco cuando aplica; acción interna no se cancela; menús de primera/última fila no sufren clipping en los viewports de prueba.
- [ ]

## Fase 5 — Modal de detalle

### T014 — Crear diálogo único accesible
- **Requisitos:** FR-010, FR-012–013; VIS-005; AC-007, AC-009.
- **Archivos:** `index.html`.
- **Depende de:** T004–T005, T011.
- **Criterio de finalización:** un diálogo nombrado con `role=dialog`, `aria-modal`, título, botón visible de cierre, backdrop y cuerpo sin datos de error hardcodeados.
- [ ]

### T015 — Renderizar detalle según ID activado
- **Requisitos:** FR-010, FR-017; AC-007, AC-013.
- **Archivos:** `app.js`, `index.html`.
- **Depende de:** T001–T003, T014.
- **Criterio de finalización:** seleccionar cada registro muestra ID, timestamp, agente/snapshot, tipo/severidad, mensaje, estado y stack trace exactos de su fixture; ninguna fila abre datos de otra.
- [ ]

### T016 — Añadir cierres de modal y ciclo de foco
- **Requisitos:** FR-012–013; AC-009.
- **Archivos:** `app.js`.
- **Depende de:** T013–T015.
- **Criterio de finalización:** botón/Escape/backdrop válido cierra; click interno no; Escape cierra solo capa superior; foco entra, queda contenido incluso si sale programáticamente y retorna al activador conectado o fallback; navegación cierra.
- [ ]

## Fase 6 — Stack traces

### T017 — Presentar trazas como texto con scroll local
- **Requisitos:** FR-011; VIS-005; AC-008.
- **Archivos:** `index.html`, `app.js`.
- **Depende de:** T002, T015.
- **Criterio de finalización:** `pre/code` monoespaciado conserva líneas; cada valor se inserta vía textContent/DOM; scroll horizontal/vertical es local y no causa overflow global.
- [ ]

## Fase 7 — Resolución local de errores

### T018 — Marcar abierto como resuelto en memoria
- **Requisitos:** FR-014–016; AC-010–012.
- **Archivos:** `app.js`.
- **Depende de:** T010, T012.
- **Criterio de finalización:** acción cambia solo el status del ID seleccionado a Resuelto, cierra menú, mantiene fila visible y actualiza badge/estado sin modificar agente ni KPI.
- [ ]

### T019 — Sincronizar listado y detalle tras resolución
- **Requisitos:** FR-014; AC-010.
- **Archivos:** `app.js`.
- **Depende de:** T015, T018.
- **Criterio de finalización:** al resolver con modal abierto el mismo registro, modal también muestra Resuelto; abrirlo luego conserva el cambio y no hay acción Reabrir.
- [ ]

### T020 — Restaurar estados iniciales al recargar
- **Requisitos:** FR-015; AC-011.
- **Archivos:** `app.js`.
- **Depende de:** T018.
- **Criterio de finalización:** recarga reconstruye seis estados de §3; no se persiste resolución, no se usa storage para errores y no se emiten peticiones.
- [ ]

## Fase 8 — Coherencia histórica con agentes

### T021 — Conservar registro si falta agente activo
- **Requisitos:** FR-017; AC-013.
- **Archivos:** `app.js`.
- **Depende de:** T003, T006, T015.
- **Criterio de finalización:** prueba retirando temporalmente agente relacionado mantiene evento, nombre histórico y detalle sin error; al restaurar fixture no se han mutado colecciones ni creado agente huérfano vigente.
- [ ]

### T022 — Mantener estado de agente y dashboard independiente
- **Requisitos:** FR-016; AC-012.
- **Archivos:** `app.js` (validación; sin cambiar Dashboard).
- **Depende de:** T018, T021.
- **Criterio de finalización:** resolver E-001/E-004 no cambia Orbit Analyst de `failing` ni KPIs, y ninguna suma/estado de errores alimenta la vista Dashboard.
- [ ]

## Fase 9 — Responsive, accesibilidad y temas

### T023 — Aplicar estilos claro/oscuro y foco visible
- **Requisitos:** FR-006, FR-018; VIS-003–007; AC-004, AC-014.
- **Archivos:** `index.html`, `app.js`.
- **Depende de:** T009–T019.
- **Criterio de finalización:** list, badges, estado, menú, modal, trace y controles tienen pares dark/contrast y focus-visible; color no es única señal; movimiento reducido respetado.
- [ ]

### T024 — Verificar semántica y operación por teclado
- **Requisitos:** FR-007–013; VIS-002, VIS-004–005; AC-005, AC-009, AC-014.
- **Archivos:** `index.html`, `app.js`.
- **Depende de:** T005, T011–T017, T023.
- **Criterio de finalización:** inspección/recorrido confirma encabezados/roles/nombres, dropdown accionable, foco visible y contenido/restauración de diálogo; lector de pantalla distingue severidad y estado.
- [ ]

### T025 — Verificar cuatro viewports y dos temas
- **Requisitos:** FR-009, FR-012–013, FR-018; VIS-005–007; AC-006, AC-014.
- **Archivos:** `index.html`.
- **Depende de:** T005–T008, T013–T017, T023.
- **Criterio de finalización:** revisar 1440/1024/768/375 px en claro/oscuro: sin overflow global, tabla/acciones alcanzables, dropdown no recortado, modal y trace scrolleables dentro de viewport.
- [ ]

## Fase 10 — Validación funcional y regresión

### T026 — Verificar resolución, recarga y controles
- **Requisitos:** FR-007–016; AC-005, AC-007–012.
- **Archivos:** `app.js` (validación).
- **Depende de:** T012–020.
- **Criterio de finalización:** documentar prueba de cada error/detalle y flujo abierto→resuelto; E-005 no resuelve otra vez; reload restaura; listado/modal/menú quedan sincronizados; no se altera agente/KPI.
- [ ]

### T027 — Recorrer cinco secciones anteriores
- **Requisitos:** FR-001, FR-008, FR-012, FR-016; AC-001, AC-015.
- **Archivos:** `index.html`, `app.js` (validación).
- **Depende de:** T004–T026.
- **Criterio de finalización:** navegar Dashboard, Usuarios, Agentes, Skills y Contrataciones y regresar a Errores; router, theme, colecciones, KPI y overlays previos conservan comportamiento.
- [ ]

### T028 — Auditar restricciones y exclusiones
- **Requisitos:** FR-018; AC-016.
- **Archivos:** `index.html`, `app.js` (revisión).
- **Depende de:** T001–T027.
- **Criterio de finalización:** revisión confirma vanilla/HTML/Tailwind CDN; sin dependencias/build/CSS propio/inline/storage de errores/fetch/CRUD/filtros/búsqueda/exportación/telemetría/reintentos.
- [ ]

### T029 — Ejecutar validaciones estáticas
- **Requisitos:** FR-018; §9 restricciones.
- **Archivos:** `app.js`, `index.html` (validación).
- **Depende de:** T001–T028.
- **Criterio de finalización:** `node --check app.js`, `git diff --check` y revisión de diff pasan; únicamente archivos autorizados han cambiado y se registra evidencia.
- [ ]

### T030 — Registrar evidencia y limitaciones finales
- **Requisitos:** FR-001–018; AC-001–016.
- **Archivos:** este `tasks.md`.
- **Depende de:** T023–T029.
- **Criterio de finalización:** anotar navegador/servidor, datos/interacciones comprobados, accesibilidad, temas, reduced-motion, viewports, regresiones y toda limitación; no afirmar pruebas no ejecutadas.
- [ ]

## Trazabilidad de fases

| Fase | Tareas | Cobertura |
|---|---|---|
| Modelo mock | T001–T003 | IDs, snapshots, fixtures, relaciones históricas |
| Estructura/listado | T004–T008 | Shell, semántica, orden, timestamp, vacío |
| Badges/estados | T009–T010 | Severidad textual y estado inicial |
| Dropdowns | T011–T013 | Acciones según estado, cierre, foco y no clipping |
| Modal | T014–T016 | Detalle por ID, cierre y foco |
| Stack traces | T017 | Texto seguro, monoespaciado y scroll |
| Resolución | T018–T020 | Mutación de sesión, UI sincronizada y recarga |
| Coherencia histórica | T021–T022 | Snapshot de agente y Dashboard independiente |
| Responsive/a11y/tema | T023–T025 | Temas, teclado, foco y viewports |
| Validación/regresión | T026–T030 | Funcional, secciones previas, alcance y evidencia |
