


import { hashSync, compareSync } from "bcrypt";
const SALT = 10

export class BcryptService {

    encrypt(password: string) {
        return hashSync(password, SALT)
    }

    decrypt(hash: string, password: string) {
        return compareSync(password, hash)
    }

}