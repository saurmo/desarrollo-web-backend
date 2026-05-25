import { FileStorage } from '../../domain/services/FileStorage';
import { SupabaseS3FileStorage } from './SupabaseS3FileStorage';
import { LocalFileStorage } from './LocalFileStorage';

export const buildFileStorage = (): FileStorage => {
  const s3 = new SupabaseS3FileStorage();
  if (s3.isConfigured()) return s3;
  return new LocalFileStorage();
};
