import type { Response } from "express";

export const handleError = (error: Error | unknown, res: Response) => {
  if (error instanceof Error && error.message.includes('bad_request')) {
    res.status(400).json({ error: error.message });
  }
  if (error instanceof Error && error.message.includes('not_found')) {
    res.status(404).json({ error: error.message });
  }
  if (error instanceof Error && error.message.includes('already_exists')) {
    res.status(409).json({ error: error.message });
  }
  console.error(error);
  res.status(500).json({ error: 'Internal server error' });
}