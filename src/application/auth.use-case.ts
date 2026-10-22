import type { AuthResponseDTO, LoginDTO } from "../domain/models/User.ts";
import { UserDto } from "../infrastructure/dtos/user.dto.ts";
import type { IUserRepository } from "../domain/repository/IUser.repository.ts";
import type { BcryptService } from "../infrastructure/services/bcrypt.service.ts";
import type { JwtService } from "../infrastructure/services/jwt.service.ts";
import { BadRequest } from "./errors/bad-request.error.ts";
import { UnauthorizedError } from "./errors/unauthorized.error.ts";
import { withoutPassword } from "./user-mapper.ts";

export class AuthUseCase {
  private userRepository: IUserRepository
  private bcryptService: BcryptService
  private jwtService: JwtService
  constructor(
    userRepository: IUserRepository,
    bcryptService: BcryptService,
    jwtService: JwtService

  ) {
    this.userRepository = userRepository
    this.bcryptService = bcryptService
    this.jwtService = jwtService
  }

  async loginUser(dto: LoginDTO): Promise<AuthResponseDTO> {
    const user = await this.userRepository.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedError('Credenciales inválidas');
    }

    if (user.status !== 'ACTIVE') {
      throw new UnauthorizedError('El usuario se encuentra inactivo');
    }


    const isPasswordValid = await this.bcryptService.decrypt(user.password!, dto.password,);
    if (!isPasswordValid) {
      throw new UnauthorizedError('Credenciales inválidas');
    }

    const token = this.jwtService.generateToken(user);
    return {
      user: {
        id: user.id || 0,
        identification: user.identification,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    };
  }


  // Perfil del usuario del token. Si ya no existe o fue desactivado, el token deja de servir (401).
  async getProfile(userId: number) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new UnauthorizedError('El usuario ya no está activo');
    }
    return { data: withoutPassword(user) };
  }

  async registerUser(payload: Record<string, unknown>) {
    // validacion de datos
    const dto = new UserDto(payload)
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