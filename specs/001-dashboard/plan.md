# PLAN-001 — Plan técnico: Dashboard y shell compartido

- **Derivado de:** [`spec.md`](spec.md), requisitos FR-001–FR-011, VIS-001–VIS-007 y criterios AC-001–AC-012.
- **Estado:** propuesta; describe implementación futura, no autoriza ejecutarla en esta fase documental.

## 1. Resultado y límites

Construir un prototipo estático del Dashboard de AgentHub y el shell SPA que alojará seis destinos. La única vista implementada en esta entrega es Panel; los otros cinco enlaces muestran un placeholder neutral. La navegación, el tema y la estructura visual son compartidos; no se crean pantallas funcionales adicionales.

Excluir API/backend, autenticación, datos productivos, telemetría, métricas fuera de contrato, tablas, quick actions, librerías de gráficos, compilación, estilos CSS propios e importación literal de la exportación Stitch.

## 2. Arquitectura propuesta

### 2.1 Componentes

1. **Documento estático raíz:** un único `index.html` contiene landmarks, shell y regiones de vista. Evita tooling y mantiene la carga directa requerida por AC-011.
2. **Capa de presentación:** Tailwind CSS cargado directamente en `index.html` mediante su CDN oficial (script CDN de navegador); se usa la distribución/browser build compatible con CDN, sin instalar paquetes ni ejecutar CLI. Utilidades Tailwind para layout, breakpoint, color, espaciado, foco y tema. No `style`, `<style>`, archivo CSS propio ni reglas CSS personalizadas. Mantener las referencias de color de SPEC con utilidades Tailwind accesibles.
3. **Controlador vanilla:** un `app.js` externo, cargado con `defer`, contiene los datos mock, navegación local, sincronización del título/`aria-current`, selector de tema y renderizado/selección de vistas. Sin módulos/paquetes que requieran build.
4. **Shell compartido:** sidebar semántico de seis destinos, topbar contextual con toggle de tema y una región `main` para el destino. El shell no se destruye al navegar.
5. **Vista Dashboard:** encabezado contextual, cuatro tarjetas con datos declarados en SPEC y panel de actividad estática semanal. Las tarjetas y el gráfico viven dentro de una sección semántica del `main`.
6. **Otros destinos:** usar un mapa local de IDs, etiquetas y texto placeholder. No implementar modelo ni acciones de esas secciones.

### 2.2 Archivos previstos

| Archivo | Responsabilidad | Restricción |
|---|---|---|
| `index.html` | Documento semántico, referencia directa a Tailwind CDN, shell, placeholders y contenedores del Dashboard | HTML5; Tailwind cargado desde CDN; sin CSS/estilos inline ni código de framework. |
| `app.js` | Datos mock, navegación SPA local, estado de tema y sincronización accesible | JavaScript vanilla; sin dependencias ni solicitudes de aplicación. |
| `specs/001-dashboard/spec.md` | Contrato y criterios de aceptación | Fuente funcional para este corte. |
| `specs/001-dashboard/plan.md` | Este plan de ejecución | Derivado de la spec. |
| `specs/001-dashboard/tasks.md` | Lista ordenada de tareas verificables | Cada tarea enlaza FR/AC y archivos. |

No añadir otros archivos de código o assets salvo aprobación de cambio de alcance. La referencia Stitch solo orienta tratamiento visual; no se copiará HTML ni se consumirán sus fuentes/iconos/scripts.

## 3. Estrategia de implementación

### 3.1 Estructura HTML y shell

- Definir encabezado global/topbar, navegación identificable (`nav` con nombre), y `main` con una región activa.
- Representar las seis entradas como enlaces con destino local estable; no usar controles no semánticos clicables. El foco permanece lógico después del cambio.
- Mantener una única vista visible a la vez. En navegación, sincronizar el enlace con `aria-current="page"`, título contextual, encabezado principal y panel visible sin reload.
- Enlaces a vistas futuras conservan el shell y renderizan el mensaje especificado; no simulan datos ni implementan funcionalidades.

### 3.2 Tailwind CDN y tema oscuro

- Cargar Tailwind directamente desde CDN en el documento HTML, sin `npm`, package manager, descarga/compilación local, CLI, configuración de build ni pipeline. La URL del CDN es la única dependencia externa de presentación.
- Implementar variantes de tema con la clase `dark` en `document.documentElement` y utilidades Tailwind `dark:` explícitas para fondos, superficies, textos, bordes, navegación activa, foco y gráfico. Las utilidades base describen el tema claro; sus pares `dark:` describen el oscuro. No usar CSS propio, `<style>`, atributos `style`, hojas personalizadas ni configuración Tailwind personalizada.
- Alternar clase `dark` en `document.documentElement`; todas las superficies/textos relevantes deben declarar variantes `dark:`.
- Resolver preferencia en este orden: valor válido guardado `light|dark`; si no, `matchMedia('(prefers-color-scheme: dark)')`; fallback claro cuando la plataforma no exponga preferencia.
- Un cambio manual actualiza la clase, el nombre/estado accesible y `localStorage` con una clave específica de preferencia visual. No persistir métricas ni estado operativo.
- El control debe seguir accesible y mantener el contexto activo; transición no esencial respeta `prefers-reduced-motion`.

### 3.3 Datos compartidos y KPI

- Declarar en `app.js` una fuente local compartida y tipada de registros de agentes con identificadores estables y estado canónico. Incluir dos registros `active` y uno `failing`; calcular los dos KPI de agentes contando esa misma colección, no definiendo contadores separados. Esto deja el origen listo para que la futura vista Agentes reutilice esos datos, sin implementar esa vista ni sus operaciones en este alcance.
- Mantener los valores mock comerciales en una fuente local determinista independiente: ingresos 24860 USD y descuentos 1240 USD. Formatear importes como USD sin depender de localización que cambie las cifras de aceptación; conteos como enteros.
- Presentar los cuatro KPI en el orden contractual y limitar el Dashboard a esas cuatro métricas.
- No derivar valores comerciales del ejemplo de contratos, no duplicar la fuente de verdad de estados de agentes, ni introducir cifras de la referencia Stitch.

### 3.4 Gráfico semanal

- Crear gráfico de barras estático mediante elementos HTML, grid/flex y utilidades Tailwind; siete barras con geometría legible y alturas coherentes.
- Mostrar Lun–Dom en orden y una leyenda visible que indique claramente “muestra/ilustrativo”. No proporcionar valores de negocio, tooltips, eje cuantitativo inventado o interacción de hover que sugiera dato real.
- Proporcionar nombre y resumen accesible; hacer decorativas las barras individuales si un resumen único comunica suficientemente la información, evitando duplicación para lectores de pantalla.

### 3.5 Responsive y estilo

- Usar breakpoint utilities de Tailwind. Sidebar de escritorio lateral y persistente; en anchos menores puede colapsarse/abrirse como drawer con control accesible, conservando los seis destinos.
- KPI: cuatro columnas en ancho amplio, dos en tablet y una preferentemente a 375 px si dos columnas fuerzan texto pequeño. Gráfico ocupa ancho disponible y permite lectura sin scroll horizontal de página.
- Aplicar sistema sans-serif del sistema y colores/superficies de SPEC; reutilizar solo jerarquía visual compatible con `DESIGN.md`/Stitch, no su densidad extrema, navrail móvil inferior ni contenido adicional.

## 4. Decisiones y precedencia

1. `SPECS.md` define comportamiento y restricciones; `SPECS.es.md` ayuda a resolver terminología. La nota final de SPEC fija **2 agentes activos y 1 fallando**, prevaleciendo sobre una frase histórica que decía 3.
2. Requisitos de evaluación/briefing 4Geeks se satisfacen dentro de esos límites.
3. `design/DESIGN.md` y la exportación Stitch son referencias visuales, no contrato funcional. No copiar su HTML, CSS, configuración Tailwind ni fuentes/íconos externos.
4. En esta fase se usan nombres UI en español: Panel, Usuarios, Agentes, Habilidades, Contrataciones, Registro de errores.
5. Se elige documento raíz más script externo y Tailwind desde CDN para mantener el prototipo simple; no se requiere ni se permite en este alcance una cadena de instalación/compilación/build. Esto no implica implementar ahora.

## 5. Validación prevista

La validación pertenece a la futura fase de implementación; este plan no ejecuta ni modifica código.

- **Inspección de estructura/estática:** HTML landmarks, orden de headings, exactamente seis enlaces y cuatro KPI; confirmar referencia Tailwind CDN y variantes `dark:` en superficies/estados; sin framework, CSS propio, atributos `style`, paquetes, API o build config (AC-001, AC-002, AC-004, AC-011).
- **Prueba de navegación:** usar puntero y teclado en cada destino, verificar cambio de vista/título/`aria-current`, ausencia de reload y persistencia del shell/tema (AC-002, AC-003).
- **Prueba de tema:** validar sistema claro y oscuro sin preferencia guardada, selección manual y recarga; verificar persistencia del tema únicamente (AC-006, AC-007).
- **Prueba de contenido:** comparar etiquetas y valores KPI exactamente; confirmar que activos/fallando se computan desde los dos estados de la colección mock compartida de agentes; verificar secuencia Lun–Dom, leyenda de muestra y ausencia de valores operativos extra (AC-004, AC-005).
- **Prueba responsive:** inspeccionar 1440, 1024, 768 y 375 px; sidebar lateral persistente en anchos grandes, composición KPI y ausencia de overflow/cortes (AC-008).
- **Revisión de accesibilidad:** solo teclado, foco visible, `aria-current`, nombre/estado del toggle, landmarks, resumen del gráfico, contraste de ambos temas y movimiento reducido (AC-009, AC-010, AC-012).
- **Red/runtime:** abrir de forma estática sin instalar/compilar; confirmar que no hay llamadas de aplicación. Tailwind CDN puede requerir conectividad para estilos.

## 6. Riesgos y mitigaciones

| Riesgo | Mitigación |
|---|---|
| Contradicción histórica de agentes activos | Adoptar explícitamente el valor final 2 de SPECS y registrar en spec/plan/tasks. |
| Placeholder gráfico puede interpretarse como telemetría real | Etiqueta y leyenda de muestra visibles, resumen accesible; sin cifras, ejes/totales operativos. |
| CDN no disponible en entorno sin red | Documentar que la carga Tailwind requiere red; no introducir un build/CSS alternativo prohibido sin aprobación. |
| Drawer/sidebar adaptable reduce discoverability | Conservar seis enlaces, nombres accesibles, botón de apertura y navegación operable por teclado; verificar 768/375. |
| Variaciones de estilo por clases arbitrarias o copiar Stitch | Usar utilidades Tailwind estándar y sistema sans; confirmar con inspección de fuentes y revisión visual. Cargar Tailwind desde CDN, no convertir esos estilos en CSS propio ni configuración/build. |
| Tema inicial causa flash visual | Inicializar clase de tema tan pronto como permitan las restricciones y verificar preferencia del sistema/almacenamiento; no añadir CSS inline para evitar flash. |
| `localStorage` no disponible | Envolver lectura/escritura en manejo defensivo; la sesión sigue operable con estado en memoria y preferencia del sistema. |

## 7. Dependencias y supuestos

- Se debe aprobar esta documentación antes de empezar implementación, según la instrucción del usuario.
- Tailwind CDN está disponible en la red del navegador para el estilo esperado; el documento lo carga directamente. No hay dependencia npm ni paso de build; sin conectividad puede no aplicarse el estilo CDN.
- Las cuentas de KPI de agentes se derivan del conjunto mock compartido de agentes (2 `active`, 1 `failing`); los KPI comerciales son valores mock independientes. Una futura vista Agentes reutilizará la fuente compartida, pero no se implementa ahora.
- El destino raíz futuro es `index.html` más `app.js`; no se presume infraestructura de servidor o routing.
- Una métrica semanal real no forma parte de la fuente contractual; solo se implementa una representación visual rotulada como muestra.
- Las cinco vistas futuras quedan deliberadamente sin modelo ni requisitos de dominio en este corte.

## 8. Trazabilidad

| Elemento de plan | Requisitos | Aceptación |
|---|---|---|
| Shell, navegación y destinos futuros | FR-001–FR-003, FR-011; VIS-003–VIS-004 | AC-001–AC-003 |
| Tema y persistencia visual | FR-004–FR-005; VIS-002, VIS-007 | AC-006–AC-007, AC-009, AC-012 |
| KPI y fuente mock compartida | FR-006–FR-007, FR-010; VIS-005 | AC-004, AC-011 |
| Actividad semanal | FR-008–FR-009; VIS-006 | AC-005, AC-010 |
| Responsive y accesibilidad | FR-001–FR-011; VIS-001–VIS-007 | AC-008–AC-010, AC-012 |
| Restricciones técnicas | §9 de spec | AC-011 |
