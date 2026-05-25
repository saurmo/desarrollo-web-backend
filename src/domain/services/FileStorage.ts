export type UploadFolder = 'comprobantes' | 'fotos-perfil';

export type FileUploadInput = {
  buffer: Buffer;
  contentType: string;
  originalName: string;
  folder: UploadFolder;
};

export interface FileStorage {
  upload(input: FileUploadInput): Promise<string>;
}
