import type { AuthResponseDTO, LoginDTO } from "../domain/models/User.ts";
import { UserDto } from "../infrastructure/dtos/user.dto.ts";
import type { UserPgRepository } from "../infrastructure/repository/users.pg.repository.ts";
import type { BcryptService } from "../infrastructure/services/bcrypt.service.ts";
import type { JwtService } from "../infrastructure/services/jwt.service.ts";
import { BadRequest } from "./errors/bad-request.error.ts";

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

  async loginUser(dto: LoginDTO): Promise<AuthResponseDTO> {
    const user = await this.userRepository.findByEmail(dto.email);
    if (!user) {
      throw new BadRequest('Credenciales inválidas', {});
    }

    if (user.status !== 'ACTIVE') {
      throw new BadRequest('El usuario se encuentra inactivo', {});
    }


    const isPasswordValid = await this.bcryptService.decrypt(user.password!, dto.password,);
    if (!isPasswordValid) {
      throw new BadRequest('Credenciales inválidas', {});
    }

    const token = this.jwtService.generateToken(user);
    return {
      user: {
        id: user.id || 0,
        identification: user.identification,
        nombre: user.name,
        email: user.email,
        role: user.role
      },
      token
    };
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