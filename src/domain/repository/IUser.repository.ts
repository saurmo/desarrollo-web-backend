import type { CreateUserDTO, UpdateUserDTO, User } from "../models/User.ts";

export interface IUserRepository {
  /**
   * Creates a new user in the database.
   * @param data User creation payload.
   */
  create(data: CreateUserDTO): Promise<User>;

  /**
   * Retrieves all users.
   */
  findAll(): Promise<User[]>;

  /**
   * Finds a user by their unique identifier.
   * @param id The ID of the user.
   */
  findById(id: number ): Promise<User | null>;

  /**
   * Finds a user by their email address.
   * @param email The email address of the user.
   */
  findByEmail(email: string): Promise<User | null>;

  /**
   * Updates an existing user by ID.
   * @param id The ID of the user to update.
   * @param data Partial user data to update.
   */
  update(id: number, data: UpdateUserDTO): Promise<User | null>;

  /**
   * Deletes a user by ID.
   * @param id The ID of the user to delete.
   * @returns Returns true if deletion was successful, false otherwise.
   */
  remove(id: number): Promise<boolean>;
}