import type { AuthResponseDTO, LoginDTO } from "../domain/models/User.ts";

export class AuthUseCase {
  constructor(
    private userRepository: UserRepository,
    // private bcryptService: BcryptService,
    // private jwtService: JwtService
  ) {}

  async execute(dto: LoginDTO): Promise<AuthResponseDTO> {
    const user = await this.userRepository.findByEmail(dto.email);
    if (!user) {
      throw new Error('Credenciales inválidas');
    }

    if (user.status !== 'ACTIVE') {
      throw new Error('El usuario se encuentra inactivo');
    }

    // const isPasswordValid = await this.bcryptService.compare(dto.password, user.password!);
    // if (!isPasswordValid) {
    //   throw new Error('Credenciales inválidas');
    // }

    const token = this.jwtService.generateToken({
      id: user.id,
      email: user.email,
      role: user.role
    });

    return {
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        role: user.role
      },
      token
    };
  }
}