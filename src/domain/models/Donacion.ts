/** Datos para crear una donación (coinciden con el modelo Prisma `donaciones`). */
export interface DonacionCreateInput {
  user_id?: string | null;
  total: number;
  descripcion?: string | null;
  comprobante_url?: string | null;
}