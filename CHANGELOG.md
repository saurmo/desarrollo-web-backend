# Changelog

Todos los cambios relevantes de este proyecto se documentan en este archivo.

Formato basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/).

## [Unreleased]

### Added — Arquitectura hexagonal (portada de `api_mi_boleta`)

- Capa `domain/` desacoplada de Prisma: `entities/`, `repositories/` (interfaces), `services/` y `errors/`.
- Errores tipados en `domain/errors/DomainError.ts`: `DomainError`, `NotFoundError`, `ValidationError`, `ConflictError`, `UnauthorizedError`.
- Use cases granulares en `application/usecases/` (uno por archivo, con inyección de dependencias por constructor):
  - `auth/`: `RegisterUser`, `LoginUser`.
  - `users/`: `GetAllUsers`, `GetUserById`, `UpdateUser`, `DeleteUser`, `UpdateUserProfilePhoto`.
  - `producers/`: `CreateProducer`.
  - `donations/`: `CreateDonation`, `GetMyDonations`, `GetAllDonations`.
- DTOs con `class-validator` + `class-transformer` en `infrastructure/validators/` y middleware central `validateDto`.
- Middleware central de errores (`errorMiddleware.ts`) — los controllers solo hacen `next(error)`.
- Config tipada con validación al arranque: `infrastructure/config/env.ts` y `infrastructure/config/jwt.ts`.
- Separación de bootstrap: `src/app.ts` exporta la app Express; `src/main.ts` la inicia.
- Rutas versionadas bajo `/api/v1` con `interfaces/routes/v1/{authRoutes,userRoutes,producerRoutes,donationRoutes}`.
- Adaptadores de archivos como interfaz de dominio: `FileStorage` con implementaciones `SupabaseS3FileStorage` y `LocalFileStorage`; factory en `infrastructure/storage/index.ts`.
- Migración del código a inglés: `Usuario → User`, `Donacion → Donation`, `Productor → Producer`, `nombre → name`, `apellidos → lastName`. Los repos Prisma traducen al schema en español sin romper la DB.
- `tsconfig` estricto (`strict: true`, decoradores), scripts `build`/`start`/`typecheck`, `.node-version`, `.env.example`.

### Added — Roles y autorización

- Columna `role VARCHAR(20) DEFAULT 'donante'` agregada a la tabla `usuarios` (sin pérdida de datos vía `prisma db push`).
- `UserRole = 'donante' | 'admin'` definido en `domain/entities/User.ts` con guard `isUserRole`.
- JWT payload incluye `role`; el `authMiddleware` lo expone como `req.userRole`.
- Nuevo middleware `requireRole(...allowed)` para autorización a nivel de ruta.
- `CreateDonation` toma el `userId` del JWT autenticado, ya no del body — un donante no puede crear donaciones a nombre de otro.
- `GetMyDonations` (solo donaciones del usuario autenticado) y `GetAllDonations` (todas, con info del donante) como casos de uso separados.

### Added — Endpoints nuevos

- `GET /api/v1/donations/mine` — protegido con `authenticate`; devuelve las donaciones del usuario del token.
- `GET /api/v1/donations` — protegido con `authenticate + requireRole('admin')`; devuelve todas las donaciones con el donante embebido.

### Changed

- `POST /api/v1/donations` ahora requiere autenticación; el `userId` se toma del JWT y nunca del body.
- Todos los endpoints existentes responden con campos en inglés (`name`, `lastName`, `role`, `createdAt`, ...).
- Respuestas de error usan formato consistente `{ "error": "..." }` con el `statusCode` del `DomainError` correspondiente.

### Removed

- Implementaciones antiguas reemplazadas por la nueva arquitectura: `donacionUseCase.ts`, `productorUseCase.ts`, `usuarios/usuarioUseCase.ts`, `tokens.ts`, `database/prismaClient.ts`, repos en formato objeto (`donacionesRepository.ts`, `productoresRepository.ts`, `usuarioRepository.ts`), middlewares y controllers antiguos en español, `users.old.controller.ts`, `interfaces/data/users.ts`.

### Migración de base de datos

- Schema actualizado en `prisma/schema.prisma` (campo `role` en `usuarios`).
- Aplicado vía `prisma db push` contra Supabase para preservar datos existentes (`prisma migrate dev` requería reset de la DB porque no había historial de migraciones previo).
- Para entornos nuevos, ejecutar `npx prisma db push` tras clonar.
