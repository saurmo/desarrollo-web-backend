import multer from 'multer';

export const allowedMime = new Set([
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
]);

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (allowedMime.has(file.mimetype)) {
      cb(null, true);
      return;
    }
    cb(new Error('Solo se permiten archivos PDF o imagen (JPEG, PNG, GIF, WebP).'));
  },
});
