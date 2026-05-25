import { UserRepository } from '../../../domain/repositories/UserRepository';
import { NotFoundError, ValidationError } from '../../../domain/errors/DomainError';
import { FileStorage } from '../../../domain/services/FileStorage';
import { PublicUser, toPublicUser } from '../../dtos/PublicUserDto';

export type UpdateUserProfilePhotoInput = {
  userId: string;
  file?: {
    buffer: Buffer;
    mimetype: string;
    originalname: string;
  };
};

export class UpdateUserProfilePhoto {
  constructor(
    private userRepository: UserRepository,
    private fileStorage: FileStorage
  ) {}

  async execute(input: UpdateUserProfilePhotoInput): Promise<PublicUser> {
    if (!input.file) {
      throw new ValidationError('No se logró cargar la imagen');
    }

    const profilePhoto = await this.fileStorage.upload({
      buffer: input.file.buffer,
      contentType: input.file.mimetype,
      originalName: input.file.originalname,
      folder: 'fotos-perfil',
    });

    const updated = await this.userRepository.update(input.userId, { profilePhoto });
    if (!updated) {
      throw new NotFoundError('Usuario no encontrado');
    }
    return toPublicUser(updated);
  }
}
