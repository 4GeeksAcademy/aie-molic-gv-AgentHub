# PLAN-002 — Plan técnico: Gestión de usuarios

- **Derivado de:** [`spec.md`](spec.md), FR-001–FR-015, VIS-001–VIS-009 y AC-001–AC-016.
- **Estado:** propuesta para aprobación. Describe implementación futura; no autoriza modificar código en esta fase.
- **Precedencia:** `SPECS.md` > requisitos 4Geeks > `DESIGN.md` > Stitch.

## 1. Resultado y límites

Agregar funcionalidad únicamente al destino Usuarios del shell estático SPA ya existente. El resultado futuro lista los cinco usuarios canónicos y permite ver detalle o eliminar con confirmación en memoria. El resto de secciones, shell, KPIs y navegación mantienen su comportamiento.

No se cambian requisitos/datos base del Dashboard, no se añade servidor, red, framework, dependencias, build, estilos propios, búsqueda, filtros, ordenación, paginación ni funcionalidades visuales Stitch no solicitadas. La eliminación de usuario no borra agentes, contratos ni otras entidades: efectos cruzados no forman parte de este corte.

## 2. Arquitectura y archivos previstos

### 2.1 Integración con shell

- Reutilizar la sección `#usuarios` y `data-page="usuarios"` que ya contiene el shell; conservar IDs del resto de secciones, navegación SPA y topbar.
- Expandir el placeholder existente en la misma región con heading, descripción, tabla y contenedores/plantillas necesarios de menú y diálogo.
- Usar `showPage`/navegación y el tema raíz existente (`dark`); al salir de Usuarios cerrar cualquier menú/modal y restaurar foco de forma lógica.
- Mantener Tailwind 3.4.17 CDN ya presente, clases base y pares `dark:`. No copiar export Stitch ni incluir otros scripts o assets.

### 2.2 Datos y estado

- Declarar colección local de usuarios en `app.js` como fuente única de la vista, con `id` estable, `name`, `email`, `company`, `plan`, `status`, `signupDate`. Copiar exactamente U-001–U-005 de `spec.md`.
- Reutilizar `mockData.agentsCollection` existente. Derivar agentes por comparación `agent.ownerId === user.id`; no guardar arreglos duplicados en cada usuario. Si ninguno coincide, mostrar el mensaje vacío definido.
- Estado eliminable en memoria separado de `localStorage`; no persistir usuarios ni tocar `agenthub-theme`. Recarga inicializa nuevamente cinco usuarios.
- Para eliminar, filtrar colección por ID estable y volver a renderizar el `tbody` desde el estado restante; no eliminar HTML aislado dejando la fuente de verdad desincronizada.

### 2.3 Renderizado de tabla

- Una función pura de renderizado/renderizado incremental crea filas con `createElement` y asigna texto mediante `textContent`; no interpolar valores dinámicos en HTML.
- Mantener orden original relativo para los registros restantes. Generar celdas semánticas, avatar-iniciales opcional solo decorativo, nombre/ID, email, plan, badge textual y botón acciones.
- Tabla `caption`, `thead`, `tbody`, `th scope="col"`; wrapper con `min-w-0`/`overflow-x-auto` y una anchura mínima suficiente que retenga acciones en scroll.
- Implementar estado vacío cuando la colección queda vacía. Sin filtros ni contadores extra.

## 3. Componentes e interacciones futuras

### 3.1 Dropdown reutilizable por fila

- Cada botón se asocia a `user.id` y controla menú con ID único. Indicar `aria-haspopup="menu"`, `aria-expanded`, `aria-controls`; botón con nombre “Acciones para [nombre]”.
- Mantener un `openMenuId` como estado: abrir otro primero cierra el previo. Escuchar Escape, clic fuera y navegación con lógica de exclusión del botón/menú actual.
- Menú posicionado cerca del botón; evitar clipping por wrapper de tabla usando capa/portal sencillo dentro del contenedor de vista y coordenadas/posición compatible, o wrapper que preserve `overflow-x-auto` solo en tabla y renderice menú en una capa exterior. No añadir librería.
- Si se usa `role="menu"`, implementar patrón completo de teclado; alternativa preferida para simplicidad: contenedor de acciones con botones normales y navegación Tab, conservando `aria-haspopup="menu"`/relación conforme al contrato sin fingir soporte incompleto. Seleccionar acción captura referencia de activador y evita que listener externo cancele la acción.

### 3.2 Modal detalle

- Una estructura de diálogo reutilizable se rellena según usuario actual; no crear un diálogo duplicado por fila.
- Abrir desde ID, derivar agentes por ownerId y construir etiquetas/datos de forma segura. La descripción modal ofrece empresa/plan/estado/fecha y asociaciones.
- Usar `role="dialog"`, `aria-modal="true"`, `aria-labelledby`; guardar `lastActiveElement`, mover foco al título enfocable o cierre, contener Tab/Shift+Tab.
- Botón, Escape y backdrop cierran. Detectar click de backdrop mediante `event.target === backdrop` y evitar cerrar cuando la interacción comenzó dentro y terminó fuera (seguimiento de pointerdown/up si la estructura lo requiere). Click panel no cierra.
- Restaurar foco al activador conectado; fallback al encabezado/lista si el usuario/activador ya no existe.

### 3.3 Confirmación y borrado

- Reutilizar una arquitectura de diálogo común con modos `detail` y `confirm-delete`, o una única capa con contenido intercambiable; no apilar modales. Mantener separado `pendingDeleteUserId`.
- La confirmación muestra nombre/email o ID y consecuencias locales, con botones Cancelar y Confirmar eliminación. Por defecto el foco inicial debe ser la opción segura Cancelar o título según revisión de accesibilidad.
- Cancelar/cierre limpia el ID pendiente sin mutar la colección. Confirmar verifica existencia del ID, muta solo colección users, cierra capas, vuelve a renderizar y anuncia resultado si hay feedback.
- No cascada a `agentsCollection`, contratos u otras colecciones. Los detalles se basan en relaciones existentes; después de eliminar no se muestran referencias cruzadas desde la vista Usuarios porque esa persona ya no se lista.

## 4. Presentación, responsive y accesibilidad

- Reusar el patrón visual del Dashboard: `bg-slate-50`/`dark:bg-slate-950`, superficies blancas/slate-900, bordes slate, textos y focus-visible en índigo. Badges semánticos emerald y amber con texto; planes con chips neutrales/acentos discretos.
- Usar utilidades Tailwind CDN existentes, radios moderados, filas compactas pero cómodas, hover sutil, sombras sobrias en menú/dialog. No importar Geist/JetBrains Mono ni Material Symbols Stitch.
- En desktop, tabla completa dentro de main de ancho limitado; en tablet/móvil, wrapper con scroll horizontal, encabezados y acciones no ocultos. No usar scroll de body para tabla ni truncar email sin una forma accesible de inspección.
- `aria-live="polite"` solo para resultado/empty state necesario; evitar anunciar toda la tabla en cada actualización. Todos los botones tienen tipo explícito y nombre; icono kebab es decorativo.
- Modal con focus trap, Escape, backdrop, botón cierre, foco retornado; menú y confirmación también operables por teclado. Considerar foco tras borrar en fila siguiente/anterior.
- Reducir transiciones con `motion-reduce:transition-none`; no hacer depender contenido de animación.

## 5. Secuencia de implementación

1. Crear y validar modelo local users con cinco registros exactos e IDs estables; confirmar no se modifica colección de agentes/KPI.
2. Construir cabecera y tabla semántica renderizada desde colección, incluyendo estado vacío estructural.
3. Aplicar visualización de plan/estado, badges, temas y disposición de tabla.
4. Añadir dropdown único por fila, cierre y manejo accesible.
5. Añadir modal de detalle dinámico, asociaciones derivadas y gestión de foco.
6. Añadir diálogo de confirmación con cancelación sin efecto.
7. Implementar eliminación local por ID, re-render, feedback/empty state y restauración de foco.
8. Refinar responsive, teclado, lector de pantalla, modo oscuro y movimiento reducido.
9. Ejecutar validación funcional/visual/estática conforme a `spec.md`.

## 6. Validación prevista

La validación se ejecutará tras aprobación e implementación; no se ejecuta en esta fase documental.

- **Datos/render (AC-001–005):** verificar cinco IDs/valores canónicos en orden, columnas/caption/scope, badge y acción correcta por fila, sin contenido no aprobado.
- **Asociaciones/detalle (AC-007–008):** abrir detalle en cada fila; comparar campos con canonical data; comprobar ownerId y empty state U-005; probar botón/Escape/backdrop/click interior, foco entrante/trap/retorno.
- **Menús (AC-005–006, AC-015):** teclado/puntero; solo uno abierto; click fuera/Escape/selección/navegación; Expanded y retorno del foco; no clipping ni acción cancelada por listener global.
- **Confirmación/estado (AC-009–012):** abrir sin mutación, Cancelar, cerrar, confirmar varios IDs, mantener orden; verificar lista vacía y fallback de foco; recarga restaura cinco mocks; comprobar no cascade y no peticiones/red/persistencia de datos.
- **Responsive/tema (AC-013–014):** revisar 1440, 1024, 768, 375 en claro/oscuro; scroll local, columna de acciones accesible, sin overflow global, contraste, foco y `prefers-reduced-motion`.
- **Restricciones (AC-016):** inspección de HTML/JS para evitar framework, API, CSS/style inline, dependencias, búsqueda/filtros/paginación o cambios ajenos al alcance.
- **Manual:** probar con teclado y lector de pantalla disponible; interacción real del navegador para backdrop/foco y responsive; registrar límites si no se dispone de validación visual automatizada.

## 7. Riesgos y mitigaciones

| Riesgo | Mitigación |
|---|---|
| `mockData` está dentro de IIFE y el Dashboard depende de agentes | Añadir colección users en el mismo modelo sin renombrar ni alterar los registros/cálculos de agentes; validar KPIs antes/después. |
| Acciones dentro de tabla se recortan por overflow | Separar wrapper scrolleable de tabla y capa de menú, verificar posición en viewport; comprobar a cada ancho. |
| Re-render destruye el activador antes de devolver foco | Guardar ID/índice de fila antes de actualizar; enfocar siguiente/anterior botón o encabezado/lista con fallback. |
| Listeners globales cierran antes de que acción se ejecute | Excluir descendientes del menú, usar `closest`/delegación y ordenar eventos; probar selección explícita. |
| Usuario borrado afecta referencias de otros módulos | Alcance no incluye cascada; mutar solo users y dejar agentes/contratos intactos. No añadir referencias huérfanas visibles en esta vista. |
| Backdrop cierra accidentalmente al arrastrar desde diálogo | Cierre basado en pointerdown/up que comienza en backdrop y termina en backdrop, además de target checks. |
| Divergencia de fuente de usuario/datos | IDs estables y una sola colección en memoria; renderizar desde estado canónico y asociaciones por `ownerId`. |
| Modo oscuro incompleto en overlays | Aplicar pares Tailwind `dark:` explícitos a cada superficie y validar todos los estados, no solo página. |

## 8. Dependencias y supuestos

- La implementación queda bloqueada hasta aprobación explícita de SPEC/PLAN/TASKS.
- `index.html` y `app.js` actuales continúan siendo el shell/entrypoint; la sección Usuarios ya existe como placeholder y la navegación usa IDs estables.
- `agentsCollection` ya contiene `ownerId` canónicos U-001–U-004 y no se modifica en esta fase.
- La fecha del modelo se mantiene ISO (`YYYY-MM-DD`) y se representa fielmente; formatos presentacionales adicionales requieren decisión, no afectan el valor guardado.
- Tailwind se carga por el CDN ya existente y necesita red para estilos. No se agregan paquetes.
- La lista inicial tiene cinco registros; el estado vacío solo se alcanza tras confirmar la eliminación de todos durante la sesión.

## 9. Trazabilidad

| Decisión/área de plan | Requisitos | Criterios |
|---|---|---|
| Integración shell y heading | FR-001–002; VIS-001–002 | AC-001 |
| Modelo/canonical data/render tabla | FR-003, FR-015; VIS-003–004 | AC-002–004 |
| Badges/tema/estilo | FR-004, FR-014; VIS-003, VIS-005, VIS-009 | AC-004, AC-014 |
| Dropdown | FR-005, FR-011–012; VIS-006 | AC-005–006, AC-015 |
| Modal detalle/relaciones/foco | FR-006–007, FR-012; VIS-007 | AC-007–008, AC-015 |
| Confirmación/borrado local | FR-008–010; VIS-007 | AC-009–012 |
| Responsive tabla | FR-013, FR-015; VIS-008 | AC-013 |
| Restricciones/scope | §9 de spec | AC-016 |
