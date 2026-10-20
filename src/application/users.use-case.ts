import type { User, UserFilterOptions } from "../domain/models/User.ts";
import type { IUserRepository } from "../domain/repository/IUser.repository.ts";
import { AdminUserDto, UserDto } from "../infrastructure/dtos/user.dto.ts";
import type { BcryptService } from "../infrastructure/services/bcrypt.service.ts";
import { BadRequest } from "./errors/bad-request.error.ts";

// Convierte el id de la URL (siempre texto) en un entero positivo, o lanza bad_request.
const parseId = (id: string | null): number => {
  const value = Number(id);
  if (!id || !Number.isInteger(value) || value <= 0) {
    throw new Error('bad_request, ID must be a positive integer');
  }
  return value;
};

// El repositorio devuelve el hash de la contraseña porque el login lo necesita,
// pero nunca debe salir en una respuesta de la API.
const withoutPassword = ({ password, ...user }: User) => user;

export class UsersUseCase {
  private userRepository: IUserRepository
  private bcryptService: BcryptService

  constructor(userRepository: IUserRepository, bcryptService: BcryptService) {
    this.userRepository = userRepository
    this.bcryptService = bcryptService
  }

  async getAll(filters: UserFilterOptions = {}) {

    // calcular el offset de acuerdo al page y limit, si no se proporcionan, se asume page 1
    const page = filters.page ?? 1;
    filters.limit = filters.limit ?? 10;
    const offset = filters.limit * (page - 1);
    filters.offset = offset;
    filters.status = 'ACTIVE';
    const { total, data } = await this.userRepository.findAll(filters);
    return {
      pagination: {
        total,
        currentPage: page,
        limit: filters.limit,
        totalPages: Math.ceil(total / (filters.limit ?? 10)),
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


  async deleteById(id: string | null) {
    const userId = parseId(id);
    const currentUser = await this.userRepository.findById(userId);
    if (!currentUser) {
      throw new Error('not_found: User not found');
    }
    const data = await this.userRepository.deleteById(userId);
    return { message: 'User deleted successfully', data };
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
    return {
      name: resultDb.name
    }
  }

}