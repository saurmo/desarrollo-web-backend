import { User, UserRole } from '../../domain/entities/User';

export type PublicUser = {
  id: string;
  name: string;
  lastName: string;
  email: string;
  role: UserRole;
  profilePhoto?: string | null;
  createdAt: Date;
};

export const toPublicUser = (user: User): PublicUser => ({
  id: user.id,
  name: user.name,
  lastName: user.lastName,
  email: user.email,
  role: user.role,
  profilePhoto: user.profilePhoto,
  createdAt: user.createdAt,
});
