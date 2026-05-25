import fs from 'fs/promises';
import path from 'path';
import { randomBytes } from 'crypto';
import { FileStorage, FileUploadInput } from '../../domain/services/FileStorage';

export class LocalFileStorage implements FileStorage {
  async upload(input: FileUploadInput): Promise<string> {
    const dir = path.join(process.cwd(), 'uploads', input.folder);
    await fs.mkdir(dir, { recursive: true });

    const ext = path.extname(input.originalName).toLowerCase();
    const safeExt = ext && /^\.[a-z0-9]+$/i.test(ext) ? ext : '';
    const filename = `${Date.now()}-${randomBytes(6).toString('hex')}${safeExt}`;
    await fs.writeFile(path.join(dir, filename), input.buffer);

    return `/uploads/${input.folder}/${filename}`;
  }
}
