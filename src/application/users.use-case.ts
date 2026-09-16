import type { Listing, ListingFilterOptions } from "../domain/models/Listing.ts";
import type { IUserRepository } from "../domain/repository/IUser.repository.ts";

export class UsersUseCase {
    private  userRepository: IUserRepository
    
  constructor(userRepository:IUserRepository) {
    this.userRepository= userRepository
  }

  async getAll(filters: ListingFilterOptions = {}) {
    

    return await this.userRepository.findAll();
  }
}