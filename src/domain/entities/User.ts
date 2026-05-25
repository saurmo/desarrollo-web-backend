export const USER_ROLES = ['donante', 'admin'] as const;

export type UserRole = (typeof USER_ROLES)[number];

export const isUserRole = (value: unknown): value is UserRole =>
  typeof value === 'string' && (USER_ROLES as readonly string[]).includes(value);

export type User = {
  id: string;
  name: string;
  lastName: string;
  email: string;
  passwordHash: string;
  acceptsTerms: boolean;
  profilePhoto?: string | null;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
};
