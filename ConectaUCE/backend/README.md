# Backend — ConectaUCE API

Java 21 / Spring Boot 4.1.2 / PostgreSQL 17.

## Ejecutar

1. Desde la raíz: `docker compose up -d postgres`.
2. Desde `backend/`: `mvn spring-boot:run`.
3. Probar `GET http://localhost:8080/api/v1/health`.

## Configuración

Las propiedades se leen desde variables de entorno. Consulta `.env.example` como referencia. No cargues `.env` en Git.

## Seguridad

La cadena de filtros permite únicamente los endpoints de salud sin autenticación. Las rutas restantes requieren autenticación. Aún falta implementar el flujo de registro, verificación por correo institucional, login y emisión/validación de tokens.

## Migraciones

Flyway administra el esquema en `src/main/resources/db/migration`. Nunca edites una migración que ya se haya ejecutado en un entorno compartido; crea otra migración con el siguiente número.
