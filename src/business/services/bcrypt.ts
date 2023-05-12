
import { hashSync, compareSync } from 'bcrypt'

const ROUNDS = 10
export class BCrypt {

    createHash(pass: string) {
        return hashSync(pass, ROUNDS)
    }

    compareHash(pass: string, hash: string) {
        return compareSync(pass, hash)
    }


}
