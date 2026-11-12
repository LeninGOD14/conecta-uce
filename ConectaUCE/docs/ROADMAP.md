# Roadmap inicial

## Sprint 0 — Fundaciones
- [x] Monorepo y carpetas por aplicación.
- [x] Backend Spring Boot con endpoint de salud.
- [x] PostgreSQL local y primera migración Flyway.
- [x] Cliente web y cliente móvil mínimos.
- [x] Contenedor base de escritorio con Tauri.
- [ ] Crear repositorio remoto y ramas `main` / `develop`.
- [ ] Instalar dependencias y validar builds en cada equipo.

## Sprint 1 — Diseño de producto y contratos
- [ ] Wireframes responsive de muro y foros.
- [ ] Definir roles, estados de cuenta y reglas de moderación.
- [ ] Cerrar contratos OpenAPI para auth, perfil, muro y foros.
- [ ] Agregar manejo uniforme de errores y paginación.

## Sprint 2 — Identidad
- [ ] Registro con correo institucional.
- [ ] Verificación por código o enlace enviado al correo.
- [ ] Login, logout, recuperación y expiración de sesiones.
- [ ] Roles STUDENT, MODERATOR y ADMIN con autorización en backend.
- [ ] Perfil básico del estudiante.

## Sprint 3 — Muro (primer módulo de prototipo)
- [ ] Crear publicaciones de texto.
- [ ] Listar muro paginado.
- [ ] Comentar publicaciones.
- [ ] Reaccionar y retirar reacción.
- [ ] Validar permisos y pruebas.

## Sprint 4 — Foros (segundo módulo de prototipo)
- [ ] Categorías y filtros.
- [ ] Crear/listar preguntas.
- [ ] Responder preguntas.
- [ ] Marcar respuesta útil/aceptada.
- [ ] Búsqueda y paginación.

## Sprint 5 — Moderación y piloto
- [ ] Reportar contenido.
- [ ] Cola de moderación y acciones auditables.
- [ ] Política de privacidad, retención y eliminación de cuenta.
- [ ] Pruebas con usuarios y correcciones de accesibilidad.

## Sprint 6 — Clasificados y publicación
- [ ] Publicar y buscar artículos.
- [ ] Contacto directo comprador-vendedor.
- [ ] Adaptar fotos, notificaciones y deep links.
- [ ] Builds Android/iOS/Desktop y despliegue web.
