import { UserRepository } from '../../../domain/repositories/UserRepository';
import { NotFoundError } from '../../../domain/errors/DomainError';
import { PublicUser, toPublicUser } from '../../dtos/PublicUserDto';

export class GetUserById {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string): Promise<PublicUser> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundError('Usuario no encontrado');
    }
    return toPublicUser(user);
  }
}
