import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: 'El nombre debe ser texto' })
  @Length(2, 100, { message: 'El nombre debe tener entre 2 y 100 caracteres' })
  name?: string;

  @IsOptional()
  @IsString({ message: 'Los apellidos deben ser texto' })
  @Length(2, 150, { message: 'Los apellidos deben tener entre 2 y 150 caracteres' })
  lastName?: string;

  @IsOptional()
  @IsEmail({}, { message: 'El email no es válido' })
  email?: string;
}
