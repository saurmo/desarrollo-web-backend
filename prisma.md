# Integración Prisma + Supabase

## 1. Instalar dependencias

```bash
npm install prisma @prisma/client
npx prisma init
```

CONNECT EXISTING DATABASE:
  1. Configure your DATABASE_URL in prisma.config.ts
  2. Run prisma db pull to introspect your database.

CREATE NEW DATABASE:
  Local: npx prisma dev (runs Postgres locally in your terminal)
  Cloud: npx create-db (creates a free Prisma Postgres database)

Esto crea dos archivos:
- `prisma/schema.prisma` — definición del modelo de datos
- `.env` — variables de entorno (ya existente, solo agrega las variables)

---

## 2. Cadena de conexión desde Supabase

En tu proyecto de Supabase ve a:
**Settings → Database → Connection string → URI**

Copia la URL y agrega estas dos variables a tu `.env`:

```env
DATABASE_URL="postgresql://postgres:[TU-PASSWORD]@db.[TU-REF].supabase.co:5432/postgres?pgbouncer=true&connection_limit=1"
DIRECT_URL="postgresql://postgres:[TU-PASSWORD]@db.[TU-REF].supabase.co:5432/postgres"
```

> **Por qué dos URLs:**
> - `DATABASE_URL` pasa por PgBouncer (connection pooling) — para queries normales
> - `DIRECT_URL` va directo a la base de datos — requerida para migraciones

---

## 3. Schema de Prisma

Reemplaza el contenido de `prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

model Usuario {
  id             String   @id @default(uuid()) @db.Uuid
  nombre         String   @db.VarChar(100)
  apellidos      String   @db.VarChar(150)
  email          String   @unique @db.VarChar(255)
  password       String   @db.VarChar(255)
  aceptaTerminos Boolean  @default(false) @map("acepta_terminos")
  createdAt      DateTime @default(now()) @map("created_at") @db.Timestamptz
  updatedAt      DateTime @updatedAt @map("updated_at") @db.Timestamptz

  @@map("usuarios")
}
```

---

## 4. Sincronizar con Supabase

### Opción A — La tabla ya existe en Supabase

Usa esta opción si ya ejecutaste el SQL de creación de tabla directamente en Supabase:

```bash
npx prisma db pull      # lee la BD y genera el schema automáticamente
npx prisma generate     # genera el cliente TypeScript
```

### Opción B — La tabla aún no existe

Deja que Prisma cree la tabla desde el schema:

```bash
npx prisma migrate dev --name init_usuarios
```

> Esto crea la tabla en Supabase y guarda un historial de migraciones en `prisma/migrations/`.

---

## 5. Configurar el cliente de Prisma

Crea el archivo del cliente reutilizable:

```typescript
// src/infrastructure/database/prismaClient.ts
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();
```

---

## 6. Crear el repositorio de usuarios

```typescript
// src/infrastructure/repositories/usuarioRepository.ts
import { prisma } from '../database/prismaClient';

export const usuarioRepository = {
  findByEmail: (email: string) =>
    prisma.usuario.findUnique({ where: { email } }),

  create: (data: {
    nombre: string;
    apellidos: string;
    email: string;
    password: string;
    aceptaTerminos: boolean;
  }) => prisma.usuario.create({ data }),
};
```

---

## 7. Ejemplo de uso en un controlador Express

```typescript
// src/controllers/authController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { usuarioRepository } from '../infrastructure/repositories/usuarioRepository';

export const register = async (req: Request, res: Response) => {
  const { nombre, apellidos, email, password, aceptaTerminos } = req.body;

  const existe = await usuarioRepository.findByEmail(email);
  if (existe) {
    return res.status(409).json({ message: 'El correo ya está registrado' });
  }

  const hash = await bcrypt.hash(password, 10);
  const usuario = await usuarioRepository.create({
    nombre,
    apellidos,
    email,
    password: hash,
    aceptaTerminos,
  });

  const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET!, {
    expiresIn: '7d',
  });

  res.status(201).json({ data: { token, usuario: { id: usuario.id, nombre, apellidos, email } } });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const usuario = await usuarioRepository.findByEmail(email);
  if (!usuario) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  const valida = await bcrypt.compare(password, usuario.password);
  if (!valida) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET!, {
    expiresIn: '7d',
  });

  res.json({ data: { token } });
};
```

---

## 8. Comandos de referencia rápida

| Comando | Descripción |
|---|---|
| `npx prisma init` | Inicializa Prisma en el proyecto |
| `npx prisma generate` | Regenera el cliente TypeScript tras cambios al schema |
| `npx prisma migrate dev --name <nombre>` | Crea una migración y la aplica en la BD |
| `npx prisma db pull` | Lee la BD existente y genera el schema |
| `npx prisma db push` | Aplica cambios del schema sin crear historial de migraciones |
| `npx prisma studio` | Abre una UI visual para explorar y editar datos |

---

## Flujo completo

```
Supabase (PostgreSQL)
      ↕  DIRECT_URL (migraciones)
      ↕  DATABASE_URL (queries via PgBouncer)
Prisma ORM  →  prismaClient.ts
                    ↓
           usuarioRepository.ts
                    ↓
           authController.ts
                    ↓
         Express (localhost:3001)
                    ↓
         Next.js frontend (httpClient.ts)
```
