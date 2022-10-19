const { createHash } = require("../controllers/bcrypt");


class Users {

    constructor({ code, name, email, password }) {
        this.code = code;
        this.name = name;
        this.email = email;
        this.password = password;
    }


    initUser() {
        const password = createHash(this.password)
        return {
            code: this.code,
            name: this.name,
            email: this.email,
            password,
        }
    }

    /**
     * 
     * @param {Array} users Arreglo de usuarios
     * @returns Array de usuarios sin password
     */
    static removePassword(users) {
        return users.map(user => {
            // delete user.password
            return user
        })
    }


}

module.exports = Users
