import { Transform } from 'class-transformer';
import { IsBoolean, IsEmail, IsString, Length, MinLength } from 'class-validator';

export class RegisterUserDto {
  @IsString({ message: 'El nombre debe ser texto' })
  @Length(2, 100, { message: 'El nombre debe tener entre 2 y 100 caracteres' })
  name!: string;

  @IsString({ message: 'Los apellidos deben ser texto' })
  @Length(2, 150, { message: 'Los apellidos deben tener entre 2 y 150 caracteres' })
  lastName!: string;

  @IsEmail({}, { message: 'El email no es válido' })
  email!: string;

  @IsString({ message: 'La contraseña debe ser texto' })
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  password!: string;

  @Transform(({ value }) => value === true || value === 'true')
  @IsBoolean({ message: 'acceptsTerms debe ser booleano' })
  acceptsTerms!: boolean;
}
