import { UserRepository } from '../../../domain/repositories/UserRepository';
import { PublicUser, toPublicUser } from '../../dtos/PublicUserDto';

export class GetAllUsers {
  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<PublicUser[]> {
    const users = await this.userRepository.findAll();
    return users.map(toPublicUser);
  }
}
