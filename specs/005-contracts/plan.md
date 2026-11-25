# PLAN-005 — Contrataciones de agentes

- **Derivado de:** [`spec.md`](spec.md), en particular §§2–9.
- **Estado:** plan para implementación futura; no se ejecuta en esta fase.
- **Objetivo:** incorporar la vista de Contrataciones al shell estático SPA con datos mock locales, interacción solo de consulta y snapshots comerciales históricos.

## 1. Enfoque

La implementación futura reutilizará el shell y los patrones existentes en `index.html`/`app.js`: la navegación seguirá conmutando la sección `#contrataciones` y sus atributos `data-page`; los datos vivirán en el modelo mock compartido de la IIFE. Se reemplazará únicamente el placeholder de Contrataciones, se añadirá el modelo y renderizado de contratos y su interacción de detalle. No se crearán backend, API, persistencia de contratos ni CRUD.

Se recomienda modelar contrato como entidad independiente, con referencias estables `clientUserId` y `agentId`, y snapshots de nombres visibles y líneas históricas. La colección de contratos no se modifica por operaciones en Usuarios, Agentes o Skills. Al renderizar, referencias existentes pueden aportar etiquetas actuales auxiliares; si no existen, snapshots son fallback autoritativo para el contexto contractual. El snapshot nunca se sustituye ni se recalcula.

## 2. Arquitectura y datos

### Colección

Añadir una sola colección `contractsCollection` al objeto mock compartido, en orden C-1001 a C-1004. Mantener contrato comercial autocontenido:

- Identidad: `id`.
- Relaciones: `clientUserId`, `agentId`.
- Snapshots: `clientCompanySnapshot`, `clientContactSnapshot`, `agentNameSnapshot` y cada línea `skillId`, `skillNameSnapshot`.
- Términos: `startDate`, `endDate`, `status`.
- `lines[]`: `unitPriceUsd` y `subtotalUsd` numéricos; cantidad implícita uno en los cuatro datos canónicos.
- Importe contractual se deriva en presentación sumando `subtotalUsd`; comprobar que coincide con el total esperado documentado. No mantener duplicado mutable si no lo requiere el formato del objeto canónico.

En el dataset inicial toda línea tiene subtotal igual a precio individual. Usar nombres snapshots literales del contrato. IDs de skill pueden apuntar a colección actual pero no definen el nombre/precio histórico. Evitar compartir referencias mutables a arrays u objetos que otra vista pueda modificar.

### Integración de la vista

- Localizar sección placeholder existente y sustituir solo su contenido interno por heading, descripción, contenedor de tabla con `overflow-x-auto` y estructura de tabla semántica; mantener IDs, sidebar/topbar, router y demás secciones.
- Agregar renderer de tabla que lea únicamente `contractsCollection`; resolver cliente/agente opcionalmente por ID sin mutar el registro y con fallback snapshot.
- Celdas: cliente/empresa y representante secundario opcional, agente, chips de líneas (nombres snapshots), fechas legibles, total calculado/formateado en USD, estado textual, acciones.
- Usar APIs DOM/textContent/createElement para valores dinámicos; no interpolar datos de usuario en HTML sin escape.
- Empty state defensivo por si la colección se vacía accidentalmente, sin crear contratos nuevos ni botón de alta. Aunque el dataset de SPEC tiene cuatro, mantener render resiliente.

## 3. Presentación y formato

- Importe: `Intl.NumberFormat` con locale coherente y currency USD, guardando importes en números, no strings con símbolo. Revisar que formatter muestre valores exactos y decimales uniformes.
- Fechas: formatear componentes ISO como fecha civil; evitar `new Date('YYYY-MM-DD')` con conversión UTC que pueda mostrar día previo. Usar parseo de componentes/local o fecha formateada de manera segura.
- Estado: conservar “Activo” / “Finalizado” visible en texto y añadir estilo semántico Tailwind, sin dependencia cromática.
- Tabla: caption accesible, thead/tbody, `th scope=col`, wrapper de scroll nombrado, contenido legible. En tablet/móvil no ocultar Acciones ni reducir etiquetas hasta perder significado.
- Tema: clases `dark:` y estados de foco para wrapper, cabecera, filas, chips, badge, menú, overlay y diálogo; evitar tokens inventados fuera de convenciones existentes.

## 4. Menú por fila

Implementar un solo estado `openContractMenuId` y un dropdown asociado a cada botón de acciones. El botón tendrá nombre accesible específico, `aria-expanded`, `aria-controls` y, si se usa, `aria-haspopup`. Solo presenta «Ver detalle».

Preferir popover/capa posicionada fuera del contenedor con overflow para evitar clipping; no incorporar librerías. Si el DOM patrón requiere anclaje, posicionar con mediciones nativas y reposicionar/cerrar en resize/scroll. Asegurar z-index bajo shell/modal adecuado. Cerrar por click exterior, Escape, acción y navegación; ignorar click interno; retorno de foco al activador al cerrar con Escape. Mantener controles como botones nativos. No declarar `role=menu` salvo implementar completamente flechas/home/end y semántica de menú; patrón de disclosure con botón normal es suficiente.

## 5. Modal de detalle

Reutilizar una única estructura de diálogo estática integrada en la sección o raíz apropiada del shell. `renderContractDetail(contractId)` obtiene un contrato por ID y rellena título/campos/tabla de líneas con DOM seguro; incluye total calculado desde subtotales. El detalle presenta ID, empresa y representante, agente, fechas, estado, línea por skill con precio/subtotal y total final.

Preferir `<dialog>` nativo si su comportamiento y compatibilidad con el shell se validan; alternativa vanilla con `role=dialog`, `aria-modal`, backdrop y gestión de foco. Mantener una sola capa modal abierta. Al abrir guardar activador y enfocar título o botón de cerrar; atrapar Tab/Shift+Tab; Escape cierra solo modal superior; click sobre contenido no cierra; click backdrop válido cierra; al cerrar devolver foco a activador conectado. Si no existe, buscar botón de acciones vecino/heading de tabla. Navegar fuera de vista cierra menú y diálogo.

El modal debe usar altura máxima basada en viewport y scroll interno; en móvil, ancho con márgenes seguros. Evitar bloqueo de scroll global persistente tras cierre.

## 6. Eventos y estado

- Centralizar estado UI mínimo: menú abierto, contrato activo de detalle, nodo activador del modal.
- Delegar eventos o enlazar eventos durante render cuidando no registrar listeners duplicados en cada render.
- El evento de Ver detalle debe guardar ID/activador y cerrar primero dropdown sin perder la referencia; luego renderizar detalle y abrir diálogo.
- No agregar estado de edición/borrado/pago/filtros ni persistir los contratos en localStorage.
- La navegación existente deberá invocar la limpieza de overlays; acoplarse a hook disponible o añadir una función local explícita sin reescribir router.
- No mostrar alertas de pago, error, sincronización o confirmaciones de mutación: la vista es de consulta.

## 7. Validación futura

### Estática

- `node --check app.js` y `git diff --check`.
- Buscar uso de `contractsCollection`, confirmar cuatro únicos IDs y sumas: 320+180=500; 240+160=400; 300+150=450; 280+170=450.
- Verificar que `index.html` no contiene snapshots duplicados hardcodeados ni estilos inline, y que no hay llamadas de red/almacenamiento de negocio.
- Revisar navegación y cambios diff para confirmar que otras vistas, datos y shell no han sufrido regresiones.

### Funcional manual

- Entrar/salir desde cada destino y comprobar shell, título y estado activo; overlay cierra en navegación.
- Para cada fila abrir acciones y detalle; verificar correspondencia ID/campos/sumas; probar Escape/clic exterior/selección y foco.
- Cambiar o eliminar temporalmente skill/agente de referencia en memoria y volver a renderizar: snapshots de contrato permanecen iguales, sin chips comerciales faltantes ni total alterado; restaurar/recargar trae dataset inicial.
- Teclado solamente: Tab a acciones, abrir/cerrar menú, activar Ver detalle, recorrer/cerrar diálogo, retorno de foco.
- Probar tema claro/oscuro y prefers-reduced-motion.

### Visual/responsive

En 1440, 1024, 768 y 375 px: revisar overflow global, scroll horizontal confinado, acceso a acciones, clipping/posición de dropdown, altura y scroll del modal, wrapping de chips, legibilidad de fechas/importes y alineación. Registrar limitaciones del entorno en vez de declarar pruebas no realizadas.

## 8. Riesgos y mitigaciones

| Riesgo | Mitigación |
|---|---|
| Precios snapshots confundidos con catálogo actual | Nombre y subtotal viven en línea contractual; render nunca consulta precio de skill. Prueba de mutación cruzada. |
| Referencia de cliente/agente eliminada | Mantener snapshots de presentación y render con fallback; ningún join es requisito para mostrar contrato. |
| Menú cortado por wrapper de tabla | Portal/capa exterior o medición vanilla; validación de filas extremas en viewports. |
| Fechas desfasadas por UTC | Parseo de componentes ISO para fecha civil; probar valores de inicio/fin de los cuatro registros. |
| Semántica «Importe pagado» sobreinterpreta pago | Etiqueta literal requerida, sin conciliación, método, fecha o nuevo estado de pago. |
| Extras de Stitch expanden alcance | Trazar cada control a SPEC; excluir búsqueda/filtros/metrics/sync. |
| Cambios en shell dañan otras vistas | Sustituir únicamente placeholder y conservar navegación global; revisar regresión al recorrer destinos. |

## 9. Archivos previstos en implementación futura

- `index.html`: contenido de sección existente y estructura única del diálogo, si el patrón compartido del shell no aporta una reutilizable.
- `app.js`: `contractsCollection`, render, formateo, eventos de menú/modal y limpieza al navegar.
- No se espera cambio en `SPECS.md`, `SPECS.es.md`, SDD anteriores, Stitch o dependencias.

Este plan no modifica ninguno de esos archivos; describe trabajo futuro exclusivamente.
