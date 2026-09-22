import type { UserFilterOptions } from "../domain/models/User.ts";
import type { IUserRepository } from "../domain/repository/IUser.repository.ts";

export class UsersUseCase {
  private userRepository: IUserRepository

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository
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
}