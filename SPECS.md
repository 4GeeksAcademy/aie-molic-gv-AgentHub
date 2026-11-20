# AgentHub — Especificación funcional, visual y técnica

> **Estado:** propuesta para revisión; contrato de implementación del prototipo.  
> **Alcance de esta entrega:** especificación únicamente. No incluye interfaz implementada, código, dependencias ni integración.  
> **Convenciones:** **[OBLIGATORIO]** identifica requisitos comprobables que deben implementarse; **[OPCIONAL]** identifica sugerencias visuales que pueden variar sin incumplir el contrato.

## 1. Product Overview

AgentHub es un panel interno de administración para una plataforma SaaS en la que empresas alquilan agentes de inteligencia artificial equipados con skills. El prototipo permite supervisar métricas, consultar y gestionar usuarios, agentes, skills, contratos y errores de ejecución.

Será una SPA estática de seis vistas, con datos ficticios locales y sin backend. La navegación cambia el contenido central sin perder el sidebar ni el tema. Las acciones de eliminar y resolver son demostrativas: actualizan el estado local de la sesión, no persisten al recargar y no contactan servicios externos.

**Éxito del producto:** un administrador puede identificar rápidamente el estado operativo, localizar registros relacionados y consultar su detalle mediante interacciones predecibles, legibles y accesibles.

## 2. Target User and Goals

**Usuario principal:** administrador interno de AgentHub, familiarizado con operaciones SaaS pero que necesita consultar varios tipos de registros en una misma herramienta.

**Objetivos:**
- Ver salud operativa e indicadores comerciales de un vistazo.
- Encontrar usuarios, agentes, skills, contratos y errores mediante tablas/listados claros.
- Inspeccionar datos completos sin perder el contexto de la vista.
- Comprender relaciones: quién posee un agente, qué skills utiliza y qué se contrató.
- Distinguir estados y severidades sin depender exclusivamente del color.

## 3. Technology Stack and Constraints

**[OBLIGATORIO]** HTML5 semántico, Tailwind CSS exclusivamente mediante CDN, JavaScript vanilla y datos mock definidos localmente. No React, Vue, Angular, TypeScript, backend, APIs, build tools, CSS personalizado ni estilos inline. Utilizar clases Tailwind en los elementos. El tema claro/oscuro se implementará con utilidades `dark:` de Tailwind y una estrategia de clase `dark` en el elemento raíz.

**[OBLIGATORIO]** La solución final debe ser servible como prototipo estático, sin instalación de paquetes ni compilación. No se requieren archivos de implementación en esta etapa. Para gráficos, usar un placeholder visual hecho con HTML/Tailwind; no introducir librerías de charting.

**[OBLIGATORIO]** El estado de navegación, tema, menús, modal, acordeones y cambios demostrativos de eliminar/resolver se gestiona con JavaScript en memoria. No guardar datos operativos en servicios remotos. Preferencia de tema puede persistirse en `localStorage` como comodidad; si no existe valor, respetar `prefers-color-scheme`.

**[OPCIONAL]** Usar iconos SVG inline accesibles o una biblioteca de iconos vía CDN solo si no añade framework/dependencia de build. No usar emoji como sustituto de iconos de interfaz.

## 4. Information Architecture and Navigation

Shell persistente compuesto por sidebar, topbar y región `main` con una sola vista visible a la vez. Seis entradas, en este orden: **Dashboard**, **Usuarios**, **Agentes**, **Skills**, **Contrataciones**, **Log de errores**. El sidebar muestra marca AgentHub, icono, etiqueta y estado activo inequívoco. En pantallas estrechas puede convertirse en panel lateral desplegable, conservando las seis rutas y el control de tema.

La topbar presenta título de la sección actual, breadcrumb o contexto corto y toggle de tema. La selección de sección actualiza título, navegación activa y contenido sin recarga. La URL puede permanecer estática; no se exige router.

**[OBLIGATORIO]** Una tabla/listado puede tener controles de acción por fila; cada menú abre anclado a su botón y no debe quedar cortado por el contenedor. Cambiar de sección cierra menú y modal abiertos. El foco se mantiene o devuelve de forma lógica.

## 5. Visual Design System

**Dirección:** interfaz SaaS moderna, minimalista, tecnológica y premium. Jerarquía tipográfica clara, densidad moderada, alineación consistente y espacios generosos; evitar ornamento y gradientes dominantes.

**Paleta propuesta (valores de referencia):**
- Marca: azul `#2563EB`, índigo `#4F46E5`, violeta `#7C3AED`; acento primario índigo.
- Fondo claro `#F8FAFC`; superficies `#FFFFFF`; texto `#0F172A`; texto secundario `#64748B`; borde `#E2E8F0`.
- Fondo oscuro `#0B1120`; superficie `#111827`; superficie elevada `#1F2937`; texto `#F1F5F9`; texto secundario `#94A3B8`; borde `#334155`.
- Semánticos: éxito verde, aviso ámbar, error rojo, información azul; cada estado lleva texto/etiqueta además del color.

**Tipografía y forma:** sans-serif de sistema, títulos de sección 24–30 px, títulos de tarjeta 14–16 px, contenido 14 px como base, metadatos 12–13 px. Radios de 8–12 px, bordes finos, sombras discretas solo para menús/modales. Controles con altura táctil cómoda y foco visible.

**[OBLIGATORIO]** Todas las superficies y estados tienen contraste adecuado en ambos temas; las clases `dark:` cubren fondos, texto, bordes, hover, focus, menús y overlays, no solo el fondo global. **[OPCIONAL]** KPI con pequeño icono en contenedor tintado y microtendencia neutral, sin afirmar datos comparativos no incluidos en el mock.

## 6. Detailed Specifications for Each of the Six Sections

### 6.1 Dashboard
1. **[OBLIGATORIO] KPI:** mostrar exactamente cuatro tarjetas en este orden: Ingresos mensuales **$24,860**, Pérdidas por descuentos **$1,240**, Agentes activos **3**, Agentes fallando **1**. Cada una presenta icono, etiqueta y valor con jerarquía diferenciada; ingresos/pérdidas en USD y conteos sin moneda. En desktop una fila de cuatro; en tablet dos columnas; en móvil una columna o dos según ancho legible.
2. **[OBLIGATORIO] Actividad semanal:** panel de ancho completo debajo de KPIs, título “Actividad semanal”, leyenda y gráfico placeholder con siete días (Lun–Dom) y escala visual consistente. El placeholder debe indicar visualmente que es actividad, no datos de producción; puede mostrar barras/área simple construida con elementos HTML.
3. El dashboard puede incluir una línea de contexto “Resumen operativo” y fecha ficticia de actualización; no incorporar métricas adicionales que contradigan los datos definidos.
4. Tarjetas con bordes suaves, superficie diferenciada y layout responsive; la información no depende solo del color ni de hover.

### 6.2 Gestión de usuarios
1. **[OBLIGATORIO] Tabla** con al menos cinco filas y columnas Nombre, Email, Plan y Estado, más columna de acciones. Incluir los cinco usuarios canónicos definidos en la sección 8 y representar estado con texto y badge.
2. **[OBLIGATORIO] Menú por usuario:** botón accesible abre dropdown con “Ver detalle” y “Eliminar”. “Ver detalle” abre modal para el usuario seleccionado. “Eliminar” solicita confirmación en diálogo accesible; al confirmar, elimina solo la fila de la sesión y cierra menú/diálogo; cancelar no modifica datos.
3. **[OBLIGATORIO] Modal de detalle:** nombre, email, empresa, plan, estado, fecha de alta y agentes asociados. Botón de cierre, Escape y clic en backdrop lo cierran; clic dentro no lo cierra.
4. Cabecera de vista con título y texto breve. La tabla admite scroll horizontal en viewport reducido sin ocultar acciones.

### 6.3 Gestión de agentes
1. **[OBLIGATORIO] Listado** de al menos cuatro agentes canónicos, cada uno con nombre, propietario (usuario/empresa según modelo), estado activo/inactivo/fallando y control de acciones. Estados: verde activo, gris inactivo y rojo fallando, siempre con texto.
2. **[OBLIGATORIO] Skills:** sección colapsada inicialmente en cada agente; botón con nombre accesible y `aria-expanded` despliega nombres de skills asociados. Apertura/cierre con transición visible breve (aprox. 150–250 ms) sin ocultar la lista a tecnologías de asistencia.
3. **[OBLIGATORIO] Dropdown** “Configurar” y “Eliminar”. Configurar abre modal con nombre del agente, propietario, estado y system prompt precargado en textarea editable. Guardar actualiza solo el estado local y muestra confirmación visual; cancelar/cerrar descarta cambios no guardados. Eliminar pide confirmación.
4. Modal de configuración muestra una nota “Cambios de demostración; no se guardan en un servidor”. Prompt completo y legible, textarea con etiqueta explícita y posibilidad de desplazamiento interno.

### 6.4 Skills
1. **[OBLIGATORIO] Catálogo** de al menos cuatro skills canónicas, cada tarjeta/fila presenta nombre, descripción breve y número de agentes que la utilizan. Los recuentos se derivan de relaciones de agentes, no se introducen a mano discordante.
2. Bloque informativo visible titulado “¿Qué es una skill?” que explique: capacidad modular que un agente puede utilizar, por ejemplo búsqueda o análisis; una skill puede estar asociada a varios agentes.
3. **[OBLIGATORIO] Dropdown** “Ver detalle” y “Eliminar”. Ver detalle abre modal con nombre, descripción completa, categoría, agentes asociados y contador derivado. Eliminar pide confirmación; al confirmar se elimina de la sesión y se retira de relaciones/listados, con actualización de recuentos.
4. No confundir skill con agente: diferenciar visualmente el catálogo y mostrar agentes asociados mediante nombres.

### 6.5 Contrataciones de agentes
1. **[OBLIGATORIO] Tabla** con cuatro o más contratos canónicos y columnas Cliente, Agente, Skills contratadas, Fecha de inicio, Fecha de fin e Importe pagado, más acción. Skills se presentan como chips compactos y legibles.
2. **[OBLIGATORIO] Menú de acciones** por contrato ofrece “Ver detalle”. Si se incluye una acción adicional debe estar definida y ser solo demostrativa; no se exige editar/eliminar contratos.
3. **[OBLIGATORIO] Modal de detalle** incluye ID de contrato, cliente, agente, fechas, estado, total pagado y desglose de cada skill contratada con precio individual y subtotal. Los subtotales suman exactamente el importe pagado.
4. Importes formateados consistentemente como USD; fechas con formato legible uniforme y fechas no ambiguas.

### 6.6 Log de errores
1. **[OBLIGATORIO] Tabla/listado** con al menos seis errores canónicos y columnas Timestamp, Agente, Tipo/Severidad, Descripción y acciones. Mostrar timestamp con fecha y hora; descripción truncable solo si el modal ofrece el texto completo.
2. Badges semánticos con color y texto: **Crítico** rojo, **Advertencia** ámbar, **Información** azul. Los seis registros deben cubrir más de una categoría y enlazar con agentes existentes.
3. **[OBLIGATORIO] Dropdown** “Ver detalle” y “Marcar como resuelto”. Marcar resuelto cambia badge/estado local a “Resuelto”, actualiza la fila y evita volver a ofrecer resolver ese mismo registro (puede sustituirlo por “Reabrir” solo si se especifica; preferencia: acción no disponible al estar resuelto).
4. **[OBLIGATORIO] Modal** de detalle con ID, timestamp, agente, severidad, mensaje completo, estado y traza completa en bloque monoespaciado desplazable. Botón y backdrop cierran; Escape también.

## 7. Reusable Component Inventory

- **AppShell:** sidebar persistente, topbar y región principal; adapta navegación al viewport.
- **SidebarNavItem:** icono, etiqueta, selección activa y estado accesible.
- **ThemeToggle:** botón con nombre accesible y estado actual, cambia tema sin cambiar sección.
- **PageHeader:** título y descripción/contexto de vista.
- **KpiCard:** icono decorativo ocultable a lectores, etiqueta, valor y formato.
- **DataTable:** encabezados semánticos, filas, scroll responsive y columna de acciones.
- **StatusBadge / SeverityBadge:** texto visible más tratamiento semántico consistente.
- **SkillChip:** etiqueta corta de skill.
- **ActionMenu:** botón por fila, menú de acciones, cierre al seleccionar, fuera y Escape; un menú abierto a la vez.
- **ModalDialog:** overlay, título, contenido, cierre, foco y comportamiento de backdrop/Escape.
- **ConfirmDialog:** confirmación de eliminación/resolución destructiva, botones Cancelar/Confirmar.
- **AccordionSkills:** botón expandible y región animada con habilidades.
- **Toast/InlineFeedback:** confirmación accesible tras guardar/resolver; desaparece por acción temporal no intrusiva o queda como mensaje inline.
- **EmptyState:** mensaje claro y acción de recuperación si una eliminación deja una lista vacía.

## 8. Mock Data Model and Cross-Section Consistency

Todos los registros son deterministas y locales. Usar IDs estables y referencias por ID; textos y valores de las secciones deben derivarse de las mismas entidades. Fechas ISO 8601 y precios numéricos USD. Un estado inicial de sesión coherente:

**Usuarios**
| ID | Nombre | Email | Empresa | Plan | Estado | Alta |
|---|---|---|---|---|---|---|
| U-001 | Lucía Moreno | lucia.moreno@northstar.example | Northstar Labs | Enterprise | Activo | 2025-03-12 |
| U-002 | Mateo Ruiz | mateo.ruiz@brightpath.example | BrightPath | Pro | Activo | 2025-06-04 |
| U-003 | Sofía Chen | sofia.chen@orbitdata.example | Orbit Data | Pro | Activo | 2025-08-19 |
| U-004 | Diego Herrera | diego.herrera@verdeco.example | Verde & Co. | Starter | Pendiente | 2026-01-10 |
| U-005 | Valentina Cruz | valentina.cruz@northstar.example | Northstar Labs | Enterprise | Activo | 2026-02-02 |

**Skills**
| ID | Nombre | Categoría | Descripción breve |
|---|---|---|---|
| S-001 | Web Research | Investigación | Busca, compara y sintetiza información web. |
| S-002 | Data Analysis | Analítica | Analiza conjuntos de datos y resume hallazgos. |
| S-003 | Customer Support | Atención | Clasifica consultas y redacta respuestas de soporte. |
| S-004 | Workflow Automation | Automatización | Coordina pasos repetibles y tareas entre herramientas. |

**Agentes** (propietario mostrado como empresa; userId define administrador propietario)
| ID | Nombre | ownerId / empresa | Estado | Skills |
|---|---|---|---|---|
| A-001 | Atlas Researcher | U-001 / Northstar Labs | Activo | S-001, S-002 |
| A-002 | Nova Support | U-002 / BrightPath | Activo | S-003, S-004 |
| A-003 | Orbit Analyst | U-003 / Orbit Data | Fallando | S-002, S-001 |
| A-004 | Verde Workflow | U-004 / Verde & Co. | Inactivo | S-004, S-003 |

U-005 no posee agente en el estado inicial, pero aparece como cliente/representante en un contrato. El prompt del agente es texto ficticio de 2–4 frases, diferente por agente, sin secretos ni instrucciones peligrosas.

**Contratos** (cada importe es la suma de las líneas)
| ID | Cliente | Agente | Inicio | Fin | Skills y precio USD | Total | Estado |
|---|---|---|---|---|---|---:|---|
| C-1001 | Northstar Labs (U-001) | Atlas Researcher (A-001) | 2026-10-01 | 2026-11-01 | Web Research $320; Data Analysis $180 | $500 | Activo |
| C-1002 | BrightPath (U-002) | Nova Support (A-002) | 2026-10-10 | 2026-11-10 | Customer Support $240; Workflow Automation $160 | $400 | Activo |
| C-1003 | Orbit Data (U-003) | Orbit Analyst (A-003) | 2026-09-15 | 2026-10-15 | Data Analysis $300; Web Research $150 | $450 | Finalizado |
| C-1004 | Northstar Labs (U-005) | Atlas Researcher (A-001) | 2026-11-01 | 2026-12-01 | Web Research $280; Data Analysis $170 | $450 | Activo |

**Errores** (cada traza contiene al menos tres líneas ficticias)
| ID | Timestamp | Agente | Tipo | Descripción breve | Estado inicial |
|---|---|---|---|---|---|
| E-001 | 2026-11-20 09:42 UTC | Orbit Analyst | Crítico | Tiempo de espera agotado al consultar fuente de datos. | Abierto |
| E-002 | 2026-11-20 09:18 UTC | Nova Support | Advertencia | Límite de reintentos alcanzado para una tarea. | Abierto |
| E-003 | 2026-11-20 08:56 UTC | Atlas Researcher | Información | Una fuente devolvió contenido vacío. | Abierto |
| E-004 | 2026-11-19 17:31 UTC | Orbit Analyst | Crítico | Fallo al validar el esquema de respuesta. | Abierto |
| E-005 | 2026-11-19 16:04 UTC | Verde Workflow | Advertencia | La tarea se pausó por falta de entrada. | Resuelto |
| E-006 | 2026-11-19 14:27 UTC | Nova Support | Información | Tarea completada tras un reintento. | Abierto |

**Relaciones y consistencia:** el contador de skills cuenta agentes no eliminados que las referencian: Web Research 2, Data Analysis 2, Customer Support 2, Workflow Automation 2. Agentes y errores muestran exactamente los nombres de la tabla canónica. Los contratos referencian skills y agente existentes; las líneas contratadas son snapshot comercial independiente de las asociaciones actuales del agente. KPI de agentes: tres activos (si “activo” incluye estados activos exclusivamente, el valor es 2; por lo tanto, para respetar KPI=3, considerar también el agente fallando como operativo/activo en la métrica agregada “Agentes activos” **solo si se etiqueta “Agentes en operación”**). Para evitar ambigüedad, decisión final de especificación: KPI “Agentes activos” = **2** (solo estado Activo) y “Agentes fallando” = **1**; reemplaza el valor 3 indicado en el listado inicial de Dashboard. Métricas de ingresos y descuentos son agregados ficticios independientes del subtotal de contratos mostrados, indicados como periodo mensual.

> **Nota de consistencia para implementación:** el requisito visual del Dashboard se concreta en **2 agentes activos y 1 fallando**, derivado de la fuente de verdad. No mostrar 3 como valor de activo. Ingresos $24,860 y descuentos $1,240 son métricas globales ficticias, no deben calcularse a partir de estos cuatro contratos parciales.

## 9. Interactive Behaviors and State Management

- **Navegación:** seleccionar una sección actualiza vista, título y `aria-current`; sidebar permanece. La selección no restablece tema.
- **Tema:** toggle cambia clase `dark` de raíz inmediatamente, actualiza etiqueta/estado accesible y persiste preferencia local. Si no hay preferencia guardada, inicia según preferencia del sistema. Debe funcionar en todas las seis vistas y overlays.
- **Dropdowns:** activación por botón; un solo menú abierto; clic fuera, Escape, selección y navegación lo cierran. Botón con `aria-haspopup`, `aria-expanded` y relación con menú. Clic en el menú no dispara cierre accidental antes de ejecutar acción.
- **Modales:** abrir el modal pertinente al registro seleccionado; overlay; botón visible de cierre, Escape y clic en backdrop cierran. Clic dentro conserva modal. Evitar cierre por backdrop al iniciar clic dentro y soltar fuera. Al abrir, foco entra al diálogo; al cerrar vuelve al activador cuando exista.
- **Confirmación:** eliminar requiere confirmación explícita; cancelar es operación sin efecto. Confirmar elimina solo de la colección en memoria y actualiza contadores/relaciones derivadas. Lista vacía muestra EmptyState.
- **Edición de prompt:** textarea parte de valor seleccionado; Guardar actualiza mock en memoria y anuncia éxito; cancelar/descartar no conserva cambios no guardados.
- **Acordeón:** todos cerrados en carga inicial; cada uno opera independientemente, informa `aria-expanded` y transiciona apertura/cierre.
- **Errores:** resolver actualiza estado local, badge y menú; el detalle refleja estado actual.
- **Límites:** ninguna acción simula persistencia remota. Recargar restaura datos iniciales salvo preferencia de tema.

## 10. Accessibility, Responsive Design and Semantic HTML

**[OBLIGATORIO]** Usar landmarks `header`, `nav`, `main`, `section` y tablas con `caption` (visualmente ocultable), `thead`, `tbody`, `th scope="col"`. Orden de encabezados lógico. Botones reales para acciones; no usar `div` clicables. Labels asociados a controles, especialmente textarea.

Todos los controles de navegación/menú/modal/acordeón funcionan con teclado y tienen foco visible. Añadir `aria-label` a botones solo iconográficos, `aria-current="page"` a navegación activa, `aria-expanded` a dropdown/acordeón, y diálogo con nombre accesible (`role="dialog"`, `aria-modal="true"`). En diálogo, contener foco mientras está abierto y devolverlo al cerrar; permitir Escape. Anunciar feedback con `aria-live="polite"`. No comunicar estado únicamente mediante color.

Diseño desktop-first comprobable en 1440 px, 1024 px, 768 px y 375 px. Sidebar completo en desktop; en tablet/móvil colapsado o drawer con botón identificable. Tablas anchas pueden desplazarse horizontalmente dentro de su región, no provocar desbordamiento global. KPI y tarjetas se reordenan sin cortar contenido. Respeto de `prefers-reduced-motion`; la transición puede reducirse/desactivarse. Contraste legible en claro y oscuro.

## 11. Numbered Acceptance Criteria

1. El prototipo presenta exactamente seis secciones navegables y mantiene sidebar visible/presente al cambiar de sección.
2. La sección activa está visualmente diferenciada y expuesta con `aria-current`; el título del contenido coincide con ella.
3. El toggle claro/oscuro funciona desde todas las vistas, cambia también tablas, overlays, dropdowns y badges, y mantiene selección durante navegación.
4. Sin preferencia persistida, el tema inicial respeta preferencia de sistema; al cambiar tema manualmente, la elección se mantiene entre vistas y recargas mediante almacenamiento local.
5. Dashboard muestra cuatro KPI con etiqueta, icono y valores: $24,860; $1,240; 2 activos; 1 fallando; además del panel semanal de ancho completo con siete días.
6. Dashboard reorganiza KPIs sin solapamiento a 1440, 1024, 768 y 375 px.
7. Usuarios presenta cinco usuarios canónicos y columnas Nombre, Email, Plan y Estado; cada fila dispone de acciones.
8. El menú de usuario ofrece Ver detalle y Eliminar; ver detalle abre los datos requeridos del usuario elegido.
9. Modal de usuario cierra mediante botón, Escape y clic en backdrop, pero no al hacer clic dentro; foco vuelve al activador.
10. Eliminar usuario presenta confirmación; cancelar conserva fila, confirmar la elimina solo en memoria y deja aplicación en estado coherente.
11. Agentes presenta cuatro agentes canónicos con propietario, estado textual y skills colapsadas al inicio.
12. Cada acordeón de skills se expande y colapsa con transición visible y actualiza `aria-expanded`.
13. Menú de agente contiene Configurar y Eliminar; configuración muestra el prompt del agente en textarea etiquetado y guardar/cancelar tienen los efectos especificados.
14. Skills presenta cuatro skills canónicas, descripción y contadores derivados; incluye el bloque explicativo “¿Qué es una skill?”.
15. Detalle de skill muestra descripción, categoría y agentes relacionados; eliminar requiere confirmación y actualiza relaciones y recuentos locales.
16. Contrataciones presenta cuatro contratos con cliente, agente, skills, fechas e importe; cada modal detalla líneas y subtotales cuya suma coincide con total.
17. Log presenta seis errores, timestamps, agente, categoría, descripción y badges con texto; hay más de una severidad.
18. Cada error permite ver la traza completa; marcar resuelto actualiza estado visible y ya no ofrece la acción de resolver.
19. Todos los dropdowns se cierran por clic fuera, Escape, selección y cambio de sección; solo uno puede estar abierto.
20. Todos los modales se cierran con botón y backdrop; clic dentro no los cierra. Los modales de error/usuario también admiten Escape.
21. Todas las acciones se pueden operar por teclado, tienen foco visible y nombre accesible; estados no se indican solo por color.
22. Las tablas tienen estructura semántica, encabezados asociados y scroll contenido en pantallas estrechas, sin desbordamiento horizontal de toda la página.
23. El modo oscuro y claro son legibles, con contraste y estilos definidos para superficies, texto, bordes y estados.
24. Eliminar/resolver/configurar solo altera datos mock en memoria; no se realizan peticiones de red, y al recargar se recuperan datos iniciales.
25. La implementación posterior utiliza solo HTML semántico, Tailwind CDN y JavaScript vanilla; no introduce frameworks, build, CSS personalizado ni estilos inline.

## 12. Out of Scope

- Backend, API, autenticación, autorización, integración con proveedores de IA o ejecución real de agentes.
- Datos reales, persistencia de entidades tras recarga, facturación efectiva o pagos.
- Búsqueda, filtros, ordenación, paginación y exportación, salvo decisión posterior explícita.
- Creación de usuarios/agentes/skills/contratos, edición general o flujos completos de CRUD.
- Gráficos con series reales o librerías de visualización.
- Internacionalización completa; interfaz en español, con nombres de entidades y términos de producto indicados en inglés cuando corresponda.
- Implementación de pantallas/código en esta fase de especificación.

## 13. Google Stitch Design Brief

**Prompt autocontenido para copiar en Google Stitch:**

> Diseña un prototipo visual de alta fidelidad para **AgentHub**, un panel interno SaaS de administración de una plataforma que alquila agentes de inteligencia artificial con skills. El usuario es un administrador de operaciones que necesita supervisar estado, consultar registros relacionados y gestionar acciones con claridad. Crea una aplicación desktop-first, adaptable a tablet/móvil, con shell persistente: sidebar de navegación a la izquierda con marca AgentHub e iconos y seis entradas (Dashboard, Usuarios, Agentes, Skills, Contrataciones, Log de errores), y topbar con título contextual y toggle claro/oscuro. La sección actual debe destacarse con claridad.
>
> Diseña las seis vistas: **Dashboard** con cuatro KPI (ingresos mensuales $24,860, pérdidas por descuentos $1,240, agentes activos 2, agentes fallando 1) y panel ancho de actividad semanal de siete días; **Usuarios** con tabla de cinco usuarios, columnas nombre/email/plan/estado y menú de fila; **Agentes** con cuatro filas/tarjetas, propietario, badges activo/inactivo/fallando, acordeón inicialmente cerrado para skills y menú Configurar/Eliminar; **Skills** con cuatro elementos de catálogo, descripción, contador de agentes y bloque “¿Qué es una skill?”; **Contrataciones** con tabla de cuatro contratos, cliente, agente, skills como chips, fechas e importe; **Log de errores** con seis eventos, timestamp, agente, severidad y descripción. Incluye estados visuales de dropdown contextual, modal de detalle, modal de configuración de agente con textarea para system prompt y modal de error con traza monoespaciada; confirma visualmente que los modales se pueden cerrar y que existe confirmación antes de eliminar.
>
> Usa una identidad moderna, minimalista, premium y tecnológica; azul/índigo/violeta como acentos sobre superficies limpias, fondos claros gris muy pálido, texto oscuro y bordes suaves. Semánticos verde para activo, gris para inactivo, rojo para fallando/crítico, ámbar para advertencia y azul para información; siempre acompaña color con etiqueta textual. Presenta una versión cuidada en modo claro y otra en modo oscuro elegante (fondo azul-negro, superficies carbón, texto claro y bordes discretos). Sans-serif, jerarquía tipográfica clara, espaciado generoso, tablas legibles, tarjetas con radios moderados y sombras discretas. Evita gradientes llamativos, ornamentación y densidad excesiva. Representa en las pantallas el comportamiento de navegación persistente, toggle de tema, dropdowns, acordeones animados y modales con backdrop; diseño accesible con foco visible y controles reconocibles. Usa contenido ficticio coherente entre usuarios, agentes y skills; en particular Atlas Researcher, Nova Support, Orbit Analyst y Verde Workflow, y Web Research, Data Analysis, Customer Support y Workflow Automation.
>
> Esta propuesta visual representa un prototipo estático sin backend. La futura implementación se restringirá a HTML5 semántico, Tailwind CSS por CDN y JavaScript vanilla: sin React/Vue/Angular, TypeScript, build tools, CSS personalizado, estilos inline ni APIs. No generes backend ni funciones de producción.
