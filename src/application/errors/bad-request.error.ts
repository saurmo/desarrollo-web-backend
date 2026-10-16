

export class BadRequest extends Error {
    errors: unknown
    constructor(message: string, errors: unknown) {
        super(message)
        this.errors = errors
    }

    print() {
        return {
            message: this.message,
            errors: this.errors
        }
    }
}