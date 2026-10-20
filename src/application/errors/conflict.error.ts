
// Error para cuando la operación choca con un dato que ya existe (por ejemplo, un email repetido).
// Los controladores lo traducen a 409 Conflict.
export class ConflictError extends Error {
    constructor(message: string) {
        super(message)
    }
}
