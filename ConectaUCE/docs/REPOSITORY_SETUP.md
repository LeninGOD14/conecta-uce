# Configuración del repositorio remoto

Después de crear el repositorio vacío `ConectaUCE` en GitHub, desde la carpeta raíz:

```bash
git init
git add .
git commit -m "chore: estructura inicial multiplataforma de ConectaUCE"
git branch -M main
git remote add origin https://github.com/ORGANIZACION_O_USUARIO/ConectaUCE.git
git push -u origin main

git checkout -b develop
git push -u origin develop
```

Sustituye `ORGANIZACION_O_USUARIO` por el usuario u organización que será propietaria del proyecto. Mantén el repositorio privado mientras el equipo decide qué documentación y código publicar.

En GitHub, después de subirlo:

1. Configura `develop` como rama por defecto para el trabajo diario, o mantén `main` por defecto y fija la política de Pull Request hacia `main` según el flujo que acuerde el equipo.
2. Protege `main`: bloquear force-push y exigir Pull Request.
3. Activa Issues y Projects.
4. Agrega a los compañeros como colaboradores con el permiso mínimo necesario.
5. Configura secretos únicamente en GitHub Actions cuando se implemente despliegue.
