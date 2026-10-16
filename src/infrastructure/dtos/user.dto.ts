import { IsEmail, IsIn, IsNotEmpty, IsStrongPassword, validate, } from 'class-validator';
import type { CreateUserDTO, UserRole } from '../../domain/models/User';

export class UserDto {

    @IsNotEmpty() // if(name != null && name !== undefined && name != "")
    name: string;

    @IsNotEmpty()
    identification: string;

    @IsIn(["user", "owner"])
    @IsNotEmpty()
    role: UserRole;

    @IsNotEmpty()
    phone: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsStrongPassword()
    @IsNotEmpty()
    password: string;

    constructor(payload: Record<string, unknown>) {
        this.name = payload["name"] as string || "" as string
        this.identification = payload["identification"] as string || "" as string
        this.role = payload["role"] as UserRole || "" as string
        this.phone = payload["phone"] as string || "" as string
        this.email = payload["email"] as string || "" as string
        this.password = payload["password"] as string || "" as string
    }

    validateDto() {
        return validate(this, {})
    }

    mapCreateDto() {
        const data: CreateUserDTO = {
            ...this,
            status: 'ACTIVE',
        }
        return data
    }

}

export class AdminUserDto extends UserDto {

    @IsIn(["user", "owner", "admin"])
    @IsNotEmpty()
    role: UserRole;

    constructor(payload: Record<string, unknown>) {
        super(payload)
        this.role = payload["role"] as UserRole || "" as string
    }
}