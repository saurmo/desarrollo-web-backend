import { DonacionCreateInput } from '../../domain/models/Donacion';
import { prisma } from '../database/prismaClient';

export const donacionesRepository = {
  create: (donacion: DonacionCreateInput) => {
    return prisma.donaciones.create({
      data: {
        user_id: donacion.user_id ?? null,
        total: donacion.total,
        descripcion: donacion.descripcion ?? null,
        comprobante_url: donacion.comprobante_url ?? null,
      },
    });
  },
};