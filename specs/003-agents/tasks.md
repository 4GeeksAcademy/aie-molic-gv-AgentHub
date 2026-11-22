# TASKS-003 — Tareas de implementación futura: Gestión de agentes

- **Derivadas de:** [`spec.md`](spec.md) y [`plan.md`](plan.md).
- **Estado:** implementación de la vista completada en los archivos previstos; validaciones funcionales y visuales en navegador pendientes.
- **Convención:** tareas ordenadas, pequeñas y verificables; cada una incluye ID, requisitos, archivos, dependencia y criterio de finalización. Marcar `[x]` únicamente tras completar y comprobar en la fase de implementación.
- **Evidencia:** `node --check app.js`, `git diff --check` y diagnósticos del editor sin errores. No se encontró navegador ni harness de pruebas en el workspace; las pruebas reales de interacción, foco y viewports permanecen pendientes.

## Fase 1 — Modelo canónico

### T001 — Añadir prompts mock seguros
- **Requisitos:** FR-003, FR-008; AC-002, AC-008, AC-014.
- **Archivos:** `app.js`.
- **Depende de:** aprobación de SPEC/PLAN.
- **Criterio verificable:** los cuatro objetos existentes de `mockData.agentsCollection` incluyen un campo `systemPrompt` con texto ficticio, único, legible y de 2–4 frases; no se alteran IDs, owner, empresa, estado ni skills, ni se escribe en almacenamiento.
- [x] Validado por inspección: cuatro prompts distintos y ficticios, cada uno de tres frases; sin modificar relaciones ni guardar datos operativos.

### T002 — Añadir resolución de owners y skills
- **Requisitos:** FR-003, FR-005; AC-002, AC-004, AC-013.
- **Archivos:** `app.js`.
- **Depende de:** T001.
- **Criterio verificable:** helpers resuelven usuario por `ownerId` y skills por `skillIds` desde colecciones compartidas; no duplican datos relacionales; una relación no disponible obtiene fallback neutral sin error.
- [x] Validado por inspección: owners resueltos desde `usersCollection`, skills desde `skillsCollection` por ID y fallback neutral para owner/skills no disponibles.

## Fase 2 — Estructura de vista

### T003 — Reemplazar placeholder por estructura Agentes
- **Requisitos:** FR-001–FR-002, FR-015; VIS-001, VIS-002; AC-001, AC-016.
- **Archivos:** `index.html`.
- **Depende de:** aprobación de SPEC/PLAN.
- **Criterio verificable:** la sección existente contiene encabezado/description, región del listado, estado vacío inicialmente oculto y contenedores reutilizables requeridos; shell, otras vistas, tema y navegación conservan sus IDs/comportamiento.
- [x] Validado: placeholder reemplazado por encabezado, región de listado y empty state; IDs del shell preservados.

### T004 — Definir estructura compartida de diálogo y feedback
- **Requisitos:** FR-008–FR-011, FR-014; VIS-007–VIS-008; AC-008–AC-015.
- **Archivos:** `index.html`.
- **Depende de:** T003.
- **Criterio verificable:** existen estructuras únicas reutilizables para configuración y confirmación, cada diálogo con nombre/roles accesibles y botones explícitos; región live para feedback; sin modal por registro ni estilo inline.
- [x] Validado: diálogos únicos de configuración y confirmación, roles/nombres, botones y región `aria-live`; sin estilos inline.

## Fase 3 — Listado y skills

### T005 — Renderizar agentes desde la colección compartida
- **Requisitos:** FR-003–FR-004, FR-012; VIS-003–VIS-004; AC-002–AC-003, AC-006.
- **Archivos:** `app.js`, `index.html`.
- **Depende de:** T001–T003.
- **Criterio verificable:** se muestran exactamente A-001–A-004 en orden, con nombre/ID, persona propietaria y empresa, badge textual y columna/área de acciones; consume `mockData.agentsCollection`, usa inserción DOM segura y no duplica mocks.
- [x] Validado por inspección del render: cuatro agentes desde `agentsCollection`, orden canónico, propietario, estado y acciones; inserción dinámica con `textContent`.

### T006 — Renderizar badges de estado accesibles
- **Requisitos:** FR-004, FR-016; VIS-004; AC-002, AC-006, AC-017.
- **Archivos:** `app.js`, `index.html`.
- **Depende de:** T005.
- **Criterio verificable:** `active`/`failing`/`inactive` se presentan como Activo/Fallando/Inactivo con familias verde/rojo/gris, texto siempre presente, variantes `dark:` y contraste/foco apropiados.
- [x] Validado por inspección: etiquetas textuales Activo/Fallando/Inactivo con variantes semánticas y `dark:`.

### T007 — Añadir acordeones independientes de skills
- **Requisitos:** FR-005–FR-006; VIS-005; AC-004–AC-005.
- **Archivos:** `index.html`, `app.js`.
- **Depende de:** T002, T005.
- **Criterio verificable:** cada agente tiene botón nombrado con `aria-expanded`, `aria-controls` y región única; todos comienzan cerrados; skills corresponden a `skillIds` resueltos por catálogo y no se añaden datos de runtime.
- [x] Validado: acordeón por agente con `aria-expanded`, `aria-controls` y relaciones resueltas desde IDs; cerrado inicialmente.

### T008 — Implementar transición y estado semántico del acordeón
- **Requisitos:** FR-005–FR-006; AC-004–AC-005, AC-017.
- **Archivos:** `app.js`, `index.html`.
- **Depende de:** T007.
- **Criterio verificable:** cada acordeón opera independientemente, contenido cerrado no es visible/enfocable para tecnologías de asistencia, `aria-expanded` cambia sincronizadamente; duración breve aprox. 150–250 ms y `motion-reduce:transition-none` o equivalente Tailwind.
- [x] Validado por inspección: estado ARIA/inert sincronizado, transición Tailwind de 200 ms y `motion-reduce:transition-none`. No se probó en navegador.

## Fase 4 — Menús

### T009 — Añadir dropdown de acciones por agente
- **Requisitos:** FR-007, FR-012–FR-013; VIS-006; AC-007.
- **Archivos:** `index.html`, `app.js`.
- **Depende de:** T005–T006.
- **Criterio verificable:** botón nombrado “Acciones para [nombre]” controla menú asociado por ID, con aria-haspopup/expanded/controls y exactamente Configurar y Eliminar; ID seleccionado determina la acción.
- [x] Validado: menú único con las dos acciones contractuales, IDs estables, `aria-haspopup`/`expanded`/`controls` y opciones por botones normales.

### T010 — Gestionar menú único, cierre y foco
- **Requisitos:** FR-007, FR-013–FR-014; AC-007, AC-010–AC-011.
- **Archivos:** `app.js`.
- **Depende de:** T009.
- **Criterio verificable:** solo un menú abierto; cierra por clic exterior, Escape, selección y navegación; Escape restaura foco; clic en acción llega a su handler aun si el listado se re-renderiza; menú no queda recortado.
- [x] Validado por inspección: cierre exterior con `composedPath`, Escape, selección y navegación; no se re-renderiza antes de ejecutar acción. Sin comprobación visual de clipping.

## Fase 5 — Configuración de prompt

### T011 — Construir modal dinámico de configuración
- **Requisitos:** FR-008, FR-014; VIS-007; AC-008, AC-010, AC-017.
- **Archivos:** `index.html`.
- **Depende de:** T004, T009.
- **Criterio verificable:** un único diálogo con título accesible, nombre/owner/empresa/estado, textarea etiquetada y nota exacta “Cambios de demostración; no se guardan en un servidor”; max-height/scroll interno para pantalla estrecha.
- [x] Validado: diálogo único, nombre/owner/estado, textarea etiquetada, nota exacta y scroll interno responsive por max-height.

### T012 — Abrir configuración para el ID seleccionado
- **Requisitos:** FR-008, FR-012; AC-008.
- **Archivos:** `app.js`.
- **Depende de:** T002, T011.
- **Criterio verificable:** Configurar desde cada menú muestra los valores del registro correcto y su prompt completo; conserva ID y activador; foco inicial entra al modal y `aria-modal`/`aria-labelledby` referencian elementos existentes.
- [x] Validado por inspección: el ID y activador quedan capturados; foco inicial en textarea y valores derivados del agente elegido.

### T013 — Implementar guardar, descartar y feedback
- **Requisitos:** FR-009, FR-014; VIS-008; AC-009–AC-010.
- **Archivos:** `app.js`.
- **Depende de:** T012.
- **Criterio verificable:** Guardar actualiza exclusivamente `systemPrompt` del ID en memoria, cierra y anuncia éxito; Cancelar/cierre/Escape/backdrop descarta draft; clic dentro no cierra; foco queda contenido y retorna al activador.
- [x] Validado por inspección: guardar muta solo `systemPrompt`, cancelar/cierre/Escape/backdrop descartan; trampa de foco y retorno implementados. Prueba real pendiente.

## Fase 6 — Confirmación y eliminación local

### T014 — Abrir confirmación de eliminación
- **Requisitos:** FR-010, FR-014; VIS-008; AC-011.
- **Archivos:** `app.js`, `index.html`.
- **Depende de:** T004, T009.
- **Criterio verificable:** Eliminar abre diálogo identificado por nombre/ID y texto de efecto solo en sesión; abrir no muta colección; Cancelar y confirmación tienen nombres claros y foco seguro.
- [x] Validado: confirmación identifica agente/ID y limita el efecto a la sesión; apertura no altera colección.

### T015 — Gestionar cancelar y cierre seguro
- **Requisitos:** FR-010, FR-014; AC-011.
- **Archivos:** `app.js`.
- **Depende de:** T014.
- **Criterio verificable:** Cancelar, cierre, Escape y backdrop (si se admite) limpian selección pendiente y cierran sin cambios; click dentro no cierra y no se propaga a overlays inferiores.
- [x] Validado por inspección: Cancelar, cierre, Escape y backdrop limpian selección sin mutación; backdrop requiere inicio y fin fuera del panel.

### T016 — Eliminar solo el agente seleccionado
- **Requisitos:** FR-010–FR-012; AC-012–AC-014.
- **Archivos:** `app.js`.
- **Depende de:** T001, T005, T014–T015.
- **Criterio verificable:** confirmar filtra solo ID elegido de `agentsCollection`, preserva orden y otros campos/colecciones; cierra menú/diálogo y actualiza listado, KPI y futuros derivados de skills; sin API/localStorage operativo; recarga restaura mock.
- [x] Validado por inspección: confirmación filtra solo el ID de `agentsCollection`, vuelve a renderizar y actualiza KPI; no hay persistencia de entidades.

### T017 — Mostrar empty state y restaurar foco
- **Requisitos:** FR-011–FR-012; AC-015.
- **Archivos:** `index.html`, `app.js`.
- **Depende de:** T016.
- **Criterio verificable:** al eliminar todos aparece estado vacío accesible y sin acciones huérfanas; después de borrar foco va a agente vecino o encabezado/empty state; se anuncia el resultado sin re-anunciar toda la lista.
- [x] Validado: empty state accesible y foco a agente vecino o estado vacío; anuncio `aria-live` para resultado.

## Fase 7 — Coherencia e integración

### T018 — Verificar actualización de KPI derivados
- **Requisitos:** FR-010–FR-012; AC-003, AC-012.
- **Archivos:** `app.js`.
- **Depende de:** T016.
- **Criterio verificable:** guardar prompt mantiene KPI; eliminar A-001/A-002 decrementa activos; eliminar A-003 decrementa fallando; eliminar A-004 no cambia esos KPI; nunca se cuentan inactivos como activos y no se introducen contadores paralelos.
- [x] Validado estáticamente: `renderKpis()` cuenta estados active/failing de colección; se invoca tras eliminación y no se cuenta inactive.

### T019 — Mantener intactas relaciones históricas y Skills
- **Requisitos:** FR-005, FR-010–FR-011, FR-017; AC-013, AC-018.
- **Archivos:** `app.js`.
- **Depende de:** T016.
- **Criterio verificable:** eliminación no muta users, catálogo Skills, contratos ni errores; recuentos de skills se derivan de agentes presentes, mientras contratos/errores retienen snapshots/referencias canónicas.
- [x] Validado por inspección del alcance de la mutación: se modifica únicamente `agentsCollection`; catálogo de skills separado y conteos/relaciones se derivan en render. Contratos/errores no existen como colecciones implementadas en esta fase.

### T020 — Cerrar overlays al navegar
- **Requisitos:** FR-001, FR-007, FR-014; AC-001, AC-007, AC-010.
- **Archivos:** `app.js`.
- **Depende de:** T010, T013–T015.
- **Criterio verificable:** cambio de sección cierra dropdown y cualquier diálogo, no muta draft no guardado y conserva shell/tema; foco no queda en elemento oculto.
- [x] Validado por inspección: `showPage()` cierra menú y diálogos sin guardar drafts; navegación/título/tema shell permanecen.

## Fase 8 — Responsive, tema y accesibilidad

### T021 — Adaptar tarjetas y controles a viewports
- **Requisitos:** FR-015–FR-016; VIS-003, VIS-005–VIS-009; AC-016–AC-017.
- **Archivos:** `index.html`.
- **Depende de:** T003–T017.
- **Criterio verificable:** inspección 1440/1024/768/375 px: propietario/estado/acciones/skills accesibles, sin overflow global; dropdown visible y modal/textarea desplazables dentro del viewport.
- [ ] Pendiente: responsive declarado en clases Tailwind, pero matriz visual real 1440/1024/768/375 y clipping no comprobados en navegador.

### T022 — Completar teclado, diálogo y tema
- **Requisitos:** FR-014–FR-016; AC-007–AC-010, AC-016–AC-017.
- **Archivos:** `index.html`, `app.js`.
- **Depende de:** T007–T021.
- **Criterio verificable:** recorrido keyboard-only cubre acordeón, menú, configuración, cancelar/guardar, eliminar, confirmación y foco de retorno; tema claro/oscuro cubre todos los elementos; movimiento reducido y estados no dependientes de color.
- [ ] Pendiente: soporte de teclado/foco implementado por inspección, pero recorrido keyboard-only y contraste claro/oscuro requieren prueba manual.

## Fase 9 — Validación y límites

### T023 — Validar datos y comportamiento funcional
- **Requisitos:** FR-001–FR-014; AC-001–AC-015.
- **Archivos:** `index.html`, `app.js`.
- **Depende de:** T001–T020.
- **Criterio verificable:** checklist prueba cuatro agentes, owners/skills/prompt, acordeón, menú, guardar/descartar, confirmar/cancelar, eliminación por ID, KPI, no cascada, recarga, foco/empty state; cada prueba manual no disponible queda explícitamente pendiente.
- [ ] Pendiente: hace falta probar las interacciones en navegador, persistencia de sesión/recarga y coherencia entre vistas; no hay navegador/harness disponible.

### T024 — Validar responsive, contraste y restricciones técnicas
- **Requisitos:** FR-015–FR-017; §9 de `spec.md`; AC-016–AC-019.
- **Archivos:** `index.html`, `app.js`.
- **Depende de:** T021–T023.
- **Criterio verificable:** matriz viewport/tema y revisión de teclado/foco; inspección confirma HTML semántico, Tailwind CDN y vanilla JS, sin API/framework/build/CSS/style inline/recursos Stitch ni búsqueda, filtros, runtime o funciones fuera de alcance.
- [ ] Pendiente parcialmente: `node --check`, `git diff --check`, editor y búsqueda estática pasaron; matriz visual, teclado y accesibilidad requieren navegador.

## Trazabilidad de fases

| Fase | Tareas | Requisitos principales | Criterios |
|---|---|---|---|
| 1. Modelo | T001–T002 | FR-003, FR-005, FR-008 | AC-002–AC-004, AC-008, AC-014 |
| 2. Estructura | T003–T004 | FR-001–FR-002, FR-008–FR-014 | AC-001, AC-008–AC-015 |
| 3. Listado/skills | T005–T008 | FR-003–FR-006, FR-016 | AC-002–AC-006, AC-017 |
| 4. Menús | T009–T010 | FR-007, FR-012–FR-014 | AC-007, AC-010–AC-011 |
| 5. Prompt | T011–T013 | FR-008–FR-009, FR-014 | AC-008–AC-010 |
| 6. Eliminación | T014–T017 | FR-010–FR-012, FR-014 | AC-011–AC-015 |
| 7. Coherencia/integración | T018–T020 | FR-001, FR-010–FR-012, FR-017 | AC-001, AC-003, AC-007, AC-012–AC-014, AC-018 |
| 8. Responsive/a11y | T021–T022 | FR-014–FR-016 | AC-007–AC-010, AC-016–AC-017 |
| 9. Validación | T023–T024 | FR-001–FR-017 | AC-001–AC-019 |
