
// El usuario está autenticado pero no tiene permiso para esta acción. Se traduce a 403.
export class ForbiddenError extends Error {
    constructor(message: string) {
        super(message)
    }
}
