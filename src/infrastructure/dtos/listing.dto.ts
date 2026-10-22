import { IsArray, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min, validate } from 'class-validator';
import type { ListingInput } from '../../domain/models/Listing.ts';

// Valida el body de POST /api/listings.
// El constructor copia SOLO los campos permitidos: lo demás que llegue en el body (state, created_by...) se ignora.
export class ListingDto {

    // Con stopAtFirstError se informa el primer decorador que falla, de abajo hacia arriba:
    // por eso @IsNotEmpty va al final (se revisa primero).
    @MaxLength(255, { message: 'name no puede tener más de 255 caracteres' })
    @IsString({ message: 'name debe ser un texto' })
    @IsNotEmpty({ message: 'name es obligatorio' })
    name: string;

    @MaxLength(255, { message: 'location no puede tener más de 255 caracteres' })
    @IsString({ message: 'location debe ser un texto' })
    @IsNotEmpty({ message: 'location es obligatorio' })
    location: string;

    @Min(0, { message: 'price no puede ser negativo' })
    @IsNumber({}, { message: 'price debe ser un número' })
    price: number;

    @Min(1, { message: 'capacity debe ser al menos 1' })
    @IsInt({ message: 'capacity debe ser un número entero' })
    capacity: number;

    @MaxLength(100, { message: 'weather no puede tener más de 100 caracteres' })
    @IsString({ message: 'weather debe ser un texto' })
    @IsNotEmpty({ message: 'weather es obligatorio' })
    weather: string;

    @IsString({ each: true, message: 'photos debe ser una lista de URLs en texto' })
    @IsArray({ message: 'photos debe ser una lista' })
    photos: string[];

    @IsOptional()
    @IsString({ each: true, message: 'videos debe ser una lista de URLs en texto' })
    @IsArray({ message: 'videos debe ser una lista' })
    videos: string[];

    constructor(payload: Record<string, unknown>) {
        this.name = typeof payload['name'] === 'string' ? payload['name'].trim() : payload['name'] as string
        this.location = typeof payload['location'] === 'string' ? payload['location'].trim() : payload['location'] as string
        this.price = payload['price'] as number
        this.capacity = payload['capacity'] as number
        this.weather = typeof payload['weather'] === 'string' ? payload['weather'].trim() : payload['weather'] as string
        this.photos = (payload['photos'] ?? []) as string[]
        this.videos = (payload['videos'] ?? []) as string[]
    }

    validateDto() {
        return validate(this, { stopAtFirstError: true })
    }

    toInput(): ListingInput {
        return {
            name: this.name,
            location: this.location,
            price: this.price,
            capacity: this.capacity,
            weather: this.weather,
            photos: this.photos,
            videos: this.videos,
        }
    }
}
