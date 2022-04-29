
// const crypto = require('crypto');

// const cifrar = (data) => {
//   return  crypto.pbkdf2Sync(data, 'salt', 100000, 64, 'sha512').toString()
// }


const bcrypt = require('bcrypt');

const crearHash = (clave) => {
  return bcrypt.hashSync(clave, 12)
}


const compararHash = (clave, hash) => {
  return bcrypt.compareSync(clave, hash)
}


module.exports = { compararHash, crearHash }