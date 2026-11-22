# PLAN-006 — Registro de errores

- **Fuente:** [`spec.md`](spec.md), derivada de `SPECS.md`.
- **Estado:** plan técnico propuesto; requiere aprobación antes de implementar.
- **Precedencia:** `SPECS.md` > requisitos 4Geeks > `DESIGN.md` > Stitch.
- **Alcance de ejecución futura:** `index.html`, `app.js` y progreso de `tasks.md` de esta carpeta. No cambiar las cinco secciones anteriores ni sus documentos.

## 1. Objetivo técnico

Añadir la vista de lectura y resolución local de errores a la SPA existente, siguiendo patrones DOM/menú/modal ya disponibles, preservando el snapshot histórico y sin generar servicios externos o persistencia operativa.

## 2. Arquitectura existente a reutilizar

- Mantener `#registro-de-errores`, `data-page="registro-de-errores"`, el enlace de navegación, shell, tema global y router `showPage` existentes.
- Añadir solo contenido dentro de la sección prevista de `index.html`, además de un diálogo único al área de overlays compartida si sigue el patrón vigente.
- Añadir `errorsCollection` en el objeto `mockData` existente, con seis objetos fuente y estado mutable de sesión. No duplicar datos en HTML, no crear otra fuente paralela.
- Mantener IIFE, JavaScript vanilla, DOM API y clases Tailwind del proyecto; no añadir módulos, build, paquetes o CSS.

## 3. Modelo y resolución de referencias

1. Copiar literalmente los seis registros de `SPECS.md` §8: ID, timestamp UTC a minuto, agente, tipo/severidad, descripción y estado inicial.
2. Separar campos canónicos de fixtures de detalle: `message` completo y `stackTrace` ficticio (mínimo 3 líneas) son datos demo añadidos por necesidad de detalle, no valores atribuidos a SPECS. No importar la traza de Stitch como verdad; evitar datos sensibles o afirmaciones de producción.
3. Resolver agente por ID solo cuando esté establecido inequívocamente por una fuente canónica. Conservar `agentNameSnapshot` y renderizarlo ante entidad ausente. En E-005 no inferir ID a partir del nombre `Verde Workflow`.
4. Inicializar estado a cada carga desde fixture; mutar solo `status` del error en memoria. No usar `localStorage`, `fetch` o efectos colaterales sobre `agentsCollection`/Dashboard.

## 4. Vista y renderizado

- Convertir el placeholder actual en encabezado descriptivo neutral y tabla/listado semántico: Timestamp, Agente, Tipo/Severidad, Descripción, Estado y Acciones. Conservar estructura `caption`, `thead`, `tbody`, encabezados asociados, scroll horizontal contenido y empty state defensivo si lo requiere el patrón.
- Renderizar orden de colección estable; timestamp visible con texto UTC claro, formato literal a precisión de minuto.
- Crear nodos con `createElement`, `textContent`, `replaceChildren`; nunca tratar mensaje o stack como HTML.
- Crear badges para tipo/severidad y resolución con clases Tailwind explícitas: crítico rojo, advertencia ámbar, información azul; todos con etiqueta textual.
- Si se recorta descripción en la tabla, asegurar que modal entrega `message` íntegro; no alterar la descripción breve canónica.

## 5. Dropdown de acciones

- Usar un único `openErrorMenuId` y helper de render/actualización, con botón nativo y `aria-label` que incluye ID, `aria-haspopup`, `aria-expanded`, `aria-controls`.
- Menú de grupo de botones, no aplicar `role=menu` salvo implementar patrón de teclado completo. Abierto: «Ver detalle» y condicional «Marcar como resuelto» si status es Abierto; Resuelto no tendrá reabrir ni acción de resolver.
- Ubicar la capa de forma que escape al clipping del wrapper (p. ej. `position: fixed` con geometría viewport y límites seguros, siguiendo compatibilidad CSS utility permitida); comprobar extremos/resize/scroll, cerrar en navegación y cerrar/restaurar foco coherentemente.
- Cerrar por Escape, clic exterior, selección y cambio de sección; evitar que el evento de acción sea tratado como exterior antes de ejecutarse.

## 6. Modal y stack trace

- Un único diálogo accesible, con título conectado por `aria-labelledby`, botón cerrar, backdrop y panel interno con scroll máximo al viewport.
- `openErrorDetail(id)` lee el registro desde colección, rellena ID/timestamp/agente/tipo/estado/mensaje/stack. Detalle debe reflejar cambios de resolución realizados mientras esté abierto.
- Renderizar `message` y cada línea de `stackTrace` con `textContent` en un bloque `pre`/`code`, `font-mono`, `whitespace-pre`, overflow local x/y y superficie legible en ambos temas. No `innerHTML`.
- Foco inicial al botón cerrar o al diálogo; ciclo Tab/Shift+Tab con protección si el foco escapara; cerrar por botón, Escape, backdrop válido y navegación; click interior no cierra; restaurar al activador conectado o heading fallback.

## 7. Resolución local

- `resolveError(id)` verifica existencia y `status === "Abierto"`; si ya Resuelto, operación idempotente sin opción visible.
- Cambiar solo `error.status = "Resuelto"`, volver a renderizar el listado y actualizar campos/badge del modal si el mismo ID permanece abierto.
- Mantener fila visible y descripción/timestamp/registro intactos. No cambiar estado de Orbit Analyst (aunque esté `failing`) ni métricas.
- La recarga reconstruye colección canónica con estados iniciales. No persistir ni simular backend.

## 8. Integración y capas

- `showPage` debe cerrar dropdown y diálogo de error al salir de la vista, sin dejar listeners duplicados ni tocar los overlays de otras secciones.
- Escape cierra primero diálogo, y solo sin diálogo abierto el menú superior. No permitir que resolución cambie la selección de sección.
- Mantener los cinco destinos previos y los datos compartidos sin modificación. La eliminación de agente en su vista deja estos registros históricos intactos.

## 9. Diseño, accesibilidad y responsive

- Usar escala de superficie/bordes/tipografía coherente con las cinco vistas y pares `dark:` completos.
- Sin colores personalizados ni CSS inline. Estados comunicados también por texto; focus-visible evidente.
- Tabla scrolleable dentro de una región nombrada y con teclado; menú y botones accesibles.
- Modal con landmarks/roles/nombre, foco contenido/restaurado, Escape/backdrop y zona de traza legible.
- Inspeccionar 1440/1024/768/375 px, claro/oscuro, reduzca movimiento y confirma no overflow global, acciones alcanzables, dropdown visible, panel/stack con scroll propio.

## 10. Estrategia de pruebas

### Modelo y lógica

- Verificar IDs/cantidad/orden y comparación exacta de los seis campos normativos con `SPECS.md` §8.
- Verificar estados iniciales (cinco Abierto, E-005 Resuelto) y fixture de mensaje/traza por registro (mínimo tres líneas).
- Resolver registro abierto: status y menú/listado/modal cambian; resolver de nuevo no altera; E-005 nunca presenta resolver; recargar restituye valores iniciales.
- Simular ausencia/eliminación de agente en colección compartida: registros y snapshots no cambian ni producen excepción; luego restaurar fixtures de prueba.
- Comprobar que no hay escritura de estado a storage, llamada `fetch` ni cambios a agentes/KPIs.

### Interacción y accesibilidad

- Probar menú único, acción y cierre exterior/Escape/selección/navegación, foco y ubicación sin clipping.
- Probar selección de cada fila, título/detalle correcto, inserción de textos de trace como texto, botón/Escape/backdrop y click interior, atrapado y retorno de foco.
- Probar navegación Dashboard/Usuarios/Agentes/Skills/Contrataciones/Errores y ausencia de regresiones.

### Inspección visual

- Ejecutar servidor local y revisar tamaños 1440, 1024, 768 y 375 px, ambos temas, movimiento reducido y scroll de lista, dropdown, modal y traza. Registrar solo evidencia realmente ejecutada en tasks.md.

## 11. Límites, riesgos y decisiones antes de código

- La fuente canónica no contiene mensajes extendidos ni trazas literales. Fixtures de demo se redactan en el límite de modelo mock, sin afirmar fidelidad telemétrica; si producto necesita literal definitivo, se solicita aprobación antes de editar la colección.
- La fuente no define IDs para agentes en errores. Evitar asociaciones por similitud del nombre. El modelo puede conservar nombre snapshot y usar referencia solo si otra fuente la establece sin ambigüedad.
- E-005 pertenece a historial (`Verde Workflow`) y no debe desaparecer porque el agente no esté activo; su estado inicial resuelto limita su menú.
- El dropdown de logs puede necesitar geometría viewport para eludir `overflow-x-auto`; implementar sin CSS custom ni romper controles existentes.

## 12. Trazabilidad a tareas

| Bloque | Requisitos | Tareas previstas |
|---|---|---|
| Modelo y snapshot | FR-003, FR-005, FR-015–017 | T001–T004, T024–T026 |
| Vista, semántica, badges | FR-001–006, FR-018 | T005–T009, T027 |
| Menús | FR-007–009 | T010–T013 |
| Modal y traza | FR-010–013 | T014–T019 |
| Resolver | FR-014–016 | T020–T023 |
| Responsive, accesibilidad, regresión | FR-001–018 | T027–T033 |
