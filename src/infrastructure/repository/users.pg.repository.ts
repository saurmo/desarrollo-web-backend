import prisma from "./client.ts";
import type { IUserRepository } from "../../domain/repository/IUser.repository.ts";
import type { CreateUserDTO, UpdateUserDTO, User, UserFilterOptions } from "../../domain/models/User.ts";
import { ConflictError } from "../../application/errors/conflict.error.ts";

export class UserPgRepository implements IUserRepository {


  async create(data: CreateUserDTO): Promise<User> {

    const existUser = await this.findByEmail(data.email)
    if (existUser) {
      throw new ConflictError(`Ya existe un usuario con el email ${data.email}`)
    }

    const createdUser = await prisma.users.create({
      data: {
        name: data.name,
        identification: data.identification,
        role: data.role,
        phone: data.phone,
        email: data.email,
        password: data.password ?? '',
        status: data.status,
        created_at: new Date()
      },
    });

    return this.mapToDomain(createdUser);
  }

  async findAll(filters: UserFilterOptions): Promise<{ total: number; data: User[] }> {
    // Filtros opcionales: solo se agregan al where si vienen
    const where = {
      status: filters.status,
      ...(filters.role && { role: filters.role as 'admin' | 'user' | 'owner' }),
      ...(filters.identification && { identification: filters.identification }),
    }
    const total = await prisma.users.count({ where })
    const users = await prisma.users.findMany({
      where,
      // Sin orden, la base no garantiza el mismo orden entre páginas y se repiten o se saltan filas
      orderBy: { id: 'asc' },
      take: filters?.limit ?? 10,
      skip: filters?.offset ?? 0,
    });
    const usersMap = users.map((user) => this.mapToDomain(user));
    return { total, data: usersMap };
  }

  async findById(id: number) {
    // findFirst porque se filtra también por status (findUnique solo acepta campos únicos)
    const user = await prisma.users.findFirst({
      where: { id, status: 'ACTIVE' },
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
          ...(data.name && { name: data.name }),
          ...(data.identification && { identification: data.identification }),
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

  async deleteById(id: number) {
    try {
      // Borrado lógico: se conserva la fila para no romper el historial que la referencia
      await prisma.users.update({
        where: { id },
        data: { status: 'INACTIVE' },
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  // Mapeador privado: convierte la fila de la base de datos (snake_case) al modelo de dominio (camelCase)
  private mapToDomain(rawUser: any) {
    return {
      id: rawUser.id,
      name: rawUser.name,
      identification: rawUser.identification,
      role: rawUser.role,
      phone: rawUser.phone,
      email: rawUser.email,
      password: rawUser.password,
      createdAt: rawUser.created_at,
      status: rawUser.status ?? "ACTIVE"
    } as User;
  }
}