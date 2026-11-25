# AgentHub — Especificación funcional, visual y técnica

> **Estado:** propuesta para revisión; contrato de implementación del prototipo.  
> **Alcance de esta entrega:** especificación únicamente. No incluye interfaz implementada, código, dependencias ni integración.  
> **Convenciones:** **[OBLIGATORIO]** identifica requisitos comprobables que deben implementarse; **[OPCIONAL]** identifica sugerencias visuales que pueden variar sin incumplir el contrato.

## 1. Descripción del producto

AgentHub es un panel interno de administración para una plataforma SaaS en la que empresas alquilan agentes de inteligencia artificial equipados con habilidades (skills). El prototipo permite supervisar métricas, consultar y gestionar usuarios, agentes, habilidades, contratos y errores de ejecución.

Será una aplicación web estática de seis vistas, con datos ficticios locales y sin backend. La navegación cambia el contenido central sin perder la barra lateral ni el tema. Las acciones de eliminar y resolver son demostrativas: actualizan el estado local de la sesión, no persisten al recargar y no contactan servicios externos.

**Criterio de éxito:** un administrador puede identificar rápidamente el estado operativo, localizar registros relacionados y consultar su detalle mediante interacciones predecibles, legibles y accesibles.

## 2. Usuario objetivo y objetivos

**Usuario principal:** administrador interno de AgentHub, familiarizado con operaciones SaaS, que necesita consultar varios tipos de registros en una misma herramienta.

**Objetivos:**
- Ver la salud operativa y los indicadores comerciales de un vistazo.
- Encontrar usuarios, agentes, habilidades, contratos y errores mediante tablas o listados claros.
- Inspeccionar datos completos sin perder el contexto de la vista.
- Comprender las relaciones: quién es propietario de un agente, qué habilidades utiliza y qué se contrató.
- Distinguir estados y niveles de gravedad sin depender exclusivamente del color.

## 3. Tecnologías y restricciones

**[OBLIGATORIO]** HTML5 semántico, Tailwind CSS exclusivamente mediante CDN, JavaScript nativo (vanilla) y datos de prueba definidos localmente. No se permite React, Vue, Angular, TypeScript, backend, API, herramientas de compilación, CSS personalizado ni estilos en línea. Se utilizarán clases de Tailwind en los elementos. El tema claro/oscuro se implementará con las utilidades `dark:` de Tailwind y una estrategia basada en la clase `dark` en el elemento raíz.

**[OBLIGATORIO]** La solución final debe poder servirse como prototipo estático, sin instalación de paquetes ni compilación. En esta etapa no se requieren archivos de implementación. Para los gráficos, se usará un marcador visual hecho con HTML/Tailwind; no se incorporarán bibliotecas de gráficos.

**[OBLIGATORIO]** El estado de navegación, tema, menús, ventanas modales, acordeones y cambios demostrativos de eliminación/resolución se gestionará con JavaScript en memoria. No se guardarán datos operativos en servicios remotos. La preferencia de tema puede guardarse en `localStorage` como comodidad; si no existe un valor, se respetará `prefers-color-scheme`.

**[OPCIONAL]** Se pueden usar iconos SVG en línea accesibles o una biblioteca de iconos mediante CDN solo si no añade frameworks ni dependencias de compilación. No se usarán emojis como sustituto de iconos de interfaz.

## 4. Arquitectura de información y navegación

Estructura persistente compuesta por barra lateral, barra superior y región principal `main`, con una sola vista visible a la vez. Seis entradas, en este orden: **Panel**, **Usuarios**, **Agentes**, **Habilidades**, **Contrataciones**, **Registro de errores**. La barra lateral muestra la marca AgentHub, un icono, una etiqueta y un estado activo inequívoco. En pantallas estrechas puede convertirse en un panel lateral desplegable, conservando las seis secciones y el control de tema.

La barra superior presenta el título de la sección actual, una ruta de navegación o contexto breve y el interruptor de tema. Seleccionar una sección actualiza el título, la navegación activa y el contenido sin recargar la página. La URL puede permanecer estática; no se exige un enrutador.

**[OBLIGATORIO]** Cada menú de acciones de una fila se abre junto a su botón y no queda recortado por su contenedor. Cambiar de sección cierra los menús y ventanas modales abiertos. El foco se conserva o devuelve de manera lógica.

## 5. Sistema de diseño visual

**Dirección:** interfaz SaaS moderna, minimalista, tecnológica y prémium. Jerarquía tipográfica clara, densidad moderada, alineación consistente y espacios generosos; evitar adornos y degradados dominantes.

**Paleta propuesta (valores de referencia):**
- Marca: azul `#2563EB`, índigo `#4F46E5`, violeta `#7C3AED`; índigo como acento principal.
- Fondo claro `#F8FAFC`; superficies `#FFFFFF`; texto `#0F172A`; texto secundario `#64748B`; borde `#E2E8F0`.
- Fondo oscuro `#0B1120`; superficie `#111827`; superficie elevada `#1F2937`; texto `#F1F5F9`; texto secundario `#94A3B8`; borde `#334155`.
- Colores semánticos: verde para éxito, ámbar para aviso, rojo para error y azul para información; cada estado incluye texto o etiqueta además del color.

**Tipografía y formas:** sans serif del sistema; títulos de sección de 24–30 px, títulos de tarjeta de 14–16 px, contenido base de 14 px y metadatos de 12–13 px. Radios de 8–12 px, bordes finos y sombras discretas solo para menús y ventanas modales. Controles con altura táctil cómoda y foco visible.

**[OBLIGATORIO]** Todas las superficies y estados deben tener contraste adecuado en ambos temas. Las clases `dark:` deben cubrir fondos, texto, bordes, estados de desplazamiento y foco, menús y capas superpuestas, no solo el fondo global. **[OPCIONAL]** Las tarjetas KPI pueden tener un icono pequeño en un contenedor tintado y una microtendencia neutral, sin afirmar datos comparativos que no estén en los datos de prueba.

## 6. Especificaciones detalladas de las seis secciones

### 6.1 Panel
1. **[OBLIGATORIO] Indicadores KPI:** mostrar exactamente cuatro tarjetas en este orden: Ingresos mensuales **$24,860**, Pérdidas por descuentos **$1,240**, Agentes activos **2**, Agentes fallando **1**. Cada tarjeta presenta icono, etiqueta y valor con jerarquía diferenciada; ingresos y pérdidas en USD y conteos sin moneda. En escritorio se muestran cuatro por fila; en tableta, dos columnas; en móvil, una o dos columnas según la legibilidad.
2. **[OBLIGATORIO] Actividad semanal:** panel de ancho completo debajo de los KPI, con título “Actividad semanal”, leyenda y gráfico de marcador visual con siete días (lun–dom) y escala consistente. Debe indicarse visualmente que es una representación de actividad, no datos de producción; se permiten barras o área simple construidas con elementos HTML.
3. El panel puede incluir una línea de contexto “Resumen operativo” y una fecha ficticia de actualización; no debe añadir métricas que contradigan los datos definidos.
4. Tarjetas con bordes suaves, superficies diferenciadas y diseño adaptable; la información no depende solo del color ni de pasar el puntero.

### 6.2 Gestión de usuarios
1. **[OBLIGATORIO] Tabla** con al menos cinco filas y columnas Nombre, Correo electrónico, Plan y Estado, más una columna de acciones. Incluir los cinco usuarios canónicos definidos en la sección 8 y representar el estado con texto e indicador visual.
2. **[OBLIGATORIO] Menú por usuario:** un botón accesible abre un menú desplegable con “Ver detalle” y “Eliminar”. “Ver detalle” abre una ventana modal para el usuario seleccionado. “Eliminar” solicita confirmación en un diálogo accesible; al confirmar, elimina solo la fila de la sesión y cierra el menú/diálogo; cancelar no modifica los datos.
3. **[OBLIGATORIO] Ventana modal de detalle:** nombre, correo electrónico, empresa, plan, estado, fecha de alta y agentes asociados. Se cierra con un botón, la tecla Escape o un clic en el fondo superpuesto; un clic dentro no la cierra.
4. Encabezado de vista con título y texto breve. La tabla admite desplazamiento horizontal en pantallas reducidas sin ocultar las acciones.

### 6.3 Gestión de agentes
1. **[OBLIGATORIO] Listado** de al menos cuatro agentes canónicos, cada uno con nombre, propietario (usuario/empresa según el modelo), estado activo/inactivo/fallando y control de acciones. Estados: verde para activo, gris para inactivo y rojo para fallando, siempre acompañados de texto.
2. **[OBLIGATORIO] Habilidades:** sección inicialmente contraída en cada agente; un botón accesible y con `aria-expanded` muestra los nombres de las habilidades asociadas. Apertura/cierre con una transición visible breve (aprox. 150–250 ms) sin ocultar la lista a las tecnologías de asistencia.
3. **[OBLIGATORIO] Menú** con “Configurar” y “Eliminar”. Configurar abre una ventana modal con nombre del agente, propietario, estado e instrucción de sistema (system prompt) precargada en un área de texto editable. Guardar actualiza solo el estado local y muestra una confirmación visual; cancelar/cerrar descarta cambios no guardados. Eliminar solicita confirmación.
4. La ventana de configuración muestra la nota “Cambios de demostración; no se guardan en un servidor”. La instrucción completa debe ser legible, y el área de texto debe tener etiqueta explícita y desplazamiento interno cuando corresponda.

### 6.4 Habilidades
1. **[OBLIGATORIO] Catálogo** de al menos cuatro habilidades canónicas; cada tarjeta o fila presenta nombre, descripción breve y número de agentes que las utilizan. Los recuentos se derivan de las relaciones de agentes, no se introducen manualmente de forma inconsistente.
2. Bloque informativo visible titulado “¿Qué es una habilidad?” que explique que es una capacidad modular que un agente puede utilizar —por ejemplo, búsqueda o análisis— y que puede asociarse a varios agentes.
3. **[OBLIGATORIO] Menú** con “Ver detalle” y “Eliminar”. Ver detalle abre una ventana modal con nombre, descripción completa, categoría, agentes asociados y contador derivado. Eliminar solicita confirmación; al confirmar, se elimina de la sesión y se retira de relaciones/listados, actualizando los recuentos.
4. No confundir habilidad con agente: diferenciar visualmente el catálogo y mostrar los agentes asociados por nombre.

### 6.5 Contrataciones de agentes
1. **[OBLIGATORIO] Tabla** con cuatro o más contratos canónicos y columnas Cliente, Agente, Habilidades contratadas, Fecha de inicio, Fecha de fin e Importe pagado, más una columna de acciones. Las habilidades se presentan como etiquetas compactas y legibles.
2. **[OBLIGATORIO] Menú de acciones** por contrato con “Ver detalle”. Si se incluye otra acción, debe definirse y ser solo demostrativa; no se exige editar ni eliminar contratos.
3. **[OBLIGATORIO] Ventana modal de detalle** con ID de contrato, cliente, agente, fechas, estado, total pagado y desglose de cada habilidad contratada con precio individual y subtotal. Los subtotales deben sumar exactamente el importe pagado.
4. Importes con formato USD coherente; fechas con formato legible y uniforme, sin ambigüedades.

### 6.6 Registro de errores
1. **[OBLIGATORIO] Tabla o listado** con al menos seis errores canónicos y columnas Fecha y hora, Agente, Tipo/Gravedad, Descripción y acciones. Mostrar fecha y hora; la descripción solo puede truncarse si la ventana modal contiene el texto completo.
2. Indicadores semánticos con color y texto: **Crítico** rojo, **Advertencia** ámbar, **Información** azul. Los seis registros deben incluir más de una categoría y enlazar con agentes existentes.
3. **[OBLIGATORIO] Menú** con “Ver detalle” y “Marcar como resuelto”. Marcar como resuelto cambia el estado local y el indicador de la fila, y evita volver a ofrecer esa acción para el mismo registro (puede sustituirse por “Reabrir” solo si se especifica; preferencia: no ofrecer acción para los ya resueltos).
4. **[OBLIGATORIO] Ventana modal** de detalle con ID, fecha y hora, agente, gravedad, mensaje completo, estado y traza completa en un bloque monoespaciado desplazable. Se cierra con botón, clic en el fondo superpuesto o tecla Escape.

## 7. Inventario de componentes reutilizables

- **AppShell (estructura de la aplicación):** barra lateral persistente, barra superior y región principal; se adapta al tamaño de pantalla.
- **SidebarNavItem (elemento de navegación lateral):** icono, etiqueta, selección activa y estado accesible.
- **ThemeToggle (interruptor de tema):** botón con nombre accesible y estado actual; cambia el tema sin cambiar de sección.
- **PageHeader (encabezado de vista):** título y descripción/contexto.
- **KpiCard (tarjeta KPI):** icono decorativo ocultable a lectores de pantalla, etiqueta, valor y formato.
- **DataTable (tabla de datos):** encabezados semánticos, filas, desplazamiento adaptable y columna de acciones.
- **StatusBadge / SeverityBadge (indicador de estado/gravedad):** texto visible y tratamiento semántico coherente.
- **SkillChip (etiqueta de habilidad):** nombre breve de habilidad.
- **ActionMenu (menú de acciones):** botón por fila, menú de acciones, cierre al seleccionar, hacer clic fuera o pulsar Escape; solo un menú abierto a la vez.
- **ModalDialog (ventana de diálogo):** capa superpuesta, título, contenido, cierre, gestión del foco y comportamiento ante clic en el fondo/tecla Escape.
- **ConfirmDialog (diálogo de confirmación):** confirmación de eliminación u otras acciones, botones Cancelar/Confirmar.
- **AccordionSkills (acordeón de habilidades):** botón expandible y región con habilidades animada.
- **Toast/InlineFeedback (aviso/mensaje en línea):** confirmación accesible tras guardar o resolver; desaparece temporalmente sin interrumpir o permanece como mensaje en línea.
- **EmptyState (estado vacío):** mensaje claro y acción de recuperación si una eliminación deja la lista vacía.

## 8. Modelo de datos de prueba y coherencia entre secciones

Todos los registros son deterministas y locales. Usar identificadores estables y referencias por ID; los textos y valores de las secciones deben derivarse de las mismas entidades. Fechas ISO 8601 y precios numéricos en USD. Estado inicial:

**Usuarios**
| ID | Nombre | Correo electrónico | Empresa | Plan | Estado | Alta |
|---|---|---|---|---|---|---|
| U-001 | Lucía Moreno | lucia.moreno@northstar.example | Northstar Labs | Enterprise | Activo | 2025-03-12 |
| U-002 | Mateo Ruiz | mateo.ruiz@brightpath.example | BrightPath | Pro | Activo | 2025-06-04 |
| U-003 | Sofía Chen | sofia.chen@orbitdata.example | Orbit Data | Pro | Activo | 2025-08-19 |
| U-004 | Diego Herrera | diego.herrera@verdeco.example | Verde & Co. | Starter | Pendiente | 2026-01-10 |
| U-005 | Valentina Cruz | valentina.cruz@northstar.example | Northstar Labs | Enterprise | Activo | 2026-02-02 |

**Habilidades**
| ID | Nombre | Categoría | Descripción breve |
|---|---|---|---|
| S-001 | Web Research | Investigación | Busca, compara y sintetiza información web. |
| S-002 | Data Analysis | Analítica | Analiza conjuntos de datos y resume hallazgos. |
| S-003 | Customer Support | Atención | Clasifica consultas y redacta respuestas de soporte. |
| S-004 | Workflow Automation | Automatización | Coordina pasos repetibles y tareas entre herramientas. |

**Agentes** (el propietario se muestra como empresa; `userId` identifica al usuario propietario)
| ID | Nombre | `ownerId` / empresa | Estado | Habilidades |
|---|---|---|---|---|
| A-001 | Atlas Researcher | U-001 / Northstar Labs | Activo | S-001, S-002 |
| A-002 | Nova Support | U-002 / BrightPath | Activo | S-003, S-004 |
| A-003 | Orbit Analyst | U-003 / Orbit Data | Fallando | S-002, S-001 |
| A-004 | Verde Workflow | U-004 / Verde & Co. | Inactivo | S-004, S-003 |

U-005 no posee un agente en el estado inicial, pero aparece como cliente/representante en un contrato. La instrucción de sistema de cada agente debe ser ficticia, distinta y de 2–4 frases, sin secretos ni instrucciones peligrosas.

**Contratos** (el importe total es la suma de sus líneas)
| ID | Cliente | Agente | Inicio | Fin | Habilidades y precio en USD | Total | Estado |
|---|---|---|---|---|---|---:|---|
| C-1001 | Northstar Labs (U-001) | Atlas Researcher (A-001) | 2026-10-01 | 2026-11-01 | Web Research $320; Data Analysis $180 | $500 | Activo |
| C-1002 | BrightPath (U-002) | Nova Support (A-002) | 2026-10-10 | 2026-11-10 | Customer Support $240; Workflow Automation $160 | $400 | Activo |
| C-1003 | Orbit Data (U-003) | Orbit Analyst (A-003) | 2026-09-15 | 2026-10-15 | Data Analysis $300; Web Research $150 | $450 | Finalizado |
| C-1004 | Northstar Labs (U-005) | Atlas Researcher (A-001) | 2026-11-01 | 2026-12-01 | Web Research $280; Data Analysis $170 | $450 | Activo |

**Errores** (cada traza contiene al menos tres líneas ficticias)
| ID | Fecha y hora | Agente | Tipo | Descripción breve | Estado inicial |
|---|---|---|---|---|---|
| E-001 | 2026-11-20 09:42 UTC | Orbit Analyst | Crítico | Tiempo de espera agotado al consultar fuente de datos. | Abierto |
| E-002 | 2026-11-20 09:18 UTC | Nova Support | Advertencia | Límite de reintentos alcanzado para una tarea. | Abierto |
| E-003 | 2026-11-20 08:56 UTC | Atlas Researcher | Información | Una fuente devolvió contenido vacío. | Abierto |
| E-004 | 2026-11-19 17:31 UTC | Orbit Analyst | Crítico | Fallo al validar el esquema de respuesta. | Abierto |
| E-005 | 2026-11-19 16:04 UTC | Verde Workflow | Advertencia | La tarea se pausó por falta de entrada. | Resuelto |
| E-006 | 2026-11-19 14:27 UTC | Nova Support | Información | Tarea completada tras un reintento. | Abierto |

**Relaciones y coherencia:** el contador de habilidades cuenta agentes no eliminados que las referencian: Web Research 2, Data Analysis 2, Customer Support 2, Workflow Automation 2. Agentes y errores muestran exactamente los nombres de las tablas canónicas. Los contratos hacen referencia a habilidades y agentes existentes; sus líneas contratadas son una instantánea comercial independiente de las asociaciones actuales del agente. El KPI de agentes activos es **2** (solo agentes con estado Activo) y el de agentes fallando es **1**. Las métricas de ingresos y descuentos son agregados mensuales ficticios independientes de los subtotales de los contratos mostrados.

> **Nota de coherencia para la implementación:** el KPI del Panel se concreta en **2 agentes activos y 1 fallando**, según los estados de la fuente de verdad. No mostrar 3 como cantidad de activos. Los ingresos de $24,860 y los descuentos de $1,240 son métricas globales ficticias y no deben calcularse a partir de estos cuatro contratos parciales.

## 9. Interacciones y gestión del estado

- **Navegación:** seleccionar una sección actualiza la vista, el título y `aria-current`; la barra lateral permanece. La selección no restablece el tema.
- **Tema:** el interruptor cambia inmediatamente la clase `dark` de la raíz, actualiza la etiqueta/estado accesible y guarda la preferencia localmente. Si no hay preferencia guardada, se usa la preferencia del sistema. Funciona en las seis vistas y en las capas superpuestas.
- **Menús desplegables:** se abren mediante un botón; solo puede haber un menú abierto. Se cierran al hacer clic fuera, pulsar Escape, seleccionar una acción o cambiar de sección. El botón usa `aria-haspopup`, `aria-expanded` y una relación con el menú. Un clic en el menú no debe cerrarlo antes de ejecutar la acción.
- **Ventanas modales:** al abrir, muestran el registro seleccionado; incluyen capa superpuesta. Se cierran con botón visible, Escape o clic en el fondo; un clic en el contenido no las cierra. Evitar el cierre por fondo si el clic empieza dentro y termina fuera. Al abrir, el foco entra al diálogo; al cerrar, vuelve al control que lo activó cuando exista.
- **Confirmación:** eliminar requiere confirmación explícita; cancelar no tiene efecto. Confirmar elimina solo de la colección en memoria y actualiza contadores/relaciones derivados. Si la lista queda vacía, muestra un estado vacío.
- **Edición de instrucciones:** el área de texto contiene inicialmente el valor del agente seleccionado; Guardar actualiza los datos de prueba en memoria y anuncia éxito; cancelar/descartar no conserva cambios sin guardar.
- **Acordeón:** todos aparecen cerrados al cargar; cada uno funciona de forma independiente, informa `aria-expanded` y anima la apertura/cierre.
- **Errores:** resolver actualiza el estado local, el indicador y el menú; el detalle refleja el estado actual.
- **Límites:** ninguna acción simula persistencia remota. Al recargar se restauran los datos iniciales, salvo la preferencia de tema.

## 10. Accesibilidad, diseño adaptable y HTML semántico

**[OBLIGATORIO]** Usar puntos de referencia `header`, `nav`, `main`, `section` y tablas con `caption` (ocultable visualmente), `thead`, `tbody` y `th scope="col"`. Mantener un orden lógico de encabezados. Usar botones reales para acciones; no usar `div` con clic. Asociar etiquetas a controles, especialmente al área de texto.

Todos los controles de navegación, menús, ventanas modales y acordeones funcionan con teclado y muestran foco visible. Añadir `aria-label` a botones solo con icono, `aria-current="page"` a la navegación activa, `aria-expanded` a menú/acordeón, y un nombre accesible al diálogo (`role="dialog"`, `aria-modal="true"`). Mantener el foco dentro del diálogo mientras esté abierto y devolverlo al cerrar; permitir Escape. Anunciar confirmaciones con `aria-live="polite"`. No comunicar estados exclusivamente con color.

Diseño adaptable con prioridad de escritorio, comprobable a 1440 px, 1024 px, 768 px y 375 px. Barra lateral completa en escritorio; contraída o como panel desplegable en tableta/móvil, con botón identificable. Las tablas anchas pueden desplazarse horizontalmente dentro de su región, sin desbordamiento de toda la página. KPI y tarjetas se reorganizan sin recortar contenido. Respetar `prefers-reduced-motion`; la transición puede reducirse o desactivarse. Mantener contraste legible en temas claro y oscuro.

## 11. Criterios de aceptación numerados

1. El prototipo presenta exactamente seis secciones navegables y conserva la barra lateral al cambiar de sección.
2. La sección activa se diferencia visualmente y se expone con `aria-current`; el título del contenido coincide con la sección.
3. El interruptor claro/oscuro funciona desde todas las vistas, también cambia tablas, capas superpuestas, menús e indicadores, y mantiene la selección al navegar.
4. Sin preferencia guardada, el tema inicial respeta la preferencia del sistema; al cambiarlo manualmente, se conserva entre vistas y recargas mediante almacenamiento local.
5. El Panel muestra cuatro KPI con etiqueta, icono y valores: $24,860; $1,240; 2 activos; 1 fallando; además del panel semanal de ancho completo con siete días.
6. Los KPI del Panel se reorganizan sin superponerse a 1440, 1024, 768 y 375 px.
7. Usuarios presenta los cinco usuarios canónicos y las columnas Nombre, Correo electrónico, Plan y Estado; cada fila tiene acciones.
8. El menú de usuario ofrece Ver detalle y Eliminar; Ver detalle abre la información requerida del usuario elegido.
9. La ventana modal de usuario se cierra con botón, Escape y clic en el fondo, pero no al hacer clic dentro; el foco vuelve al activador.
10. Eliminar usuario muestra confirmación; cancelar conserva la fila y confirmar la elimina solo en memoria, dejando la aplicación en un estado coherente.
11. Agentes presenta los cuatro agentes canónicos, propietario, estado en texto y habilidades inicialmente contraídas.
12. Cada acordeón de habilidades se expande y contrae con transición visible y actualiza `aria-expanded`.
13. El menú de agente incluye Configurar y Eliminar; la configuración muestra la instrucción de sistema del agente en un área de texto etiquetada, y guardar/cancelar tienen los efectos especificados.
14. Habilidades presenta las cuatro habilidades canónicas, descripción, recuentos derivados e incluye el bloque explicativo “¿Qué es una habilidad?”.
15. El detalle de una habilidad muestra descripción, categoría y agentes relacionados; eliminar exige confirmación y actualiza las relaciones y recuentos locales.
16. Contrataciones presenta cuatro contratos con cliente, agente, habilidades, fechas e importe; cada ventana modal detalla líneas y subtotales cuya suma coincide con el total.
17. Registro de errores presenta seis errores, fechas y horas, agente, categoría, descripción e indicadores con texto; hay más de una gravedad.
18. Cada error permite consultar la traza completa; marcar como resuelto actualiza el estado visible y deja de ofrecer la acción para resolver.
19. Todos los menús desplegables se cierran al hacer clic fuera, pulsar Escape, seleccionar una opción o cambiar de sección; solo puede haber uno abierto.
20. Todas las ventanas modales se cierran con botón y clic en el fondo; un clic dentro no las cierra. Las de errores/usuarios también admiten Escape.
21. Todas las acciones se pueden operar con teclado, tienen foco visible y nombre accesible; los estados no se indican solo mediante color.
22. Las tablas tienen estructura semántica, encabezados asociados y desplazamiento contenido en pantallas estrechas, sin desbordamiento horizontal de toda la página.
23. Los temas claro y oscuro son legibles, con contraste y estilos definidos para superficies, texto, bordes y estados.
24. Eliminar, resolver y configurar solo altera datos de prueba en memoria; no se hacen solicitudes de red y al recargar se recuperan los datos iniciales.
25. La implementación posterior utiliza solo HTML semántico, Tailwind CDN y JavaScript nativo; no introduce frameworks, compilación, CSS personalizado ni estilos en línea.

## 12. Fuera de alcance

- Backend, API, autenticación, autorización, integración con proveedores de IA o ejecución real de agentes.
- Datos reales, persistencia de entidades tras recargar, facturación efectiva o pagos.
- Búsqueda, filtros, ordenación, paginación y exportación, salvo decisión explícita posterior.
- Creación de usuarios/agentes/habilidades/contratos, edición general o flujos completos de gestión.
- Gráficos con series reales o bibliotecas de visualización.
- Internacionalización completa; interfaz en español, con nombres de entidades y términos de producto indicados en inglés cuando corresponda.
- Implementación de pantallas o código en esta etapa de especificación.

## 13. Guía de diseño para Google Stitch

**Prompt autocontenido para copiar en Google Stitch:**

> Diseña un prototipo visual de alta fidelidad para **AgentHub**, un panel interno SaaS de administración de una plataforma que alquila agentes de inteligencia artificial con habilidades (skills). El usuario es un administrador de operaciones que necesita supervisar estados, consultar registros relacionados y gestionar acciones con claridad. Crea una aplicación con prioridad de escritorio, adaptable a tableta/móvil, con estructura persistente: barra lateral izquierda con marca AgentHub, iconos y seis entradas (Panel, Usuarios, Agentes, Habilidades, Contrataciones, Registro de errores); barra superior con título contextual e interruptor claro/oscuro. La sección actual debe destacarse claramente.
>
> Diseña las seis vistas: **Panel** con cuatro KPI (ingresos mensuales $24,860, pérdidas por descuentos $1,240, agentes activos 2, agentes fallando 1) y panel ancho de actividad semanal de siete días; **Usuarios** con tabla de cinco usuarios, columnas nombre/correo electrónico/plan/estado y menú por fila; **Agentes** con cuatro filas o tarjetas, propietario, indicadores activo/inactivo/fallando, acordeón de habilidades inicialmente cerrado y menú Configurar/Eliminar; **Habilidades** con cuatro elementos del catálogo, descripción, contador de agentes y bloque “¿Qué es una habilidad?”; **Contrataciones** con tabla de cuatro contratos, cliente, agente, habilidades como etiquetas, fechas e importe; **Registro de errores** con seis eventos, fecha y hora, agente, gravedad y descripción. Incluye estados visuales de menú desplegable contextual, ventana modal de detalle, ventana de configuración del agente con área de texto para la instrucción de sistema y ventana de error con traza monoespaciada; representa el cierre de modales y la confirmación previa a eliminar.
>
> Usa una identidad moderna, minimalista, prémium y tecnológica; azul/índigo/violeta como acentos sobre superficies limpias, fondos claros gris muy pálido, texto oscuro y bordes suaves. Colores semánticos: verde para activo, gris para inactivo, rojo para fallando/crítico, ámbar para advertencia y azul para información; acompaña siempre el color con una etiqueta textual. Presenta una versión cuidada en modo claro y otra en modo oscuro elegante (fondo azul-negro, superficies carbón, texto claro y bordes discretos). Tipografía sans serif, jerarquía clara, espaciado generoso, tablas legibles, tarjetas con radios moderados y sombras discretas. Evita degradados llamativos, ornamentación y densidad excesiva. Representa la navegación persistente, el cambio de tema, los menús desplegables, acordeones animados y ventanas modales con fondo superpuesto; diseño accesible con foco visible y controles reconocibles. Usa contenido ficticio coherente entre usuarios, agentes y habilidades; en particular Atlas Researcher, Nova Support, Orbit Analyst y Verde Workflow, y Web Research, Data Analysis, Customer Support y Workflow Automation.
>
> Esta propuesta visual representa un prototipo estático sin backend. La futura implementación se limitará a HTML5 semántico, Tailwind CSS mediante CDN y JavaScript nativo: sin React/Vue/Angular, TypeScript, herramientas de compilación, CSS personalizado, estilos en línea ni API. No generes backend ni funciones de producción.
