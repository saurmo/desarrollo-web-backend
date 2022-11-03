const jwt = require('jsonwebtoken');

const SECRET_KEY = "766dd134acc8297a392490e4cc67e86d37954bc3"

const createJsonWebToken = (payload) => {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
}

const verifyToken = (token) => {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (err) {
        throw "ERROR VERIFICANDO TOKEN"
    }
}

module.exports = { createJsonWebToken, verifyToken }