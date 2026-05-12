import fs from 'fs/promises';
import path from 'path';
import { randomBytes } from 'crypto';

const uploadDir = () => path.join(process.cwd(), 'uploads', 'donaciones');

/** Guarda el buffer en disco (respaldo local si no hay S3). Devuelve ruta relativa `/uploads/...`. */
export async function saveDonacionComprobanteLocally(params: {
  buffer: Buffer;
  originalName: string;
}): Promise<string> {
  const dir = uploadDir();
  await fs.mkdir(dir, { recursive: true });
  const ext = path.extname(params.originalName).toLowerCase();
  const safeExt = ext && /^\.[a-z0-9]+$/i.test(ext) ? ext : '';
  const filename = `${Date.now()}-${randomBytes(6).toString('hex')}${safeExt}`;
  await fs.writeFile(path.join(dir, filename), params.buffer);
  return `/uploads/donaciones/${filename}`;
}
