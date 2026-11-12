# ConectaUCE

Red social universitaria para la comunidad de la Universidad Central del Ecuador.

> **Estado:** estructura inicial del proyecto. La autenticación institucional, el muro, los foros y el marketplace todavía deben implementarse. No usar en producción hasta completar seguridad, privacidad, moderación y pruebas.

## 1. Arquitectura elegida

ConectaUCE utiliza un **monolito modular** en el backend y aplicaciones cliente separadas:

- **Backend:** Java 21 + Spring Boot 4.1.2 + Spring MVC + Spring Data JPA + Spring Security.
- **Base de datos:** PostgreSQL 17, con Flyway para versionar el esquema.
- **Web:** React + TypeScript + Vite.
- **Móvil:** React Native + Expo (Android e iOS).
- **Escritorio:** Tauri 2, que empaqueta la aplicación web para Windows, macOS y Linux.
- **Código compartido:** `packages/contracts`, para tipos y contratos TypeScript usados por web y móvil.

Web, móvil y escritorio consumen la misma API REST. No se crean tres backends ni se duplica la lógica de negocio. La interfaz móvil se desarrolla con componentes React Native; la interfaz web y escritorio comparten React DOM.

## 2. Estructura del repositorio

```text
ConectaUCE/
├── apps/
│   ├── web/                 # React + Vite (web y base de escritorio)
│   ├── mobile/              # Expo (Android / iOS)
│   └── desktop/
│       └── src-tauri/       # Contenedor nativo Tauri 2
├── backend/                 # API REST Spring Boot
├── packages/
│   └── contracts/           # Tipos compartidos TypeScript
├── docs/                    # Arquitectura, roadmap y colaboración
├── assets/                  # Recursos de marca provisionales
├── .github/                 # Plantillas y CI
├── compose.yaml
└── package.json             # npm workspaces
```

## 3. Requisitos previos

- Git.
- JDK 21.
- Maven 3.9+.
- Node.js **22.13 o superior** y npm.
- PostgreSQL 17, o Docker Desktop para levantarlo con Compose.
- Android Studio para el emulador Android.
- Xcode para compilar iOS (requiere macOS).
- Rust y las dependencias de Tauri 2 para escritorio. En Windows se requiere WebView2; consulta la guía oficial de Tauri.

## 4. Primer arranque en desarrollo

### 4.1 Base de datos

Desde la raíz del repositorio:

```bash
docker compose up -d postgres
```

La configuración local crea la base `conectauce`, usuario `conectauce` y contraseña `conectauce_local_dev`. **Son credenciales exclusivamente locales.** No reutilizarlas en producción.

### 4.2 Backend

En otra terminal:

```bash
cd backend
mvn spring-boot:run
```

La API queda en `http://localhost:8080`.

- Estado básico: `GET http://localhost:8080/api/v1/health`
- Estado de aplicación y dependencias: `GET http://localhost:8080/actuator/health`

El esquema de PostgreSQL se crea y actualiza con las migraciones Flyway de `backend/src/main/resources/db/migration`.

### 4.3 Web

Desde la raíz:

```bash
npm install
npm run dev:web
```

Abrir `http://localhost:5173`. Vite reenvía `/api` al backend local `http://localhost:8080`.

### 4.4 Móvil

Desde la raíz instala dependencias y genera el development build para Android:

```bash
npm install
npm run android --workspace @conectauce/mobile
```

Necesitas Android Studio y un emulador o dispositivo configurado. Para iOS, usa macOS con Xcode y ejecuta `npm run ios --workspace @conectauce/mobile`. Después de crear el development build, puedes volver a iniciar Metro con `npm run dev:mobile`. Para que un teléfono físico alcance el backend, copia `apps/mobile/.env.example` a `apps/mobile/.env.local` y configura `EXPO_PUBLIC_API_URL` con la IP LAN de tu computadora, por ejemplo `http://192.168.1.20:8080`. No uses `localhost` desde el teléfono: apuntaría al propio teléfono.

Para el emulador Android normalmente se utiliza `http://10.0.2.2:8080`; para iOS Simulator se puede utilizar `http://localhost:8080`.

### 4.5 Escritorio con Tauri

Primero levanta el servidor web:

```bash
npm run dev:web
```

En otra terminal, desde la raíz del repositorio:

```bash
npm run dev:desktop
```

Para generar la aplicación empaquetada (reemplaza la URL por el dominio real de la API):

```powershell
# Ejecutar desde la raíz del repositorio
$env:VITE_API_BASE_URL="https://api.tu-dominio.ec"
npm run build:web
npm run build:desktop
```

La salida web se comparte con escritorio; Tauri la muestra dentro de una ventana nativa. En desarrollo usa la URL de Vite y el proxy local. Para un build de escritorio de producción, define `VITE_API_BASE_URL` con la URL HTTPS pública de la API antes de ejecutar el build web. La generación de instaladores debe ejecutarse en el sistema operativo destino o mediante CI con runners de cada plataforma.

## 5. Variables de entorno

- Backend: copia `backend/.env.example` como referencia y exporta las variables en tu terminal o configura tu IDE. Spring lee `DB_URL`, `DB_USER`, `DB_PASSWORD`, `APP_CORS_ALLOWED_ORIGINS` y `SERVER_PORT`.
- Móvil: usa `EXPO_PUBLIC_API_URL` en el entorno local de Expo. Las variables con prefijo `EXPO_PUBLIC_` se incluyen en el cliente; **nunca pongas secretos allí**.
- Web: Vite usa el proxy local definido en `apps/web/vite.config.ts`. En producción se configurará el dominio de la API mediante variables de entorno y la infraestructura.

No subir archivos `.env`, contraseñas, tokens, claves privadas ni credenciales institucionales a GitHub.

## 6. Convenciones de trabajo

- `main`: rama estable; no trabajar directamente aquí.
- `develop`: integración del equipo.
- `feature/<modulo>-<descripcion>`: nuevas funcionalidades.
- `fix/<descripcion>`: correcciones.
- Todo cambio entra mediante Pull Request hacia `develop`.
- Usar commits claros: `feat:`, `fix:`, `docs:`, `test:`, `refactor:`, `chore:`.
- No mezclar cambios de formato masivo con funcionalidades.
- Antes de pedir revisión: probar la aplicación afectada y revisar que no se suban secretos.

Detalles en [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md).

## 7. Roadmap inicial

1. **Fundación:** repositorio, CI, PostgreSQL, API y clientes arrancando.
2. **Identidad:** registro, verificación de correo `@uce.edu.ec`, inicio de sesión, recuperación de cuenta y perfil.
3. **Muro:** crear y consultar publicaciones, comentarios y reacciones.
4. **Foros:** categorías, preguntas, respuestas y votos de utilidad.
5. **Moderación:** reportes, bloqueo, auditoría y herramientas administrativas.
6. **Clasificados:** publicación de artículos y contacto comprador-vendedor.
7. **Multiplataforma:** pulir Android/iOS, escritorio, notificaciones y publicación en tiendas.

El orden de implementación y los criterios de aceptación están en [docs/ROADMAP.md](docs/ROADMAP.md).

## 8. Seguridad y alcance del prototipo

La verificación institucional **no está implementada todavía**. Aceptar una dirección terminada en `@uce.edu.ec` no demuestra por sí solo que la persona controla ese buzón. Antes de habilitar cuentas reales se debe enviar y validar un código o enlace por correo.

El backend incluye una configuración de seguridad temporal para permitir el endpoint de salud y dejar el resto cerrado hasta implementar autenticación. No se debe publicar el prototipo con endpoints de negocio abiertos. Las políticas de moderación, privacidad, tratamiento de datos personales y uso de imágenes deben definirse antes del piloto.

## 9. Documentación oficial de las tecnologías

- [Spring Boot](https://spring.io/projects/spring-boot)
- [Spring Security](https://spring.io/projects/spring-security)
- [Expo](https://docs.expo.dev/)
- [React](https://react.dev/)
- [Vite](https://vite.dev/)
- [Tauri 2](https://v2.tauri.app/)
- [PostgreSQL](https://www.postgresql.org/docs/)


La primera ejecución de `npm install` debe generar `package-lock.json`; inclúyanlo en el siguiente commit para que todo el equipo y CI instalen las mismas versiones.
