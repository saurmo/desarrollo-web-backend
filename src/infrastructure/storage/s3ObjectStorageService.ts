import path from 'path';
import { randomBytes } from 'crypto';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const DEFAULT_REGION = 'us-east-1';

let cachedClient: S3Client | null | undefined;

/**
 * Cliente S3 apuntando al endpoint **S3-compatible** de Supabase Storage.
 *
 * Variables típicas (Supabase → Project Settings → Storage → S3 connection):
 * - `SUPABASE_S3_ENDPOINT` — p. ej. `https://<project-ref>.storage.supabase.co/storage/v1/s3`
 * - `S3_ACCESS_KEY_ID` / `S3_SECRET_ACCESS_KEY` — credenciales S3 del proyecto
 * - `S3_REGION` — suele usarse `us-east-1` para el firmado del SDK
 */
export function createS3ClientFromEnv(): S3Client | null {
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
}

function getOrCreateS3Client(): S3Client | null {
  if (cachedClient === undefined) {
    cachedClient = createS3ClientFromEnv();
  }
  return cachedClient;
}

/** True si el cliente S3, el bucket y la URL pública base están definidos. */
export function isS3ObjectStorageConfigured(): boolean {
  return (
    getOrCreateS3Client() !== null &&
    !!process.env.S3_BUCKET_NAME?.trim() &&
    !!process.env.SUPABASE_STORAGE_PUBLIC_URL?.trim()
  );
}

function resolvePublicObjectUrl(objectKey: string): string {
  const base = process.env.SUPABASE_STORAGE_PUBLIC_URL!.replace(/\/$/, '');
  const bucket= process.env.S3_BUCKET_NAME
  return `${base}/${bucket}/${objectKey.replace(/^\/+/, '')}`;
}

export type UploadDonacionComprobanteInput = {
  buffer: Buffer;
  contentType: string;
  originalName: string;
  folder: 'comprobantes' | 'fotos-perfil';
};


export async function uploadFileToS3(
  params: UploadDonacionComprobanteInput,
): Promise<string> {
  const client = getOrCreateS3Client();
  const bucket = process.env.S3_BUCKET_NAME?.trim();
  const publicBase = process.env.SUPABASE_STORAGE_PUBLIC_URL?.trim();
  if (!client || !bucket || !publicBase) {
    throw new Error(
      'S3/Supabase Storage no está configurado: defina SUPABASE_S3_ENDPOINT, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY, S3_BUCKET_NAME y SUPABASE_STORAGE_PUBLIC_URL.',
    );
  }

  const ext = path.extname(params.originalName).toLowerCase();
  const safeExt = ext && /^\.[a-z0-9]+$/i.test(ext) ? ext : '';
  const objectKey = `${params.folder}/${Date.now()}-${randomBytes(8).toString('hex')}${safeExt}`;

   await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: objectKey,
      Body: params.buffer,
      ContentType: params.contentType,
    }),
  );

  return resolvePublicObjectUrl(objectKey);
}
