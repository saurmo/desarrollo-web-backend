import {
  UserRepository,
  UserUpdate,
} from '../../../domain/repositories/UserRepository';
import { NotFoundError } from '../../../domain/errors/DomainError';
import { PublicUser, toPublicUser } from '../../dtos/PublicUserDto';

export class UpdateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string, updates: UserUpdate): Promise<PublicUser> {
    const updated = await this.userRepository.update(id, updates);
    if (!updated) {
      throw new NotFoundError('Usuario no encontrado');
    }
    return toPublicUser(updated);
  }
}
