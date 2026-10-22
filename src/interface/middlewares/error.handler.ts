import type { Response } from "express";
import { BadRequest } from "../../application/errors/bad-request.error.ts";
import { ConflictError } from "../../application/errors/conflict.error.ts";
import { ForbiddenError } from "../../application/errors/forbidden.error.ts";
import { UnauthorizedError } from "../../application/errors/unauthorized.error.ts";

export const handleError = (error: Error | unknown, res: Response) => {
  // Cada rama termina con return: si no, la función sigue y vuelve a responder con 500,
  // y Express falla con "Cannot set headers after they are sent".
  if (error instanceof BadRequest) {
    return res.status(400).json(error.print());
  }
  if (error instanceof UnauthorizedError) {
    return res.status(401).json({ error: error.message });
  }
  if (error instanceof ForbiddenError) {
    return res.status(403).json({ error: error.message });
  }
  if (error instanceof ConflictError) {
    return res.status(409).json({ error: error.message });
  }
  if (error instanceof Error && error.message.includes('bad_request')) {
    return res.status(400).json({ error: error.message });
  }
  if (error instanceof Error && error.message.includes('not_found')) {
    return res.status(404).json({ error: error.message });
  }
  if (error instanceof Error && error.message.includes('already_exists')) {
    return res.status(409).json({ error: error.message });
  }
  console.error(error);
  return res.status(500).json({ error: 'Internal server error' });
}
