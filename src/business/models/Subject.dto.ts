
import { Length, MinLength, validate } from 'class-validator'
export class SubjectDto {

    @Length(10, 20)
    name: string;

    @MinLength(10)
    description: string;

    constructor(name: string, description: string) {
        this.name = name
        this.description = description
    }

    static createInstace(payload: any) {
        return new SubjectDto(payload.name, payload.description)
    }

    async isValid() {
        const errors = await validate(this)
        // errors is an array of validation errors
        if (errors.length > 0) {
            console.log('validation failed. errors: ', errors);
            return {errors}
        } else {
            console.log('validation succeed');
            return null
        }

    }

}