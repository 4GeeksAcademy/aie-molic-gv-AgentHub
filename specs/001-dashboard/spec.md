# SPEC-001 — Dashboard y shell compartido de AgentHub

- **Estado:** propuesta SDD para revisión; aún no implementada.
- **Fuente de verdad:** `SPECS.md`; `SPECS.es.md` sirve como traducción de consulta.
- **Referencias visuales subordinadas:** `design/DESIGN.md` y `design/stitch/dashboard/{code.html,screen.png}`.
- **Alcance de esta especificación:** primer corte implementable con shell compartido y Dashboard funcional; las otras cinco vistas se reservan como destinos de navegación, sin construir sus funcionalidades.

## 1. Objetivo

Entregar el punto de entrada de AgentHub para que una persona administradora vea de un vistazo cuatro métricas comerciales/operativas y una representación ilustrativa de actividad semanal. El shell establece la navegación persistente, el contexto de la sección y la preferencia de tema como base reutilizable para integrar las otras vistas en fases posteriores.

## 2. Alcance funcional

### Incluido

- Shell SPA estático con sidebar lateral persistente de seis destinos, topbar, región principal y estado de navegación activo.
- Destinos, en orden y con etiquetas de producto: **Panel**, **Usuarios**, **Agentes**, **Habilidades**, **Contrataciones**, **Registro de errores**. En esta fase solo Panel contiene una vista de producto implementada; los otros cinco destinos ofrecen un estado no implementado/no disponible, sin contenido funcional ficticio.
- Cambio de destino sin recarga de página: se actualizan vista central, título contextual y `aria-current`; shell y tema se conservan.
- Toggle claro/oscuro global con utilidades Tailwind `dark:`. En ausencia de preferencia guardada se respeta `prefers-color-scheme`; una selección manual puede persistir solo como preferencia en `localStorage`.
- Cuatro KPI en orden contractual: Ingresos mensuales **$24,860**, Pérdidas por descuentos **$1,240**, Agentes activos **2**, Agentes fallando **1**.
- Panel “Actividad semanal” bajo los KPI, leyenda que identifique una serie de muestra y gráfico estático ilustrativo de siete días: **Lun, Mar, Mié, Jue, Vie, Sáb, Dom**.
- Diseño desktop-first y adaptación básica al ancho de tablet/móvil.

### Fuera de alcance

- Implementación de usuarios, agentes, habilidades, contrataciones o log de errores, aunque sus destinos aparezcan en navegación.
- Búsqueda, filtros, ordenación, paginación, acciones rápidas, alta de registros, tablas o tarjetas de dichas secciones.
- Métricas adicionales, total de operaciones, tendencias, porcentajes comparativos o datos reales de telemetría.
- Gráfico con datos productivos, interacción, librerías charting, API, backend, autenticación, facturación, persistencia de métricas o analítica.
- Sidebars inferiores como navegación principal de escritorio, quick controls móviles, inspector de telemetría, drawer contextual o funciones no definidas por `SPECS.md`.

## 3. Requisitos funcionales

| ID | Requisito |
|---|---|
| FR-001 | La aplicación presenta un shell con sidebar lateral, topbar y una región `main`; el sidebar persiste al cambiar entre los seis destinos. |
| FR-002 | El sidebar contiene exactamente seis enlaces, en el orden y con las etiquetas definidos en §2. La sección seleccionada se identifica visualmente y mediante `aria-current="page"`. |
| FR-003 | Seleccionar un destino cambia el contenido central y el título contextual sin recarga; conserva el shell y el tema. Los cinco destinos no implementados muestran solo un aviso neutral de fase posterior, no funcionalidades inventadas. |
| FR-004 | La topbar muestra el título de la sección activa y un botón de tema con nombre accesible y estado actual. |
| FR-005 | El toggle alterna modo claro/oscuro mediante clase `dark` en la raíz y variantes Tailwind `dark:` para todas las superficies/textos del shell y Dashboard. Sin valor guardado, el modo inicial sigue la preferencia del sistema; al alternar manualmente, la preferencia se puede recordar localmente. |
| FR-006 | El Dashboard muestra exactamente cuatro tarjetas KPI, en el orden: Ingresos mensuales `$24,860` USD; Pérdidas por descuentos `$1,240` USD; Agentes activos `2`; Agentes fallando `1`. Los dos KPI de agentes se calculan desde la fuente mock compartida de agentes descrita en §6; no se derivan de contratos ni de datos externos. |
| FR-007 | Cada KPI presenta etiqueta legible, valor prominente e icono decorativo no esencial para comprensión. El formato monetario incluye USD; los conteos no llevan moneda. |
| FR-008 | El panel semanal va debajo de las tarjetas, ocupa el ancho disponible e incluye título “Actividad semanal”, leyenda y los siete días especificados. La representación y leyenda declaran que son datos/actividad de muestra, no métricas de producción. |
| FR-009 | El gráfico es un placeholder estático realizable con HTML y clases Tailwind; no incorpora librerías ni afirma totales/valores de producción. La escala visual de las barras es consistente. |
| FR-010 | Las métricas comerciales y el gráfico son datos mock deterministas locales; los KPI de agentes se derivan de una única colección mock compartida de agentes. No se hacen solicitudes de red ni se persisten valores operativos. |
| FR-011 | Sidebar, topbar, navegación y tema se diseñan como shell reutilizable que permita agregar las cinco vistas en una fase posterior sin duplicar la lógica compartida. |

## 4. Requisitos visuales

- **VIS-001:** identidad SaaS moderna, minimalista y tecnológica; conservar de Stitch la jerarquía, tarjetas sobrias y acentos azul/índigo/violeta, pero usar sans-serif del sistema y valores/patrones compatibles con `SPECS.md`.
- **VIS-002:** fondo claro de referencia `#F8FAFC`, superficies `#FFFFFF`, texto `#0F172A`, secundario `#64748B`, borde `#E2E8F0`; oscuro `#0B1120`, superficies `#111827`/`#1F2937`, texto `#F1F5F9`/`#94A3B8`, borde `#334155`. Los colores son referencias y se implementan mediante utilidades Tailwind (pueden usarse colores Tailwind equivalentes accesibles).
- **VIS-003:** sidebar completo a la izquierda en escritorio, con marca AgentHub y estado activo inequívoco. No usar la navegación inferior observada en la exportación de Stitch como shell principal.
- **VIS-004:** topbar de altura cómoda con contexto de sección y control de tema; el contenido inicia con título/contexto del Panel.
- **VIS-005:** cuatro KPI con superficies/bordes diferenciados, radios moderados, jerarquía etiqueta-valor y color semántico que no sea el único medio para entenderlos.
- **VIS-006:** panel de actividad ocupa el ancho del área principal; gráfico de barras simple con siete rótulos, leyenda textual de muestra y sin cifras adicionales, tooltip dependiente de hover o total operativo.
- **VIS-007:** contraste, foco visible, espaciado y tamaños táctiles legibles en ambos temas; evitar gradientes dominantes, adorno y densidad excesiva.

## 5. Estados e interacciones

- **Carga inicial:** destino Panel, cuatro KPI y gráfico de siete días visibles. El tema se inicializa desde preferencia almacenada válida; si no existe, de `prefers-color-scheme`.
- **Navegación:** enlaces operables por teclado y puntero; seleccionar uno actualiza título, contenido y estado activo sin recarga. En esta fase, solo Panel muestra la funcionalidad completa; otros destinos presentan texto neutral “Esta sección se incorporará en una fase posterior”.
- **Cambio de tema:** el botón alterna tema inmediatamente sin mover la selección activa. Se actualiza `aria-pressed`/nombre accesible coherentemente. `localStorage` solo guarda la preferencia visual.
- **Gráfico:** no interactivo; las barras son representativas y no tienen valores adicionales ocultos ni dependencia de hover.
- No hay estado de carga, error de red, sincronización, acciones rápidas, toast ni estado vacío para el Dashboard.

## 6. Datos y coherencia

| KPI | Valor inicial | Formato/definición |
|---|---:|---|
| Ingresos mensuales | $24,860 | USD; agregado global ficticio, independiente de los cuatro contratos de ejemplo. |
| Pérdidas por descuentos | $1,240 | USD; agregado global ficticio, independiente de los contratos. |
| Agentes activos | 2 | Conteo de registros de la fuente mock compartida cuyo estado canónico es `active` (Activo). |
| Agentes fallando | 1 | Conteo de registros de la misma fuente cuyo estado canónico es `failing` (Fallando). |

La fuente compartida de agentes es un conjunto de datos local mínimo y tipado, con identificadores estables y campo de estado canónico; en esta fase solo se consume para derivar los dos KPI del Dashboard. Debe incluir exactamente dos registros `active` y uno `failing`, manteniendo por tanto los valores contractuales de 2 y 1. No se implementa la vista Agentes, su gestión ni operaciones de dominio. En fases futuras esa vista deberá consumir la misma fuente compartida para que su listado y estados puedan concordar con los KPI, en vez de mantener contadores duplicados independientes.

Los valores comerciales ($24,860 y $1,240) permanecen como mocks locales independientes, sin relación inventada con la colección de agentes ni con contratos de ejemplo. Los valores de actividad semanal solo codifican alturas ilustrativas consistentes para Lun–Dom; no se rotulan como operaciones, peticiones, facturación ni telemetría reales. La selección del tema no altera los datos. No añadir o inferir datos de las demás entidades en esta fase.

## 7. Diseño responsive

- **Escritorio (≥1280 px):** sidebar persistente de aproximadamente 240 px; contenido fluido; cuatro KPI en una fila; panel semanal debajo.
- **Tablet (768–1279 px):** conservar los seis destinos en un sidebar compacto o adaptable; asegurar etiquetas accesibles y acceso al control de tema; KPI en dos columnas.
- **Móvil (<768 px):** sidebar puede convertirse en drawer con botón accesible; no reemplazarlo por navegación inferior como solución principal. KPI apilados en una columna o dos solo si mantienen legibilidad; gráfico y contenido no causan overflow horizontal global.
- Puntos de comprobación: 1440, 1024, 768 y 375 px. No ocultar las métricas, título ni selector de tema.

## 8. Accesibilidad y semántica

- Usar `header`, `aside`/`nav`, `main`, `section`, headings en orden lógico y elementos `a` para navegación; botones reales para cambiar tema.
- El enlace activo expone `aria-current="page"`. El botón de tema tiene nombre accesible y estado (`aria-pressed` o equivalente); iconos decorativos usan `aria-hidden="true"`.
- Todos los controles operables con teclado, orden de tabulación lógico y estilos de foco visibles en ambos temas. El foco no depende solo del color.
- El gráfico tiene título visible; la leyenda nombra la serie como muestra. Dar al gráfico un resumen accesible (por ejemplo, `role="img"` con `aria-label` descriptivo o estructura HTML equivalente) que comunique siete días y carácter ilustrativo sin duplicar etiquetas innecesariamente.
- Respetar `prefers-reduced-motion`; transiciones no esenciales se reducen o eliminan.
- Contraste legible en ambos temas; iconos KPI decorativos no duplican el nombre de la métrica para tecnologías asistivas.

## 9. Restricciones técnicas

- HTML5 semántico, Tailwind CSS cargado exclusivamente por CDN, JavaScript vanilla y datos mock locales.
- Prohibidos React, Vue, Angular, TypeScript, backend, API, herramientas de build, dependencias instaladas, archivos CSS personalizados y atributos `style` inline.
- No copiar el HTML exportado de Stitch ni importar sus fuentes, imágenes, Material Symbols, configuración Tailwind, clases arbitrarias de diseño tokenizado o scripts. Reinterpretar visualmente con utilidades Tailwind factibles y sistema sans-serif.
- Servible como archivo/prototipo estático sin compilación. La red se usa únicamente para cargar Tailwind CDN; no se emiten llamadas de aplicación a servicios.

## 10. Criterios de aceptación

| ID | Criterio verificable |
|---|---|
| AC-001 | Abrir el prototipo muestra Panel y un shell semántico con sidebar, topbar y `main`; no hay recarga al navegar. |
| AC-002 | El sidebar muestra exactamente seis destinos en el orden especificado; cada uno puede seleccionarse con teclado y puntero. |
| AC-003 | Al seleccionar cada destino, cambia el título, el contenido de vista/placeholder y `aria-current`; el sidebar y el estado del tema se conservan. |
| AC-004 | El Dashboard contiene exactamente cuatro tarjetas y, en orden, los textos/valores “Ingresos mensuales / $24,860”, “Pérdidas por descuentos / $1,240”, “Agentes activos / 2”, “Agentes fallando / 1”; monedas en USD y conteos sin moneda. |
| AC-005 | El panel “Actividad semanal” aparece debajo de los KPI, muestra exactamente Lun, Mar, Mié, Jue, Vie, Sáb y Dom, una leyenda y una indicación de muestra; no hay total o métrica de negocio adicional. |
| AC-006 | Con preferencia del sistema clara/oscura y sin selección guardada, carga el tema correspondiente; al alternar, cambia el tema de todo shell y Dashboard, el estado accesible del botón cambia y la sección activa se mantiene. |
| AC-007 | Una elección manual del tema se conserva tras recargar mediante almacenamiento local sin guardar datos de negocio. |
| AC-008 | A 1440 y 1024 px el sidebar está lateral y persistente y los KPI caben en cuatro columnas cuando el ancho lo permite; a 768 px están en dos columnas; a 375 px no hay desbordamiento horizontal de página ni contenido recortado. |
| AC-009 | La interfaz se opera con teclado; enlaces y botón tienen foco visible; sección activa y botón de tema exponen estados accesibles; los iconos decorativos no son el único nombre de KPI/control. |
| AC-010 | El HTML usa landmarks y jerarquía de encabezados coherentes; el gráfico dispone de nombre/resumen accesible y comunica que es ilustrativo. |
| AC-011 | Inspección de archivos confirma Tailwind CDN y JavaScript vanilla solamente; no hay framework, API de aplicación, build config, CSS propio ni atributos `style`. El proyecto abre estáticamente sin instalación/compilación. |
| AC-012 | Inspección visual de tema claro y oscuro confirma contraste legible en shell, tarjetas, gráfico, navegación activa y foco; `prefers-reduced-motion` no introduce movimiento obligatorio. |

## 11. Trazabilidad

- Shell/navegación/tema: FR-001–FR-005, FR-011; VIS-001–VIS-004; AC-001–AC-003, AC-006–AC-010.
- Dashboard/KPI/gráfico/datos: FR-006–FR-010; VIS-005–VIS-006; AC-004–AC-005.
- Responsive/accesibilidad/técnica: VIS-007; FR-011; AC-008–AC-012.
- Restricciones y precedencia: §§1, 9; ver plan y tasks para asignación de implementación.
