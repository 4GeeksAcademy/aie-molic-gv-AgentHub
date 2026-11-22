# SPEC-005 — Contrataciones de agentes

- **Derivada de:** [`../../SPECS.md`](../../SPECS.md) §§3–6.5, 8–10; `SPECS.es.md` se consulta como traducción.
- **Referencias visuales subordinadas:** [`../../design/DESIGN.md`](../../design/DESIGN.md) y Stitch `design/stitch/contrataciones/{code.html,screen.png}`. La captura no pudo inspeccionarse visualmente en esta sesión; del HTML se reconocen la tabla comercial y ejemplos canónicos, pero se descartan controles o cifras no respaldados por SPEC.
- **Estado:** propuesta SDD para revisión; no autoriza implementación.
- **Precedencia:** `SPECS.md` > requisitos 4Geeks > `DESIGN.md` > Stitch.
- **Alcance:** especificar la vista Contrataciones en el shell SPA vigente. No modificar fuentes, documentos previos ni código en esta fase.

## 1. Objetivo

Dar a la persona administradora una vista clara de los contratos de alquiler de agentes, con sus clientes, agentes, skills contratadas, vigencia e importes. El detalle debe explicar de forma verificable el total mediante las líneas comerciales históricas contratadas, sin confundirlas con el catálogo actual ni perder la relación con las entidades compartidas.

## 2. Alcance

### Incluido

- Vista Contrataciones dentro de la sección existente del shell, con encabezado y descripción breve.
- Tabla semántica de los cuatro contratos canónicos C-1001–C-1004, en su orden de origen, con Cliente, Agente, Skills contratadas, Fecha de inicio, Fecha de fin, Importe pagado y Acciones.
- Skills como chips compactos y legibles; importe total y estado textual.
- Menú por fila con «Ver detalle», un menú abierto como máximo.
- Modal de detalle para el contrato seleccionado: ID, cliente y representante cuando aplique, agente, fechas, estado, total y líneas individuales con precio y subtotal.
- Precios, nombres de skills y contexto comercial de cada contrato preservados como snapshots históricos, aun si se elimina la skill o el agente del catálogo/sesión.
- Scroll horizontal confinado a la tabla, interacción por teclado, foco y restauración, temas claro/oscuro y diseño responsive.

### Fuera de alcance

Crear, editar, renovar, cancelar, eliminar o pagar contratos; búsqueda, filtros, ordenación, paginación, exportación, facturación efectiva, acciones de negocio adicionales, backend/API, persistencia operativa o derivar ingresos del Dashboard desde este conjunto. Los widgets de facturación, filtros, sincronización, afirmaciones de conciliación y paneles de Stitch que no consten en `SPECS.md` no se implementan.

## 3. Fuente de verdad y datos canónicos

Todos los registros iniciales y líneas se toman de `SPECS.md` §8. IDs estables; fechas ISO `YYYY-MM-DD`; cantidades numéricas en USD. El importe de una línea es el precio comercial snapshot y el total debe ser exactamente la suma de sus líneas. El agente y cliente se resuelven por IDs a las colecciones compartidas al renderizar cuando estén disponibles; un contrato que menciona U-005 tiene como representante a Valentina Cruz aunque no tenga agente propio. El nombre/ID de skill y su precio comercial quedan en la línea del contrato como snapshot y no se recalculan desde la asociación actual agente-skill o desde catálogo.

| ID | Cliente (usuario) | Agente | Inicio | Fin | Skills y precio snapshot (USD) | Total | Estado |
|---|---|---|---|---|---|---:|---|
| C-1001 | Northstar Labs (U-001, Lucía Moreno) | Atlas Researcher (A-001) | 2026-10-01 | 2026-11-01 | Web Research $320; Data Analysis $180 | $500 | Activo |
| C-1002 | BrightPath (U-002, Mateo Ruiz) | Nova Support (A-002) | 2026-10-10 | 2026-11-10 | Customer Support $240; Workflow Automation $160 | $400 | Activo |
| C-1003 | Orbit Data (U-003, Sofía Chen) | Orbit Analyst (A-003) | 2026-09-15 | 2026-10-15 | Data Analysis $300; Web Research $150 | $450 | Finalizado |
| C-1004 | Northstar Labs (U-005, Valentina Cruz) | Atlas Researcher (A-001) | 2026-11-01 | 2026-12-01 | Web Research $280; Data Analysis $170 | $450 | Activo |

La representación en datos debe separar el snapshot de las referencias, por ejemplo: `contract.id`, `clientUserId`, `clientCompanySnapshot`, `agentId`, `agentNameSnapshot`, `startDate`, `endDate`, `status` y `lines[]` con `skillId`, `skillNameSnapshot`, `unitPriceUsd`/`subtotalUsd`. Cada línea mostrada tiene cantidad uno según los datos canónicos; no se inventa otro factor de cantidad. No derivar las tarifas del catálogo de Skills ni cambiar sus valores al eliminar/agregar agentes o skills durante la sesión. Los ingresos mensuales y descuentos del Dashboard son agregados ficticios independientes y no se suman ni recalculan a partir de estos contratos.

## 4. Requisitos funcionales

| ID | Requisito |
|---|---|
| FR-001 | Integrar Contrataciones en `#contrataciones` / `data-page="contrataciones"`, conservando shell, sidebar, topbar, navegación y tema; cambiar de vista no recarga la SPA. |
| FR-002 | Mostrar encabezado «Contrataciones» y una descripción breve y neutral del registro de contratos; no agregar métricas no contractuales. |
| FR-003 | Renderizar exactamente C-1001–C-1004 inicialmente en ese orden, desde una única colección mock local con IDs estables. |
| FR-004 | La tabla presenta Cliente, Agente, Skills contratadas, Fecha de inicio, Fecha de fin, Importe pagado y Acciones. Cliente identifica empresa; puede acompañarse del usuario representante como metadato. Agente y cliente se resuelven por referencias compartidas, con snapshot de respaldo si la entidad se elimina de la sesión. |
| FR-005 | Skills se presentan en chips compactos y legibles, con nombres comerciales del snapshot y sin sustituir el precio por tarifa vigente. |
| FR-006 | Cada importe total coincide exactamente con suma de líneas: C-1001 $500, C-1002 $400, C-1003 $450, C-1004 $450. La interfaz indica USD de forma coherente y no implica pago/conciliación real más allá del campo contractual «Importe pagado» definido en la fuente. |
| FR-007 | Fechas ISO se presentan mediante un formato legible, uniforme y no ambiguo. Se conserva el mismo día civil sin desplazamiento de zona horaria. |
| FR-008 | Cada fila ofrece un botón accesible de acciones y un menú con «Ver detalle». No se ofrece editar/eliminar ni otra acción no especificada. Solo un menú puede estar abierto simultáneamente. |
| FR-009 | Menú se cierra por Escape, clic exterior, selección o navegación; el click en la opción seleccionada no se cancela por listener de clic externo. El botón declara expanded/controls y tiene nombre con el contrato. |
| FR-010 | «Ver detalle» abre un único modal que muestra el registro asociado al activador: ID, cliente/representante, agente, fechas, estado, importe total y desglose de cada skill, precio individual/subtotal y suma total. |
| FR-011 | Modal cierra con botón visible, Escape y click válido en backdrop; click dentro no lo cierra. El foco entra, se contiene con Tab/Shift+Tab y vuelve al activador si sigue conectado; en caso contrario, a fila cercana o heading. |
| FR-012 | Menús y modal se cierran al cambiar de sección. Una interacción iniciada dentro del diálogo no lo cierra al acabar fuera; Escape solo cierra la capa superior. |
| FR-013 | Los importes y nombres de contrato son snapshots inmutables durante esta vista. Eliminación de skill/agente de otra vista no borra contrato/línea, no modifica precio, fechas, total ni nombres históricos. Si la referencia asociada ya no existe, la fila/detalle conserva su snapshot y puede indicarlo como referencia histórica. |
| FR-014 | No se crean datos de contrato ni se guarda estado operativo fuera de memoria. No hay peticiones de aplicación; recargar restaura los cuatro registros canónicos. |
| FR-015 | A viewports estrechos la tabla puede desplazarse horizontalmente dentro de su región; no hay overflow horizontal de página y Acciones sigue alcanzable. Modal cabe en viewport y permite scroll vertical interno. |
| FR-016 | Tabla y diálogos son semánticos y accesibles: `caption`, `thead`, `tbody`, `th scope="col"`, botones reales, nombres accesibles, foco visible, etiqueta/estado textual y controles operables por teclado. |
| FR-017 | Clases Tailwind existentes y `dark:` cubren tabla, chips, estados, menú, backdrop, modal, texto y foco en temas claro/oscuro. Respetar `prefers-reduced-motion` para transiciones no esenciales. |

## 5. Requisitos visuales

- **VIS-001 — Shell:** reutilizar el contenedor existente, encabezado/topbar, título y navegación; no duplicar shell ni cambiar otros destinos.
- **VIS-002 — Tabla comercial:** superficie delimitada, bordes finos y filas ordenadas; diseño denso moderado subordinado a lectura. Encabezados y asociaciones fáciles de escanear.
- **VIS-003 — Cliente/agente:** nombres visibles y, si se muestra, ID como metadato secundario. No requerir avatars ni imágenes externas. El representante U-005 se identifica correctamente sin implicar que sea propietario del agente.
- **VIS-004 — Skills y dinero:** chips compactos que envuelven en móvil; en detalle, cada línea con skill, importe y subtotal alineado. Importes usan figuras tabulares/monoespaciadas si están disponibles; formato en dólares coherente. Los precios lineales no se ocultan en hover.
- **VIS-005 — Estados:** Activo y Finalizado llevan texto; semántica verde/neutra o slate puede reforzar, sin depender del color.
- **VIS-006 — Acciones:** botón kebab/acciones con etiqueta «Acciones para contrato C-…» y área táctil cómoda; dropdown elevado, visible y no cortado por el wrapper scrolleable.
- **VIS-007 — Detalle:** modal titulado y nombrado, con jerarquía de identificación, periodo, estado y total; desglose legible; cierre evidente y contenido con scroll interno si necesario.
- **VIS-008 — Responsive/tema:** en escritorio columnas disponibles; tablet/móvil mantienen tabla completa en scroll local, sin ocultar columna de acciones. Pares Tailwind `dark:` para todos los componentes. Sans serif del sistema, bordes/superficies sobrios conforme a SPEC/DESIGN. Stitch solo referencia composición; no copiar tipografías, iconos, imágenes, código o contenido adicional.

## 6. Interacciones y estados

### Tabla y menú

- Al entrar, renderizar los cuatro contratos en orden de colección. El precio de cada skill aparece en chips o detalle según permita la legibilidad; la tabla siempre presenta skills y total.
- Cada activador mantiene `aria-haspopup`, `aria-expanded`, `aria-controls`, nombre accesible y ID de contrato. Menú de botones normales con una sola opción «Ver detalle»; no adoptar `role=menu` sin patrón completo de teclado.
- Un `openContractMenuId` o estado equivalente asegura menú único. Escape lo cierra y retorna foco al activador. Click fuera, acción y navegación lo cierran; la selección conserva el ID antes de cerrar/re-renderizar.
- Evitar clipping por `overflow-x-auto`: desplegar menú en capa externa/posicionamiento seguro o mecanismo vanilla equivalente; comprobar extremos del viewport.

### Modal de detalle

- Un único diálogo se rellena a partir del ID del registro y sus snapshots. Los campos monetarios de detalle se calculan desde las líneas contractuales almacenadas, o se contrastan con total contractual para validación; no se crean valores paralelos discordantes.
- Cada línea representa una skill contratada, el precio individual/subtotal y moneda; el pie de desglose presenta total y una igualdad/suma coherente. En los datos iniciales cada línea tiene cantidad uno, por lo que precio y subtotal coinciden.
- Formato de fecha debe preservar fecha civil ISO (preferir parseo local por componentes o una estrategia que no convierta a día anterior/siguiente). Mostrar moneda como USD; formato de referencia `$500.00 USD` o `$500 USD` puede elegirse uniformemente sin alterar valores numéricos.
- Modal con `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, encabezado y botón cerrar. Foco inicial al título o botón, trampa Tab/Shift+Tab, Escape y retorno. Backdrop cierra solo si gesto empieza y acaba sobre backdrop; click dentro no cierra.

## 7. Accesibilidad, responsive y temas

- Mantener landmarks y heading del shell. Tabla con caption visible u oculto visualmente, encabezados `scope=col` y región de scroll con nombre accesible.
- Botones nativos con nombres; iconos decorativos ocultos a AT; estado contractual siempre textual. No anidar botones ni hacer clicable la fila completa.
- Modal nombrado, foco contenido, Escape/backdrop/cierre y retorno lógico. Menú y tabla alcanzables por teclado; foco visible en ambos temas.
- Probar 1440, 1024, 768 y 375 px. El scroll horizontal se limita al wrapper; la página no desborda; el modal no supera viewport y sus contenidos largos se desplazan internamente.
- El modo oscuro cubre tabla, chips, bordes, badges, menú, modal, backdrop y focus. Respetar movimiento reducido.

## 8. Criterios de aceptación

1. Navegar a Contrataciones conserva el shell, cambia título/estado activo sin reload y muestra heading/descripcion coherentes.
2. Hay exactamente cuatro registros iniciales, C-1001–C-1004 en orden, con clientes, agentes, fechas, skills, importes y estados concordantes con §3.
3. Tabla semántica con caption, thead/tbody y encabezados Cliente, Agente, Skills contratadas, Fecha de inicio, Fecha de fin, Importe pagado y Acciones; cada fila tiene botón con nombre único.
4. Los chips de cada registro muestran las skills comerciales correctas; no se sustituyen por skills actuales del agente ni por precios del catálogo.
5. Totales presentados como $500, $400, $450 y $450 USD; cálculo de cada línea reproduce respectivamente 320+180, 240+160, 300+150 y 280+170. No hay diferencia de centavos ni dato de ingreso mensual derivado de esos totales.
6. Fechas visibles son uniformes y no ambiguas; al representar `YYYY-MM-DD` no se desplaza el día por zona horaria.
7. Menú por fila ofrece solo Ver detalle; un único menú, label/expanded/controls coherentes, cierre por fuera/Escape/selección/navegación y no clipping.
8. Abrir Ver detalle de cada fila muestra ID, cliente y representante correspondiente (U-001, U-002, U-003, U-005), agente/ID, inicio/fin, estado, total y todas las líneas con precio/subtotal. Para C-1004, Valentina Cruz es representante y el agente sigue siendo Atlas Researcher (A-001).
9. En cada modal, suma de subtotales coincide exactamente con el importe total contractual; importes y moneda se presentan coherentemente.
10. Modal cierra con botón, Escape y click válido en backdrop; click dentro no cierra; foco entra/queda contenido y se devuelve al activador conectado o fallback.
11. Eliminar una skill o agente en otra vista (cuando esté presente en sesión) no cambia snapshot contractual: mantiene contrato, líneas, nombres, fechas, precio, total e importe. Al faltar referencia se mantiene dato histórico, sin error de render.
12. Tabla/modal son legibles en claro y oscuro, estados tienen texto, foco es visible; a 1440/1024/768/375 no existe overflow global, tabla conserva acciones dentro de scroll local y modal cabe/scroll interno.
13. Navegación cierra menú/modal sin modificar contratos; recargar restaura cuatro contratos canónicos; no se persisten entidades ni hay llamadas de aplicación.
14. Inspección confirma que no hay CRUD, búsqueda/filtros, paginación, sincronización o métricas adicionales provenientes solo de Stitch; se cumple stack de `SPECS.md`.

## 9. Restricciones técnicas y trazabilidad

- Implementación futura: HTML semántico existente, Tailwind CSS v3.4.17 desde CDN ya cargado y JavaScript vanilla en `app.js`; sin framework, TypeScript, API/backend, dependencias/build, CSS personalizado, `<style>` o atributos `style`.
- Colección `contractsCollection` local única y snapshots explícitos de nombres/precios. No persistir entidades; el único estado persistible permitido es preferencia de tema global ya existente.
- No modificar `SPECS.md`, `SPECS.es.md`, specs anteriores, fuentes Stitch, `index.html` ni `app.js` durante esta fase documental.

| Fuente | Concreción |
|---|---|
| `SPECS.md` §§6.5, 8 | Tabla, detalle, líneas y cuatro valores canónicos; snapshot comercial y total. |
| `SPECS.md` §§3–5, 9–10 | Stack vanilla/Tailwind CDN, shell, estados, tema, semántica, teclado y responsive. |
| Requisitos 4Geeks | Contratos canónicos, detalle con precio/subtotal y totales exactos; se concreta sin CRUD no exigido. |
| `DESIGN.md` | Densidad tabular, capas sobrias, contraste, cifras tabulares y superficies; subordinado a legibilidad/SPEC. |
| Stitch Contrataciones | Tabla, desglose y tono visual de referencia; se descartan búsqueda, filtros, resumen de $1,350/$1,800, conciliación y textos de sincronización no autorizados. |
| SPEC/PLAN/TASKS 001–004 | Reutilizar shell, tema, usuarios/agentes/skills compartidos y snapshots; nunca modificar datos/base de documentos previos. |

## 10. Decisiones explícitas y ambigüedades

1. **Pagado vs total:** `SPECS.md` nombra el campo «Importe pagado» y declara que los importes suman las líneas; no define fecha/método de cobro ni estados de pago. Mostrar la etiqueta e importes canónicos sin afirmar conciliación ni crear metadatos de pago.
2. **Representante del cliente:** mostrar empresa en tabla; en detalle mostrar empresa y usuario referenciado. C-1004 debe reflejar U-005/Valentina Cruz, no asumir que la entidad que figura en C-1001 representa todos los contratos Northstar.
3. **Tarifas snapshot:** precios de líneas se copian literalmente incluso si no coinciden con el catálogo actual o la asociación actual del agente. No existe “precio actual” que reemplace el dato histórico.
4. **Fechas:** formato visible se puede escoger, pero debe ser inequívoco y conservar la fecha civil; el formato numérico ISO `YYYY-MM-DD` es aceptable y evita localización ambigua.
5. **Borrado de referencia:** spec previa de Agents/Skills exige no cascada a contratos. El plan debe conservar snapshots para representar contratos históricos ante ausencia de entidad; no añadir agente/skill huérfano como si fuese registro vigente.
6. **Stitch:** el HTML sugiere búsqueda/filtros, métricas de facturación, conciliación y sincronización que contradicen alcance estricto; se excluyen por precedencia.
