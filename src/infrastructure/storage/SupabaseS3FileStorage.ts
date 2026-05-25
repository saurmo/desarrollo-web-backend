import path from 'path';
import { randomBytes } from 'crypto';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import {
  FileStorage,
  FileUploadInput,
} from '../../domain/services/FileStorage';
import { DomainError } from '../../domain/errors/DomainError';

const DEFAULT_REGION = 'us-east-1';

const createS3ClientFromEnv = (): S3Client | null => {
  const endpoint = process.env.SUPABASE_S3_ENDPOINT?.trim();
  const accessKeyId = process.env.S3_ACCESS_KEY_ID?.trim();
  const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY?.trim();
  const region = process.env.S3_REGION?.trim() || DEFAULT_REGION;
  if (!endpoint || !accessKeyId || !secretAccessKey) {
    return null;
  }
  return new S3Client({
    region,
    endpoint,
    credentials: { accessKeyId, secretAccessKey },
    forcePathStyle: true,
  });
};

const resolvePublicUrl = (objectKey: string): string => {
  const base = process.env.SUPABASE_STORAGE_PUBLIC_URL!.replace(/\/$/, '');
  const bucket = process.env.S3_BUCKET_NAME;
  return `${base}/${bucket}/${objectKey.replace(/^\/+/, '')}`;
};

export class SupabaseS3FileStorage implements FileStorage {
  private client: S3Client | null;

  constructor() {
    this.client = createS3ClientFromEnv();
  }

  isConfigured(): boolean {
    return (
      this.client !== null &&
      !!process.env.S3_BUCKET_NAME?.trim() &&
      !!process.env.SUPABASE_STORAGE_PUBLIC_URL?.trim()
    );
  }

  async upload(input: FileUploadInput): Promise<string> {
    const bucket = process.env.S3_BUCKET_NAME?.trim();
    if (!this.client || !bucket || !process.env.SUPABASE_STORAGE_PUBLIC_URL?.trim()) {
      throw new DomainError(
        'S3/Supabase Storage no está configurado: defina SUPABASE_S3_ENDPOINT, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY, S3_BUCKET_NAME y SUPABASE_STORAGE_PUBLIC_URL.',
        500
      );
    }

    const ext = path.extname(input.originalName).toLowerCase();
    const safeExt = ext && /^\.[a-z0-9]+$/i.test(ext) ? ext : '';
    const objectKey = `${input.folder}/${Date.now()}-${randomBytes(8).toString('hex')}${safeExt}`;

    await this.client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: objectKey,
        Body: input.buffer,
        ContentType: input.contentType,
      })
    );

    return resolvePublicUrl(objectKey);
  }
}
