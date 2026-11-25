# AgentHub

Prototipo estático de una interfaz administrativa para explorar información de usuarios, agentes de IA, habilidades, contrataciones y registros de errores. Está pensado como demostración frontend y como entrega guiada por especificaciones; no es un servicio de producción.

## Objetivo

Presentar seis vistas relacionadas a partir de datos ficticios locales y permitir probar interacciones administrativas en el navegador. Los cambios operativos de la demostración viven solo en memoria durante la sesión.

## Secciones

1. **Panel:** cuatro KPI y una representación ilustrativa de actividad semanal.
2. **Usuarios:** tabla, detalle y confirmación de eliminación local.
3. **Agentes:** propietarios, estado, habilidades relacionadas, acordeón de skills, edición local del system prompt y eliminación confirmada.
4. **Habilidades:** catálogo, contadores derivados, explicación, detalle y eliminación local con actualización de relaciones actuales de agentes.
5. **Contrataciones:** contratos y detalle con precios y nombres de habilidades conservados como snapshots históricos.
6. **Registro de errores:** errores ficticios, severidad/estado, detalle con traza y acción para marcar como resuelto.

La navegación y el control de tema claro/oscuro pertenecen al shell compartido.

## Stack implementado

- HTML5 semántico (`index.html`).
- Tailwind CSS **3.4.17** cargado desde CDN, configurado para tema por clase.
- JavaScript vanilla (`app.js`), sin framework ni etapa de compilación.
- Datos mock hardcodeados en una fuente local compartida dentro de `app.js`.

No se implementan backend, APIs, autenticación, base de datos, persistencia de datos operativos, framework frontend ni librería de gráficos. El acceso al CDN requiere conexión de red para cargar Tailwind.

## Ejecución

No hay instalación, build ni empaquetado requerido. Abre la carpeta en VS Code y sirve `index.html` mediante la extensión **Live Server**. También se puede servir la raíz del repositorio con cualquier servidor HTTP estático; por ejemplo, desde la raíz:

```bash
python3 -m http.server 8000
```

Después abre `http://localhost:8000`. La carga de Tailwind desde CDN necesita acceso de red. Abrir el archivo directamente puede servir para una comprobación básica, pero se recomienda un servidor estático para la navegación y las pruebas locales.

## Datos e interacciones

Los registros canónicos de demostración se definen en `mockData` de `app.js` y se relacionan por IDs; contratos y errores conservan los snapshots históricos previstos. Los datos operativos no se escriben en almacenamiento persistente: recargar la página restaura el estado inicial. El tema puede recordar la preferencia del usuario en almacenamiento local del navegador; eso no supone persistencia de usuarios, agentes, habilidades, contratos ni errores.

La interfaz implementa navegación entre vistas, cambio de tema, menús de acciones, diálogos de detalle/confirmación, acordeones de habilidades, actualización local de asociaciones al eliminar una skill y resolución local de errores. Estas interacciones deben entenderse como funcionalidades de prototipo, no como operaciones reales ni sincronizadas con un servicio.

## Organización del repositorio

- `index.html`: shell, navegación, estructura semántica y vistas.
- `app.js`: datos mock, renderizado y lógica de interacciones.
- `SPECS.md`: contrato general y requisitos funcionales/visuales.
- `SPECS.es.md`: traducción de consulta de la especificación.
- `design/DESIGN.md`: sistema y referencias de diseño.
- `design/stitch/` y `STITCH_PROMPT.md`: material de referencia visual.
- `specs/001-dashboard/` … `specs/006-error-logs/`: especificación, plan y tareas por sección.
- `README.md`: guía de este prototipo.

## Flujo SDD

El trabajo se organiza por sección mediante **spec → plan → tasks → implementación → validación**. Las especificaciones definen el alcance; los planes descomponen decisiones y tareas; los archivos `tasks.md` registran progreso y evidencia, distinguiendo inspección estática, simulación y comprobaciones manuales. Una tarea pendiente de validación no debe considerarse aceptada solo porque su implementación exista.

## Referencias de producto y diseño

- [Contrato general](SPECS.md)
- [Traducción de consulta](SPECS.es.md)
- [Sistema de diseño](design/DESIGN.md)
- [Paquetes SDD](specs/)
