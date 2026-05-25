import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Length, Min } from 'class-validator';

export class CreateDonationDto {
  @Type(() => Number)
  @IsNumber({}, { message: 'total debe ser numérico' })
  @Min(0, { message: 'total no puede ser negativo' })
  total!: number;

  @IsOptional()
  @IsString({ message: 'description debe ser texto' })
  @Length(0, 500, { message: 'description no puede exceder 500 caracteres' })
  description?: string;
}
