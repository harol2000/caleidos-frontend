# Caleidos · Gestión contractual

Prototipo frontend en español para presentar el flujo contractual de Caleidos. Está construido con **HTML, CSS y JavaScript puro**, sin frameworks, paquetes, compilación ni backend. JavaScript permite que los botones, formularios, filtros y estados funcionen en una página estática.

## Abrir el prototipo

Abre `index.html` en un navegador moderno. No necesitas instalar nada. También puedes usar la extensión Live Server de VS Code para servir esta carpeta. Para conservar los PDF de forma más consistente, utiliza Live Server o GitHub Pages.

Elige un perfil en el formulario de acceso. Todos utilizan la contraseña **`demo1234`**.

| Perfil | Correo de prueba | Responsabilidad |
| --- | --- | --- |
| Comercial · Valeria | `comercial@caleidos.pe` | Registrar solicitudes, subsanar, validar su fase y simular envío/firma |
| Legal · Diego | `legal@caleidos.pe` | Revisar cláusulas y aprobar la primera fase |
| Finanzas · Alejandro | `finanzas@caleidos.pe` | Validar montos y condiciones financieras |
| Gerencia · Laura | `gerencia@caleidos.pe` | Dar la aprobación final |
| Administración · Andrea | `admin@caleidos.pe` | Supervisar, registrar solicitudes y gestionar usuarios demo |

Una vez dentro, el selector **Vista demo**, al pie del menú, permite cambiar de perfil para presentar el proceso completo.

## Qué puedes demostrar

- **Panel general:** métricas calculadas con los datos actuales, contratos por etapa, actividad reciente y pendientes de tu rol.
- **Contratos:** búsqueda por cliente, código o servicio; filtros por estado, área y servicio; paginación; exportación CSV.
- **Nueva solicitud:** cliente, correo, servicio, monto, moneda, vigencia, alcance y PDF obligatorio. Se validan las fechas, el monto, la extensión, la cabecera del PDF y el límite de 10 MB.
- **Revisión:** Legal → Comercial → Administración y Finanzas → Gerencia. Solo el rol de la fase activa puede aprobar o solicitar correcciones. Administración no aprueba en nombre de otra área.
- **Observaciones:** categoría, comentario, autor, fecha, versión y estado de atención. Comercial las atiende al subir la versión corregida.
- **Versiones:** cada PDF se conserva por separado. La comparación resalta líneas añadidas y retiradas del texto de cláusulas registrado manualmente.
- **Enrutamiento:** Comercial selecciona las áreas afectadas. La revisión vuelve a la primera área afectada o a una fase anterior todavía pendiente. Se conservan las aprobaciones previas; la fase de retorno y las posteriores deben validar otra vez.
- **Aprobación:** el contrato solo pasa a Aprobado cuando las cuatro áreas han validado en secuencia.
- **Envío y firma:** simulaciones locales para recorrer el ciclo hasta Firmado. No se envían correos ni se firma o modifica realmente el PDF.
- **Trazabilidad:** cronología con usuario, rol, fecha y hora de Lima, documento y movimiento. Incluye búsqueda, filtro por área y exportación CSV.
- **Usuarios y roles:** Administración puede crear y activar/desactivar perfiles demo. Debe permanecer al menos un usuario activo por rol.

Incluye 12 contratos ficticios con estados variados y PDF de ejemplo generados en el navegador.

## Recorrido sugerido para una presentación

1. Entra como **Comercial** y abre el panel general.
2. Registra una solicitud con un PDF y, opcionalmente, pega sus cláusulas clave.
3. Cambia a **Legal**, entra a **Mis revisiones** y solicita una corrección.
4. Vuelve a **Comercial**, sube el PDF corregido y actualiza el texto de las cláusulas.
5. Revisa la comparación y la trazabilidad del contrato.
6. Aprueba en orden con **Legal**, **Comercial**, **Finanzas** y **Gerencia**.
7. Vuelve a **Comercial**, simula el envío al cliente y registra la firma demo.
8. Para probar una observación del cliente, hazlo antes de registrar la firma. Selecciona el área afectada y repite solo las validaciones necesarias.

## Publicar en GitHub Pages

1. Crea un repositorio en GitHub y sube el contenido de esta carpeta. `index.html` debe estar en la raíz del repositorio.
2. Abre **Settings → Pages**.
3. En **Build and deployment → Source**, elige **Deploy from a branch**.
4. Selecciona tu rama, normalmente **main**, y la carpeta **/(root)**. Guarda los cambios.
5. Cuando termine el despliegue, abre el enlace que muestra GitHub Pages.

Los archivos usan rutas relativas y la navegación usa `#`, por lo que funcionan bajo `https://TU-USUARIO.github.io/TU-REPOSITORIO/` sin configurar redirecciones. `.nojekyll` permite servir el proyecto como archivos estáticos.

Referencia: [configurar la publicación desde una rama en GitHub Pages](https://docs.github.com/es/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Archivos

```text
index.html              Entrada y estructura del documento
styles.css              Diseño, componentes y adaptación a móvil
app.js                  Datos demo, pantallas e interacciones locales
assets/favicon.svg      Identidad gráfica del prototipo
.nojekyll               Configuración para servir archivos estáticos
tests/workflow.test.cjs  Pruebas del flujo con Node.js (opcional)
```

No necesitas Node.js para usar o publicar el sitio. Si tienes Node.js, puedes ejecutar las pruebas del flujo con:

```sh
node --test tests/workflow.test.cjs
```

## Alcance del prototipo

Los contratos y perfiles se guardan en `localStorage`; la sesión demo, en `sessionStorage`; los PDF, en `IndexedDB`. Si el navegador impide el almacenamiento, la aplicación usa memoria durante la sesión y lo comunica. Los datos no se comparten entre navegadores, computadoras o visitantes. Borrar los datos del navegador elimina la información local.

La opción **Conoce tu espacio → Restablecer los datos de prueba** recupera los ejemplos y borra los archivos locales de esta demostración.

La autenticación y los permisos se simulan en el frontend. La selección de áreas afectadas es manual. No hay análisis semántico de PDF, autenticación segura, notificaciones externas, firma electrónica, API o base de datos compartida. La aplicación sirve para una demostración funcional; un sistema de producción requeriría esas integraciones.

Los nombres completos, empresas, documentos, importes y correos de los ejemplos son datos de demostración. El archivo Java adjunto a la solicitud no se incorpora: este proyecto implementa únicamente el prototipo contractual solicitado.
