import prisma from '../prisma/client';
import { User, UserRole, isUserRole } from '../../domain/entities/User';
import { UserRepository, UserUpdate } from '../../domain/repositories/UserRepository';

type PrismaUser = {
  id: string;
  nombre: string;
  apellidos: string;
  email: string;
  password: string;
  acepta_terminos: boolean;
  foto_perfil: string | null;
  role: string;
  created_at: Date;
  updated_at: Date;
};

const toRole = (raw: string): UserRole => (isUserRole(raw) ? raw : 'donante');

const toUser = (u: PrismaUser): User => ({
  id: u.id,
  name: u.nombre,
  lastName: u.apellidos,
  email: u.email,
  passwordHash: u.password,
  acceptsTerms: u.acepta_terminos,
  profilePhoto: u.foto_perfil,
  role: toRole(u.role),
  createdAt: u.created_at,
  updatedAt: u.updated_at,
});

export class PrismaUserRepository implements UserRepository {
  async create(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const created = await prisma.usuarios.create({
      data: {
        nombre: user.name,
        apellidos: user.lastName,
        email: user.email,
        password: user.passwordHash,
        acepta_terminos: user.acceptsTerms,
        foto_perfil: user.profilePhoto ?? null,
        role: user.role,
      },
    });
    return toUser(created);
  }

  async findAll(): Promise<User[]> {
    const items = await prisma.usuarios.findMany();
    return items.map(toUser);
  }

  async findById(id: string): Promise<User | null> {
    const found = await prisma.usuarios.findUnique({ where: { id } });
    return found ? toUser(found) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const found = await prisma.usuarios.findUnique({ where: { email } });
    return found ? toUser(found) : null;
  }

  async update(id: string, updates: UserUpdate): Promise<User | null> {
    const existing = await prisma.usuarios.findUnique({
      where: { id },
      select: { id: true },
    });
    if (!existing) return null;

    const updated = await prisma.usuarios.update({
      where: { id },
      data: {
        nombre: updates.name,
        apellidos: updates.lastName,
        email: updates.email,
        acepta_terminos: updates.acceptsTerms,
        foto_perfil: updates.profilePhoto,
        role: updates.role,
        updated_at: new Date(),
      },
    });
    return toUser(updated);
  }

  async delete(id: string): Promise<boolean> {
    const existing = await prisma.usuarios.findUnique({
      where: { id },
      select: { id: true },
    });
    if (!existing) return false;
    await prisma.usuarios.delete({ where: { id } });
    return true;
  }
}
