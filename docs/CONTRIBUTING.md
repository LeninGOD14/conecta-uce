# Guía de colaboración

## Flujo de ramas

1. Actualiza `develop`: `git checkout develop && git pull`.
2. Crea una rama: `git checkout -b feature/muro-listado`.
3. Trabaja en commits pequeños y descriptivos.
4. Prueba la aplicación y ejecuta los checks correspondientes.
5. Sube la rama y abre un Pull Request hacia `develop`.
6. Solicita al menos una revisión antes de integrar.

## Convención de commits

- `feat:` funcionalidad nueva.
- `fix:` corrección.
- `docs:` documentación.
- `test:` pruebas.
- `refactor:` reestructuración sin cambio funcional.
- `chore:` mantenimiento o herramientas.

Ejemplos: `feat: agregar listado paginado del muro`; `fix: validar correo institucional`; `docs: documentar arranque local`.

## Reglas

- No subir secretos, archivos `.env`, bases de datos locales ni archivos de IDE.
- No hacer push directo a `main`.
- No modificar una migración Flyway ya aplicada: crear la siguiente.
- Los controladores no contienen reglas de negocio; delegan en servicios.
- Los repositorios se encargan del acceso a datos.
- Validar entradas en backend; las validaciones del frontend no reemplazan la seguridad del servidor.
- Las respuestas de API no deben exponer hashes de contraseña, tokens o datos privados.
- Añadir pruebas para reglas de negocio y permisos.
