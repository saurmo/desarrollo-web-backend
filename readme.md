
# Api Rest con expressjs

Página: https://expressjs.com/

- `npm init -y`
- `npm install express`
- `npm install --save-dev typescript @types/express @types/node`
https://www.npmjs.com/package/nodemon

tsc --init
```json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "nodenext",
    "rewriteRelativeImportExtensions": true,
    "erasableSyntaxOnly": true,
    "verbatimModuleSyntax": true,
    "noEmit": true,
    "strict": true,
    "skipLibCheck": true
  }
}
```

## Ejemplo básico de api rest
```ts
import express, { type Express, type Request, type Response } from 'express';

const app: Express = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(3000);
```

Http Methods
- POST -> Crear
- PUT -> Modificación total (upsert, si no existe se crea) 
- PATCH -> Modificación parcial
- DELETE -> Eliminar
- GET -> Consultar


## PRISMA ORM 

https://www.prisma.io/docs/v7/prisma-orm/quickstart/prisma-postgres

`npm install prisma@7.10.0 @types/pg --save-dev`
`npm install @prisma/client@7.10.0 @prisma/adapter-pg pg dotenv`

`npx prisma init`

> Sincronizar la base de datos con el código (schema.prisma)
`npx prisma db pull  `

# PAGINACION

- limit: Nos obtiene x cantidad de datos. Por ejemplo consultar 200 items
- offset: Es el puntero de donde consultamos la información.

Si tenemos un limit de 10 y un total de 100 items. Hay 10 páginas
Con un limit de 10:
Page 1 (limit=10, offset=0). 02 - 12
Page 2 (limit=10, offset=10)
Page 3 (limit=10, offset=20)
Page 4 (limit=10, offset=30)

## ¿Cómo se ve sobre la tabla?

El `offset` (SKIP) salta registros y el `limit` (TAKE) decide cuántos se traen.

```mermaid
block-beta
  columns 10
  block:total:10
    columns 10
    a1["1"] a2["2"] a3["3"] a4["4"] a5["5"] a6["6"] a7["7"] a8["8"] a9["9"] a10["10"]
    b1["11"] b2["12"] b3["13"] b4["14"] b5["15"] b6["16"] b7["17"] b8["18"] b9["19"] b10["20"]
    c1["21"] c2["22"] c3["23"] c4["24"] c5["25"] c6["26"] c7["27"] c8["28"] c9["29"] c10["30"]
  end
  p1["Page 1 → offset=0, limit=10"]:10
  p2["Page 2 → offset=10, limit=10"]:10
  p3["Page 3 → offset=20, limit=10"]:10

  style a1 fill:#1e88e5,color:#fff
  style a2 fill:#1e88e5,color:#fff
  style a3 fill:#1e88e5,color:#fff
  style a4 fill:#1e88e5,color:#fff
  style a5 fill:#1e88e5,color:#fff
  style a6 fill:#1e88e5,color:#fff
  style a7 fill:#1e88e5,color:#fff
  style a8 fill:#1e88e5,color:#fff
  style a9 fill:#1e88e5,color:#fff
  style a10 fill:#1e88e5,color:#fff
  style b1 fill:#43a047,color:#fff
  style b2 fill:#43a047,color:#fff
  style b3 fill:#43a047,color:#fff
  style b4 fill:#43a047,color:#fff
  style b5 fill:#43a047,color:#fff
  style b6 fill:#43a047,color:#fff
  style b7 fill:#43a047,color:#fff
  style b8 fill:#43a047,color:#fff
  style b9 fill:#43a047,color:#fff
  style b10 fill:#43a047,color:#fff
  style c1 fill:#fb8c00,color:#fff
  style c2 fill:#fb8c00,color:#fff
  style c3 fill:#fb8c00,color:#fff
  style c4 fill:#fb8c00,color:#fff
  style c5 fill:#fb8c00,color:#fff
  style c6 fill:#fb8c00,color:#fff
  style c7 fill:#fb8c00,color:#fff
  style c8 fill:#fb8c00,color:#fff
  style c9 fill:#fb8c00,color:#fff
  style c10 fill:#fb8c00,color:#fff
  style p1 fill:#1e88e5,color:#fff
  style p2 fill:#43a047,color:#fff
  style p3 fill:#fb8c00,color:#fff
```

La fórmula que traduce la página (lo que pide el cliente) al offset (lo que entiende la base de datos):

```
offset = limit * (page - 1)
totalPages = ceil(total / limit)
```

## Flujo en la aplicación

El cliente piensa en **páginas**, la base de datos piensa en **skip/take**. La traducción ocurre en el caso de uso.

```mermaid
sequenceDiagram
    autonumber
    actor C as Cliente
    participant Ctrl as Controller<br/>listings.controller.ts
    participant UC as UseCase<br/>listings.use-case.ts
    participant Repo as Repository (Prisma)<br/>listings.pg.repository.ts
    participant DB as PostgreSQL

    C->>Ctrl: GET /listings?page=3&limit=10
    Note over Ctrl: parseInt de los query params<br/>(si no vienen → undefined)
    Ctrl->>UC: getAll({ page: 3, limit: 10 })

    Note over UC: page = 3<br/>offset = limit * (page - 1) = 20<br/>state = 'ACTIVE' por defecto
    UC->>Repo: findAll({ state, limit: 10, offset: 20 })

    Repo->>DB: SELECT COUNT(*) WHERE state='ACTIVE'
    DB-->>Repo: total = 100
    Repo->>DB: SELECT * WHERE state='ACTIVE'<br/>LIMIT 10 OFFSET 20
    DB-->>Repo: 10 registros (21..30)

    Repo-->>UC: { data, total }
    Note over UC: totalPages = ceil(100 / 10) = 10
    UC-->>Ctrl: { pagination, data }
    Ctrl-->>C: 200 { pagination: { total, currentPage,<br/>limit, totalPages }, data }
```

## Cálculo del offset paso a paso

```mermaid
flowchart TD
    A["Query params<br/>?page=&limit="] --> B{"¿page existe?"}
    B -- No --> C["page = 1"]
    B -- Sí --> D["page = parseInt(page)"]
    C --> E{"¿limit existe?"}
    D --> E
    E -- No --> F["limit = 10 (default)"]
    E -- Sí --> G["limit = parseInt(limit)"]
    F --> H["offset = limit * (page - 1)"]
    G --> H
    H --> I["Prisma:<br/>take = limit<br/>skip = offset"]
    I --> J["SQL:<br/>LIMIT take OFFSET skip"]
    J --> K["total = COUNT(*)<br/>totalPages = ceil(total / limit)"]
    K --> L["Respuesta:<br/>{ pagination, data }"]
```

## Equivalencias entre capas

| Concepto | API (query) | Caso de uso | Prisma | SQL |
|---|---|---|---|---|
| Cuántos traer | `limit` | `limit` | `take` | `LIMIT` |
| Desde dónde | `page` | `offset` | `skip` | `OFFSET` |
| Cuántos hay | — | `total` | `count()` | `COUNT(*)` |

> Ojo: `OFFSET` grande es lento, porque la base de datos igual recorre y descarta
> las filas saltadas. Para tablas muy grandes se usa paginación por cursor
> (`WHERE id > ultimoId ORDER BY id LIMIT n`).


# Herramienta de desarrollo 
- nodemon `npm install nodemon -g`

