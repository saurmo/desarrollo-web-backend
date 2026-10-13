import type { AuthResponseDTO, LoginDTO } from "../domain/models/User.ts";
import type { UserPgRepository } from "../infrastructure/repository/users.pg.repository.ts";
import type { BcryptService } from "../infrastructure/services/bcrypt.service.ts";
import type { JwtService } from "../infrastructure/services/jwt.service.ts";

export class AuthUseCase {
  private userRepository: UserPgRepository
  private bcryptService: BcryptService
  private jwtService: JwtService
  constructor(
    userRepository: UserPgRepository,
    bcryptService: BcryptService,
    jwtService: JwtService

  ) {
    this.userRepository = userRepository
    this.bcryptService = bcryptService
    this.jwtService = jwtService
  }

  async execute(dto: LoginDTO): Promise<AuthResponseDTO> {
    const user = await this.userRepository.findByEmail(dto.email);
    if (!user) {
      throw new Error('Credenciales inválidas');
    }

    if (user.status !== 'ACTIVE') {
      throw new Error('El usuario se encuentra inactivo');
    }

    // TODO: Pendiente validar contraseña
    // const isPasswordValid = await this.bcryptService.compare(dto.password, user.password!);
    // if (!isPasswordValid) {
    //   throw new Error('Credenciales inválidas');
    // }

    const token = this.jwtService.generateToken(user);
    return {
      user: {
        id: user.id,
        identification: user.identification,
        nombre: user.name,
        email: user.email,
        role: user.role
      },
      token
    };
  }
}