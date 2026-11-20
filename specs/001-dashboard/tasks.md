# TASKS-001 — Tareas de implementación futura

- **Derivadas de:** [`spec.md`](spec.md) y [`plan.md`](plan.md).
- **Estado:** backlog para aprobación; **no ejecutar en esta fase**.
- **Convención:** todas las tareas empiezan sin marcar. Cada tarea indica requisitos, archivos, dependencias y un resultado verificable. Los archivos referenciados son destinos futuros de implementación, no modificados al crear este documento. Los KPI de agentes deben derivarse de la fuente mock compartida definida en `spec.md` §6 y `plan.md` §3.3; Tailwind se carga desde CDN y el modo oscuro usa utilidades `dark:`.

## 1. Estructura HTML

### T001 — Preparar documento HTML semántico
- **Requisitos:** FR-001, FR-011; AC-001, AC-010, AC-011.
- **Archivos:** `index.html`.
- **Depende de:** aprobación de SPEC/PLAN.
- **Criterio verificable:** HTML5 estático con landmarks y headings planificados; Tailwind Browser/CDN se carga directamente desde `index.html`; sin `<style>`, atributos `style`, CSS personalizado, frameworks, configuración/herramientas de build ni paquetes instalados.
- [ ]

### T002 — Definir regiones de vista y destinos
- **Requisitos:** FR-002, FR-003, FR-011; AC-002, AC-003.
- **Archivos:** `index.html`.
- **Depende de:** T001.
- **Criterio verificable:** existe una región principal para una vista visible; quedan representados Panel y cinco placeholders neutrales con IDs/etiquetas únicos y orden contractual; no se incorporan funcionalidades de dominio.
- [ ]

## 2. Layout / shell

### T003 — Construir contenedor del shell
- **Requisitos:** FR-001, FR-011; VIS-001, VIS-002, VIS-004; AC-001, AC-008.
- **Archivos:** `index.html`.
- **Depende de:** T001.
- **Criterio verificable:** sidebar, topbar y `main` se distribuyen como shell único; cambiar vista no reemplaza shell; anchos y superficies responden a ambos temas.
- [ ]

### T004 — Añadir contexto y headings del Dashboard
- **Requisitos:** FR-003, FR-004; VIS-004; AC-001, AC-003, AC-010.
- **Archivos:** `index.html`, `app.js`.
- **Depende de:** T002, T003.
- **Criterio verificable:** Panel tiene título visible/heading principal; al navegar el contexto de título se sincroniza con la sección activa y conserva jerarquía semántica.
- [ ]

## 3. Sidebar / navegación

### T005 — Crear navegación lateral de seis destinos
- **Requisitos:** FR-001–FR-003, FR-011; VIS-003; AC-001–AC-003.
- **Archivos:** `index.html`, `app.js`.
- **Depende de:** T002, T003.
- **Criterio verificable:** seis enlaces, en orden Panel, Usuarios, Agentes, Habilidades, Contrataciones, Registro de errores; todos tienen nombre visible, son operables y el activo expone `aria-current="page"`.
- [ ]

### T006 — Implementar navegación local sin reload
- **Requisitos:** FR-002, FR-003, FR-011; AC-002, AC-003.
- **Archivos:** `app.js`.
- **Depende de:** T005.
- **Criterio verificable:** seleccionar cada enlace con teclado o puntero muestra la región correspondiente, actualiza título/activo, conserva shell y tema y no recarga; destinos futuros muestran solo el mensaje neutral especificado.
- [ ]

## 4. Topbar / tema

### T007 — Construir topbar y control de tema accesible
- **Requisitos:** FR-004–FR-005; VIS-004, VIS-007; AC-006, AC-009.
- **Archivos:** `index.html`.
- **Depende de:** T003.
- **Criterio verificable:** topbar presenta contexto actual y botón real de tema con nombre accesible, estado expuesto y foco visible.
- [ ]

### T008 — Implementar inicialización y alternancia de tema
- **Requisitos:** FR-005; VIS-002, VIS-007; AC-006, AC-007, AC-012.
- **Archivos:** `app.js`, `index.html`.
- **Depende de:** T007.
- **Criterio verificable:** se respeta almacenamiento válido y, en su ausencia, `prefers-color-scheme`; toggle cambia clase raíz y las superficies/estados de tema se estilizan con utilidades Tailwind base y `dark:`; Tailwind proviene de CDN, sin CSS personalizado ni build; selección sobrevive recarga sin persistir datos operativos; movimiento respeta preferencia reducida.
- [ ]

## 5. KPI

### T009 — Declarar los datos mock contractuales
- **Requisitos:** FR-006, FR-010; AC-004, AC-011.
- **Archivos:** `app.js`.
- **Depende de:** aprobación de SPEC/PLAN.
- **Criterio verificable:** `app.js` declara valores comerciales mock locales (ingresos 24860 USD, descuentos 1240 USD) y una sola colección mock compartida de agentes con IDs estables/estado canónico; hay exactamente dos registros `active` y uno `failing`, y activos/fallando se calculan contando esa colección (2 y 1). No se duplican contadores de agentes ni se hace petición de red; la futura vista Agentes podrá reutilizar la colección, pero no se implementa aquí.
- [ ]

### T010 — Renderizar las cuatro tarjetas KPI
- **Requisitos:** FR-006–FR-007; VIS-005; AC-004, AC-009.
- **Archivos:** `index.html`, `app.js`.
- **Depende de:** T009, T004.
- **Criterio verificable:** Dashboard muestra exactamente cuatro tarjetas en orden contractual con etiquetas/valores correctos; importes comerciales vienen de valores mock locales y los conteos de agentes se derivan de la fuente compartida de T009 (2 activos, 1 fallando); USD en importes y conteos sin moneda; iconos decorativos no sustituyen nombres.
- [ ]

## 6. Gráfico

### T011 — Añadir panel semanal estático e ilustrativo
- **Requisitos:** FR-008–FR-009; VIS-006; AC-005, AC-010.
- **Archivos:** `index.html`.
- **Depende de:** T003, T004.
- **Criterio verificable:** panel bajo KPI titulado “Actividad semanal”; barras HTML/Tailwind para Lun–Dom, leyenda visible de muestra y resumen accesible; sin librería, totales, cifras de negocio o dependencia de hover.
- [ ]

## 7. Responsive

### T012 — Adaptar sidebar y topbar a viewport
- **Requisitos:** FR-001–FR-004; VIS-003–VIS-004; AC-008.
- **Archivos:** `index.html`, `app.js`.
- **Depende de:** T003, T005, T007.
- **Criterio verificable:** sidebar lateral completo en escritorio; compacto/adaptable en 768 px y drawer accesible si se usa en móvil; seis destinos y tema permanecen disponibles; no hay navegación inferior como reemplazo principal.
- [ ]

### T013 — Adaptar KPI y actividad semanal
- **Requisitos:** FR-006–FR-009; VIS-005–VIS-006; AC-008.
- **Archivos:** `index.html`.
- **Depende de:** T010, T011.
- **Criterio verificable:** cuatro KPI en fila en ancho amplio, dos columnas a 768 px y disposición legible a 375 px; gráfico se ajusta sin overflow horizontal global ni recortes.
- [ ]

## 8. Accesibilidad

### T014 — Completar estados, nombres y foco de controles
- **Requisitos:** FR-002, FR-004–FR-005; VIS-007; AC-003, AC-006, AC-009.
- **Archivos:** `index.html`, `app.js`.
- **Depende de:** T005–T008.
- **Criterio verificable:** teclado recorre enlaces y botón en orden lógico; foco visible en temas claro/oscuro; activo y toggle exponen estados; decoración queda oculta a tecnologías asistivas.
- [ ]

### T015 — Revisar semántica y acceso al gráfico
- **Requisitos:** FR-008–FR-009; VIS-006–VIS-007; AC-005, AC-010.
- **Archivos:** `index.html`.
- **Depende de:** T011.
- **Criterio verificable:** landmarks/headings están ordenados; gráfico ofrece título y resumen que anuncia siete días y carácter ilustrativo sin redundancia; contraste legible y no se comunica estado solo por color.
- [ ]

## 9. Validación

### T016 — Verificar contenido y navegación
- **Requisitos:** FR-001–FR-011; AC-001–AC-005, AC-009–AC-011.
- **Archivos:** `index.html`, `app.js`.
- **Depende de:** T001–T011, T014–T015.
- **Criterio verificable:** checklist manual confirma seis destinos/orden, cuatro valores exactos, días Lun–Dom, placeholders neutrales, navegación sin reload, semántica y ausencia de llamadas de aplicación/datos extra.
- [ ]

### T017 — Verificar temas y responsive
- **Requisitos:** FR-005; VIS-002, VIS-007; AC-006–AC-009, AC-012.
- **Archivos:** `index.html`, `app.js`.
- **Depende de:** T008, T012–T015.
- **Criterio verificable:** matriz de prueba cubre tema claro/oscuro, preferencia de sistema, almacenamiento y viewports 1440/1024/768/375; registra foco, contraste, overflow y movimiento reducido sin defectos bloqueantes.
- [ ]

### T018 — Inspeccionar restricciones de stack y ejecución estática
- **Requisitos:** §9 de `spec.md`; AC-011.
- **Archivos:** `index.html`, `app.js`.
- **Depende de:** T001–T017.
- **Criterio verificable:** revisión de archivos confirma HTML5 + carga directa de Tailwind Browser/CDN + JavaScript vanilla; tema oscuro implementado con clase raíz `dark` y utilidades Tailwind `dark:`; no hay framework, TypeScript, API de aplicación, herramientas/configuración de build, dependencias, CSS propio ni estilos inline; abre estáticamente sin instalación/compilación (la carga de estilos CDN requiere red).
- [ ]
