import { User } from '../entities/User';

export type UserUpdate = Partial<Omit<User, 'id' | 'passwordHash' | 'createdAt' | 'updatedAt'>>;

export interface UserRepository {
  create(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User>;
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  update(id: string, updates: UserUpdate): Promise<User | null>;
  delete(id: string): Promise<boolean>;
}
