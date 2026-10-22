import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength, validate } from 'class-validator';
import type { CategoryInput } from '../../domain/models/Category.ts';

// Valida el body de crear y editar una categoría
export class CategoryDto {

    // Los decoradores se evalúan de abajo hacia arriba y stopAtFirstError devuelve el primero que falla:
    // por eso @IsNotEmpty va al final (se revisa primero).
    @MaxLength(100, { message: 'name no puede tener más de 100 caracteres' })
    @MinLength(2, { message: 'name debe tener al menos 2 caracteres' })
    @IsString({ message: 'name debe ser un texto' })
    @IsNotEmpty({ message: 'name es obligatorio' })
    name: string;

    @IsOptional()
    @MaxLength(500, { message: 'description no puede tener más de 500 caracteres' })
    @IsString({ message: 'description debe ser un texto' })
    description: string | null;

    constructor(payload: Record<string, unknown>) {
        // trim para que "  Playa  " y "Playa" sean la misma categoría
        this.name = typeof payload['name'] === 'string' ? payload['name'].trim() : payload['name'] as string
        const description = payload['description']
        this.description = typeof description === 'string' ? (description.trim() || null) : (description as string | null) ?? null
    }

    validateDto() {
        // stopAtFirstError: un solo mensaje por campo (si falta name, no reporta también su longitud)
        return validate(this, { stopAtFirstError: true })
    }

    toInput(): CategoryInput {
        return { name: this.name, description: this.description }
    }
}
