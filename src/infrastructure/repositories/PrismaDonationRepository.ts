import prisma from '../prisma/client';
import { Donation } from '../../domain/entities/Donation';
import {
  DonationRepository,
  DonationWithDonor,
} from '../../domain/repositories/DonationRepository';

type PrismaDonation = {
  id: string;
  user_id: string | null;
  total: unknown;
  descripcion: string | null;
  comprobante_url: string | null;
  created_at: Date;
};

const toDonation = (d: PrismaDonation): Donation => ({
  id: d.id,
  userId: d.user_id,
  total: d.total === null ? 0 : Number(d.total as string | number),
  description: d.descripcion,
  receiptUrl: d.comprobante_url,
  createdAt: d.created_at,
});

export class PrismaDonationRepository implements DonationRepository {
  async create(donation: Omit<Donation, 'id' | 'createdAt'>): Promise<Donation> {
    const created = await prisma.donaciones.create({
      data: {
        user_id: donation.userId ?? null,
        total: donation.total,
        descripcion: donation.description ?? null,
        comprobante_url: donation.receiptUrl ?? null,
      },
    });
    return toDonation(created);
  }

  async findAllByUser(userId: string): Promise<Donation[]> {
    const items = await prisma.donaciones.findMany({
      where: { user_id: userId },
      orderBy: { created_at: 'desc' },
    });
    return items.map(toDonation);
  }

  async findAll(): Promise<DonationWithDonor[]> {
    const items = await prisma.donaciones.findMany({
      orderBy: { created_at: 'desc' },
    });

    const userIds = Array.from(
      new Set(items.map((d) => d.user_id).filter((id): id is string => !!id))
    );
    const users = userIds.length
      ? await prisma.usuarios.findMany({
          where: { id: { in: userIds } },
          select: { id: true, nombre: true, apellidos: true, email: true },
        })
      : [];
    const userById = new Map(users.map((u) => [u.id, u]));

    return items.map((d) => {
      const u = d.user_id ? userById.get(d.user_id) : undefined;
      return {
        ...toDonation(d),
        donor: u
          ? { id: u.id, name: u.nombre, lastName: u.apellidos, email: u.email }
          : null,
      };
    });
  }
}
