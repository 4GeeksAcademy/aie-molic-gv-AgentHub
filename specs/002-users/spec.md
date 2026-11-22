# SPEC-002 — Gestión de usuarios

- **Derivada de:** [`../../SPECS.md`](../../SPECS.md); `SPECS.es.md` se usa como traducción de consulta.
- **Referencias subordinadas:** [`../../design/DESIGN.md`](../../design/DESIGN.md) y [`../../design/stitch/usuarios/code.html`](../../design/stitch/usuarios/code.html), con `screen.png` como referencia visual secundaria.
- **Estado:** propuesta documental para aprobación; no autoriza implementación.
- **Alcance de esta fase:** definir comportamiento y apariencia de la vista Usuarios, integrada al shell existente.
- **Precedencia:** `SPECS.md` > requisitos 4Geeks > `DESIGN.md` > Stitch. Si una referencia visual sugiere una función no especificada, no se incorpora.

## 1. Objetivo

Permitir que una persona administradora consulte cinco cuentas canónicas, inspeccione sus datos completos y ejecute una eliminación local demostrativa con confirmación explícita, sin abandonar el contexto del shell AgentHub.

## 2. Alcance

### Incluido

- Vista Usuarios en el shell SPA existente, con título y breve descripción.
- Tabla semántica con los cinco registros canónicos, columnas Nombre, Email, Plan, Estado y Acciones.
- Badge de estado con texto, además de tratamiento visual diferenciado.
- Un dropdown de acciones por fila: “Ver detalle” y “Eliminar”. Solo un dropdown abierto a la vez.
- Modal de detalle del usuario seleccionado, con nombre, email, empresa, plan, estado, fecha de alta y agentes asociados.
- Diálogo de confirmación antes de eliminar y cambio local en memoria solo tras confirmar.
- Scroll horizontal confinado a la región de la tabla en viewports reducidos.
- Interacciones operables por teclado, foco gestionado y estilos claro/oscuro.

### Fuera de alcance

No añadir búsqueda, filtros, ordenación, paginación, exportación, creación o edición de usuarios, navegación a detalle de agentes, métricas/KPI adicionales ni sincronización. La barra de búsqueda, filtros, resumen de empresas/porcentajes, paginación, quick actions y telemetría de la referencia Stitch no forman parte de esta especificación porque no son requisitos obligatorios de `SPECS.md`. Sin backend, autenticación, persistencia de entidades ni llamadas de aplicación.

## 3. Usuarios canónicos

Los campos y valores de esta tabla deben copiarse del modelo de verdad de `SPECS.md` §8; no inventar, corregir ni derivar atributos diferentes. Los IDs son estables para referencias en sesión y no necesitan aparecer como columna, aunque pueden mostrarse discretamente en la celda Nombre o detalle.

| ID | Nombre | Email | Empresa | Plan | Estado | Fecha de alta |
|---|---|---|---|---|---|---|
| U-001 | Lucía Moreno | lucia.moreno@northstar.example | Northstar Labs | Enterprise | Activo | 2025-03-12 |
| U-002 | Mateo Ruiz | mateo.ruiz@brightpath.example | BrightPath | Pro | Activo | 2025-06-04 |
| U-003 | Sofía Chen | sofia.chen@orbitdata.example | Orbit Data | Pro | Activo | 2025-08-19 |
| U-004 | Diego Herrera | diego.herrera@verdeco.example | Verde & Co. | Starter | Pendiente | 2026-01-10 |
| U-005 | Valentina Cruz | valentina.cruz@northstar.example | Northstar Labs | Enterprise | Activo | 2026-02-02 |

Los agentes asociados se derivan por `ownerId` del conjunto compartido de agentes definido en `SPECS.md` §8, con nombre e ID. U-001 a U-004 tienen respectivamente Atlas Researcher (A-001), Nova Support (A-002), Orbit Analyst (A-003) y Verde Workflow (A-004); U-005 no posee agente. No inferir asociaciones desde contratos.

## 4. Requisitos funcionales

| ID | Requisito |
|---|---|
| FR-001 | La vista Usuarios se presenta dentro del `main` del shell SPA existente; el sidebar, topbar, navegación activa y tema global permanecen intactos. |
| FR-002 | La cabecera muestra el título “Usuarios” y una descripción breve, sin estadísticas o afirmaciones operativas no requeridas. |
| FR-003 | La tabla incluye exactamente los cinco registros canónicos iniciales y columnas Nombre, Email, Plan, Estado y Acciones. Cada fila usa el ID estable del registro. |
| FR-004 | El estado se muestra mediante badge con etiqueta visible: Activo o Pendiente; color/icono puede reforzar, pero no sustituye, el texto. |
| FR-005 | Cada fila tiene botón de acciones accesible que abre un dropdown anclado a la fila con “Ver detalle” y “Eliminar”; solo un dropdown puede estar abierto a la vez y no se recorta por el contenedor. |
| FR-006 | “Ver detalle” abre un diálogo para el registro seleccionado mostrando nombre, email, empresa, plan, estado, fecha de alta y agentes asociados actuales derivados de `ownerId`. Si no hay agente, comunica “Sin agentes asociados”. |
| FR-007 | El modal de detalle se cierra con botón visible, Escape o clic en backdrop; el clic dentro no lo cierra. Al abrir tras acción de fila, el foco entra al diálogo; al cerrar vuelve al botón que lo abrió cuando siga disponible. |
| FR-008 | “Eliminar” abre un diálogo de confirmación identificado con el usuario que se eliminará. No elimina al abrir el diálogo. |
| FR-009 | Cancelar o cerrar confirmación conserva el registro y relaciones sin cambios. Confirmar elimina únicamente el usuario seleccionado de la colección en memoria durante la sesión, cierra los controles asociados y actualiza la tabla. |
| FR-010 | La eliminación no se persiste ni causa solicitudes de red; recargar restaura los cinco datos iniciales. La aplicación conserva estado coherente cuando la tabla queda vacía y presenta un mensaje neutral de lista vacía. |
| FR-011 | Dropdowns cierran por clic fuera, Escape, seleccionar acción y cambio de sección. Clic dentro del dropdown no se interpreta prematuramente como clic exterior. |
| FR-012 | Los diálogos tienen nombre accesible, `role="dialog"`, `aria-modal="true"`, foco contenido, controles con nombre y foco visible. Escape cierra menú/modal según el contexto, sin cerrar un overlay subyacente incorrectamente. |
| FR-013 | En anchos reducidos la tabla puede desplazarse horizontalmente dentro de su contenedor; acciones siguen accesibles y la página no obtiene overflow horizontal global. |
| FR-014 | La vista y todos sus estados (tabla, badges, dropdown y diálogos) son legibles en modo claro y oscuro con utilidades Tailwind `dark:`. |
| FR-015 | La tabla mantiene estructura accesible con `caption`, `thead`, `tbody`, `th scope="col"` y headings en orden lógico. |

## 5. Requisitos visuales

- **VIS-001 — Shell:** reutilizar el shell ya implementado y su jerarquía de página; no duplicar sidebar/topbar ni crear otro patrón de navegación.
- **VIS-002 — Cabecera:** título de sección claro y descripción secundaria breve; no agregar cinta “Sync OK”, fecha ficticia o contador salvo que exista aprobación explícita.
- **VIS-003 — Tabla:** superficie blanca sobre canvas claro y superficies slate/carbono sobre canvas oscuro; borde fino, filas compactas legibles, divisores sutiles, encabezados diferenciados y hover no esencial para comprender información.
- **VIS-004 — Columnas:** identidad prioriza nombre; email se mantiene legible sin romper layout; plan y estado tienen alineación consistente; acciones en columna final. ID puede presentarse como metadato de identidad.
- **VIS-005 — Badges:** Activo usa familia verde/esmeralda y Pendiente ámbar; ambos incluyen texto y no se distinguen solo por color. Badge sobrio, compacto y coherente con `DESIGN.md`.
- **VIS-006 — Acciones:** botón kebab real con etiqueta accesible (“Acciones para [nombre]”), área táctil cómoda, foco visible. Menú elevado discreto, alineado al activador, con opción Eliminar visualmente destructiva pero claramente legible.
- **VIS-007 — Diálogos:** panel elevado con borde/sombra discreta, fondo superpuesto, encabezado/título y cierre visibles; detalle presenta atributos en pares etiqueta/valor y relaciones como nombres legibles; confirmación destaca el carácter local/de demostración sin alarmismo engañoso.
- **VIS-008 — Responsive:** desktop conserva columnas sin densidad excesiva; tablet usa el ancho disponible; móvil conserva una tabla completa en región con scroll horizontal, incluyendo la columna de acciones. No transformar el listado en tarjetas si eso elimina contexto tabular o duplica contenido.
- **VIS-009 — Coherencia de marca:** sans-serif del sistema, fondos, textos, bordes, índigo/azul y radios contenidos del sistema existente. `DESIGN.md` puede precisar densidad y tokens; Stitch solo inspira jerarquía y no justifica fuentes, icon fonts, imágenes externas ni contenido adicional.

## 6. Estados e interacciones

### Carga y tabla

La vista inicia con los cinco registros en el orden U-001 a U-005. La tabla no reordena ni modifica valores al abrir/cerrar acciones. Las asociaciones de agentes se resuelven desde el conjunto compartido, no desde copias duplicadas dentro de usuarios.

### Dropdown de acciones

- Activación por botón nativo; expone `aria-haspopup="menu"`, `aria-expanded` y relación con el menú.
- Un solo menú abierto. Cierra con Escape, clic fuera, selección de opción o navegación.
- El menú es alcanzable por teclado y tiene estados de foco visibles. Tras Escape, foco regresa al botón de acciones correspondiente.
- Al seleccionar Ver detalle/Eliminar, registrar el botón como activador antes de cerrar el menú y abrir el diálogo apropiado.

### Modal de detalle

- Datos corresponden al ID asociado al activador, no a un registro fijo.
- Incluye todos los campos definidos en FR-006; la relación de agentes cambia si el estado compartido se altera durante sesión.
- Cierre por botón, Escape o clic en backdrop; el evento originado dentro del panel no lo cierra.
- Al abrir, foco va al título enfocable o al primer control; Tab/Shift+Tab queda contenido. Al cerrar, foco vuelve al activador si conectado; si no, vuelve a la cabecera/lista de Usuarios.

### Confirmación y eliminación

- Diálogo nombra inequívocamente el usuario y la consecuencia: se retirará de esta sesión de demostración.
- Cancelar es el camino seguro y no modifica estado.
- Confirmar elimina por ID de la colección local y vuelve a renderizar tabla/estado vacío. No afecta usuarios de servidor, contratos, autenticación, agentes ni almacenamiento persistente.
- Tras eliminar, cerrar menú y diálogo. Foco va a la fila siguiente, anterior o cabecera/lista si ya no hay activador.
- El feedback de éxito, si se usa, es accesible y no bloquea la continuación; no es requisito para añadir toast.

## 7. Accesibilidad, responsive y temas

- Mantener headings y landmarks del shell; `main` contiene una sección titulada Usuarios. Añadir `caption` visible u oculto visualmente, encabezados asociados con `scope="col"` y controles nativos.
- Botones iconográficos llevan nombre accesible; iconos decorativos tienen `aria-hidden="true"`. Badge siempre incluye etiqueta textual.
- Foco visible en ambos temas; menú con navegación por teclado (Tab/Shift+Tab; flechas/Home/End solo si se implementa semántica completa de menu); Escape y restauración de foco según estados anteriores.
- Diálogo modal: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, trampa de foco y Escape. Backdrop no es un botón ni se anuncia como contenido.
- Tabla envuelta en una región con nombre accesible y `overflow-x-auto`; el scroll queda local. Probar 1440, 1024, 768 y 375 px; la fila completa y acciones deben poder alcanzarse sin recorte vertical/horizontal global.
- Aplicar variantes `dark:` a tabla, badges, hover/focus, dropdown, backdrop, paneles y botones. Contraste legible, estado no expresado solo por color.
- Respetar `prefers-reduced-motion`; transiciones no esenciales reducidas o anuladas.

## 8. Criterios de aceptación

1. Navegar a Usuarios mantiene shell/topbar y expone “Usuarios” como sección actual sin reload; la vista tiene heading y descripción breve.
2. La carga inicial presenta los cinco IDs, nombres, emails, planes y estados de §3, en el orden U-001–U-005, con columnas Nombre, Email, Plan, Estado y Acciones.
3. La tabla tiene caption, encabezados `th scope="col"`, cuerpo `tbody` y cada acción es un `button` con foco visible y nombre único para su usuario.
4. Las cinco filas muestran badge textual correcto: cuatro Activo y uno Pendiente; el color no es la única diferencia.
5. Cada botón abre solo su propio menú, anuncia expanded/collapsed y ofrece exactamente Ver detalle y Eliminar. No se abre más de un menú.
6. Menú se cierra al hacer clic fuera, Escape, seleccionar opción y cambiar de vista; Escape devuelve foco al activador y clic en opción ejecuta la acción seleccionada.
7. Ver detalle desde cualquier fila abre modal con los datos completos de ese usuario y relaciones derivadas: A-001/U-001, A-002/U-002, A-003/U-003, A-004/U-004; U-005 muestra Sin agentes asociados.
8. El diálogo de detalle tiene nombre accesible, `role="dialog"`, `aria-modal="true"`, foco contenido y visible, y se cierra con botón, Escape y backdrop. Un clic dentro no lo cierra y al cerrar el foco vuelve al activador si aún existe.
9. Eliminar desde cualquier fila identifica en la confirmación al usuario correcto; abrirla no altera lista ni datos.
10. Cancelar/cerrar confirmación conserva las cinco filas. Confirmar elimina solo el ID elegido, cierra el menú/diálogo y conserva las filas restantes en su orden inicial.
11. Tras confirmación la fila desaparece y el cambio solo dura la sesión: no hay API ni escritura de datos operativos; al recargar vuelven los cinco usuarios iniciales.
12. Si se eliminan todos los usuarios, tabla/lista muestra empty state neutral, accesible y sin controles huérfanos.
13. A 1440/1024 px la tabla usa el ancho disponible y columnas legibles; a 768/375 px scroll horizontal se limita al contenedor y Acciones sigue accesible, sin overflow horizontal de la página.
14. Claro y oscuro ofrecen contraste legible y variantes consistentes en tabla, badges, foco, menú, backdrop y diálogos; `prefers-reduced-motion` no impone movimiento no esencial.
15. Recorrido solo teclado permite abrir/cerrar menú, elegir acciones, recorrer y cerrar diálogos, confirmar/cancelar y restaurar foco sin trampa fuera del diálogo.
16. No hay búsqueda, filtros, ordenación, paginación, exportación, datos adicionales ajenos al modelo ni funciones de producción.

## 9. Restricciones

- HTML5 semántico, Tailwind desde el CDN ya cargado por el shell, JavaScript vanilla y estado mock local.
- No frameworks, TypeScript, API/backend, dependencias, build, CSS propio, `<style>` ni atributos inline `style`.
- No cambiar datos canónicos ni la colección compartida de agentes del Dashboard. Extender/reutilizar la fuente de usuarios de forma estable, sin duplicar referencias ni modificar KPI existentes.
- No añadir búsqueda, filtros, ordenación, paginación, acciones de Stitch no incluidas en `SPECS.md` ni contenido operativo adicional.
- No copiar el HTML/CSS/JS exportado de Stitch ni cargar sus fuentes/iconos/imagenes; solo reinterpretación visual alineada al sistema aprobado.

## 10. Trazabilidad

| Fuente | Requisito/decisión |
|---|---|
| `SPECS.md` §6.2 | FR-003–FR-010, acciones, detalle, confirmación y tabla adaptable. |
| `SPECS.md` §8 Usuarios y Agentes | Datos canónicos, IDs, estados y relaciones por `ownerId`; U-005 sin agente. |
| `SPECS.md` §§3, 4, 9, 10 | Stack sin API/build/CSS propio; shell; menú único y cierre en navegación; tablas semánticas, teclado, foco, temas y responsive. |
| `SPECS.md` AC-007–AC-010, AC-19–AC-25 | Contenido, menús, modales, teclado, tabla responsive y estado solo local. |
| 4Geeks / alcance solicitado | Exige al menos cinco usuarios, detalle y confirmación de eliminación; se concreta exactamente con los cinco canónicos. |
| `DESIGN.md` | Paleta/superficies, densidad tabular, badges de texto/color, foco y elevación sobria. |
| Stitch `usuarios/code.html` | Referencia subordinada para jerarquía de tabla, identidad, plan/estado y detalle; se descartan filtros, búsqueda, métricas ficticias, telemetría, navegación inferior, fuentes e icon fonts. |
| Shell vigente (`index.html`, `app.js`) | Reutilizar navegación SPA de seis destinos, tema raíz `dark`, Tailwind CDN, clases focus-visible y datos compartidos de agentes; no duplicar shell ni reemplazar la navegación. |
