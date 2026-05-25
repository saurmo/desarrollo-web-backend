import { UserRepository } from '../../../domain/repositories/UserRepository';
import { PasswordHasher } from '../../../domain/services/PasswordHasher';
import { ConflictError } from '../../../domain/errors/DomainError';
import { signToken } from '../../../infrastructure/config/jwt';
import { PublicUser, toPublicUser } from '../../dtos/PublicUserDto';

export type RegisterUserInput = {
  name: string;
  lastName: string;
  email: string;
  password: string;
  acceptsTerms: boolean;
};

export type RegisterUserOutput = {
  token: string;
  user: PublicUser;
};

export class RegisterUser {
  constructor(
    private userRepository: UserRepository,
    private passwordHasher: PasswordHasher
  ) {}

  async execute(input: RegisterUserInput): Promise<RegisterUserOutput> {
    const existing = await this.userRepository.findByEmail(input.email);
    if (existing) {
      throw new ConflictError('El correo ya está registrado');
    }

    const passwordHash = await this.passwordHasher.hash(input.password);

    const created = await this.userRepository.create({
      name: input.name,
      lastName: input.lastName,
      email: input.email,
      passwordHash,
      acceptsTerms: input.acceptsTerms,
      profilePhoto: null,
      role: 'donante',
    });

    const token = signToken({
      userId: created.id,
      name: created.name,
      email: created.email,
      role: created.role,
    });

    return { token, user: toPublicUser(created) };
  }
}
