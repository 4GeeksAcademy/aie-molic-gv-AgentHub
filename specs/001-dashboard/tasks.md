# TASKS-001 — Implementación y validación: Dashboard

- **Derivadas de:** [`spec.md`](spec.md) y [`plan.md`](plan.md).
- **Estado:** implementación y checks registrados; queda pendiente una matriz visual reproducible de responsive/accesibilidad. La validación manual de Live Server descrita en T017 corresponde únicamente a lo que el usuario confirmó durante el desarrollo.
- **Convención:** cada tarea indica requisitos, archivos, dependencias y un resultado verificable. Solo se marca `[x]` tras comprobarlo. Los KPI de agentes deben derivarse de la fuente mock compartida definida en `spec.md` §6 y `plan.md` §3.3; Tailwind se carga desde CDN y el modo oscuro usa utilidades `dark:`.

## 1. Estructura HTML

### T001 — Preparar documento HTML semántico
- **Requisitos:** FR-001, FR-011; AC-001, AC-010, AC-011.
- **Archivos:** `index.html`.
- **Depende de:** aprobación de SPEC/PLAN.
- **Criterio verificable:** HTML5 estático con landmarks y headings planificados; Tailwind Browser/CDN se carga directamente desde `index.html`; sin `<style>`, atributos `style`, CSS personalizado, frameworks, configuración/herramientas de build ni paquetes instalados.
- [x]

### T002 — Definir regiones de vista y destinos
- **Requisitos:** FR-002, FR-003, FR-011; AC-002, AC-003.
- **Archivos:** `index.html`.
- **Depende de:** T001.
- **Criterio verificable:** existe una región principal para una vista visible; quedan representados Panel y cinco placeholders neutrales con IDs/etiquetas únicos y orden contractual; no se incorporan funcionalidades de dominio.
- [x]

## 2. Layout / shell

### T003 — Construir contenedor del shell
- **Requisitos:** FR-001, FR-011; VIS-001, VIS-002, VIS-004; AC-001, AC-008.
- **Archivos:** `index.html`.
- **Depende de:** T001.
- **Criterio verificable:** sidebar, topbar y `main` se distribuyen como shell único; cambiar vista no reemplaza shell; anchos y superficies responden a ambos temas.
- [x]

### T004 — Añadir contexto y headings del Dashboard
- **Requisitos:** FR-003, FR-004; VIS-004; AC-001, AC-003, AC-010.
- **Archivos:** `index.html`, `app.js`.
- **Depende de:** T002, T003.
- **Criterio verificable:** Panel tiene título visible/heading principal; al navegar el contexto de título se sincroniza con la sección activa y conserva jerarquía semántica.
- **Progreso:** el heading inicial y el contexto/título de topbar se mantienen sincronizados con la vista activa.
- [x]

## 3. Sidebar / navegación

### T005 — Crear navegación lateral de seis destinos
- **Requisitos:** FR-001–FR-003, FR-011; VIS-003; AC-001–AC-003.
- **Archivos:** `index.html`, `app.js`.
- **Depende de:** T002, T003.
- **Criterio verificable:** seis enlaces, en orden Panel, Usuarios, Agentes, Habilidades, Contrataciones, Registro de errores; todos tienen nombre visible, son operables y el activo expone `aria-current="page"`.
- [x]

### T006 — Implementar navegación local sin reload
- **Requisitos:** FR-002, FR-003, FR-011; AC-002, AC-003.
- **Archivos:** `app.js`.
- **Depende de:** T005.
- **Criterio verificable:** seleccionar cada enlace con teclado o puntero muestra la región correspondiente, actualiza título/activo, conserva shell y tema y no recarga; destinos futuros muestran solo el mensaje neutral especificado.
- [x]

## 4. Topbar / tema

### T007 — Construir topbar y control de tema accesible
- **Requisitos:** FR-004–FR-005; VIS-004, VIS-007; AC-006, AC-009.
- **Archivos:** `index.html`.
- **Depende de:** T003.
- **Criterio verificable:** topbar presenta contexto actual y botón real de tema con nombre accesible, estado expuesto y foco visible.
- [x]

### T008 — Implementar inicialización y alternancia de tema
- **Requisitos:** FR-005; VIS-002, VIS-007; AC-006, AC-007, AC-012.
- **Archivos:** `app.js`, `index.html`.
- **Depende de:** T007.
- **Criterio verificable:** se respeta almacenamiento válido y, en su ausencia, `prefers-color-scheme`; toggle cambia clase raíz y las superficies/estados de tema se estilizan con utilidades Tailwind base y `dark:`; Tailwind proviene de CDN, sin CSS personalizado ni build; selección sobrevive recarga sin persistir datos operativos; movimiento respeta preferencia reducida.
- **Progreso:** CDN fijado a Tailwind CSS v3.4.17; configuración `tailwind.config` colocada después de cargar el CDN y antes del script defer de la app. Se eliminó la función temporal de diagnóstico tras la validación.
- **Validación manual:** el usuario confirmó en Live Server que los modos claro y oscuro funcionan y que el cambio afecta a toda la interfaz.
- [x]

## 5. KPI

### T009 — Declarar los datos mock contractuales
- **Requisitos:** FR-006, FR-010; AC-004, AC-011.
- **Archivos:** `app.js`.
- **Depende de:** aprobación de SPEC/PLAN.
- **Criterio verificable:** `app.js` declara valores comerciales mock locales (ingresos 24860 USD, descuentos 1240 USD) y una sola colección mock compartida de agentes con IDs estables/estado canónico; hay exactamente dos registros `active` y uno `failing`, y activos/fallando se calculan contando esa colección (2 y 1). No se duplican contadores de agentes ni se hace petición de red; la futura vista Agentes podrá reutilizar la colección, pero no se implementa aquí.
- [x] Validado: mocks comerciales numéricos locales; cuatro agentes canónicos con IDs únicos, dueños y estados; conteos 2 active/1 failing derivados de la colección. `node --check app.js` correcto y sin llamadas de red.

### T010 — Renderizar las cuatro tarjetas KPI
- **Requisitos:** FR-006–FR-007; VIS-005; AC-004, AC-009.
- **Archivos:** `index.html`, `app.js`.
- **Depende de:** T009, T004.
- **Criterio verificable:** Dashboard muestra exactamente cuatro tarjetas en orden contractual con etiquetas/valores correctos; importes comerciales vienen de valores mock locales y los conteos de agentes se derivan de la fuente compartida de T009 (2 activos, 1 fallando); USD en importes y conteos sin moneda; iconos decorativos no sustituyen nombres.
- [x] Validado: cuatro tarjetas en el orden contractual, importes `$24,860 USD` y `$1,240 USD`, conteos derivados `2`/`1`, iconos decorativos accesibles y estilos claro/oscuro. Verificado mediante ejecución de `app.js` con DOM simulado; navegación y tema existentes conservados.

## 6. Gráfico

### T011 — Añadir panel semanal estático e ilustrativo
- **Requisitos:** FR-008–FR-009; VIS-006; AC-005, AC-010.
- **Archivos:** `index.html`.
- **Depende de:** T003, T004.
- **Criterio verificable:** panel bajo KPI titulado “Actividad semanal”; barras HTML/Tailwind para Lun–Dom, leyenda visible de muestra y resumen accesible; sin librería, totales, cifras de negocio o dependencia de hover.
- [x] Validado estáticamente: panel bajo los KPI, siete barras HTML con alturas diferenciadas y días Lun–Dom, leyenda/aviso de muestra y nombre/resumen accesible; sin métricas operativas, librerías ni estilos personalizados. `node --check app.js`, diagnósticos del editor y `git diff --check` correctos.

## 7. Responsive

### T012 — Adaptar sidebar y topbar a viewport
- **Requisitos:** FR-001–FR-004; VIS-003–VIS-004; AC-008.
- **Archivos:** `index.html`, `app.js`.
- **Depende de:** T003, T005, T007.
- **Criterio verificable:** sidebar lateral completo en escritorio; compacto/adaptable en 768 px y drawer accesible si se usa en móvil; seis destinos y tema permanecen disponibles; no hay navegación inferior como reemplazo principal.
- [x] Validado estáticamente y con DOM simulado: sidebar permanente en escritorio y drawer móvil con backdrop, cierre por botón/overlay/Escape, foco inicial/restaurado, `aria-expanded`, `inert` en móvil cerrado y cierre al navegar. Tema y seis destinos siguen disponibles; no hay navegación inferior.

### T013 — Adaptar KPI y actividad semanal
- **Requisitos:** FR-006–FR-009; VIS-005–VIS-006; AC-008.
- **Archivos:** `index.html`.
- **Depende de:** T010, T011.
- **Criterio verificable:** cuatro KPI en fila en ancho amplio, dos columnas a 768 px y disposición legible a 375 px; gráfico se ajusta sin overflow horizontal global ni recortes.
- [x] Validado por clases responsive y revisión de estructura: una columna en 375 px, dos desde 520 px (incluye 768/1024 px), cuatro desde 1280 px (incluye 1440 px); `main` limita desbordes mediante `min-w-0`, padding adaptable y gráfico de siete columnas. Sin prueba visual real de viewport.

## 8. Accesibilidad

### T014 — Completar estados, nombres y foco de controles
- **Requisitos:** FR-002, FR-004–FR-005; VIS-007; AC-003, AC-006, AC-009.
- **Archivos:** `index.html`, `app.js`.
- **Depende de:** T005–T008.
- **Criterio verificable:** teclado recorre enlaces y botón en orden lógico; foco visible en temas claro/oscuro; activo y toggle exponen estados; decoración queda oculta a tecnologías asistivas.
- [x] Validado por inspección y simulación: enlaces con foco visible y `aria-current`, toggle de tema con nombre/estado y foco visible, iconos decorativos ocultos, drawer operable por teclado y foco restaurado.

### T015 — Revisar semántica y acceso al gráfico
- **Requisitos:** FR-008–FR-009; VIS-006–VIS-007; AC-005, AC-010.
- **Archivos:** `index.html`.
- **Depende de:** T011.
- **Criterio verificable:** landmarks/headings están ordenados; gráfico ofrece título y resumen que anuncia siete días y carácter ilustrativo sin redundancia; contraste legible y no se comunica estado solo por color.
- [x] Validado estáticamente: landmarks y headings jerárquicos; figura con título visible, gráfico etiquetado por título y resumen textual de siete días/caracter ilustrativo; barras decorativas ocultas y leyenda/aviso visibles. Contraste no verificado con herramienta visual.

## 9. Validación

### T016 — Verificar contenido y navegación
- **Requisitos:** FR-001–FR-011; AC-001–AC-005, AC-009–AC-011.
- **Archivos:** `index.html`, `app.js`.
- **Depende de:** T001–T011, T014–T015.
- **Criterio verificable:** checklist manual confirma seis destinos/orden, cuatro valores exactos, días Lun–Dom, placeholders neutrales, navegación sin reload, semántica y ausencia de llamadas de aplicación/datos extra.
- [x] Checklist automatizado/DOM simulado: seis rutas en orden, cuatro KPI renderizados, siete días ordenados, placeholders neutrales y navegación local sin reload; `node --check`, unicidad de IDs, nesting HTML y `git diff --check` correctos. Los valores KPI ya fueron validados en T010.

### T017 — Verificar temas y responsive
- **Requisitos:** FR-005; VIS-002, VIS-007; AC-006–AC-009, AC-012.
- **Archivos:** `index.html`, `app.js`.
- **Depende de:** T008, T012–T015.
- **Criterio verificable:** matriz de prueba cubre tema claro/oscuro, preferencia de sistema, almacenamiento y viewports 1440/1024/768/375; registra foco, contraste, overflow y movimiento reducido sin defectos bloqueantes.
- [x] Validación manual del usuario en Live Server: diseño responsive, menú móvil, navegación y temas claro/oscuro comprobados y funcionando correctamente.

### T018 — Inspeccionar restricciones de stack y ejecución estática
- **Requisitos:** §9 de `spec.md`; AC-011.
- **Archivos:** `index.html`, `app.js`.
- **Depende de:** T001–T017.
- **Criterio verificable:** revisión de archivos confirma HTML5 + carga directa de Tailwind Browser/CDN + JavaScript vanilla; tema oscuro implementado con clase raíz `dark` y utilidades Tailwind `dark:`; no hay framework, TypeScript, API de aplicación, herramientas/configuración de build, dependencias, CSS propio ni estilos inline; abre estáticamente sin instalación/compilación (la carga de estilos CDN requiere red).
- [x] Inspección estática: HTML5 + Tailwind CDN + JS vanilla; sin atributos `style` en el HTML, `<style>`, CSS propio, frameworks, llamadas de API, charting, dependencias ni archivos de build. Nota de auditoría: `app.js` asigna `menu.style.left/top` al dropdown de Contrataciones, lo que genera estilos inline en runtime y contradice la restricción general de `SPECS.md` §2.1; no se cambia el posicionamiento en esta fase documental. `index.html` puede servirse estáticamente con acceso de red para CDN.
