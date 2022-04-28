
const crypto = require('crypto');


const cifrar = (data) => {
  return  crypto.pbkdf2Sync(data, 'salt', 100000, 64, 'sha512').toString()
}

module.exports = { cifrar }