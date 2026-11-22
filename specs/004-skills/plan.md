# PLAN-004 — Plan técnico: Catálogo y gestión de skills

- **Derivado de:** [`spec.md`](spec.md), FR-001–FR-017, VIS-001–VIS-008 y AC-001–AC-017.
- **Estado:** propuesta documental; implementación bloqueada hasta aprobación explícita. Este documento no autoriza cambios de código.
- **Precedencia:** `SPECS.md` > requisitos 4Geeks > `DESIGN.md` > Stitch.

## 1. Resultado y límites

Agregar funcionalidad únicamente a Habilidades dentro de la SPA y enlazar la modificación del modelo compartido con la presentación actual de Agentes. Las cuatro skills iniciales se consumen de `mockData.skillsCollection`; contadores y agentes asociados se derivan de `mockData.agentsCollection.skillIds`. La eliminación se limita a memoria y debe sincronizar inmediatamente la vista Agentes.

No cambiar shell, navegación ni tema ya implementados; no editar Dashboard/Usuarios/Agentes fuera de la integración de relaciones solicitada; no tocar contratos como snapshots; no añadir endpoints, persistencia de negocio, framework, dependencias, build, CSS personalizado o contenido de Stitch no contratado.

## 2. Arquitectura e integración

### 2.1 Integración shell y archivos previstos

- Expandir la sección `#habilidades` / `data-page="habilidades"` existente en `index.html`; usar su heading/contexto “Habilidades” y conservar sidebar, topbar, selector de tema y navegación SPA.
- `app.js` (IIFE) conserva modelo compartido `mockData`; extender los objetos ya existentes de `skillsCollection` con `category` y `description` canónicos de SPEC, sin crear otro catálogo ni duplicar relaciones.
- Reutilizar `agentsCollection` y sus `skillIds`; no renombrar IDs, agentes, estados, dueños ni relaciones iniciales.
- Renderizado/render helpers de Skills y Agentes deben consultar las colecciones vigentes. Evitar render de agentes desde snapshots independientes o cachés que sobrevivan a la mutación.
- Archivos funcionales previstos exclusivamente: `index.html`, `app.js`; evidencia/estado de tareas exclusivamente `specs/004-skills/tasks.md`. Los documentos fuente existentes no se modifican.

### 2.2 Modelo y funciones derivadas

Extensión conceptual del registro existente:

```text
skill = { id, name, category, description }
agent = { ..., skillIds: [...] }
```

`category` y `description` vienen de la tabla canónica de `spec.md` §2. No almacenar `agentCount` ni `agents` en skill. Una función helper, p. ej. `getAgentsForSkill(skillId)`, filtra agentes actuales donde `agent.skillIds.includes(skillId)`; `count` y listado detalle usan ese resultado. Recalcular al renderizar (cuatro skills solamente) o al cambiar colecciones. La vista Agentes resuelve cada ID contra la colección skills actual y omite relaciones retiradas; las habilidades activas se muestran con nombre actual.

Inicialmente los cuatro resultados son dos agentes por skill, acordes con S-001/2 → A-001/A-003 y S-003/4 → A-002/A-004. Esos números son resultados del modelo, no constantes.

### 2.3 Mutación local y consistencia

Al confirmar, localizar skill por ID; si existe, quitarla de `skillsCollection` y filtrar ese ID de `skillIds` de cada agente afectado. Conservar referencias y orden de otras skills y todos los demás campos. Re-renderizar Skills; al entrar/actualizar Agentes, regenerar chips/acordeones de skills desde las fuentes vigentes, evitando etiquetas huérfanas. La operación no borra agente, usuario, error o contrato ni reescribe precios/snapshots. El estado no se serializa; reload reconstruye mocks.

## 3. Estrategia de interfaz y eventos

### 3.1 Catálogo e información

- Renderizar colección en orden canónico actual, con identidad, categoría, descripción, recuento textual derivado y botón kebab.
- Añadir bloque «¿Qué es una skill?» con explicación derivada de SPEC: capacidad modular que un agente usa; ejemplos de búsqueda/investigación y análisis; una skill puede servir a varios agentes.
- Crear nodos dinámicos con `createElement`, `textContent` y atributos; no concatenar HTML con datos de modelo.
- Empty state cuando colección queda vacía; mantener robusto el caso skill existente con cero agentes.
- No renderizar “4 activas” como estado duradero ni emplear «activa» como estado operativo: la cantidad inicial puede cambiar y el modelo no declara estado de skill.

### 3.2 Dropdown

- Estado único `openSkillMenuId` (o referencia equivalente), activador con `aria-label="Acciones para [nombre]"`, `aria-expanded`, `aria-controls`; menú contiene exactamente dos botones ordinarios: Ver detalle / Eliminar.
- Preferir botones semánticos y Tab frente a `role=menu` salvo que se implemente íntegramente el patrón de teclado. Posicionar capa para que el contenedor no la recorte.
- Cerrar al abrir otro, click exterior (excluir botón/menu), Escape, acción o navegación. Guardar ID del objetivo y referencia de foco antes de cerrar y lanzar acción.

### 3.3 Modal detalle y confirmación

- Un diálogo reutilizable o dos capas mutuamente excluyentes; nunca overlays apilados. El contenido se resuelve por ID actual, no por markup hardcodeado.
- Detalle presenta categoría, descripción de SPEC literalmente, ID, agentes asociados nombre+ID y contador usando resultado común; cero relaciones comunica ambos estados.
- Confirmación identifica inequívocamente skill y explica solo el alcance local de sesión. Abrir no muta; cancelar limpia selección pendiente.
- `role=dialog`, `aria-modal=true`, `aria-labelledby`; confirmación puede ser alertdialog nombrado/descrito. Focus inicial apropiado, trap Tab/Shift+Tab, Escape, botón y backdrop. Cierre solo si gesto válido se inicia/termina en backdrop; click interno no cierra. Evitar propagación de Escape a overlays inferiores.
- Restaurar foco al activador conectado; si fue eliminado, enfocar siguiente tarjeta, anterior o heading/empty state. Dar anuncio breve vía región live separada si hay confirmación; no anunciar toda la lista.

## 4. Estilo, responsive y accesibilidad

- Usar utilidades ya disponibles de Tailwind 3.4.17 CDN, sans-serif del sistema y jerarquía existente; pares `dark:` en catálogo, badges, explanation, dropdowns, backdrop, diálogo y foco. Sin `<style>`, `style` ni CSS separado.
- Patrón visual de tarjetas/lista con bordes/superficies sobrios y acentos discretos; no importar tokens, configuración, fuentes, Material Symbols ni imágenes del HTML exportado.
- En vista estrecha las tarjetas fluyen a una columna; descripción puede envolver; controles conservan nombre y área táctil. Overlays usan ancho máximo y altura/scroll internos para caber a 375 px.
- Botones nativos, foco visible y orden lógico; roles/labels y estados ARIA sincronizados; textos (categoría, contador, nombre) no dependen de color. Reduced motion reduce transiciones no esenciales.
- Responsive y estados deben probarse en 1440, 1024, 768 y 375 px y claro/oscuro; no overflow horizontal de página ni clipping de menú.

## 5. Secuencia de implementación futura

1. Completar metadata canónica en la fuente compartida y helpers de asociaciones.
2. Integrar sección y render catálogo seguro desde `skillsCollection`.
3. Añadir bloque informativo contractual.
4. Derivar contadores por relación desde `agentsCollection`.
5. Añadir dropdowns únicos y sus cierres/foco.
6. Construir detalle dinámico con asociaciones y accesibilidad.
7. Añadir confirmación, mutación y borrado local.
8. Sincronizar relaciones y render de Agentes; validar no cascada a snapshots.
9. Completar responsive, tema y accesibilidad.
10. Ejecutar validaciones funcionales, estáticas y visuales; anotar solo evidencia real.

Orden y dependencia detallados están en [`tasks.md`](tasks.md).

## 6. Validación prevista

Posterior a aprobación e implementación, no ejecutada en esta fase:

- **Modelo/contenido (AC-002–005):** inspeccionar cuatro registros y metadata canónica; desde modelo derivar asociaciones/contadores iniciales; alterar una relación en prueba y comprobar recálculo y cero.
- **Menú/detalle (AC-006–008, 16):** probar cada skill, dos opciones exactas, simultaneidad única, Escape/clic exterior/selección/navegación, identificación del target, datos dinámicos, relaciones, foco/backdrop/teclado.
- **Cancelación/borrado/sync (AC-009–014):** verificar antes/después de cancelar; confirmar cada skill en datos controlados; comparar campos de agentes y otras relaciones; revisar catálogo, contador y acordeones de Agentes; comparar colecciones contractuales/errores/usuarios antes/después; recargar y verificar mocks iniciales.
- **Responsive/temas/a11y (AC-001, 14–16):** 1440/1024/768/375 claro/oscuro; foco, contraste, overflow, estado vacío, reduced motion y lector/teclado cuando esté disponible.
- **Restricciones (AC-017):** búsqueda de API/framework/build/dependencias/estilos inline/external assets Stitch y features excluidas; ejecutar `node --check app.js`, diagnóstico del editor y pruebas funcionales disponibles.
- Marcar tarea `[x]` solo tras evidencia verificable; no inferir validación visual a partir de clases/DOM simulado.

## 7. Riesgos y mitigación

| Riesgo | Mitigación |
|---|---|
| Contador o agentes asociados hardcodeados divergen de modelo | Helper común que filtra `agentsCollection.skillIds`; probar modificación de relación y cero. |
| Agentes conserva chips cacheados de skill eliminada | Resolver IDs contra `skillsCollection` vigente cada render/entrada a vista; comprobar inmediatamente tras acción. |
| Borrado produce cascada comercial accidental | Mutar únicamente catálogo y relaciones `skillIds`; snapshot explícito de contratos/errores/usuarios antes/después. |
| Handler de click exterior cancela selección | Excluir menú/activador; capturar target antes de cerrar; pruebas de cada acción. |
| Backdrop/Escape cierra panel equivocado o pierde foco | Controlar capa superior activa, gesto backdrop y retorno/fallback de foco con teclado. |
| Metadatos de Stitch inducen a inventar contenido | Tabla canónica de SPEC prevalece; usar solo descripción corta contractual; no extender prosa ni copiar los datos de cluster/runtime. |
| Cambio de orden/estructura por render parcial | Re-render desde colección compartida en orden restante; pruebas tras varias eliminaciones y recarga. |
| Tema oscuro incompleto en overlays | Pares `dark:` explícitos y matriz manual para cada estado. |

## 8. Supuestos y dependencias

- La sección shell ya existe y su routing/toggle global se mantienen.
- La colección compartida de agentes ya contiene cuatro agentes y `skillIds` canónicos; la colección skills ya existe con `id`/`name`; la implementación agregará solo metadata canónica.
- Conteo inicial 2 por cada skill es una expectativa comprobable de datos canónicos, no una constante de producción.
- Los contratos son snapshots independientes y no se alteran por borrado de catálogo.
- Tailwind CDN necesita conectividad de presentación; no se introduce alternativa de build.
- La descripción completa disponible es exactamente la descripción de §8 de `SPECS.md`; extensiones requerirían cambio aprobado de contrato.

## 9. Trazabilidad

| Área/decisión | SPEC | Criterios |
|---|---|---|
| Integración shell/encabezado | FR-001–002, VIS-001 | AC-001 |
| Fuente, canonical data, catálogo e información | FR-003, FR-005, FR-017; VIS-002–004 | AC-002–005, AC-017 |
| Contadores/asociados derivados | FR-004, FR-008, FR-012 | AC-003–004, AC-007, AC-011 |
| Dropdown y acciones | FR-006–007, FR-015; VIS-006 | AC-006, AC-016 |
| Detalle y foco | FR-008–009, FR-015; VIS-005–006 | AC-007–008, AC-016 |
| Confirmación, eliminación y alcance | FR-010–014 | AC-009–014 |
| Sync Agentes y no cascada | FR-011–013 | AC-010–013 |
| Responsive, temas y a11y | FR-015–017; VIS-007–008 | AC-014–017 |
