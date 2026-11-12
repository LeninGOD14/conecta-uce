# Arquitectura de ConectaUCE

## Principio

Un backend modular y una API REST centralizada. Los clientes web, móvil y escritorio no acceden directamente a PostgreSQL: toda operación pasa por el backend.

```text
React Web ───────────────┐
                        │
Expo Android / iOS ──────┼── HTTPS / JSON ──> Spring Boot API ──> PostgreSQL
                        │                         │
Tauri Desktop (Web) ────┘                         └── Email / almacenamiento de archivos
```

## Responsabilidades

### Backend

Paquetes organizados por dominio/funcionalidad (`usuario`, `publicacion`, `foro`, `clasificados`, `moderacion`). Cada módulo tendrá controller, service, repository, model y DTO cuando corresponda. Evitar microservicios mientras el equipo y el producto estén en etapa de prototipo.

### Clientes

- `apps/web`: React DOM; es el cliente de navegador y el frontend que Tauri carga en escritorio.
- `apps/mobile`: React Native + Expo para Android e iOS (interfaz móvil nativa; comparte contratos y API con web). Tiene navegación y componentes adaptados a móvil.
- `apps/desktop`: Tauri 2 empaqueta la web; no implementa lógica de negocio. El paquete usa un icono provisional que debe reemplazarse con la identidad visual final.
- `packages/contracts`: tipos TS compartidos para los cuerpos de API y modelos de lectura. No contiene secretos ni lógica del servidor.

## Contrato de API

- Prefijo: `/api/v1`.
- Formato: JSON UTF-8.
- Fechas: ISO-8601 en UTC.
- Identificadores: UUID.
- Paginación: `page`, `size`, `sort`.
- Errores: formato uniforme (`timestamp`, `status`, `code`, `message`, `path`, `fieldErrors`).
- Autenticación prevista: token de acceso de corta duración y refresh token seguro. Definir almacenamiento por cliente; no guardar tokens sensibles en `localStorage` ni en variables `EXPO_PUBLIC_*`.

## Modelo de datos inicial

La migración `V1__initial_schema.sql` define entidades para usuario, muro, comentarios, reacciones, categorías de foro, preguntas, respuestas y votos de utilidad. Las nuevas modificaciones van en migraciones Flyway nuevas.

## Consideraciones de multiplataforma

1. El servidor es la única fuente de verdad y aplica permisos independientemente del cliente.
2. No asumir que un correo `@uce.edu.ec` está verificado solo por su dominio: debe completarse un desafío por correo.
3. Web y Tauri comparten la aplicación React web; móvil usa UI nativa con Expo.
4. Adaptar subida de imágenes, permisos de cámara, notificaciones y enlaces profundos por plataforma.
5. Publicar una versión de escritorio y móviles solo cuando los flujos principales y políticas de privacidad estén probados.
