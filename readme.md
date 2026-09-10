
# Api Rest con expressjs

Página: https://expressjs.com/

- `npm init -y`
- `npm install express`
- `npm install --save-dev typescript @types/express @types/node`

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