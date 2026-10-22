import type { AuthUser, UserFilterOptions } from "../domain/models/User.ts";
import type { IUserRepository } from "../domain/repository/IUser.repository.ts";
import { AdminUserDto, UserDto } from "../infrastructure/dtos/user.dto.ts";
import type { BcryptService } from "../infrastructure/services/bcrypt.service.ts";
import { BadRequest } from "./errors/bad-request.error.ts";
import { ForbiddenError } from "./errors/forbidden.error.ts";
import { withoutPassword } from "./user-mapper.ts";

// Convierte el id de la URL (siempre texto) en un entero positivo, o lanza bad_request.
const parseId = (id: string | null): number => {
  const value = Number(id);
  if (!id || !Number.isInteger(value) || value <= 0) {
    throw new Error('bad_request, ID must be a positive integer');
  }
  return value;
};


export class UsersUseCase {
  private userRepository: IUserRepository
  private bcryptService: BcryptService

  constructor(userRepository: IUserRepository, bcryptService: BcryptService) {
    this.userRepository = userRepository
    this.bcryptService = bcryptService
  }

  async getAll(filters: UserFilterOptions = {}) {
    // Si no se indican page y limit, se asume la primera página de 10
    const page = filters.page ?? 1;
    const limit = filters.limit ?? 10;
    const { total, data } = await this.userRepository.findAll({
      ...filters,
      page,
      limit,
      offset: limit * (page - 1),
      status: 'ACTIVE',
    });
    return {
      pagination: {
        total,
        currentPage: page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      data: data.map(withoutPassword)
    };
  }

  async getById(id: string | null) {
    const data = await this.userRepository.findById(parseId(id));
    if (!data) {
      throw new Error('not_found: User not found');
    }
    return { data: withoutPassword(data) };
  }

  async deleteById(id: string | null, actor: AuthUser) {
    const userId = parseId(id);
    // Regla: un administrador no puede eliminar su propia cuenta (se quedaría sin acceso)
    if (userId === actor.id) {
      throw new ForbiddenError('No puedes eliminar tu propia cuenta');
    }
    const currentUser = await this.userRepository.findById(userId);
    if (!currentUser) {
      throw new Error('not_found: User not found');
    }
    // Borrado lógico: el repositorio cambia status a INACTIVE
    await this.userRepository.deleteById(userId);
    return { message: 'User deleted successfully' };
  }

  async create(payload: Record<string, unknown>) {
    // validacion de datos
    const dto = new AdminUserDto(payload)
    const resultDto = await dto.validateDto()
    const errors = resultDto?.map(x => x.constraints)
    if (errors?.length > 0) {
      throw new BadRequest("Error en datos", errors)
    }
    // cifrar la contraseña
    dto.password = this.bcryptService.encrypt(dto.password)

    // persistencia de datos
    const resultDb = await this.userRepository.create(dto.mapCreateDto())
    return { data: withoutPassword(resultDb) }
  }

}
