import { Type } from 'class-transformer';
import { IsInt, IsString, Length, Min } from 'class-validator';

export class CreateProducerDto {
  @IsString({ message: 'El nombre debe ser texto' })
  @Length(1, 120, { message: 'El nombre debe tener entre 1 y 120 caracteres' })
  name!: string;

  @Type(() => Number)
  @IsInt({ message: 'employeeCount debe ser un entero' })
  @Min(0, { message: 'employeeCount no puede ser negativo' })
  employeeCount!: number;
}
