const { createHash } = require("../controllers/bcrypt");


class Users {

    constructor({ code, name, email, password, role, create_by }) {
        this.code = code;
        this.name = name;
        this.email = email;
        this.role = role;
        this.create_by=create_by;
        this.password = password;
    }


    initUser() {
        const password = createHash(this.password)
        return {
            code: this.code,
            name: this.name,
            role: this.role,
            email: this.email,
            create_by:this.create_by,
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
