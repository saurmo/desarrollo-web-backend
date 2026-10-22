import type { ErrorRequestHandler, RequestHandler } from 'express';

// Se ejecuta cuando ninguna ruta coincidió: responde JSON en lugar del HTML por defecto de Express
export const notFoundHandler: RequestHandler = (req, res) => {
  res.status(404).json({ error: `La ruta ${req.method} ${req.path} no existe` });
};

// Último recurso: errores que ningún controlador capturó (por ejemplo, un JSON mal formado en el body).
// Nunca devuelve el stack trace.
export const errorMiddleware: ErrorRequestHandler = (error, req, res, next) => {
  if (res.headersSent) {
    next(error);
    return;
  }
  if (error?.type === 'entity.parse.failed') {
    res.status(400).json({ error: 'El cuerpo de la petición no es un JSON válido' });
    return;
  }
  console.error(error);
  res.status(500).json({ error: 'Error interno del servidor' });
};
