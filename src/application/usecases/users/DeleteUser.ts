import { UserRepository } from '../../../domain/repositories/UserRepository';
import { NotFoundError } from '../../../domain/errors/DomainError';

export class DeleteUser {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string): Promise<void> {
    const deleted = await this.userRepository.delete(id);
    if (!deleted) {
      throw new NotFoundError('Usuario no encontrado');
    }
  }
}
