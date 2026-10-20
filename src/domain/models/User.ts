// Allowed roles definition
export type UserRole = 'admin' | 'user' | 'owner';

export interface LoginDTO {
  email: string;
  password: string;
}

export interface AuthToken {
  accessToken: string;
  tokenType: 'Bearer';
  expiresIn: number; // en segundos
}

export interface AuthResponseDTO {
  user: {
    id: number;
    identification: string;
    name: string;
    email: string;
    role: string;
  };
  token: AuthToken;
}

export interface UserFilterOptions {
  identification?: string;
  role?: string;
  limit?: number;
  offset?: number;
  page?: number;
  status?: string;
}


// Main User Entity
export interface User {
  id?: number;
  name: string;
  identification: string;
  role: UserRole;
  phone?: string | null;
  email: string;
  password?: string;
  createdAt?: Date;
  status: "ACTIVE" | "INACTIVE"
}

// Data Transfer Object for creating a new user
export type CreateUserDTO = User;

// Data Transfer Object for updating an existing user (all fields optional)
export type UpdateUserDTO = Partial<User>;