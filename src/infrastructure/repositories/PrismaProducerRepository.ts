import prisma from '../prisma/client';
import { Producer } from '../../domain/entities/Producer';
import { ProducerRepository } from '../../domain/repositories/ProducerRepository';

type PrismaProducer = {
  id: string;
  nombre: string | null;
  nro_empleados: number | null;
  created_at: Date;
};

const toProducer = (p: PrismaProducer): Producer => ({
  id: p.id,
  name: p.nombre ?? '',
  employeeCount: p.nro_empleados ?? 0,
  createdAt: p.created_at,
});

export class PrismaProducerRepository implements ProducerRepository {
  async create(producer: Omit<Producer, 'id' | 'createdAt'>): Promise<Producer> {
    const created = await prisma.productores.create({
      data: {
        nombre: producer.name,
        nro_empleados: producer.employeeCount,
      },
    });
    return toProducer(created);
  }
}
