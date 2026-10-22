import type { User } from "../domain/models/User.ts";

// El repositorio devuelve el hash de la contraseña porque el login lo necesita,
// pero nunca debe salir en una respuesta de la API.
export const withoutPassword = ({ password, ...user }: User) => user;
