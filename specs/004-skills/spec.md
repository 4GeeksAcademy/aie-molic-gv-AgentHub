# SPEC-004 — Catálogo y gestión de skills

- **Derivada de:** [`../../SPECS.md`](../../SPECS.md) §§3–6.4, 8–10; `SPECS.es.md` es traducción de consulta.
- **Referencias subordinadas:** [`../../design/DESIGN.md`](../../design/DESIGN.md) y [`../../design/stitch/skills/code.html`](../../design/stitch/skills/code.html). `screen.png` se intentó inspeccionar, pero no estuvo disponible para visión en esta sesión.
- **Estado:** propuesta documental para revisión; no autoriza implementar código.
- **Precedencia:** `SPECS.md` > requisitos 4Geeks > `DESIGN.md` > Stitch.
- **Alcance:** vista Skills/Habilidades dentro del shell SPA existente; no cambiar otras vistas ni documentos de especificación existentes.

## 1. Objetivo y alcance

Permitir que una persona administradora consulte el catálogo canónico de cuatro skills, comprenda qué capacidad representa cada una, revise los agentes que la utilizan y, mediante confirmación explícita, retire una skill durante la sesión de demostración. La colección de skills y las relaciones de agentes son una única fuente compartida; tarjetas, detalle, acordeones de Agentes y contadores se derivan de ella.

### Incluido

- Catálogo inicial S-001–S-004 con nombre, descripción canónica breve, identificador estable, categoría y contador derivado de agentes que la referencian.
- Bloque explicativo «¿Qué es una skill?».
- Menú contextual por skill con «Ver detalle» y «Eliminar»; un menú abierto simultáneamente.
- Modal de detalle con nombre, descripción canónica completa (la descripción de §8, sin ampliaciones ficticias), categoría, ID, agentes asociados por nombre y contador.
- Confirmación y eliminación local por ID; retirar el ID de `skillIds` de los agentes afectados y borrar el registro de la colección compartida de skills en memoria.
- Re-render/derivación inmediata en Skills y Agentes; recarga restablece datos iniciales.
- Estado vacío, operación por teclado, foco, claro/oscuro y responsive.

### Fuera de alcance

Crear skills, editar nombre/descripción/categoría, asignar/desasignar skills individualmente, filtros/búsqueda/ordenación/paginación, tarifas nuevas, ejecución real, permisos, runtime, telemetría, sincronización con backend, persistencia operativa, eliminación de agentes, modificación de usuarios y cascada en contratos o errores. Los importes y líneas de contratos son snapshots comerciales independientes según `SPECS.md` §8 y no se reescriben al eliminar una skill. No añadir categorías/filtros visuales del HTML Stitch como funcionalidad ni contadores globales no exigidos.

## 2. Modelo canónico y relaciones

La fuente compartida es `mockData.skillsCollection` para skills y `mockData.agentsCollection` para sus usos. No se mantiene un arreglo paralelo, lista HTML fija, contador almacenado ni copia relacional en cada skill. Los IDs de agente contienen `skillIds`; los contadores son número de agentes presentes en `agentsCollection` cuyo `skillIds` contiene el ID. Las relaciones se calculan al renderizar y al abrir detalle.

| Skill ID | Nombre | Categoría | Descripción canónica | Agentes iniciales | Contador inicial |
|---|---|---|---|---|---:|
| S-001 | Web Research | Investigación | Busca, compara y sintetiza información web. | A-001 Atlas Researcher; A-003 Orbit Analyst | 2 |
| S-002 | Data Analysis | Analítica | Analiza conjuntos de datos y resume hallazgos. | A-001 Atlas Researcher; A-003 Orbit Analyst | 2 |
| S-003 | Customer Support | Atención | Clasifica consultas y redacta respuestas de soporte. | A-002 Nova Support; A-004 Verde Workflow | 2 |
| S-004 | Workflow Automation | Automatización | Coordina pasos repetibles y tareas entre herramientas. | A-002 Nova Support; A-004 Verde Workflow | 2 |

- Datos iniciales, IDs, descripciones, asociaciones y nombres se toman de `SPECS.md` §8 y del modelo compartido existente; no renombrar/corregir ni duplicar.
- `getSkillAgents(skillId)` conceptualmente filtra la colección vigente de agentes por inclusión del ID en `skillIds`. El contador y nombres asociados derivan de ese mismo resultado, no de los valores iniciales de la tabla.
- Al confirmar eliminación, eliminar la skill por ID de `skillsCollection` y retirar ese ID de cada `skillIds` activo. Las otras skills de agentes no cambian. El contador de las skills restantes se recalcula desde relaciones actuales.
- Agentes no se eliminan ni se modifican en otros campos; la vista Agentes deja de mostrar la skill retirada en su acordeón. Si desaparece la colección de una skill, el acordeón no debe emitir chips huérfanos para ese ID.
- Contratos conservan líneas/IDs/nombres/precios como snapshot comercial independiente; no se filtran líneas, no se recalculan importes ni se borran contratos. Errores, usuarios y demás entidades no cambian. Sin cascada fuera de la relación actual agente-skill indicada.
- Recargar reinicia colección y relaciones canónicas. Ninguna entidad se escribe en `localStorage` ni se envía por red.

## 3. Requisitos funcionales

| ID | Requisito |
|---|---|
| FR-001 | La vista se integra en la sección existente `#habilidades` / `data-page="habilidades"`, reutiliza shell, navegación, título de topbar, tema y estructura del resto de la SPA. |
| FR-002 | El encabezado identifica «Habilidades» y describe brevemente que es un catálogo de capacidades modulares asignables a agentes; no afirma métricas globales extra. |
| FR-003 | La carga inicial renderiza exactamente S-001–S-004 en orden canónico desde `mockData.skillsCollection`, con nombre, ID, descripción breve, categoría y control de acciones. |
| FR-004 | Cada registro muestra un contador legible de agentes que la utilizan; se calcula dinámicamente con agentes presentes y `skillIds`, no se hardcodea, duplica ni deriva de contratos. Se muestra 0 cuando ninguna relación vigente la usa. |
| FR-005 | La vista contiene un bloque visual diferenciado titulado exactamente «¿Qué es una skill?» y explica capacidad modular que puede usar un agente, con ejemplos búsqueda/investigación o análisis, y que una skill puede asociarse a varios agentes. No presenta la skill como agente. |
| FR-006 | Cada registro tiene un botón de acciones accesible con nombre que identifica la skill y un menú con exactamente «Ver detalle» y «Eliminar». Solo un menú se abre a la vez; el menú no queda recortado. |
| FR-007 | El menú se abre/cierra por activador y se cierra por Escape, clic fuera, selección y cambio de sección. Expone estado y relación accesible; selección ejecuta acción de la skill correcta sin cierre prematuro por listener global/re-render. |
| FR-008 | «Ver detalle» abre un diálogo único para el ID seleccionado con nombre, ID, categoría, descripción canónica completa, contador derivado y lista de agentes asociados actuales por nombre/ID. Si no hay asociados, presenta estado explícito «Sin agentes asociados». |
| FR-009 | El detalle se cierra mediante botón, clic válido en backdrop y Escape; un clic dentro no lo cierra. El foco entra, permanece contenido mientras modal está abierto y vuelve al activador conectado o a un fallback lógico. |
| FR-010 | «Eliminar» abre confirmación accesible que identifica nombre e ID y aclara el efecto local de sesión. Abrir o cancelar no cambia datos. Cancelar, botón de cierre, Escape o backdrop (si admitido) limpian selección sin mutación. |
| FR-011 | Solo confirmar retira la skill seleccionada por ID de `skillsCollection` y el ID de `skillIds` en los agentes afectados; la mutación se limita a esos campos/relaciones de skills. No hay API ni persistencia de negocio. |
| FR-012 | Tras confirmar se actualiza inmediatamente el catálogo y sus contadores; re-render de Agentes refleja la relación retirada al visitar/cambiar a esa sección. No se mantiene caché de nombres/contadores obsoleta. |
| FR-013 | Eliminación no elimina ni modifica contratos, importes, snapshots comerciales, errores, usuarios ni agentes; no se cascada hacia esas entidades. Recarga restaura el catálogo y las relaciones canónicas. |
| FR-014 | Si se eliminan todas las skills, la vista muestra empty state accesible; un recuento cero de agentes asociados sigue siendo un estado válido mientras exista la skill. Foco tras eliminar va a siguiente registro, anterior o heading/empty state. |
| FR-015 | Menús/dialogs/confirmación tienen controles nativos, roles/nombres ARIA adecuados, foco visible, gestión lógica de Escape y retorno; feedback posterior a eliminación se anuncia sin leer toda la lista. |
| FR-016 | El catálogo, bloque informativo, badges, dropdown y diálogos se presentan en modo claro/oscuro mediante Tailwind `dark:` y se adaptan a escritorio, tablet y móvil sin overflow horizontal global. |
| FR-017 | Contenido dinámico se crea de forma segura con DOM/textContent; no se introducen datos, categorías, filtros, acciones ni métricas ajenas al contrato. |

## 4. Requisitos visuales

- **VIS-001 Shell:** reutilizar `#habilidades`, shell, encabezado/topbar, ancho y navegación vigentes; no duplicar navegación ni construir vista alternativa.
- **VIS-002 Catálogo:** tarjetas o lista compacta con identidad claramente diferenciada de una tarjeta de agente. Se elige el patrón de registros tipo tarjeta/listado de la referencia secundaria compatible con §6.4; cada elemento mantiene nombre, categoría, descripción, contador y kebab en móvil.
- **VIS-003 Bloque informativo:** panel diferenciado del catálogo por superficie/borde/acento, con título y explicación accesibles; no emplear texto exclusivo de hover.
- **VIS-004 Contadores:** badge/indicador con cifra y texto («2 agentes»); legible en ambos temas, no solo color y actualizado desde la fuente compartida.
- **VIS-005 Detalle:** agrupación etiqueta/valor para ID/categoría/conteo, descripción completa y nombres de agentes; overflow del contenido se limita al modal.
- **VIS-006 Acciones y overlays:** botón kebab con label «Acciones para [nombre]»; menú elevado no recortado; confirmación con acción destructiva reconocible y cancelar seguro. Diálogo de detalle y confirmación nombrados, max-height/scroll apropiados.
- **VIS-007 Identidad:** sans-serif del shell, acento índigo/azul/violeta, superficies y bordes sobrios de `SPECS.md`/`DESIGN.md`; todas las superficies/estados tienen pares `dark:` y foco visible. No importar tokens, fonts, icon fonts, CSS/configuración ni assets Stitch.
- **VIS-008 Responsive:** grid/listado fluido; en 375 px nombre/descripción/contador/acciones siguen legibles y controles alcanzables; overlays caben en viewport. No se exige tabla ni scroll horizontal para catálogo.

## 5. Estados e interacciones

### Carga y render

- Al mostrar Skills, renderizar registros vigentes desde colección compartida en orden canónico relativo. Por cada skill derivar agentes una sola vez en cada render (o helper compartido) y usar mismo resultado para badge/detalle.
- Render tras cualquier mutación en skills refresca el listado y el contenido derivado sin recarga. Al cambiar a Agentes, acordeones resuelven IDs contra catálogo vigente.
- Empty state aparece si `skillsCollection` queda vacía y oculta listado; no deja menú/modal asociado a nodo inexistente.

### Menú

- Botón nativo con nombre específico, `aria-expanded`, `aria-controls`; preferir grupo de botones normales en vez de `role="menu"` incompleto. Mantener `openSkillMenuId` único.
- Abrir otra opción cierra la previa; Escape cierra y devuelve foco al activador. Clic exterior, seleccionar opción y navegación cierran. La acción captura ID/activador antes de re-renderizar.

### Detalle

- Una estructura única reutilizable carga el registro por ID al invocarse; los datos y relaciones se derivan del modelo actual, no de HTML estático.
- Apertura enfoca el primer control o encabezado enfocable; Tab/Shift+Tab queda contenido. Cierre por botón/Escape/backdrop devuelve foco al activador si conectado, con fallback al heading/listado.
- El backdrop solo cierra cuando el gesto comienza y termina en el backdrop; click dentro no cierra. Escape no debe cerrar un overlay subyacente en el mismo evento.

### Confirmación/eliminación

- Confirmación no altera el modelo. Cancelar/Escape/cierre/backdrop limpia el ID pendiente.
- Confirmar vuelve a comprobar el ID; quita skill y su relación `skillIds` de agentes afectados, actualiza vista, anuncios y foco. No muta otra propiedad de agentes ni otras colecciones.
- El contador de skills sobrevivientes es el número de agentes existentes que mantienen cada ID; eliminación de una skill invalida su contador porque ya no existe, sin afectar los demás contadores salvo que los datos/relaciones cambiaron.
- Recarga restaura el estado inicial, excepto preferencia de tema gestionada por shell.

## 6. Accesibilidad, responsive, temas y semántica

- Mantener landmarks y heading de sección; catálogo como `<section>` y registros como `<article>` o lista semántica. Acciones con `<button>`, no elementos genéricos clicables. Labels/textos visibles identifican contadores y categorías.
- Botones iconográficos tienen `aria-label`; decoración `aria-hidden`. Menú indica `aria-expanded`/`aria-controls`; acordeones de Agentes reflejan catálogo actualizado.
- Modal con `role="dialog"`, `aria-modal="true"`, `aria-labelledby`; confirmación puede usar `role="alertdialog"` con `aria-describedby`. Trap de foco, Escape, foco visible, backdrop correcto y restauración lógica.
- Regiones `aria-live="polite"` para resultado y estado vacío solo cuando proceda; no se marca toda la colección como live.
- Probar 1440/1024/768/375 px en ambos temas. No overflow global ni clipping de opciones; contenido de diálogo puede scrollar dentro del viewport.
- Clases base y `dark:` para canvas, tarjetas, explicación, badges, menú, backdrop, panel y foco. Contraste suficiente y semántica no dependiente del color; respetar `prefers-reduced-motion` para transición no esencial.

## 7. Criterios de aceptación

1. Skills reutiliza el shell existente y al navegar muestra heading «Habilidades» sin recarga, conservando topbar, tema y navegación activa.
2. Carga inicial presenta exactamente S-001 Web Research, S-002 Data Analysis, S-003 Customer Support, S-004 Workflow Automation en orden, desde colección compartida, con IDs, categorías y descripciones exactas de §2.
3. Cada skill muestra nombre, categoría, descripción y contador textual; inicialmente los cuatro contadores son 2 y corresponden respectivamente a los pares de agentes de §2. El test deriva los valores inspeccionando `agentsCollection.skillIds`, no el texto del badge únicamente.
4. Cambiar relaciones en memoria altera los contadores al render siguiente; una skill sin agentes muestra 0 y no desaparece salvo eliminación explícita.
5. El bloque «¿Qué es una skill?» aparece diferenciado e incluye definición modular, ejemplos y relación de una skill con varios agentes; no afirma ejecución ni precio propio.
6. Cada menú ofrece exactamente Ver detalle y Eliminar, identifica skill, solo uno abierto; Escape/clic fuera/acción/navegación lo cierran y el foco retorna correctamente.
7. Detalle de cada ID muestra nombre, ID, categoría, descripción canónica, conteo y nombres/IDs de agentes vigentes; el conteo y nombres concuerdan. La skill sin agentes muestra 0 y «Sin agentes asociados».
8. Modal cierra con botón, Escape y click backdrop válido; click dentro no lo cierra; foco entra, queda contenido y retorna al activador o fallback.
9. Eliminar abre confirmación que identifica skill e informa efecto solo de sesión; antes de confirmar y tras cancelar los datos y relaciones permanecen intactos.
10. Confirmar elimina solo la skill elegida de catálogo y su ID de `skillIds` de cada agente que la tenga; otras skills y campos de agente permanecen idénticos.
11. Tras confirmar se actualiza catálogo y agentes afectados; sus acordeones no muestran skill eliminada, otros acordeones/skills y sus contadores reflejan relaciones actuales.
12. Contratos, líneas, nombres/precios snapshot, errores, usuarios y colecciones distintas a skills/agentes permanecen byte/valor-equivalentes tras eliminación; no se borran en cascada ni recalculan contratos.
13. Recargar restablece cuatro skills y relaciones canónicas; no hay persistencia operativa, API o llamada de aplicación.
14. Al eliminar todas, empty state accesible reemplaza catálogo; foco queda en registro próximo o heading/empty state; anuncio de resultado no anuncia toda la lista.
15. A 1440/1024/768/375 px catálogo, explicación y overlays son legibles y no generan overflow horizontal global; modo claro/oscuro cubre todos los componentes y estados.
16. Teclado permite operar todos los menús/diálogos y botones con foco visible; Escape afecta solo la capa superior, estados tienen texto y movimiento respeta reduced motion.
17. Inspección confirma stack permitido y ausencia de búsqueda/filtros/creación/datos inventados/código/assets/configuración Stitch, backend, CSS propio/inline o framework.

## 8. Trazabilidad y precedencia

| Fuente | Requisitos concretados |
|---|---|
| `SPECS.md` §6.4 | FR-003–FR-012, VIS-002–VIS-006; AC-002–AC-11. Catálogo, definición, detalle, asociación por nombre y eliminación confirmada. |
| `SPECS.md` §8 Skills/Agentes/Contratos/Errores | FR-003–FR-004, FR-008, FR-011–FR-013; AC-002–AC-004, AC-007, AC-10–AC-13. IDs/descripciones/asociaciones canónicas, conteo 2, snapshots comerciales. |
| `SPECS.md` §§3–5, 9–10 | FR-001, FR-006–FR-017; VIS-001, VIS-007–VIS-008; AC-001, AC-006–AC-009, AC-14–AC-17. Stack, shell, tema, estados, semántica, teclado y viewport. |
| SPEC/PLAN/TASKS-001–003 y shell vigente | Modelo compartido, navegación `habilidades`, `skillsCollection` existente, `skillIds`, patrón DOM vanilla/Tailwind y restricciones. No reabrir implementaciones previas. |
| `DESIGN.md` | Paleta, superficies, foco y densidad técnica solo como dirección visual subordinada. |
| Stitch skills | Referencia de disposición: explicación, tarjetas, contador y detalle. Se descartan filtros, crear, conteo global «4 activas», tarifas no contractuales, cluster/runtime, estados protegidos o demo-toast que contradigan SPEC. |

## 9. Restricciones técnicas

HTML5 semántico, Tailwind CSS v3.4.17 mediante CDN ya cargado, JavaScript vanilla e información mock en memoria. No frameworks, TypeScript, dependencias, build, API/backend, estilos personalizados, `<style>`, atributos `style`, recursos/fuentes/scripts copiados de Stitch ni persistencia de negocio. No editar `SPECS.md`, specs existentes o Stitch en la fase documental. La implementación posterior modifica solo `index.html` y `app.js` y, tras evidencia, el progreso de `specs/004-skills/tasks.md`.
