import type { UserFilterOptions } from "../domain/models/User.ts";
import type { IUserRepository } from "../domain/repository/IUser.repository.ts";
import { AdminUserDto, UserDto } from "../infrastructure/dtos/user.dto.ts";
import type { BcryptService } from "../infrastructure/services/bcrypt.service.ts";
import { BadRequest } from "./errors/bad-request.error.ts";

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
      data
    };
  }

  async getById(id: string | null) {
    if (!id || id.length === 0 || Number.isNaN(id)) {
      throw new Error('bad_request, ID is required or number');
    }
    const data = await this.userRepository.findById(Number(id));
    return { data };
  }


  async deleteById(id: string | null) {
    if (!id || id.length === 0 || Number.isNaN(id)) {
      throw new Error('bad_request, ID is required');
    }
    const currentListing = await this.userRepository.findById(+id);
    if (!currentListing) {
      throw new Error('not_found: Listing not found');
    }
    const data = await this.userRepository.deleteById(+id);
    return { message: 'Listing deleted successfully', data };
  }

  async create(payload: Record<string, unknown>) {

    const currentUser = await this.getById(payload.id as string || "")
    if (currentUser) {
      throw new Error('already_exists: User already exists');
    }

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