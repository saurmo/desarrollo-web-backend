import { prisma } from '../database/prismaClient';
import { ActualizarUsuarioDto, CrearUsuarioDto } from '../../domain/models/Usuario';

const publicFields = {
  id: true,
  nombre: true,
  apellidos: true,
  email: true,
  created_at: true,
};

export const usuarioRepository = {
  findAll: () =>
    // select id, nombre, apellidos, email, created_at from usuarios
    prisma.usuarios.findMany({ select: publicFields }),

  findById: (id: string) =>
    prisma.usuarios.findUnique({ where: { id }, select: publicFields }),

  findByEmail: (email: string) =>
    prisma.usuarios.findUnique({ where: { email } }),

  create: (data: CrearUsuarioDto) =>
    prisma.usuarios.create({ data }),

  update: (id: string, data: ActualizarUsuarioDto) =>
    prisma.usuarios.update({
      where: { id },
      data,
      select: { ...publicFields, updated_at: true }, // spread  operator
    }),

  remove: (id: string) =>
    prisma.usuarios.delete({ where: { id } }),
};
