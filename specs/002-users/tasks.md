# TASKS-002 — Tareas de implementación futura: Gestión de usuarios

- **Derivadas de:** [`spec.md`](spec.md) y [`plan.md`](plan.md).
- **Estado:** pendientes de aprobación e implementación.
- **Convención:** cada tarea tiene ID único, requisitos, archivos, dependencia y criterio de finalización verificable. Marcar `[x]` solo tras completar y comprobar en fase de implementación. Todas comienzan sin marcar.
- **Restricción de esta ejecución:** este documento planifica; no autoriza modificar `index.html`, `app.js` ni ejecutar tareas de código.

### Evidencia de validación manual (Live Server)

- Confirmado por el usuario: los dropdowns de acciones se abren al pulsar los botones de tres puntos.
- Confirmado por el usuario: «Ver detalle» muestra el modal correspondiente.
- No se consideran verificados por estas pruebas el cierre/teclado/foco del menú, todos los datos y asociaciones del modal, la eliminación, ni la accesibilidad y el comportamiento responsive.

## Fase 1 — Datos mock

### T001 — Definir colección canónica de usuarios
- **Requisitos:** FR-003, FR-006, FR-009–FR-010; AC-002, AC-007, AC-011.
- **Archivos:** `app.js`.
- **Depende de:** aprobación de SPEC/PLAN.
- **Criterio verificable:** colección local con IDs U-001–U-005 y los cinco conjuntos de valores exactos de `spec.md` §3; fechas ISO; sin modificar `agentsCollection`, KPI existentes ni escribir usuarios en almacenamiento persistente.
- [x]

### T002 — Establecer asociaciones por ID estable
- **Requisitos:** FR-006; AC-007.
- **Archivos:** `app.js`.
- **Depende de:** T001.
- **Criterio verificable:** asociación se calcula por `agent.ownerId === user.id`, devuelve los cuatro agentes canónicos para U-001–U-004 y lista vacía explícita para U-005; ningún array de agentes duplicado en cada usuario.
- [x]

## Fase 2 — Estructura y renderizado de tabla

### T003 — Reemplazar placeholder por encabezado y tabla semántica
- **Requisitos:** FR-001–FR-003, FR-015; VIS-001–VIS-004; AC-001–AC-003.
- **Archivos:** `index.html`.
- **Depende de:** aprobación de SPEC/PLAN.
- **Criterio verificable:** dentro de la sección Usuarios existente aparece heading/descripcion y tabla con `caption`, `thead`, `tbody`, cinco columnas Nombre/Email/Plan/Estado/Acciones y `th scope="col"`; shell queda intacto.
- [x]

### T004 — Renderizar filas desde el modelo local
- **Requisitos:** FR-003, FR-015; VIS-003–VIS-004; AC-002–AC-003.
- **Archivos:** `app.js`, `index.html`.
- **Depende de:** T001–T003.
- **Criterio verificable:** carga crea exactamente cinco filas en orden canónico con IDs asociados; valores dinámicos insertados de forma segura con APIs DOM/textContent; no se duplican mocks en HTML.
- [x]

## Fase 3 — Badges y diseño visual

### T005 — Presentar planes y estados con semántica visual
- **Requisitos:** FR-004, FR-014; VIS-003–VIS-006, VIS-009; AC-004, AC-014.
- **Archivos:** `index.html`, `app.js`.
- **Depende de:** T004.
- **Criterio verificable:** cuatro estados Activo y uno Pendiente se muestran como badges con texto e indicación visual diferenciada; planes legibles; clases base y `dark:` incluyen filas, divisores, hover, texto, plan y badge; sin contenido exclusivo de Stitch.
- [x]

### T006 — Diseñar celda de identidad y acciones
- **Requisitos:** FR-003, FR-005; VIS-004, VIS-006; AC-002–AC-003, AC-005.
- **Archivos:** `index.html`, `app.js`.
- **Depende de:** T004.
- **Criterio verificable:** nombre tiene prioridad visual, ID opcional es metadato discreto, columna de acciones queda al final y botones tienen etiqueta por usuario, foco visible y nombre accesible; tabla no oculta acciones al desplazarse.
- [ ]

## Fase 4 — Dropdowns

### T007 — Construir dropdown accesible por fila
- **Requisitos:** FR-005, FR-011–FR-012; VIS-006; AC-005–AC-006, AC-015.
- **Archivos:** `index.html`, `app.js`.
- **Depende de:** T006.
- **Criterio verificable:** cada activador controla menú único asociado por ID, con `aria-haspopup`, `aria-expanded`, `aria-controls` y botones Ver detalle/Eliminar; selección resuelve la fila correcta y el menú no se recorta por wrapper de tabla.
- [ ]

### T008 — Implementar cierre y foco de dropdowns
- **Requisitos:** FR-005, FR-011–FR-012; AC-005–AC-006, AC-015.
- **Archivos:** `app.js`.
- **Depende de:** T007.
- **Criterio verificable:** solo un menú abierto; clic fuera, Escape, selección y cambio de vista lo cierran; clic dentro ejecuta acción; Escape restaura foco al botón correspondiente y todos los controles son alcanzables por teclado.
- [ ]

## Fase 5 — Modal de detalle

### T009 — Crear estructura modal de detalle reutilizable
- **Requisitos:** FR-006–FR-007, FR-012; VIS-007; AC-007–AC-008, AC-015.
- **Archivos:** `index.html`.
- **Depende de:** T003, T007.
- **Criterio verificable:** un único diálogo nombrado mediante `aria-labelledby`, `role="dialog"`, `aria-modal="true"`, panel y backdrop independientes, botón de cierre; sin copias modales por fila ni estilo inline.
- [x]

### T010 — Mostrar detalle y relaciones del usuario seleccionado
- **Requisitos:** FR-006–FR-007; VIS-007; AC-007–AC-008.
- **Archivos:** `app.js`, `index.html`.
- **Depende de:** T002, T009.
- **Criterio verificable:** desde cada fila se abre el detalle con nombre/email/empresa/plan/estado/fecha/agentes del ID elegido; asociaciones por ownerId; U-005 muestra “Sin agentes asociados”; datos se insertan por DOM seguro.
- [ ]

### T011 — Implementar cierre y foco del detalle
- **Requisitos:** FR-007, FR-012; AC-008, AC-015.
- **Archivos:** `app.js`.
- **Depende de:** T009–T010.
- **Criterio verificable:** cierra por botón, Escape y backdrop; clic en panel no cierra; foco entra, queda atrapado con Tab/Shift+Tab y vuelve al activador o fallback conectado; Escape no propaga a overlays subyacentes.
- [ ]

## Fase 6 — Confirmación de eliminación

### T012 — Añadir diálogo de confirmación
- **Requisitos:** FR-008, FR-012; VIS-007; AC-009–AC-010, AC-015.
- **Archivos:** `index.html`, `app.js`.
- **Depende de:** T009, T011.
- **Criterio verificable:** acción Eliminar abre confirmación accesible que nombra usuario correcto y explica retiro solo de sesión; Cancelar/cerrar y Confirmar tienen etiquetas claras; abrir no muta filas.
- [ ]

### T013 — Comprobar cancelación sin efectos
- **Requisitos:** FR-008–FR-009; AC-009–AC-010.
- **Archivos:** `app.js`.
- **Depende de:** T012.
- **Criterio verificable:** Cancelar, botón de cierre y Escape (si se acepta para confirmación) limpian selección pendiente, cierran diálogo y dejan modelo, fila y relaciones exactamente intactos.
- [ ]

## Fase 7 — Estado local de eliminación

### T014 — Eliminar por ID y re-renderizar
- **Requisitos:** FR-009–FR-010; AC-010–AC-012.
- **Archivos:** `app.js`.
- **Depende de:** T001, T004, T012–T013.
- **Criterio verificable:** confirmar filtra solo ID seleccionado de colección en memoria, cierra menú/diálogo, vuelve a renderizar con orden restante; no afecta agentes/contratos ni almacena cambios; recarga repone cinco mocks.
- [ ]

### T015 — Gestionar empty state y foco posterior a borrado
- **Requisitos:** FR-009–FR-010; AC-010, AC-012, AC-015.
- **Archivos:** `index.html`, `app.js`.
- **Depende de:** T014.
- **Criterio verificable:** tabla vacía tras eliminar cinco usuarios muestra mensaje neutral accesible sin botones huérfanos; después de cada eliminación foco pasa a fila cercana o fallback lógico; anuncio de resultado, si existe, usa `aria-live="polite"`.
- [ ]

## Fase 8 — Responsive y accesibilidad

### T016 — Ajustar tabla para viewport reducido
- **Requisitos:** FR-013, FR-015; VIS-008; AC-003, AC-013.
- **Archivos:** `index.html`.
- **Depende de:** T003–T006.
- **Criterio verificable:** wrapper aislado con scroll horizontal; revisar 1440/1024/768/375 px; email/nombre permanecen comprensibles y acciones alcanzables; no hay overflow horizontal del documento.
- [ ]

### T017 — Completar teclado, semántica y movimiento reducido
- **Requisitos:** FR-011–FR-015; AC-003, AC-006–AC-008, AC-013–AC-015.
- **Archivos:** `index.html`, `app.js`.
- **Depende de:** T007–T016.
- **Criterio verificable:** keyboard-only abre/cierra menú y diálogos, selecciona acciones, cancela/confirma y recupera foco; nombres/roles/estados están expuestos; tema cubre overlays; transiciones respetan `prefers-reduced-motion`.
- [ ]

## Fase 9 — Validación funcional y visual

### T018 — Validar datos, asociación y acciones funcionales
- **Requisitos:** FR-001–FR-012; AC-001–AC-012, AC-015–AC-016.
- **Archivos:** `index.html`, `app.js`.
- **Depende de:** T001–T015.
- **Criterio verificable:** checklist manual/automatizable confirma datos exactos, detalle en las cinco filas, ownerId/empty U-005, cierre de menú/modal, cancelación y confirmación, no persistencia/no cascade, empty state.
- [ ]

### T019 — Validar responsive, temas y accesibilidad visual
- **Requisitos:** FR-012–FR-015; VIS-003–VIS-009; AC-003–AC-008, AC-013–AC-015.
- **Archivos:** `index.html`, `app.js`.
- **Depende de:** T016–T017.
- **Criterio verificable:** matriz 1440/1024/768/375 en claro y oscuro registra overflow, acceso a acciones, contraste, foco, backdrop, teclado y movimiento reducido; no hay defectos bloqueantes.
- [ ]

### T020 — Inspeccionar restricciones técnicas y alcance
- **Requisitos:** §9 de `spec.md`; AC-016.
- **Archivos:** `index.html`, `app.js`.
- **Depende de:** T001–T019.
- **Criterio verificable:** cambios posteriores quedan limitados a la funcionalidad aprobada; inspección confirma HTML semántico, Tailwind CDN existente y vanilla JS; no framework/API/dependencia/build/CSS/inline style ni búsqueda, filtro, ordenación, paginación o modificaciones ajenas a Usuarios.
- [x]

## Trazabilidad de fases

| Fase | Tareas | Requisitos principales | Criterios |
|---|---|---|---|
| 1. Datos mock | T001–T002 | FR-003, FR-006, FR-009–FR-010 | AC-002, AC-007, AC-011 |
| 2. Tabla y render | T003–T004 | FR-001–FR-003, FR-015 | AC-001–AC-003 |
| 3. Badges/diseño | T005–T006 | FR-004–FR-005, FR-014; VIS-003–VIS-006 | AC-003–AC-005, AC-014 |
| 4. Dropdowns | T007–T008 | FR-005, FR-011–FR-012 | AC-005–AC-006, AC-015 |
| 5. Detalle | T009–T011 | FR-006–FR-007, FR-012 | AC-007–AC-008, AC-015 |
| 6. Confirmación | T012–T013 | FR-008–FR-009, FR-012 | AC-009–AC-010, AC-015 |
| 7. Estado local | T014–T015 | FR-009–FR-010 | AC-010–AC-012, AC-015 |
| 8. Responsive/a11y | T016–T017 | FR-011–FR-015; VIS-008 | AC-003, AC-006–AC-008, AC-013–AC-015 |
| 9. Validación | T018–T020 | FR-001–FR-015 | AC-001–AC-016 |
