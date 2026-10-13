

export class BadRequest extends Error {
    payloadErrors: unknown
    constructor(message: string, payloadErrors: unknown) {
        super(message)
        this.payloadErrors = payloadErrors
    }

    print() {
        return {
            message: this.message,
            errors: this.payloadErrors
        }
    }
}