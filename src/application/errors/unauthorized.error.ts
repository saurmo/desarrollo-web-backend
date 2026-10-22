
// El usuario no está autenticado: falta el token, es inválido o expiró. Se traduce a 401.
export class UnauthorizedError extends Error {
    constructor(message: string) {
        super(message)
    }
}
