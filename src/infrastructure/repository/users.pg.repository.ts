import prisma from "./client.ts";
import type { IUserRepository } from "../../domain/repository/IUser.repository.ts";
import type { CreateUserDTO, UpdateUserDTO, User, UserFilterOptions } from "../../domain/models/User.ts";

export class UserPgRepository implements IUserRepository {


  async create(data: CreateUserDTO): Promise<User> {
    const createdUser = await prisma.users.create({
      data: {
        nombre: data.name,
        identificacion: data.identification,
        role: data.role,
        phone: data.phone,
        email: data.email,
        password: data.password ?? '',
      },
    });

    return this.mapToDomain(createdUser);
  }

  async findAll(filters: UserFilterOptions): Promise<{ total: number; data: User[] }> {
    const total = await prisma.users.count({
      where: {
        status: filters.status,
      }
    })
    const users = await prisma.users.findMany({
      take: filters.limit,
      skip: filters.offset,
      where: {
        status: filters.status,
      }
    });
    const usersMap = users.map((user) => this.mapToDomain(user));
    return { total, data: usersMap };
  }

  async findById(id: number) {
    const user = await prisma.users.findUnique({
      where: { id },
    });

    if (!user) return null;
    return this.mapToDomain(user);
  }

  async findByEmail(email: string) {
    const user = await prisma.users.findUnique({
      where: { email },
    });

    if (!user) return null;
    return this.mapToDomain(user);
  }

  async update(id: number, data: UpdateUserDTO) {
    try {
      const updatedUser = await prisma.users.update({
        where: { id },
        data: {
          ...(data.name && { nombre: data.name }),
          ...(data.identification && { identificacion: data.identification }),
          ...(data.role && { role: data.role }),
          ...(data.phone !== undefined && { phone: data.phone }),
          ...(data.email && { email: data.email }),
          ...(data.password && { password: data.password }),
        },
      });

      return this.mapToDomain(updatedUser);
    } catch (error) {
      // Retorna null si el registro no existía al intentar actualizar
      return null;
    }
  }

  async remove(id: number) {
    try {
      await prisma.users.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  // Mapeador privado para adaptar las columnas de la DB (español) al modelo TypeScript (inglés)
  private mapToDomain(rawUser: any) {
    return {
      id: rawUser.id,
      name: rawUser.nombre,
      identification: rawUser.identificacion,
      role: rawUser.role,
      phone: rawUser.phone,
      email: rawUser.email,
      password: rawUser.password,
      createdAt: rawUser.created_at,
    } as User;
  }
}