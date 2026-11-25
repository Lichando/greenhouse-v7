# GreenHouse Brokers · PHP MVC

Aplicación independiente en PHP 8.2+, MySQL 8 y JavaScript nativo. Esta carpeta no reemplaza la versión Next.js del repositorio.

## Requisitos

- PHP 8.2 o superior con las extensiones `pdo_mysql` y `session`.
- MySQL 8.0+ o MariaDB 10.6+.
- Apache con `mod_rewrite` (para publicar) o el servidor integrado de PHP (para desarrollo).

## Configuración local

1. Crear una base y un usuario MySQL:

   ```sql
   CREATE DATABASE greenhouse_brokers CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   CREATE USER 'greenhouse_app'@'localhost' IDENTIFIED BY 'cambia-esta-clave';
   GRANT SELECT, INSERT, UPDATE, DELETE ON greenhouse_brokers.* TO 'greenhouse_app'@'localhost';
   FLUSH PRIVILEGES;
   ```

2. Desde `php-app/`, ejecutar `cp .env.example .env` y ajustar `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` y `APP_URL` en `.env`.
3. Crear tablas e importar propiedades de demostración con el usuario administrador de MySQL:

   ```sh
   mysql -u root -p greenhouse_brokers < database/schema.sql
   mysql -u root -p greenhouse_brokers < database/seed.sql
   ```

4. Iniciar el servidor de desarrollo desde `php-app/`:

   ```sh
   php -S 127.0.0.1:8000 -t public public/index.php
   ```

5. Abrir `http://127.0.0.1:8000`. Registrate y elegí Cliente, Inmobiliaria o Desarrolladora para acceder al panel correspondiente.

## Producción

Configurá el document root del sitio en `php-app/public` (nunca en la raíz de `php-app`), activá `mod_rewrite` y cargá las variables de `.env` desde el gestor de secretos del hosting. Usá HTTPS, `APP_ENV=production` y `APP_DEBUG=false`; no subas el archivo `.env` al repositorio. El servidor integrado de PHP es solo para desarrollo.

## Qué incluye

- Sitio público: portada, buscador con filtros, ficha de propiedad, página institucional y contacto guardado en MySQL.
- Cuenta y roles: alta, ingreso, selección de perfil y cierre de sesión.
- Panel Cliente: propiedades, favoritos, solicitudes de visita, consultas, perfil y preferencias.
- Panel Inmobiliaria: cartera, publicaciones, captaciones, consultas/leads, agenda y reportes.
- Panel Desarrolladora: emprendimientos, avance, inventario, reservas, ventas y reportes.
- Seguridad: PDO con prepared statements, password hashing, escape de salida, CSRF en formularios POST, autorización por rol y cookies de sesión `HttpOnly`/`SameSite=Lax`.

Los datos de demostración solo incluyen publicaciones públicas. Las cuentas se crean desde el formulario de registro; no hay credenciales de demo embebidas.
