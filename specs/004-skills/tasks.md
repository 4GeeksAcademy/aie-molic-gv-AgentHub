# TASKS-004 — Implementación y validación: Skills

- **Derivadas de:** [`spec.md`](spec.md) y [`plan.md`](plan.md).
- **Estado:** implementación estática completada para el catálogo y sus interacciones; validaciones de navegador/responsive pendientes.
- **Convención:** cada tarea indica requisitos, archivos previstos, dependencias y criterio verificable. Marcar `[x]` únicamente tras evidencia real durante implementación/validación.
- **Implementación:** `index.html` y `app.js`; los checks estáticos registrados son `node --check app.js` y `git diff --check`. No hay navegador/harness disponible para validar interacciones reales, foco y viewports. Auditoría técnica: el dropdown de Contrataciones asigna `menu.style.left/top`, generando estilos inline en runtime y contradiciendo `SPECS.md` §2.1; no se modifica esa funcionalidad en esta actualización documental.
- **Archivos de implementación previstos:** `index.html`, `app.js`. `specs/004-skills/tasks.md` solo se actualizará para registrar progreso. No modificar specs anteriores, `SPECS.md` o fuentes Stitch.

## Fase 1 — Modelo compartido de skills

### T001 — Completar metadata canónica
- **Requisitos:** FR-003, FR-017; AC-002, AC-017.
- **Archivos:** `app.js`.
- **Depende de:** aprobación SPEC/PLAN.
- **Criterio verificable:** cada registro existente S-001–S-004 de `mockData.skillsCollection` incorpora `category` y `description` exactamente según `spec.md` §2; se conserva una sola colección y no se inventan campos de estado/contador.
- [x] Añadidos los cuatro registros canónicos a la colección existente; IDs/nombres preservados y metadata exacta según SPEC.

### T002 — Derivar relaciones desde agentes compartidos
- **Requisitos:** FR-004, FR-008, FR-012; AC-003–004, AC-007, AC-011.
- **Archivos:** `app.js`.
- **Depende de:** T001.
- **Criterio verificable:** helper filtra `mockData.agentsCollection` por `skillIds.includes(skillId)`; inicialmente asocia los cuatro pares de agentes documentados y produce 2 por skill; con relación quitada produce resultado actualizado/0, sin propiedades duplicadas en skills.
- [x] Helper deriva agentes actuales por `skillIds.includes`; no guarda recuentos ni relaciones redundantes.

## Fase 2 — Catálogo y render

### T003 — Integrar encabezado y estructura de catálogo
- **Requisitos:** FR-001–003, FR-017; VIS-001–002; AC-001–002, AC-017.
- **Archivos:** `index.html`.
- **Depende de:** aprobación SPEC/PLAN.
- **Criterio verificable:** placeholder existente de `#habilidades` se sustituye por encabezado y región/listado semánticos sin duplicar shell; conserva etiqueta visible Habilidades, IDs/routing/tema del shell.
- [x] La sección existente reutiliza shell/routing con encabezado y región semántica de catálogo.

### T004 — Renderizar las cuatro skills desde modelo
- **Requisitos:** FR-003–004, FR-017; VIS-002, VIS-004; AC-002–004.
- **Archivos:** `app.js`, `index.html`.
- **Depende de:** T001–T003.
- **Criterio verificable:** cuatro elementos en orden canónico con nombre, ID, categoría, descripción, kebab/placeholder de acción y contador textual calculado desde helper; datos dinámicos usan APIs DOM/textContent, sin mocks duplicados en HTML.
- [x] Render desde la colección compartida con inserción DOM/textContent segura, metadata, agentes relacionados y menú por registro.

### T005 — Añadir empty state de catálogo
- **Requisitos:** FR-014; AC-014.
- **Archivos:** `index.html`, `app.js`.
- **Depende de:** T003–T004.
- **Criterio verificable:** colección vacía oculta/retira tarjetas y presenta mensaje neutral semántico sin menú/dialog huérfano; no confunde habilidad con cero agentes con catálogo vacío.
- [x] Empty state conectado a colección vacía y diferenciado del caso cero asociaciones.

## Fase 3 — Bloque informativo

### T006 — Explicar qué es una skill
- **Requisitos:** FR-005; VIS-003; AC-005.
- **Archivos:** `index.html`.
- **Depende de:** T003.
- **Criterio verificable:** panel diferenciado con título exacto «¿Qué es una skill?» y definición de capacidad modular que puede usar agente, ejemplos búsqueda/investigación y análisis, y posibilidad de asociación múltiple; sin tarifas ni afirmación operativa inventada.
- [x] Bloque explicativo exacto implementado con definición modular, ejemplos y relación múltiple.

## Fase 4 — Contadores de agentes

### T007 — Vincular badge a recuento derivado
- **Requisitos:** FR-004, FR-017; VIS-004; AC-003–004.
- **Archivos:** `app.js`, `index.html`.
- **Depende de:** T002, T004.
- **Criterio verificable:** cada badge muestra recuento con texto agente(s) y obtiene valor del mismo resultado usado para asociaciones; cambiar `skillIds` cambia conteo en siguiente render; cero se muestra como 0 sin eliminar skill.
- [x] Badge numérico/textual deriva del mismo filtrado que la lista de agentes.

## Fase 5 — Dropdowns

### T008 — Crear menú único por skill
- **Requisitos:** FR-006–007, FR-015; VIS-006; AC-006, AC-016.
- **Archivos:** `index.html`, `app.js`.
- **Depende de:** T004.
- **Criterio verificable:** botones con nombre «Acciones para [nombre]», `aria-expanded`/`aria-controls`; cada menú tiene exactamente Ver detalle y Eliminar; abrir otro cierra el previo; posicionamiento no recortado.
- [x] Menú único por skill con nombre accesible, atributos ARIA y exactamente dos acciones.

### T009 — Completar cierre, teclado y foco de menú
- **Requisitos:** FR-007, FR-015; AC-006, AC-016.
- **Archivos:** `app.js`.
- **Depende de:** T008.
- **Criterio verificable:** Escape, click exterior, seleccionar acción y navegación cierran; click en opción no se cancela por handler exterior; Escape devuelve foco al activador; controles operables por teclado con foco visible.
- [x] Cierre exterior/Escape/selección/navegación implementados; verificación estática, falta recorrido real.

## Fase 6 — Modal de detalle

### T010 — Construir diálogo de detalle accesible
- **Requisitos:** FR-008–009, FR-015; VIS-005–006; AC-007–008, AC-016.
- **Archivos:** `index.html`.
- **Depende de:** T003, T008.
- **Criterio verificable:** existe una sola estructura de diálogo con nombre accesible, `role=dialog`, `aria-modal=true`, región de contenido, botón de cierre y backdrop; no se hardcodea una skill.
- [x] Diálogo reutilizable nombrado con rol dialog, modal, contenido y botón de cierre.

### T011 — Renderizar datos y relaciones actuales en detalle
- **Requisitos:** FR-008, FR-017; VIS-005; AC-007.
- **Archivos:** `app.js`, `index.html`.
- **Depende de:** T002, T010.
- **Criterio verificable:** invocar desde cada skill presenta ID, nombre, categoría, descripción canónica literal, contador y nombres/IDs de agentes del modelo actual; con cero presenta «0 agentes» y «Sin agentes asociados»; inserción segura DOM.
- [x] Detalle deriva categoría, descripción canónica, conteo y asociaciones actuales desde el modelo.

### T012 — Gestionar cierre y foco del diálogo
- **Requisitos:** FR-009, FR-015; AC-008, AC-016.
- **Archivos:** `app.js`.
- **Depende de:** T010–T011.
- **Criterio verificable:** botón/Escape/backdrop válido cierra; click interior no; foco entra y queda contenido con Tab/Shift+Tab; retorno al activador conectado o fallback; Escape no cierra dos capas.
- [x] Cierre por botón/Escape/backdrop, foco inicial, trampa Tab y retorno lógico implementados por inspección.

## Fase 7 — Confirmación y eliminación

### T013 — Añadir confirmación de borrado local
- **Requisitos:** FR-010, FR-015; VIS-006; AC-009, AC-016.
- **Archivos:** `index.html`, `app.js`.
- **Depende de:** T010, T012.
- **Criterio verificable:** acción Eliminar presenta confirmación nombrada con skill/ID y alcance de sesión; Abrir no muta; Cancelar y Confirmar son controles claros; estado pendiente separado del catálogo.
- [x] Confirmación identifica skill/ID y explica alcance temporal; abrir no muta modelo.

### T014 — Implementar cancelación sin mutación
- **Requisitos:** FR-010; AC-009.
- **Archivos:** `app.js`.
- **Depende de:** T013.
- **Criterio verificable:** cancelar/cerrar/Escape limpia ID pendiente, cierra diálogo y conserva colección, relaciones y contadores exactamente.
- [x] Cancelar/cierre/Escape/backdrop limpian selección sin mutación (inspección estática).

### T015 — Confirmar eliminación en memoria por ID
- **Requisitos:** FR-011, FR-013; AC-010, AC-012–013.
- **Archivos:** `app.js`.
- **Depende de:** T001–T002, T013–T014.
- **Criterio verificable:** confirmación válida elimina solo skill elegida de colección y quita ID de `skillIds` solo donde existe; campos restantes/agentes/sus otras relaciones quedan intactos; no persistencia ni red.
- [x] Confirmación elimina skill por ID y retira solo ese ID de `skillIds`; sin llamadas ni almacenamiento de negocio.

### T016 — Actualizar catálogo, contadores, empty state y foco
- **Requisitos:** FR-011, FR-014–015; AC-010, AC-014, AC-016.
- **Archivos:** `index.html`, `app.js`.
- **Depende de:** T005, T007, T015.
- **Criterio verificable:** tras borrado re-render desde fuentes compartidas, el elemento/menú/modal desaparece, cifras restantes derivan de relaciones, foco pasa al próximo/previo/heading y empty state al eliminar todas; feedback breve es live sin anunciar lista entera.
- [x] Catálogo, relaciones de Agentes, recuentos y estado vacío vuelven a renderizarse; foco apunta al vecino/empty state.

## Fase 8 — Sincronización con Agentes

### T017 — Resolver chips contra catálogo vigente
- **Requisitos:** FR-012–013; AC-011–013.
- **Archivos:** `app.js`.
- **Depende de:** T015.
- **Criterio verificable:** render de acordeones de Agentes resuelve IDs contra `skillsCollection` actual y no muestra chips huérfanos; muestra las skills restantes en orden coherente tras borrar, sin modificar agente u otras referencias.
- [x] Agentes resuelve relaciones contra skills vigentes y no renderiza IDs huérfanos (inspección del render existente).

### T018 — Verificar no cascada a snapshots comerciales
- **Requisitos:** FR-013; AC-012–013.
- **Archivos:** `app.js` (validación del estado); `specs/004-skills/tasks.md` (evidencia).
- **Depende de:** T015–T017.
- **Criterio verificable:** comparación antes/después demuestra que contratos, líneas de skills/precios, errores, usuarios y otros campos de agentes no cambian; al recargar vuelven relaciones y catálogo canónicos.
- [ ] No cascada implementada por alcance de mutación; comparación automatizada de snapshots y restauración por reload no ejecutada.

## Fase 9 — Responsive y accesibilidad

### T019 — Adaptar catálogo y overlays a viewports
- **Requisitos:** FR-016; VIS-002–008; AC-014–015.
- **Archivos:** `index.html`.
- **Depende de:** T003–T016.
- **Criterio verificable:** inspección a 1440/1024/768/375 px confirma tarjetas/explicación legibles, acciones alcanzables, overlays dentro del viewport y sin overflow horizontal global.
- [ ] Clases responsive presentes, pero falta inspección visual real a 1440/1024/768/375 y clipping en navegador.

### T020 — Completar tema y accesibilidad de todos los estados
- **Requisitos:** FR-015–017; VIS-003–008; AC-006–008, AC-014–017.
- **Archivos:** `index.html`, `app.js`.
- **Depende de:** T008–T019.
- **Criterio verificable:** claro/oscuro cubre catálogo, badges, menú, backdrop, diálogos/foco; keyboard-only opera/retorna foco; roles/nombres/estados correctos; reduced motion no impone transición.
- [ ] ARIA/teclado/tema/reduced motion implementados en código; recorrido manual y contraste real pendientes.

## Fase 10 — Validación final

### T021 — Validar datos, acciones y relaciones
- **Requisitos:** FR-001–014; AC-001–014, AC-016.
- **Archivos:** `index.html`, `app.js`.
- **Depende de:** T001–T018.
- **Criterio verificable:** checklist por cada skill cubre contenido/contador/modelo, menú, detalle, cancelación, borrado, recálculo, vista Agentes, snapshots no alterados, vacío y restauración al recargar; registra limitaciones en lugar de afirmar pruebas no realizadas.
- [ ] Validación funcional por navegador pendiente: interacciones, recarga y consistencia entre vistas.

### T022 — Revisar restricciones técnicas y alcance
- **Requisitos:** FR-017, §9 de `spec.md`; AC-017.
- **Archivos:** `index.html`, `app.js`.
- **Depende de:** T001–T021.
- **Criterio verificable:** `node --check app.js` y revisión confirman HTML5/Tailwind CDN/vanilla JS; no framework, TS, API/backend, build/dependencias, CSS propio/inline, Stitch importado ni características excluidas.
- [x] `node --check app.js`, `git diff --check` y revisión estática del stack y alcance completadas.

### T023 — Validar responsive, tema y accesibilidad
- **Requisitos:** FR-015–016; VIS-001–008; AC-014–016.
- **Archivos:** `index.html`, `app.js`.
- **Depende de:** T019–T020.
- **Criterio verificable:** matriz 1440/1024/768/375 en claro/oscuro registra overflow, clipping, contraste, foco, teclado, estados accesibles, reduced motion y diálogo; evidencia distingue inspección estática, simulación y prueba visual real.
- [ ] Matriz visual, contraste, foco y teclado requiere validación manual en navegador.

## Trazabilidad de fases

| Fase | Tareas | Requisitos principales | Criterios |
|---|---|---|---|
| 1. Modelo compartido | T001–T002 | FR-003–004, FR-008, FR-012, FR-017 | AC-002–004, AC-007, AC-011 |
| 2. Catálogo/render | T003–T005 | FR-001–004, FR-014, FR-017 | AC-001–004, AC-014 |
| 3. Bloque informativo | T006 | FR-005 | AC-005 |
| 4. Contadores | T007 | FR-004, FR-017 | AC-003–004 |
| 5. Dropdowns | T008–T009 | FR-006–007, FR-015 | AC-006, AC-016 |
| 6. Detalle | T010–T012 | FR-008–009, FR-015 | AC-007–008, AC-016 |
| 7. Confirmación/borrado | T013–T016 | FR-010–011, FR-014–015 | AC-009–010, AC-014, AC-016 |
| 8. Sync Agentes | T017–T018 | FR-012–013 | AC-011–013 |
| 9. Responsive/a11y | T019–T020 | FR-015–017 | AC-014–AC-017 |
| 10. Validación | T021–T023 | FR-001–017 | AC-001–AC-017 |
